# Fournisseurs Feature Documentation

## Overview

The Fournisseurs feature provides a comprehensive supplier management system for the GestCom application. It follows the established design system and maintains consistency with other features like Stock, Achats, and Dashboard.

## Feature Structure

```
src/features/fournisseurs/
├── components/
│   ├── AddFournisseurForm.jsx     # Form for adding new suppliers
│   └── FournisseursStats.jsx      # Statistics cards display
├── hooks/
│   └── useFournisseurs.js         # Main data management hook
├── pages/
│   └── Fournisseurs.jsx           # Main suppliers management page
├── services/
│   ├── fournisseurs.json          # Mock data
│   └── fournisseursService.js     # API service layer
└── utils/
    ├── constants.js               # Constants and enums
    ├── fournisseursHelpers.js     # Utility functions
    └── index.js                   # Utils exports
```

## Key Features

### 1. Supplier Management

- **View All Suppliers**: Comprehensive table with pagination and sorting
- **Add New Supplier**: Modal form with validation
- **Edit Supplier**: Update existing supplier information
- **Delete Supplier**: Remove suppliers with confirmation
- **Search & Filter**: Real-time search and status/type filtering

### 2. Statistics Dashboard

- **Total Suppliers**: Count of all registered suppliers
- **Active Suppliers**: Count and percentage of active suppliers
- **Inactive/Suspended**: Combined count of non-active suppliers
- **Revenue**: Total transaction value across all suppliers

### 3. Data Management

- **Real-time Updates**: Live data synchronization
- **Form Validation**: Comprehensive client-side validation
- **Error Handling**: User-friendly error messages
- **Loading States**: Loading indicators during operations

## Components

### FournisseursStats

Statistics cards following the design system pattern:

- Uses Card components from shadcn/ui
- Color-coded by data type
- Responsive grid layout
- Loading skeletons

### AddFournisseurForm

Modal form for adding suppliers:

- Dynamic validation based on supplier type
- Required fields for enterprises (SIRET)
- Optional fields handling
- Form reset and error management

### Fournisseurs (Main Page)

Complete supplier management interface:

- Header with page title and actions
- Statistics section
- Search and filter bar
- Data table with actions
- Consistent layout following design system

## Data Models

### Supplier Object

```javascript
{
  id: number,
  nom: string,
  email: string,
  telephone: string,
  adresse: string,
  codePostal: string,
  ville: string,
  pays: string,
  type: 'entreprise' | 'particulier' | 'association',
  statut: 'actif' | 'inactif' | 'suspendu',
  siret: string | null,
  siteweb: string | null,
  dateCreation: string,
  derniereCommande: string | null,
  totalCommandes: number,
  chiffreAffaires: number
}
```

### Statistics Object

```javascript
{
  total: number,
  actifs: number,
  inactifs: number,
  suspendus: number,
  totalChiffreAffaires: number
}
```

## API Services

### FournisseursService

- `getAllFournisseurs()`: Fetch all suppliers
- `getFournisseurById(id)`: Get supplier by ID
- `getFournisseursByType(type)`: Filter by type
- `getFournisseursByStatus(status)`: Filter by status
- `searchFournisseurs(query)`: Search functionality
- `addFournisseur(data)`: Create new supplier
- `updateFournisseur(id, data)`: Update existing supplier
- `deleteFournisseur(id)`: Remove supplier
- `getStats()`: Get statistics

## Hooks

### useFournisseurs

Main data management hook providing:

- State management for suppliers and stats
- CRUD operations
- Loading and error states
- Data refresh functionality

## Validation Rules

### Required Fields

- **All Types**: nom, email, telephone, adresse, ville, codePostal
- **Entreprise**: siret (additional requirement)

### Format Validation

- **Email**: Standard email format
- **Phone**: French phone number format
- **SIRET**: 14-digit format for enterprises
- **Website**: Valid URL format (optional)

## Styling & Design

### Design System Compliance

- Uses CSS variables for consistent theming
- Follows established color patterns
- Consistent spacing and typography
- Responsive design patterns

### Color Coding

- **Success/Active**: Green variants
- **Warning/Inactive**: Orange variants
- **Error/Suspended**: Red variants
- **Info/General**: Blue variants

## Navigation

### Routing

- Main page: `/fournisseurs`
- Accessible from sidebar: "Fournisseurs" item
- Also available in "Achats" submenu

### Breadcrumbs

- Dashboard > Fournisseurs
- Future: Supplier detail pages

## Integration Points

### Sidebar Navigation

- Standalone "Fournisseurs" menu item
- Also nested under "Achats" section
- Uses Truck icon for visual identification

### Design System

- Follows `generaldesign.md` specifications
- Uses established component patterns
- Maintains visual consistency

## Testing

### Manual Testing Checklist

- [ ] Page loads without errors
- [ ] Statistics display correctly
- [ ] Search functionality works
- [ ] Filters apply correctly
- [ ] Add form opens and validates
- [ ] Form submission works
- [ ] Data persists after refresh
- [ ] Error states display properly
- [ ] Loading states show during operations

### Test Data

Mock data includes 8 suppliers with various:

- Types: entreprise, particulier, association
- Statuses: actif, inactif, suspendu
- Complete contact information
- Transaction history

## Future Enhancements

### Planned Features

1. **Supplier Detail Pages**: Individual supplier profiles
2. **Edit Forms**: Inline editing capabilities
3. **Import/Export**: CSV/Excel data exchange
4. **Advanced Filters**: Date ranges, transaction amounts
5. **Bulk Operations**: Multiple supplier management
6. **Contact History**: Communication tracking
7. **Document Management**: Contract and invoice storage

### Performance Optimizations

1. **Pagination**: Handle large supplier lists
2. **Virtual Scrolling**: For extensive data sets
3. **Caching**: Reduce API calls
4. **Debounced Search**: Optimize search performance

## Dependencies

### External Libraries

- React Router for navigation
- Lucide React for icons
- shadcn/ui component library
- Tailwind CSS for styling

### Internal Dependencies

- DataTable component
- Form components (Input, Select, etc.)
- Design system utilities
- Layout components

## Deployment Notes

### Build Considerations

- All components use ES6 modules
- Lazy loading implemented for page component
- CSS variables ensure theme consistency
- No external API dependencies (uses mock data)

### Browser Support

- Modern browsers supporting ES6+
- CSS Custom Properties support required
- Responsive design for mobile devices

## Maintenance

### Code Organization

- Feature-based directory structure
- Separation of concerns
- Reusable utility functions
- Consistent naming conventions

### Update Procedures

1. Mock data updates in `fournisseurs.json`
2. Service layer changes in `fournisseursService.js`
3. UI updates following design system guidelines
4. Testing after any modifications

---

This Fournisseurs feature is now complete and fully integrated into the GestCom application, providing a robust supplier management solution that maintains consistency with the existing codebase and design system.
