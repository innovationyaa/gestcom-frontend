import centralDataService from '@/services/centralDataService'

export class StockService {
  static async getAllStock() {
    return await centralDataService.getStock()
  }

  static async getStockById(id) {
    return await centralDataService.getStockById(id)
  }

  static async getStockByCategory(categorie) {
    const stock = await centralDataService.getStock()
    return stock.filter(item => item.categorie === categorie)
  }

  static async getOutOfStock() {
    const stock = await centralDataService.getStock()
    return stock.filter(item => item.quantite === 0)
  }

  static async getLowStock() {
    const stock = await centralDataService.getStock()
    return stock.filter(item => item.quantite <= item.seuilMinimum && item.quantite > 0)
  }

  static async searchStock(query) {
    const stock = await centralDataService.getStock()
    const lowerQuery = query.toLowerCase()
    return stock.filter(item =>
      item.nom.toLowerCase().includes(lowerQuery) ||
      item.reference.toLowerCase().includes(lowerQuery) ||
      item.categorie.toLowerCase().includes(lowerQuery) ||
      item.fournisseur.toLowerCase().includes(lowerQuery)
    )
  }

  static async addStockItem(newItem) {
    return await centralDataService.addStockItem(newItem)
  }

  static async updateStockItem(id, updatedData) {
    // This would need to be implemented in centralDataService
    const stock = await centralDataService.getStock()
    const index = stock.findIndex(item => item.id === id)
    if (index === -1) throw new Error('Stock item not found')
    
    stock[index] = { ...stock[index], ...updatedData, dateModification: new Date().toISOString().split('T')[0] }
    return stock[index]
  }

  static async deleteStockItem(id) {
    // This would need to be implemented in centralDataService
    const stock = await centralDataService.getStock()
    const index = stock.findIndex(item => item.id === id)
    if (index === -1) throw new Error('Stock item not found')
    
    return stock.splice(index, 1)[0]
  }

  static async getStockStats() {
    return await centralDataService.getStockStats()
  }
}
