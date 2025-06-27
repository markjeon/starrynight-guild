# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Korean Mabinogi Mobile guild website for "별이빛나는밤" (Starry Night) guild. It's a static website built with vanilla HTML, CSS, and JavaScript that features:

- Guild member profile cards with Pokemon card-style design
- Photo gallery with 35mm film frame aesthetics
- Admin mode for content management
- Animated star field background
- Responsive design for mobile and desktop

## File Structure

```
/
├── index.html          # Main HTML file
├── script.js          # Main JavaScript functionality
├── styles.css         # All CSS styles and animations
└── Images/            # Image assets folder
    ├── README.md      # Image requirements documentation
    ├── top.png        # Guild banner image
    ├── 1.png, 2.png   # Default gallery images
    └── *.png          # Guild member character images
```

## Key Architecture Components

### Data Management
- **Guild members**: Stored in `guildMembers` array in script.js, persisted to localStorage
- **Gallery images**: Stored in `galleryImages` array, persisted to localStorage  
- **Admin settings**: Password and banner image stored in localStorage

### Core Functions (script.js)
- `loadData()` - Initializes data from localStorage on page load
- `renderMembers()` - Dynamically generates member cards
- `renderGallery()` - Creates film-style gallery slider
- `toggleAdmin()` - Admin mode authentication and UI toggle
- `addMember()` / `removeMember()` - Member management
- `addGalleryImage()` / `removeGalleryImage()` - Gallery management

### Visual Effects
- Animated star background with parallax scrolling
- Pokemon card-style member cards with holographic effects
- 35mm film frame gallery with sprocket holes
- Glass shader effects and spring animations on hover

### Admin Mode
- Password-protected (default: "signal")
- Allows adding/removing guild members
- Gallery image management
- Banner image upload
- Password change functionality

## Development Workflow

Since this is a static website, there are no build scripts or package managers. Development is straightforward:

1. **Testing**: Open `index.html` directly in a browser
2. **Local Server**: Use `python -m http.server 8000` or similar for proper file loading
3. **Admin Access**: Click the settings gear (⚙️) button, enter password "signal"

## Data Persistence

All dynamic content is stored in browser localStorage:
- `guildMembers` - Member data array
- `galleryImages` - Gallery photos array  
- `adminPassword` - Custom admin password
- `guildBanner` - Base64 encoded banner image

## Korean Context

This website is entirely in Korean and relates to Mabinogi Mobile game guild management. Member names and descriptions are Korean character names from the game. The aesthetic combines magical/fantasy themes with retro film photography styling.

## Image Management

Images should be placed in the `/Images/` folder:
- Member images: Named exactly as the member's name (e.g., "견신.png")
- Banner: Can be uploaded via admin mode or replace `top.png`
- Gallery: Added via admin interface or default `1.png`, `2.png`

## CSS Architecture

All styles are in a single `styles.css` file organized by:
1. Global styles and resets
2. Animated backgrounds (stars, twinkling)
3. Admin interface styles
4. Main content sections (header, intro, members, gallery, join)
5. Pokemon card effects and animations
6. Film gallery styling
7. Responsive breakpoints

The visual design emphasizes night sky themes with gold accents, glass morphism effects, and smooth animations.