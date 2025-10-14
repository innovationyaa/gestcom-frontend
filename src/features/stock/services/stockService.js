import stockData from './stock.json'

export class StockService {
  static async getAllStock() {
    // Simuler une latence réseau
    await new Promise(resolve => setTimeout(resolve, 500))
    return stockData
  }

  static async getStockById(id) {
    await new Promise(resolve => setTimeout(resolve, 300))
    return stockData.find(item => item.id === id)
  }

  static async getStockByCategory(categorie) {
    await new Promise(resolve => setTimeout(resolve, 400))
    return stockData.filter(item => item.categorie === categorie)
  }

  static async getOutOfStock() {
    await new Promise(resolve => setTimeout(resolve, 300))
    return stockData.filter(item => item.quantite === 0)
  }

  static async getLowStock() {
    await new Promise(resolve => setTimeout(resolve, 400))
    return stockData.filter(item => item.quantite <= item.seuilMinimum && item.quantite > 0)
  }

  static async searchStock(query) {
    await new Promise(resolve => setTimeout(resolve, 400))
    const lowerQuery = query.toLowerCase()
    return stockData.filter(item =>
      item.nom.toLowerCase().includes(lowerQuery) ||
      item.reference.toLowerCase().includes(lowerQuery) ||
      item.categorie.toLowerCase().includes(lowerQuery) ||
      item.fournisseur.toLowerCase().includes(lowerQuery)
    )
  }

  static async addStockItem(newItem) {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Generate a new ID (simple increment for demo, in a real app this would be handled by a backend)
    const newId = Math.max(0, ...stockData.map(item => item.id)) + 1;
    
    // Create the new item with generated ID and current date
    const itemToAdd = {
      ...newItem,
      id: newId,
      dateCreation: new Date().toISOString().split('T')[0],
      dateModification: new Date().toISOString().split('T')[0]
    };
    
    // Add to the array (in a real app, this would be an API call)
    stockData.unshift(itemToAdd);
    
    return itemToAdd;
  }

  static async getStockStats() {
    await new Promise(resolve => setTimeout(resolve, 600))
    const total = stockData.length
    const outOfStock = stockData.filter(item => item.quantite === 0).length
    const lowStock = stockData.filter(item => item.quantite <= item.seuilMinimum && item.quantite > 0).length
    const totalValue = stockData.reduce((acc, item) => acc + (item.quantite * item.prixAchat), 0)

    return {
      total,
      outOfStock,
      lowStock,
      totalValue,
      inStock: total - outOfStock - lowStock
    }
  }
}
