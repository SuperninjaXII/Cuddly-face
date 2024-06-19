#!/bin/bash

# Add all changes to the staging area
git add .

# Prompt for a commit message
echo "Enter commit message:"
read commit_message

# Commit the changes with the provided message
git commit -m "$commit_message"

# Push the changes to the remote repository
git push
