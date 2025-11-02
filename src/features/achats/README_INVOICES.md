# Achats > Factures d'Achat

This module mirrors the Réceptions page patterns: service layer → hooks → components → page.

## Features

- List invoices with payment tracking
- Stats: total, paid, pending, overdue
- Columns: N° Facture, Date, Fournisseur, Total TTC, Échéance, Règlement, BL liés, Statut
- Payment status badges
- Create invoice by linking 1..n BLs (mock placeholder)

## Files

- Page: `pages/Factures.jsx`
- Components: `components/InvoiceStats.jsx`, `components/InvoiceTable.jsx`
- Hooks: `hooks/useInvoices.js`
- Services: `services/invoicesService.js`, `services/invoicesMockData.js`

## Mock

- Toggle with `USE_MOCK_DATA` in `services/invoicesService.js`
- Edit `services/invoicesMockData.js` to adjust seed data

## Next steps

- Implement AddInvoiceForm: select BL(s), due date, payment method
- Implement InvoiceDetailModal: payments timeline, BL list
- Export: PDF/Excel
- Toast notifications
