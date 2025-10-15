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

  static async getStockStats() {
    return await centralDataService.getStockStats()
  }
}
