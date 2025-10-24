# Stock & Mouvements API Integration - Completed ✅

## Overview

Successfully integrated Stock (Articles) and Stock Movements with Django backend at `http://127.0.0.1:8000/api`.

---

## 🎯 What Was Done

### 1. **Services Created** ✅

#### `src/services/articlesService.js`

- **Endpoint**: `/api/stock/articles/`
- **Methods**: `getAll()`, `getById()`, `create()`, `update()`, `partialUpdate()`, `delete()`, `uploadImage()`
- **Field Mapping**:
  - Backend → Frontend: `quantite_actuelle` → `quantiteActuelle`, `prix_achat` → `prixAchat`, `prix_vente` → `prixVente`, `seuil_minimum` → `seuilMinimum`, `fournisseur_id` → `fournisseurId`
  - Frontend → Backend: Reverse mapping in denormalize function

#### `src/services/mouvementsService.js`

- **Endpoint**: `/api/stock/mouvements/`
- **Methods**: `getAll()`, `getById()`, `createEntry()`, `createExit()`, `create()`, `delete()`, `getByArticle()`
- **Field Mapping**:
  - Backend → Frontend: `type_mouvement` → `typeMouvement`
  - Movement types: `"entrée"` (stock in) and `"sortie"` (stock out)

---

### 2. **Hooks Created** ✅

#### `src/features/stock/hooks/useArticles.js`

State management hook for articles with functions:

- `fetchArticles()` - Reload articles from backend
- `addArticle(payload)` - Create new article
- `updateArticle(id, payload)` - Full update (PUT)
- `partialUpdateArticle(id, payload)` - Partial update (PATCH)
- `deleteArticle(id)` - Delete article
- `uploadImage(id, imageFile)` - Upload article image
- `getArticleById(id)` - Fetch single article

Returns: `{ articles, loading, error, ...functions }`

#### `src/features/stock/hooks/useMouvements.js`

State management hook for stock movements with functions:

- `fetchMouvements()` - Reload movements from backend
- `addEntry(articleId, quantite, remarque)` - Add stock (entrée)
- `addExit(articleId, quantite, remarque)` - Remove stock (sortie)
- `createMouvement(payload)` - Generic create
- `deleteMouvement(id)` - Delete movement
- `getMouvementsByArticle(articleId)` - Get movements for specific article
- `getMouvementById(id)` - Fetch single movement

Returns: `{ mouvements, loading, error, ...functions }`

---

### 3. **Updated Existing Hooks** ✅

#### `src/features/stock/hooks/useStock.js`

- **`useStock()`**: Now uses `useArticles()` internally for backward compatibility
- **`useStockStats()`**: Calculates stats from real articles data:
  - `total`: Total number of articles
  - `outOfStock`: Articles with quantity = 0
  - `lowStock`: Articles with quantity ≤ threshold
  - `totalValue`: Sum of (quantity × purchase price)
  - `inStock`: Articles with quantity > threshold

---

### 4. **Updated Components** ✅

#### `src/features/stock/components/AddProductForm.jsx`

- ✅ Removed old fields: `categorie`, `uniteMesure`, `imageUrl`
- ✅ Added required backend fields: `quantiteActuelle`, `seuilMinimum`, `fournisseurId`
- ✅ Integrated fournisseurs dropdown (loads from backend)
- ✅ Updated field names to match API (camelCase)
- ✅ Added error handling display
- ✅ Calculates: margin, margin rate, stock value
- ✅ Proper form validation and reset after save

---

## 📋 Backend Field Specifications

### Articles Fields

| Field               | Type    | Required | Description                            |
| ------------------- | ------- | -------- | -------------------------------------- |
| `reference`         | string  | ✅       | Product reference/SKU (max 100 chars)  |
| `nom`               | string  | ✅       | Product name (max 255 chars)           |
| `description`       | text    | ❌       | Product description                    |
| `quantite_actuelle` | integer | ✅       | Current stock quantity (default: 0)    |
| `prix_achat`        | decimal | ✅       | Purchase price (10 digits, 2 decimals) |
| `prix_vente`        | decimal | ✅       | Selling price (10 digits, 2 decimals)  |
| `seuil_minimum`     | integer | ✅       | Minimum stock threshold (default: 0)   |
| `image`             | file    | ❌       | Product image                          |
| `fournisseur_id`    | integer | ❌       | Supplier ID                            |

### Stock Movements Fields

| Field            | Type     | Required | Choices            | Description              |
| ---------------- | -------- | -------- | ------------------ | ------------------------ |
| `type_mouvement` | string   | ✅       | "entrée", "sortie" | Movement type            |
| `quantite`       | integer  | ✅       | Positive only      | Quantity moved           |
| `remarque`       | text     | ❌       | -                  | Movement notes/reason    |
| `article`        | integer  | ✅       | -                  | Article ID               |
| `date`           | datetime | ❌       | -                  | Auto-generated timestamp |

---

## 🚀 How to Use

### Adding an Article

```javascript
import { useArticles } from "@/features/stock/hooks/useArticles";

function MyComponent() {
  const { articles, addArticle, loading, error } = useArticles();

  const handleAdd = async () => {
    const result = await addArticle({
      reference: "ART001",
      nom: "Product Name",
      description: "Description",
      quantiteActuelle: 100,
      prixAchat: 50.0,
      prixVente: 75.0,
      seuilMinimum: 10,
      fournisseurId: 1, // Optional
    });

    if (result.success) {
      console.log("Article added:", result.data);
    } else {
      console.error("Error:", result.error);
    }
  };

  return (
    <div>
      {articles.map((article) => (
        <div key={article.id}>{article.nom}</div>
      ))}
    </div>
  );
}
```

### Adding Stock Movement (Entry)

```javascript
import { useMouvements } from "@/features/stock/hooks/useMouvements";

function StockEntry() {
  const { addEntry, loading, error } = useMouvements();

  const handleEntry = async () => {
    const result = await addEntry(
      1, // articleId
      50, // quantity
      "Réception commande n°123" // remarque (optional)
    );

    if (result.success) {
      console.log("Stock added:", result.data);
    }
  };

  return <button onClick={handleEntry}>Add Stock</button>;
}
```

### Adding Stock Movement (Exit)

```javascript
const { addExit } = useMouvements();

const result = await addExit(
  1, // articleId
  20, // quantity
  "Vente client" // remarque
);
```

---

## ⚠️ Important Notes

1. **Backend URL**: Currently hardcoded to `http://127.0.0.1:8000/api` in both services
2. **CORS**: Ensure Django backend has CORS configured for `http://localhost:5173`
3. **Stock Quantity**: Backend automatically updates `quantite_actuelle` when movements are created
4. **Delete Movement**: ⚠️ Deleting a movement does NOT reverse the stock quantity change in backend
5. **Authentication**: Currently no auth token is sent (AllowAny permission on backend)

---

## 🧪 Testing Checklist

### Articles (Stock)

- [ ] Fetch all articles from backend
- [ ] Add new article with all fields
- [ ] Add article with fournisseur selected
- [ ] Add article without fournisseur (optional field)
- [ ] Update existing article
- [ ] Delete article
- [ ] View article details
- [ ] Calculate stock statistics correctly

### Stock Movements

- [ ] Fetch all movements from backend
- [ ] Create stock entry (entrée)
- [ ] Create stock exit (sortie)
- [ ] Verify article quantity updates after movement
- [ ] View movement history by article
- [ ] Delete movement

### Integration

- [ ] Fournisseurs dropdown loads in AddProductForm
- [ ] Article shows fournisseur details if assigned
- [ ] Stats calculate correctly (total, low stock, out of stock)
- [ ] Error messages display properly
- [ ] Loading states work correctly

---

## 📁 Files Modified/Created

### Created:

- `src/services/articlesService.js`
- `src/services/mouvementsService.js`
- `src/features/stock/hooks/useArticles.js`
- `src/features/stock/hooks/useMouvements.js`
- `STOCK_API_INTEGRATION.md` (this file)

### Modified:

- `src/features/stock/hooks/useStock.js` - Now uses `useArticles()` internally
- `src/features/stock/components/AddProductForm.jsx` - Updated fields and fournisseur integration
- `src/features/stock/pages/Stock.jsx` - Already compatible (uses hooks)

---

## 🔄 Next Steps (Optional)

1. **Add Mouvements Page**: Create UI to view/manage stock movements
2. **Movement History Modal**: Show movement history in article detail modal
3. **Bulk Operations**: Import multiple articles from CSV/Excel
4. **Low Stock Alerts**: Display warnings for articles below threshold
5. **Stock Valuation Report**: Generate reports on stock value
6. **Image Upload**: Implement image upload functionality
7. **Categories**: Add category management if needed
8. **Authentication**: Add JWT token to API requests when auth is implemented

---

## ✅ Status: READY FOR TESTING

All services, hooks, and components are integrated and ready to test with Django backend running at `http://127.0.0.1:8000`.
