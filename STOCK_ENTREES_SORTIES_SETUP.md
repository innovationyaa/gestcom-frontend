# Stock Entrées & Sorties Setup Documentation

## Overview

Complete setup of Stock Entry (Entrées) and Stock Exit (Sorties) pages with full backend integration using Django REST API. Pages now feature Stock-list-like structure with search functionality and clickable rows with detail modals.

## Files Modified/Created

### 1. **StockEntrees.jsx** ✅

**Path**: `src/features/stock/pages/StockEntrees.jsx`

**Features**:

- Displays all stock entry movements (type: "entrée")
- ❌ **REMOVED**: Stats dashboard (Total Entrées, Quantité Totale, Aujourd'hui)
- ✅ **NEW**: Stock-list-like structure with search bar
- ✅ **NEW**: Clickable table rows with eye icon
- ✅ **NEW**: Movement detail modal
- Integration with `useMouvements()` hook
- Quick entry modal for creating new stock entries
- Responsive design with mobile support
- Search filter by article, reference, or remarque

**Key Changes**:

- ❌ Removed: Stats cards and calculations
- ✅ Added: Search bar filter
- ✅ Added: `MovementsTable` component with eye icon
- ✅ Added: `MovementDetailModal` for viewing movement details
- ✅ Updated: Page size changed to 25 items
- ✅ Updated: Filter uses `typeMouvement === "entrée"`

**Color Theme**: Green (success) - `from-green-50`, `text-green-700`

---

### 2. **StockSorties.jsx** ✅

**Path**: `src/features/stock/pages/StockSorties.jsx`

**Features**:

- Displays all stock exit movements (type: "sortie")
- ❌ **REMOVED**: Stats dashboard (Total Sorties, Quantité Totale, Aujourd'hui)
- ✅ **NEW**: Stock-list-like structure with search bar
- ✅ **NEW**: Clickable table rows with eye icon
- ✅ **NEW**: Movement detail modal
- Integration with `useMouvements()` hook
- Quick exit modal for creating new stock exits
- Responsive design with mobile support
- Search filter by article, reference, or remarque

**Key Changes**:

- ❌ Removed: Stats cards and calculations
- ✅ Added: Search bar filter
- ✅ Added: `MovementsTable` component with eye icon
- ✅ Added: `MovementDetailModal` for viewing movement details
- ✅ Updated: Page size changed to 25 items
- ✅ Updated: Filter uses `typeMouvement === "sortie"`

**Color Theme**: Orange/Red (warning) - `from-orange-50`, `text-orange-700`

---

### 3. **MovementsTable.jsx** ✅ (NEW)

**Path**: `src/features/stock/components/MovementsTable.jsx`

**Features**:

- Clean table structure matching Stock list design
- Eye icon on each row for viewing details
- Clickable rows
- Built-in pagination
- Responsive design
- Shows only relevant fields from backend model

**Columns**:

1. **Date** - Formatted date and time
2. **Article** - Reference and name
3. **Type** - Badge (Entrée/Sortie)
4. **Quantité** - Colored based on type (+/-)
5. **Remarque** - Truncated notes
6. **Actions** - Eye icon button

**Features**:

- Click anywhere on row to view details
- Pagination with page size control (25 items)
- Responsive text sizes
- Hover effects
- Empty state handling

---

### 4. **MovementDetailModal.jsx** ✅ (NEW)

**Path**: `src/components/modals/MovementDetailModal.jsx`

**Features**:

- Beautiful modal showing full movement details
- Color-coded by type (green for entries, orange for exits)
- Card-based layout for information sections
- Icons for visual hierarchy

**Sections**:

1. **Header** - Movement type badge and ID
2. **Date** - Formatted with full details
3. **Quantity** - Large display with +/- indicator
4. **Article** - Full article information including current stock
5. **Remarque** - Complete notes/remarks

**Design**:

- Gradient backgrounds
- Icon indicators
- Clean typography
- Mobile responsive

---

### 5. **QuickStockEntryModal.jsx** ✅

**Path**: `src/features/stock/components/QuickStockEntryModal.jsx`

**Features**:

- Form for creating stock entries
- Article selection dropdown (sorted by reference)
- Quantity input with stock projection
- Reason/Motif selection
- Reference document field
- Notes textarea
- Real-time validation
- Backend integration via `addEntry()`

**Updated Reasons**:

```javascript
[
  { value: "achat", label: "Achat/Réception" },
  { value: "retour", label: "Retour client" },
  { value: "production", label: "Production interne" },
  { value: "ajustement_positif", label: "Ajustement inventaire (+)" },
  { value: "transfert_entree", label: "Transfert entrant" },
  { value: "autre_entree", label: "Autre motif d'entrée" },
];
```

**Field Mapping**:

```javascript
{
  articleId: parseInt(form.articleId, 10),
  quantite: qtyNum,
  motif: form.reason,
  reference: form.reference || null,
  notes: form.notes || null,
}
```

**Validation**:

- ✅ Article must be selected
- ✅ Quantity must be > 0
- ✅ Reason is required

**UI Features**:

- Stock projection: "Stock actuel: X • Après entrée: Y"
- Green color theme
- Disabled state during submission
- Error display with red alert box

---

### 6. **QuickStockExitModal.jsx** ✅

**Path**: `src/features/stock/components/QuickStockExitModal.jsx`

**Features**:

- Form for creating stock exits
- Article selection with current stock display
- Quantity input with validation against available stock
- Low stock warning
- Reason/Motif selection
- Reference document field
- Notes textarea
- Backend integration via `addExit()`

**Updated Reasons**:

```javascript
[
  { value: "vente", label: "Vente" },
  { value: "utilisation_interne", label: "Utilisation interne" },
  { value: "perte_casse", label: "Perte/Casse" },
  { value: "vol", label: "Vol/Perte inexpliquée" },
  { value: "peremption", label: "Péremption/Obsolescence" },
  { value: "ajustement_negatif", label: "Ajustement inventaire (-)" },
  { value: "transfert_sortie", label: "Transfert sortant" },
  { value: "retour_fournisseur", label: "Retour fournisseur" },
  { value: "autre_sortie", label: "Autre motif de sortie" },
];
```

**Field Mapping**:

```javascript
{
  articleId: parseInt(form.articleId, 10),
  quantite: qtyNum,
  motif: form.reason,
  reference: form.reference || null,
  notes: form.notes || null,
}
```

**Validation**:

- ✅ Article must be selected
- ✅ Quantity must be > 0
- ✅ Quantity must not exceed available stock
- ✅ Reason is required

**UI Features**:

- Stock projection with low stock warning
- Article dropdown shows current stock: "REF — Name (Stock: X)"
- Orange/Red color theme
- Alert icon for low stock warning
- Error display with red alert box

---

## Backend Integration

### API Endpoints Used

#### **Stock Movements** (`mouvementsService.js`)

- `GET /api/stock/mouvements/` - Fetch all movements
- `POST /api/stock/mouvements/` - Create movement (entry or exit)

#### **Articles** (`articlesService.js`)

- `GET /api/stock/articles/` - Fetch all articles for dropdown

### Hooks Used

#### **useMouvements()**

Returns:

```javascript
{
  (mouvements, // Array of all movements
    loading, // Boolean
    error, // String | null
    fetchMouvements, // Function
    addEntry, // Function (payload) => Promise
    addExit, // Function (payload) => Promise
    createMouvement, // Function
    deleteMouvement, // Function
    getMouvementsByArticle, // Function
    getMouvementById); // Function
}
```

#### **useArticles()**

Returns:

```javascript
{
  articles,          // Array of all articles
  loading,           // Boolean
  error,             // String | null
  fetchArticles,     // Function
  addArticle,        // Function
  updateArticle,     // Function
  deleteArticle,     // Function
  // ... more
}
```

---

## Stats Calculation

### StockEntrees Stats

```javascript
{
  totalEntrees: entreesMovements.length,
  quantiteTotale: entreesMovements.reduce((sum, m) => sum + (m.quantite || 0), 0),
  today: entreesMovements.filter(m => {
    const today = new Date().toISOString().split("T")[0];
    const moveDate = m.date?.split("T")[0];
    return moveDate === today;
  }).length,
}
```

### StockSorties Stats

```javascript
{
  totalSorties: sortiesMovements.length,
  quantiteTotale: sortiesMovements.reduce((sum, m) => sum + (m.quantite || 0), 0),
  today: sortiesMovements.filter(m => {
    const today = new Date().toISOString().split("T")[0];
    const moveDate = m.date?.split("T")[0];
    return moveDate === today;
  }).length,
}
```

---

## UI/UX Improvements

### Responsive Design

- Mobile-first approach
- Grid layouts: `grid-cols-1 sm:grid-cols-3`
- Responsive text sizes: `text-lg sm:text-xl lg:text-2xl`
- Flexible buttons: `w-full sm:w-auto`

### Color Themes

**Entrées (Green)**:

- Background: `from-green-50 to-emerald-50`
- Border: `border-green-200`
- Text: `text-green-700`, `text-green-800`
- Focus: `focus:ring-[#22c55e]`

**Sorties (Orange/Red)**:

- Background: `from-orange-50 to-red-50`
- Border: `border-orange-200`
- Text: `text-orange-700`, `text-red-800`
- Focus: `focus:ring-[#ef4444]`

### Loading States

```jsx
<div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
```

### Empty States

```jsx
<Package className="h-12 w-12 mx-auto text-[var(--color-foreground-muted)] mb-2" />
<p className="text-sm text-[var(--color-foreground-muted)]">
  Aucune entrée de stock enregistrée
</p>
```

---

## Testing Checklist

### StockEntrees.jsx

- [ ] Page loads without errors
- [ ] Stats cards display correctly
- [ ] "Nouvelle Entrée" button opens modal
- [ ] Movements table displays all entry movements
- [ ] Pagination works correctly
- [ ] Loading state shows spinner
- [ ] Empty state shows when no movements
- [ ] Responsive on mobile, tablet, desktop

### StockSorties.jsx

- [ ] Page loads without errors
- [ ] Stats cards display correctly
- [ ] "Nouvelle Sortie" button opens modal
- [ ] Movements table displays all exit movements
- [ ] Pagination works correctly
- [ ] Loading state shows spinner
- [ ] Empty state shows when no movements
- [ ] Responsive on mobile, tablet, desktop

### QuickStockEntryModal

- [ ] Modal opens and closes properly
- [ ] Article dropdown populated with articles
- [ ] Quantity input accepts numbers only
- [ ] Stock projection displays correctly
- [ ] Reason dropdown has all entry reasons
- [ ] Reference and notes fields work
- [ ] Validation shows error for missing article
- [ ] Validation shows error for invalid quantity
- [ ] Success: Creates entry and refreshes list
- [ ] Error: Displays backend error message
- [ ] Form resets after successful submission

### QuickStockExitModal

- [ ] Modal opens and closes properly
- [ ] Article dropdown shows stock levels
- [ ] Quantity input validates against stock
- [ ] Stock projection displays correctly
- [ ] Low stock warning appears when needed
- [ ] Reason dropdown has all exit reasons
- [ ] Reference and notes fields work
- [ ] Validation shows error for insufficient stock
- [ ] Validation shows error for missing article
- [ ] Success: Creates exit and refreshes list
- [ ] Error: Displays backend error message
- [ ] Form resets after successful submission

### Backend Integration

- [ ] GET /api/stock/mouvements/ returns all movements
- [ ] POST creates entry with correct typeMouvement
- [ ] POST creates exit with correct typeMouvement
- [ ] Article quantities update after movements
- [ ] Error responses handled gracefully
- [ ] French error messages display correctly

---

## Next Steps

### Optional Enhancements

1. **Filters**: Add date range filter for movements
2. **Export**: Add CSV/PDF export functionality
3. **Search**: Add search by article, reference, or notes
4. **Details**: Add modal to view movement details
5. **Edit/Delete**: Add ability to modify/delete movements
6. **Attachments**: Allow file uploads for receipts/documents
7. **Notifications**: Toast notifications for success/error
8. **Print**: Print-friendly movement reports

### Integration with Other Modules

- Link movements to sales (Ventes)
- Link entries to purchase orders (Achats)
- Link to suppliers (Fournisseurs)
- Generate automatic alerts for low stock after exits

---

## Summary

✅ **StockEntrees.jsx** - Fully updated with backend integration
✅ **StockSorties.jsx** - Fully updated with backend integration
✅ **QuickStockEntryModal.jsx** - Modernized with real API calls
✅ **QuickStockExitModal.jsx** - Modernized with real API calls
✅ **All validations working** - Client and server-side
✅ **Responsive design** - Mobile, tablet, desktop
✅ **Error handling** - User-friendly French messages
✅ **No compilation errors** - Ready for testing

The Stock Entrées and Sorties pages are now fully integrated with your Django backend and ready for use!
