# Design System Documentation

## Overview
This document outlines the design system used in the Stock Management interface, following a clean, modern, and functional approach inspired by the Geist design language.

## Colors

### Primary Colors
- **Background**: `#fafafa` (Light gray)
- **Surface**: `#ffffff` (White)
- **Surface Elevated**: `#ffffff` (White with subtle shadow)
- **Border**: `#e5e5e5` (Light gray border)
- **Border Strong**: `#d4d4d4` (Slightly darker border for emphasis)

### Text Colors
- **Primary Text**: `#171717` (Almost black)
- **Muted Text**: `#737373` (Medium gray for secondary text)
- **Subtle Text**: `#a3a3a3` (Light gray for disabled/tertiary text)

### Accent Colors
- **Blue (Primary)**: `#3b82f6`
- **Green (Success)**: `#22c55e`
- **Orange (Warning)**: `#f97316`
- **Red (Error)**: `#ef4444`

### Status Badges
- **Success**: 
  - Background: `#22c55e` with 10% opacity
  - Text: `#22c55e`
  - Border: `#22c55e` with 20% opacity
- **Warning**: 
  - Background: `#f97316` with 10% opacity
  - Text: `#f97316`
  - Border: `#f97316` with 20% opacity
- **Error**: 
  - Background: `#ef4444` with 10% opacity
  - Text: `#ef4444`
  - Border: `#ef4444` with 20% opacity

## Typography

### Font Family
- **Primary Font**: System UI, -apple-system, "Segoe UI", Roboto, sans-serif

### Font Sizes
- **3XL**: `1.875rem` (30px) - Page titles
- **2XL**: `1.5rem` (24px) - Section headers
- **XL**: `1.25rem` (20px) - Card titles
- **LG**: `1.125rem` (18px) - Important text
- **Base**: `1rem` (16px) - Body text
- **SM**: `0.875rem` (14px) - Secondary text, form labels
- **XS**: `0.75rem` (12px) - Captions, helper text

### Font Weights
- **Light**: 300
- **Normal**: 400
- **Medium**: 500
- **Semibold**: 600
- **Bold**: 700

## Spacing & Layout

### Container Spacing
- **Page Container**: `p-4` (1rem / 16px padding on all sides)
- **Section Spacing**: `space-y-8` (2rem / 32px vertical gap between sections)
- **Card Inner Spacing**: `p-6` (1.5rem / 24px padding inside cards)
- **Element Spacing**: `gap-4` (1rem / 16px between related elements)

### Grid Layouts
- **Stats Grid**: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4` (Responsive grid for stat cards)
- **Two-Column Layout**: `grid-cols-1 md:grid-cols-2` (For content that needs to be displayed side by side on larger screens)

### Component Spacing
- **Button Padding**: `px-4 py-2` (Horizontal 1rem, Vertical 0.5rem)
- **Form Controls**: `mb-4` (1rem bottom margin between form elements)
- **Table Cells**: `px-6 py-4` (Horizontal 1.5rem, Vertical 1rem padding in table cells)

### Responsive Behavior
- Mobile: Single column layout with full-width components
- Tablet (md: 768px+): Two-column layout where appropriate
- Desktop (lg: 1024px+): Multi-column layouts with optimized spacing

## Buttons

### Primary Button
- **Background**: `var(--color-blue)` (#3b82f6)
- **Text**: White
- **Hover**: 90% opacity of primary blue
- **Padding**: `px-4 py-2` (0.5rem 1rem)
- **Border Radius**: `0.375rem` (6px)
- **Class**: `bg-[var(--color-blue)] hover:bg-[var(--color-blue)]/90 text-white`

### Secondary Button (Outline)
- **Background**: White
- **Text**: Gray-700
- **Border**: Gray-300
- **Hover**: Gray-50 background
- **Padding**: `px-4 py-2` (0.5rem 1rem)
- **Border Radius**: `0.375rem` (6px)
- **Class**: `bg-white hover:bg-gray-50 text-gray-700 border-gray-300`

### Button Sizes
- **Small**: `h-8 px-3 text-sm`
- **Medium (default)**: `h-10 px-4 py-2`
- **Large**: `h-12 px-6 text-lg`

### Button States
- **Hover**: Slight background darkening (90% opacity for primary, gray-50 for secondary)
- **Focus**: Blue ring outline for accessibility
- **Disabled**: 50% opacity and not-allowed cursor

## Spacing

### Base Unit: 4px (0.25rem)
- **1x**: 4px (0.25rem)
- **2x**: 8px (0.5rem)
- **3x**: 12px (0.75rem)
- **4x**: 16px (1rem)
- **5x**: 20px (1.25rem)
- **6x**: 24px (1.5rem)
- **8x**: 32px (2rem)
- **10x**: 40px (2.5rem)

### Padding
- **Card Padding**: 24px (1.5rem)
- **Button Padding**: 8px 16px (0.5rem 1rem)
- **Input Padding**: 10px 14px (0.625rem 0.875rem)
- **Table Cell Padding**: 16px (1rem) horizontal, 12px (0.75rem) vertical

### Margins
- **Section Margin**: 32px (2rem)
- **Element Margin**: 16px (1rem)
- **Paragraph Margin**: 12px (0.75rem)

## Border Radius
- **SM**: 6px (0.375rem) - Buttons, inputs
- **MD**: 8px (0.5rem) - Cards, dropdowns
- **LG**: 12px (0.75rem) - Large containers
- **XL**: 16px (1rem) - Modal dialogs

## Shadows
- **XS**: `0 1px 2px 0 rgb(0 0 0 / 0.05)` - Subtle elevation
- **SM**: `0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)` - Cards, dropdowns
- **MD**: `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)` - Modals, popovers
- **LG**: `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)` - Floating elements

## Components

### Cards
- **Background**: `#ffffff`
- **Border**: `1px solid #e5e5e5`
- **Border Radius**: 8px
- **Box Shadow**: SM
- **Padding**: 24px

### Buttons
- **Primary**: 
  - Background: `#3b82f6`
  - Text: White
  - Hover: Slightly darker blue
  - Padding: 8px 16px
  - Border Radius: 6px
- **Secondary**: 
  - Background: Transparent
  - Text: `#3b82f6`
  - Border: `1px solid #e5e5e5`
  - Hover: `#f5f5f5` background

### Inputs
- **Height**: 40px
- **Padding**: 10px 14px
- **Border**: `1px solid #e5e5e5`
- **Border Radius**: 6px
- **Focus**: `2px solid #3b82f6` with ring effect

### Tables
- **Header Background**: `#fafafa`
- **Row Hover**: `#f5f5f5`
- **Cell Padding**: 16px horizontal, 12px vertical
- **Border**: `1px solid #e5e5e5`
- **Border Radius**: 8px for the table container

## Icons
- **Size**: 16px (1rem) for inline icons
- **Color**: Inherits text color by default
- **Spacing**: 8px (0.5rem) margin when paired with text

## Transitions
- **Default**: `all 0.2s ease-in-out`
- **Hover States**: `background-color 0.15s ease, border-color 0.15s ease`
- **Focus States**: `box-shadow 0.15s ease`

## Breakpoints
- **SM**: 640px
- **MD**: 768px
- **LG**: 1024px
- **XL**: 1280px
- **2XL**: 1536px

## Z-Index Scale
- **Dropdown**: 50
- **Modal Overlay**: 40
- **Modal**: 50
- **Tooltip**: 60
- **Toast**: 70

## Accessibility
- **Text Contrast**: Minimum 4.5:1 for normal text, 3:1 for large text
- **Focus States**: Visible focus indicators for keyboard navigation
- **Interactive Elements**: Minimum touch target size of 44x44px
- **Reduced Motion**: Respects user's motion preferences
