# Charges Feature

Gestion des charges de l'entreprise avec 4 types distincts.

## Structure

```
src/features/charges/
├── pages/
│   ├── ChargesApercu.jsx (overview of all charges)
│   ├── ChargesFournisseurs.jsx (supplier charges: HT/TVA/TTC)
│   ├── ChargesSalariales.jsx (payroll: salaries, CNSS, primes)
│   └── ChargesFixe.jsx (fixed costs: rent, utilities, internet)
├── components/
│   ├── Stats/ (stats cards for each page)
│   ├── Tables/ (data tables for each type)
│   └── Modals/ (add/edit modals)
├── hooks/
│   └── useCharges.js (data management)
├── services/
│   ├── chargesService.js (API/mock toggle)
│   └── chargesMockData.js (mock data for development)
└── utils/
    ├── constants.js (statuses, sort options, types)
    └── helpers.js (filters, sorts, generators)
```

## Pages

### 1. ChargesApercu (`/charges`)

- Overview dashboard with stats for all charge types
- Aggregated view of all charges
- Quick filters by type

### 2. ChargesFournisseurs (`/charges/fournisseurs`)

- **Fields**: Libellé, Montant HT/TVA/TTC, Échéance, Mode de paiement, Statut (Payé/En attente)
- **Stats**: Total HT, Total TTC, Payées, En attente
- **Features**: Search, filter by status, sort, add/edit/delete

### 3. ChargesSalariales (`/charges/salariales`)

- **Fields**: Employé, Mois, Salaire net, CNSS, Primes, Autres, Total TTC
- **Stats**: Total Net, Total CNSS, Total Primes, Total TTC
- **Features**: Search by employee, filter by month, sort

### 4. ChargesFixe (`/charges/fixes`)

- **Fields**: Type (Loyer/Électricité/Eau/Internet/Autres), Période, Montant HT/TVA/TTC, Mode, Statut (Payé/En attente)
- **Stats**: Total HT, Total TTC, Payées, En attente
- **Features**: Search, filter by type, recurring charges support

## Design Pattern

All pages follow the Stock/Aperçu design:

- Header with title/subtitle + action buttons
- 4 stats cards (responsive grid)
- List section with search/filters
- Empty states with icons
- Same color scheme and spacing

## Next Steps

1. **Data Layer**
   - Define models in `services/chargesMockData.js`
   - Implement CRUD in `services/chargesService.js`
   - Create hooks in `hooks/useCharges.js`

2. **UI Components**
   - Build Stats components for each page
   - Build Table components with loading/empty states
   - Create Add/Edit modals for each type

3. **Features**
   - Payment tracking and échéancier
   - Recurring charges (for fixed costs)
   - Export to PDF/Excel
   - Backend integration

## Routes

- `/charges` → ChargesApercu
- `/charges/fournisseurs` → ChargesFournisseurs
- `/charges/salariales` → ChargesSalariales
- `/charges/fixes` → ChargesFixe

Sidebar menu is enabled with 4 sub-items.
