#!/bin/bash

# --- Configuration ---
YAML_FILE="mvp_tasks.yaml"
# Define some colors for common labels (6-digit hex without #)
# Others will get default GitHub colors.
declare -A LABEL_COLORS=(
  ["priority-high"]="d73a4a"
  ["priority-medium"]="fbca04"
  ["priority-low"]="0e8a16"
  ["bug"]="d73a4a"
  ["feature"]="a2eeef"
  ["chore"]="c5def5"
  ["enhancement"]="a2eeef"
  ["documentation"]="0075ca"
  ["testing"]="cfd3d7"
  ["backend"]="f29513"
  ["frontend"]="5319e7"
  ["database"]="1d76db"
  ["setup"]="f9d0c4"
  ["supabase"]="3ECF8E"
)
declare -A LABEL_DESCRIPTIONS=(
  ["priority-high"]="High priority task"
  ["priority-medium"]="Medium priority task"
  ["priority-low"]="Low priority task"
  ["bug"]="Something isn't working"
  ["feature"]="New feature or request"
  ["chore"]="Build process or auxiliary tool changes"
  ["enhancement"]="Improvement to an existing feature"
  ["documentation"]="Improvements or additions to documentation"
  ["testing"]="Tasks related to testing"
  ["backend"]="Tasks related to backend logic and APIs"
  ["frontend"]="Tasks related to the frontend UI and logic"
  ["database"]="Tasks related to database schema or migrations"
  ["setup"]="Tasks for initial project or feature setup"
  ["supabase"]="Tasks specifically involving Supabase"
)

# --- Helper Functions ---
command_exists() {
  command -v "$1" >/dev/null 2>&1
}

# --- Main Script ---
echo "Starting label creation process..."

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

echo "Extracting unique labels from '$YAML_FILE'..."
# yq query:
# .[]       -> for each item in the top-level array
# .labels[] -> get each item in the 'labels' array
# unique    -> get unique values
# .[]       -> output each unique label on a new line
unique_labels=$(yq eval '[.[] | .labels[]] | unique | .[]' "$YAML_FILE")

if [ -z "$unique_labels" ]; then
  echo "No labels found in the YAML file."
  exit 0
fi

echo "Found unique labels:"
echo "$unique_labels"
echo ""

# Get existing repo labels once
echo "Fetching existing repository labels..."
existing_repo_labels=$(gh label list --json name -q '.[] | .name')

for label_name in $unique_labels; do
  # Trim potential quotes from yq output if any
  label_name_trimmed=$(echo "$label_name" | tr -d '"')

  echo "Processing label: '$label_name_trimmed'"

  # Check if label already exists in the repo
  if echo "$existing_repo_labels" | grep -q -w "$label_name_trimmed"; then
    echo "  Label '$label_name_trimmed' already exists in the repository. Skipping."
  else
    echo "  Label '$label_name_trimmed' does not exist. Creating..."
    color_code=${LABEL_COLORS[$label_name_trimmed]}
    description=${LABEL_DESCRIPTIONS[$label_name_trimmed]:-"Default description for $label_name_trimmed"} # Use default if not in map

    create_command="gh label create \"$label_name_trimmed\" --description \"$description\""
    if [ -n "$color_code" ]; then
      create_command+=" --color \"$color_code\""
    fi
    create_command+=" --force" # Use --force to update if it exists with different case, or create if not.
                               # GitHub labels are case-insensitive for matching but case-sensitive for creation.
                               # Using --force simplifies this by ensuring desired casing if it differs, or creates if new.


    echo "  Executing: $create_command"
    eval "$create_command"
    if [ $? -eq 0 ]; then
      echo "  Successfully created/updated label '$label_name_trimmed'."
    else
      echo "  Error creating/updating label '$label_name_trimmed'."
    fi
  fi
  echo ""
done

echo "Label creation process finished."