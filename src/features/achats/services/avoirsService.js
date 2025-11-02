// filepath: src/features/achats/services/avoirsService.js
import api from "@/services/api";
import {
  mockAvoirs,
  simulateDelay,
  calculateAvoirStats,
  ACHATS_USE_MOCK,
} from "./mockData";

const USE_MOCK_DATA = ACHATS_USE_MOCK;

const avoirsService = {
  async getAll() {
    if (USE_MOCK_DATA) {
      await simulateDelay(300);
      return { success: true, data: [...mockAvoirs] };
    }
    const res = await api.get("/avoirs");
    return { success: true, data: res.data };
  },

  async getById(id) {
    if (USE_MOCK_DATA) {
      await simulateDelay(200);
      const item = mockAvoirs.find((x) => x.id === id);
      return item
        ? { success: true, data: item }
        : { success: false, error: "Not found" };
    }
    const res = await api.get(`/avoirs/${id}`);
    return { success: true, data: res.data };
  },

  async create(payload) {
    if (USE_MOCK_DATA) {
      await simulateDelay(400);
      const id = `a${Date.now()}`;
      const newItem = { id, status: "en attente", ...payload };
      mockAvoirs.unshift(newItem);
      return { success: true, data: newItem };
    }
    const res = await api.post("/avoirs", payload);
    return { success: true, data: res.data };
  },

  async update(id, payload) {
    if (USE_MOCK_DATA) {
      await simulateDelay(300);
      const idx = mockAvoirs.findIndex((x) => x.id === id);
      if (idx === -1) return { success: false, error: "Not found" };
      mockAvoirs[idx] = { ...mockAvoirs[idx], ...payload };
      return { success: true, data: mockAvoirs[idx] };
    }
    const res = await api.put(`/avoirs/${id}`, payload);
    return { success: true, data: res.data };
  },

  async remove(id) {
    if (USE_MOCK_DATA) {
      await simulateDelay(250);
      const idx = mockAvoirs.findIndex((x) => x.id === id);
      if (idx === -1) return { success: false, error: "Not found" };
      mockAvoirs.splice(idx, 1);
      return { success: true };
    }
    await api.delete(`/avoirs/${id}`);
    return { success: true };
  },

  async getStats() {
    if (USE_MOCK_DATA) {
      await simulateDelay(200);
      return { success: true, data: calculateAvoirStats(mockAvoirs) };
    }
    const res = await api.get("/avoirs/stats");
    return { success: true, data: res.data };
  },
};

export default avoirsService;
