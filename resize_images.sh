#!/bin/bash

# Script to resize all images in the current directory and subdirectories to 512x512
# Requires ImageMagick to be installed (sudo apt install imagemagick on Ubuntu/Debian, or sudo dnf install ImageMagick on Fedora/RHEL)

# Check if ImageMagick is installed
if ! command -v magick &> /dev/null; then
    echo "ImageMagick is not installed. Please install it first with: sudo apt install imagemagick (Ubuntu/Debian) or sudo dnf install ImageMagick (Fedora/RHEL)"
    exit 1
fi

# Find and resize all common image files
find . -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.gif" -o -iname "*.bmp" -o -iname "*.tiff" -o -iname "*.webp" \) -exec magick convert {} -resize 512x512 {} \;

echo "All images have been resized to 512x512."