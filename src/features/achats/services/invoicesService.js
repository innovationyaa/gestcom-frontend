// filepath: src/features/achats/services/invoicesService.js
import api from "@/services/api";
import {
  mockInvoices,
  simulateDelay,
  calculateInvoiceStats,
  generateNewInvoiceNumber,
  ACHATS_USE_MOCK,
} from "./mockData";

const USE_MOCK_DATA = ACHATS_USE_MOCK;

const invoicesService = {
  async getAllInvoices() {
    if (USE_MOCK_DATA) {
      await simulateDelay(500);
      return { success: true, data: [...mockInvoices] };
    }
    const res = await api.get("/invoices");
    return { success: true, data: res.data };
  },

  async getInvoiceById(id) {
    if (USE_MOCK_DATA) {
      await simulateDelay(300);
      const inv = mockInvoices.find((x) => x.id === id);
      return inv
        ? { success: true, data: inv }
        : { success: false, error: "Not found" };
    }
    const res = await api.get(`/invoices/${id}`);
    return { success: true, data: res.data };
  },

  async createInvoice(payload) {
    if (USE_MOCK_DATA) {
      await simulateDelay(600);
      const id = (mockInvoices.length + 1).toString();
      const invoiceNumber = generateNewInvoiceNumber();
      const newInv = {
        id,
        invoiceNumber,
        status: "en attente",
        payments: [],
        ...payload,
      };
      mockInvoices.unshift(newInv);
      return { success: true, data: newInv };
    }
    const res = await api.post("/invoices", payload);
    return { success: true, data: res.data };
  },

  async updateInvoice(id, payload) {
    if (USE_MOCK_DATA) {
      await simulateDelay(500);
      const idx = mockInvoices.findIndex((x) => x.id === id);
      if (idx === -1) return { success: false, error: "Not found" };
      mockInvoices[idx] = { ...mockInvoices[idx], ...payload };
      return { success: true, data: mockInvoices[idx] };
    }
    const res = await api.put(`/invoices/${id}`, payload);
    return { success: true, data: res.data };
  },

  async deleteInvoice(id) {
    if (USE_MOCK_DATA) {
      await simulateDelay(400);
      const idx = mockInvoices.findIndex((x) => x.id === id);
      if (idx === -1) return { success: false, error: "Not found" };
      mockInvoices.splice(idx, 1);
      return { success: true };
    }
    await api.delete(`/invoices/${id}`);
    return { success: true };
  },

  async recordPayment(id, amount) {
    if (USE_MOCK_DATA) {
      await simulateDelay(400);
      const inv = mockInvoices.find((x) => x.id === id);
      if (!inv) return { success: false, error: "Not found" };
      inv.payments = inv.payments || [];
      inv.payments.push({
        id: `p-${Date.now()}`,
        date: new Date().toISOString(),
        amount,
      });
      const paid = inv.payments.reduce((s, p) => s + p.amount, 0);
      if (paid >= inv.totalTTC) inv.status = "payée";
      else inv.status = paid > 0 ? "partielle" : inv.status;
      return { success: true, data: inv };
    }
    const res = await api.post(`/invoices/${id}/payments`, { amount });
    return { success: true, data: res.data };
  },

  async getInvoiceStats() {
    if (USE_MOCK_DATA) {
      await simulateDelay(300);
      return { success: true, data: calculateInvoiceStats(mockInvoices) };
    }
    const res = await api.get("/invoices/stats");
    return { success: true, data: res.data };
  },
};

export default invoicesService;
