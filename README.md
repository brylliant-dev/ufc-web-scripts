# Accommodation Custom Filter System

![image](https://github.com/user-attachments/assets/a0e00cf2-b662-456f-a795-e6d179a6c205)

## Overview
A dynamic accommodation filtering system that extends and enhances Finsweet's filtering capabilities for SIL and SDA disability housing vacancies. This system specifically addresses limitations in Finsweet's native filtering functionality, providing custom solutions for nested collections, advanced checkbox behaviors, and dynamic counter updates.

## Key Problems Solved

### 1. Nested Collection Filtering
- **Problem**: Finsweet filters don't work properly with nested collections
- **Solution**: Custom filtering logic in `accomodation-filter.js` that properly handles nested collection items

### 2. Advanced Checkbox Behavior
- **Problem**: Need for mutually exclusive behavior between "All" and individual options
- **Solution**: Custom checkbox logic that:
  - Unchecks all individual options when "All" is selected
  - Unchecks "All" when any individual option is selected
  - Maintains filter state consistency across the UI

### 3. Dynamic Text Handling
- **Problem**: Need for proper pluralization of bathroom/bedroom counts
- **Solution**: Automatic pluralization system that:
  - Adds 's' suffix when count > 1
  - Updates dynamically as filters change
  - Maintains grammatical correctness

### 4. Accurate Counter System
- **Problem**: Limited counter functionality in Finsweet
- **Solution**: Enhanced counter system that:
  - Provides real-time count updates
  - Works with nested collections
  - Maintains accuracy across filter combinations

## Features
- **Enhanced Filtering**
  - Accommodation Type filters with proper nested collection support
  - Bedroom Count filters with pluralization
  - Funding Type filters (SIL/SDA)
- **Smart Checkbox System**
  - Intelligent "All" option behavior
  - Proper state management
  - Visual feedback for active states
- **Advanced Counter System**
  - Accurate counting for nested items
  - Real-time updates
  - Category-specific counts

## Technical Architecture

### Core Files
- `sample.html` - Main application HTML
- `accomodation-filter.js` - Enhanced filter logic and solutions

### Dependencies
- Finsweet Attributes (Base CMS functionality)
- jQuery
- Webflow

### Key Components

#### Enhanced Filter System
```javascript
// Checkbox group handling
const checkboxGroups = [
    '.bedroom-type-filter-layout',
    '.accommodation-type-filter-layout',
    '.funding-type-filter-layout'
];

// Example of mutually exclusive logic
if (isAll && this.checked) {
    // Uncheck individual options when "All" is selected
} else if (!isAll && this.checked) {
    // Uncheck "All" when individual option is selected
}
```

#### Counter Implementation
```javascript
// Dynamic counter updates
const resourceProps = [
    "accommodation-type",
    "no-of-bedroom",
    "funding-type"
];

// Counter logic for nested collections
resourceProps.forEach((prop) => {
    let totalCount = 0;
    // Custom counting logic for nested items
});
```

## Setup Instructions

1. **File Structure Setup**
   ```
   project-root/
   ├── sample.html
   ├── accomodation-filter.js
   └── README.md
   ```

2. **Dependencies Installation**
   - Install Finsweet Attributes (required as base)
   - Include jQuery
   - Configure Webflow integration

3. **HTML Structure Requirements**
   ```html
   <!-- Required class structure for checkbox groups -->
   <div class="bedroom-type-filter-layout">
     <div class="pop-out-form_card-filters">
       <!-- "All" option must be first -->
       <input type="checkbox" id="all-bedrooms">
       <!-- Individual options follow -->
     </div>
   </div>
   ```

## Usage Guidelines

### Checkbox Implementation
- Always place "All" option first in each filter group
- Maintain consistent class naming for filter layouts
- Follow the nested structure pattern for collections

### Counter Setup
- Use proper ID format for counter elements
- Follow the resource property naming convention
- Implement proper wrapper structure for nested items

## Best Practices

1. **Filter Management**
   - Follow the established checkbox group structure
   - Maintain proper nesting for collection items
   - Use consistent naming conventions

2. **Performance**
   - Utilize the built-in observer pattern
   - Avoid direct DOM manipulation where possible
   - Cache selector results

3. **Maintenance**
   - Test all checkbox combinations thoroughly
   - Verify counter accuracy with nested items
   - Document any custom implementations

## Known Issues and Solutions

1. **Nested Collection Updates**
   - Solution: Use MutationObserver for dynamic content
   - Implement proper event delegation

2. **Counter Synchronization**
   - Solution: Use centralized counter update function
   - Implement proper state management

## Contributing
When contributing to this project:
1. Test thoroughly with nested collections
2. Verify checkbox behavior across all filter groups
3. Ensure counter accuracy with various combinations
4. Document any workarounds for Finsweet limitations

