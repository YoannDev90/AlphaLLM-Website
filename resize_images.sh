#!/bin/bash

# Script to create responsive images for models
# Creates subfolders with different sizes: icon (64x64), small (128x128), medium (256x256), large (512x512)
# Requires ImageMagick to be installed

# Check if ImageMagick is installed
if ! command -v magick &> /dev/null; then
    echo "ImageMagick is not installed. Please install it first with: sudo apt install imagemagick (Ubuntu/Debian) or sudo dnf install ImageMagick (Fedora/RHEL)"
    exit 1
fi

# Define sizes
SIZES=("64x64" "128x128" "256x256" "512x512")
FOLDERS=("icon" "small" "medium" "large")

# Base directory
BASE_DIR="assets/images/models"

# Create subfolders
for folder in "${FOLDERS[@]}"; do
    mkdir -p "$BASE_DIR/$folder"
done

# Find and resize all common image files in models directory
find "$BASE_DIR" -maxdepth 1 -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.gif" -o -iname "*.bmp" -o -iname "*.tiff" -o -iname "*.webp" \) | while read -r file; do
    filename=$(basename "$file")
    for i in "${!SIZES[@]}"; do
        size="${SIZES[$i]}"
        folder="${FOLDERS[$i]}"
        magick convert "$file" -resize "$size" "$BASE_DIR/$folder/$filename"
    done
done

echo "Responsive images created in icon, small, medium, and large subfolders."