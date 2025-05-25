#!/bin/bash

# --- Configuration ---
YAML_FILE="mvp_tasks.yaml"
DRY_RUN=false # Set to true to print commands instead of executing them
# Optional: Set your milestone name. Ensure it exists in your repo.
MILESTONE_NAME="MVP"
# MILESTONE_NAME="" # Set to empty if no milestone

# --- Helper Functions ---
command_exists() {
  command -v "$1" >/dev/null 2>&1
}

# --- Main Script ---
echo "Starting issue creation process..."

# Check for gh
if ! command_exists gh; then
  echo "Error: gh (GitHub CLI) is not installed. Please install it first (brew install gh)."
  exit 1
fi

# Check for yq
if ! command_exists yq; then
  echo "Error: yq is not installed. Please install it first (brew install yq)."
  exit 1
fi

# Check if YAML file exists
if [ ! -f "$YAML_FILE" ]; then
  echo "Error: YAML file '$YAML_FILE' not found."
  exit 1
fi

# Get the total number of tasks
task_count=$(yq eval 'length' "$YAML_FILE")

if [ -z "$task_count" ] || [ "$task_count" -eq 0 ]; then
  echo "No tasks found in '$YAML_FILE'."
  exit 0
fi

echo "Found $task_count task(s) in '$YAML_FILE'."

# Optional: Ensure milestone exists if MILESTONE_NAME is set
if [ -n "$MILESTONE_NAME" ] && [ "$DRY_RUN" = false ]; then
    echo "Checking/Creating milestone '$MILESTONE_NAME'..."
    # Check if milestone exists
    milestone_exists=$(gh milestone list --json title -q ".[] | select(.title == \"$MILESTONE_NAME\") | .title")
    if [ -z "$milestone_exists" ]; then
        echo "Milestone '$MILESTONE_NAME' not found, creating..."
        gh milestone create --title "$MILESTONE_NAME"
        if [ $? -ne 0 ]; then
            echo "Warning: Could not create milestone '$MILESTONE_NAME'. Issues will be created without it."
            MILESTONE_NAME="" # Clear milestone name if creation failed
        else
            echo "Milestone '$MILESTONE_NAME' created."
        fi
    else
        echo "Milestone '$MILESTONE_NAME' already exists."
    fi
fi


for i in $(seq 0 $((task_count - 1))); do
    echo -e "\nProcessing task $((i + 1))/$task_count..."

    # Extract task details using yq. The 'r' flag ensures raw string output.
    # The 'e' flag with 'select(document_index == 0)' ensures we're always targeting the first (and only) document.
    # The ' // "" ' part provides a default empty string if a field is null or missing.
    title=$(yq eval ".[$i].title // \"\"" "$YAML_FILE")
    overview=$(yq eval ".[$i].overview // \"\"" "$YAML_FILE")
    why_needed=$(yq eval ".[$i].why_needed // \"\"" "$YAML_FILE")
    tech_lead_notes=$(yq eval ".[$i].tech_lead_notes // \"\"" "$YAML_FILE")

    # Build 'What To Do' Markdown
    what_to_do_md=""
    what_to_do_len=$(yq eval ".[$i].what_to_do | length // 0" "$YAML_FILE")
    if [ "$what_to_do_len" -gt 0 ]; then
        for j in $(seq 0 $((what_to_do_len - 1))); do
            item=$(yq eval ".[$i].what_to_do.[$j] // \"\"" "$YAML_FILE")
            what_to_do_md+="- $item\n" # Append newline character
        done
    fi

    # Build 'Definition of Done' Markdown
    definition_of_done_md=""
    dod_len=$(yq eval ".[$i].definition_of_done | length // 0" "$YAML_FILE")
    if [ "$dod_len" -gt 0 ]; then
        for j in $(seq 0 $((dod_len - 1))); do
            item=$(yq eval ".[$i].definition_of_done.[$j] // \"\"" "$YAML_FILE")
            definition_of_done_md+="- $item\n" # Append newline character
        done
    fi

    # Build labels string
    labels_array=()
    labels_len=$(yq eval ".[$i].labels | length // 0" "$YAML_FILE")
    if [ "$labels_len" -gt 0 ]; then
        for j in $(seq 0 $((labels_len - 1))); do
            label_item=$(yq eval ".[$i].labels.[$j] // \"\"" "$YAML_FILE" | tr -d '"')
            if [ -n "$label_item" ]; then # Ensure label_item is not empty
                labels_array+=("$label_item")
            fi
        done
    fi
    labels_str=$(IFS=,; echo "${labels_array[*]}")


    # Construct the issue body using printf for better multiline handling
    issue_body=""
    issue_body+=$(printf "## Overview\n%s\n\n" "$overview")
    issue_body+=$(printf "## Why This Task is Needed\n%s\n\n" "$why_needed")
    if [ -n "$what_to_do_md" ]; then
      issue_body+=$(printf "## What To Do\n%s\n" "$what_to_do_md")
    fi
    if [ -n "$definition_of_done_md" ]; then
      issue_body+=$(printf "## Definition of Done\n%s\n" "$definition_of_done_md")
    fi
    if [ -n "$tech_lead_notes" ]; then
      issue_body+=$(printf "---\n**Tech Lead Notes:**\n%s\n" "$tech_lead_notes")
    fi

    # Prepare gh command
    gh_command=("gh" "issue" "create" "--title" "$title" "--body" "$issue_body")

    if [ -n "$labels_str" ]; then
        gh_command+=("--label" "$labels_str")
    fi

    if [ -n "$MILESTONE_NAME" ]; then
        gh_command+=("--milestone" "$MILESTONE_NAME")
    fi

    echo "  Title: $title"
    if [ "$DRY_RUN" = true ]; then
        echo "  [DRY RUN] Would execute: ${gh_command[*]}"
    else
        echo "  Creating issue..."
        # Using process substitution to pass body to avoid issues with special characters in a direct variable
        issue_url=$("${gh_command[@]}") 
        
        if [ $? -eq 0 ]; then
            echo "  Successfully created issue: $issue_url"
        else
            echo "  Error creating issue '$title'."
        fi
    fi
done

echo "Issue creation process finished."