// filepath: src/features/achats/services/testingHelpers.js
/**
 * Testing Helpers for Réceptions Feature
 *
 * Use these functions in browser console for quick testing
 *
 * Usage:
 * 1. Open browser console
 * 2. Import helpers: import * as helpers from './testingHelpers.js'
 * 3. Run test functions
 */

import {
  mockReceptions,
  mockFournisseurs,
  mockArticles,
  edgeCaseMockReceptions,
  multiTVAReceptions,
  specialScenarioReceptions,
  generateLargeMockDataset,
  getAllTestReceptions,
  TEST_CONFIG,
} from "./mockData";

// =============================================================================
// CONSOLE LOGGING HELPERS
// =============================================================================

/**
 * Display all receptions in a formatted table
 */
export const showAllReceptions = () => {
  console.log("📦 All Receptions:");
  console.table(
    mockReceptions.map((r) => ({
      BL: r.blNumber,
      Date: r.date,
      Fournisseur: r.fournisseur,
      Status: r.status,
      "Total TTC": `${r.totalTTC.toFixed(2)} MAD`,
      Lignes: r.lignes.length,
    }))
  );
};

/**
 * Display statistics
 */
export const showStatistics = () => {
  const stats = {
    total: mockReceptions.length,
    thisMonth: mockReceptions.filter((r) => {
      const date = new Date(r.date);
      const now = new Date();
      return (
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      );
    }).length,
    validé: mockReceptions.filter((r) => r.status === "validé").length,
    enAttente: mockReceptions.filter((r) => r.status === "en attente").length,
    annulé: mockReceptions.filter((r) => r.status === "annulé").length,
    totalAmount: mockReceptions.reduce((sum, r) => sum + r.totalTTC, 0),
  };

  console.log("📊 Statistics:");
  console.table(stats);
};

/**
 * Display fournisseurs
 */
export const showFournisseurs = () => {
  console.log("🏢 Fournisseurs:");
  console.table(mockFournisseurs);
};

/**
 * Display articles
 */
export const showArticles = () => {
  console.log("📦 Articles:");
  console.table(mockArticles);
};

/**
 * Display reception details by BL number
 */
export const showReceptionDetails = (blNumber) => {
  const reception = mockReceptions.find((r) => r.blNumber === blNumber);

  if (!reception) {
    console.error(`❌ Reception ${blNumber} not found`);
    return;
  }

  console.log(`\n📄 Reception: ${blNumber}`);
  console.log("─".repeat(50));
  console.log(`Date: ${reception.date}`);
  console.log(`Fournisseur: ${reception.fournisseur}`);
  console.log(`Status: ${reception.status}`);
  console.log(`Total HT: ${reception.totalHT.toFixed(2)} MAD`);
  console.log(`Total TVA: ${reception.totalTVA.toFixed(2)} MAD`);
  console.log(`Total TTC: ${reception.totalTTC.toFixed(2)} MAD`);
  console.log(`\nLignes (${reception.lignes.length}):`);
  console.table(
    reception.lignes.map((l) => ({
      Article: l.article,
      Qté: l.qte,
      "PU HT": `${l.puHT.toFixed(2)} MAD`,
      TVA: `${l.tva}%`,
      "Total HT": `${(l.qte * l.puHT).toFixed(2)} MAD`,
    }))
  );
};

// =============================================================================
// SEARCH & FILTER HELPERS
// =============================================================================

/**
 * Search receptions
 */
export const searchReceptions = (query) => {
  const results = mockReceptions.filter((r) => {
    const searchString =
      `${r.blNumber} ${r.fournisseur} ${r.date} ${r.status}`.toLowerCase();
    return searchString.includes(query.toLowerCase());
  });

  console.log(`🔍 Search results for "${query}": ${results.length} found`);
  console.table(
    results.map((r) => ({
      BL: r.blNumber,
      Date: r.date,
      Fournisseur: r.fournisseur,
      Status: r.status,
      "Total TTC": `${r.totalTTC.toFixed(2)} MAD`,
    }))
  );

  return results;
};

/**
 * Filter by status
 */
export const filterByStatus = (status) => {
  const results = mockReceptions.filter((r) => r.status === status);

  console.log(`📋 Receptions with status "${status}": ${results.length}`);
  console.table(
    results.map((r) => ({
      BL: r.blNumber,
      Date: r.date,
      Fournisseur: r.fournisseur,
      "Total TTC": `${r.totalTTC.toFixed(2)} MAD`,
    }))
  );

  return results;
};

/**
 * Filter by fournisseur
 */
export const filterByFournisseur = (fournisseur) => {
  const results = mockReceptions.filter((r) =>
    r.fournisseur.toLowerCase().includes(fournisseur.toLowerCase())
  );

  console.log(`🏢 Receptions for "${fournisseur}": ${results.length}`);
  console.table(
    results.map((r) => ({
      BL: r.blNumber,
      Date: r.date,
      Status: r.status,
      "Total TTC": `${r.totalTTC.toFixed(2)} MAD`,
    }))
  );

  return results;
};

/**
 * Filter by date range
 */
export const filterByDateRange = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const results = mockReceptions.filter((r) => {
    const date = new Date(r.date);
    return date >= start && date <= end;
  });

  console.log(
    `📅 Receptions between ${startDate} and ${endDate}: ${results.length}`
  );
  console.table(
    results.map((r) => ({
      BL: r.blNumber,
      Date: r.date,
      Fournisseur: r.fournisseur,
      "Total TTC": `${r.totalTTC.toFixed(2)} MAD`,
    }))
  );

  return results;
};

/**
 * Filter by amount range
 */
export const filterByAmountRange = (minAmount, maxAmount) => {
  const results = mockReceptions.filter(
    (r) => r.totalTTC >= minAmount && r.totalTTC <= maxAmount
  );

  console.log(
    `💰 Receptions between ${minAmount} and ${maxAmount} MAD: ${results.length}`
  );
  console.table(
    results.map((r) => ({
      BL: r.blNumber,
      Date: r.date,
      Fournisseur: r.fournisseur,
      "Total TTC": `${r.totalTTC.toFixed(2)} MAD`,
    }))
  );

  return results;
};

// =============================================================================
// CALCULATION HELPERS
// =============================================================================

/**
 * Verify reception calculations
 */
export const verifyCalculations = (blNumber) => {
  const reception = mockReceptions.find((r) => r.blNumber === blNumber);

  if (!reception) {
    console.error(`❌ Reception ${blNumber} not found`);
    return;
  }

  let calculatedHT = 0;
  let calculatedTVA = 0;

  console.log(`\n🧮 Verifying calculations for ${blNumber}:`);
  console.log("─".repeat(60));

  reception.lignes.forEach((ligne, index) => {
    const lineHT = ligne.qte * ligne.puHT;
    const lineTVA = lineHT * (ligne.tva / 100);
    const lineTTC = lineHT + lineTVA;

    calculatedHT += lineHT;
    calculatedTVA += lineTVA;

    console.log(`Ligne ${index + 1}: ${ligne.article}`);
    console.log(`  ${ligne.qte} × ${ligne.puHT} = ${lineHT.toFixed(2)} HT`);
    console.log(`  TVA ${ligne.tva}% = ${lineTVA.toFixed(2)}`);
    console.log(`  Total TTC = ${lineTTC.toFixed(2)}`);
  });

  const calculatedTTC = calculatedHT + calculatedTVA;

  console.log("\n" + "─".repeat(60));
  console.log(`Calculated Total HT: ${calculatedHT.toFixed(2)} MAD`);
  console.log(`Calculated Total TVA: ${calculatedTVA.toFixed(2)} MAD`);
  console.log(`Calculated Total TTC: ${calculatedTTC.toFixed(2)} MAD`);
  console.log("\n" + "─".repeat(60));
  console.log(`Stored Total HT: ${reception.totalHT.toFixed(2)} MAD`);
  console.log(`Stored Total TVA: ${reception.totalTVA.toFixed(2)} MAD`);
  console.log(`Stored Total TTC: ${reception.totalTTC.toFixed(2)} MAD`);
  console.log("\n" + "─".repeat(60));

  const htMatch = Math.abs(calculatedHT - reception.totalHT) < 0.01;
  const tvaMatch = Math.abs(calculatedTVA - reception.totalTVA) < 0.01;
  const ttcMatch = Math.abs(calculatedTTC - reception.totalTTC) < 0.01;

  if (htMatch && tvaMatch && ttcMatch) {
    console.log("✅ All calculations are correct!");
  } else {
    console.error("❌ Calculation mismatch detected!");
    if (!htMatch)
      console.error(
        `  HT difference: ${Math.abs(calculatedHT - reception.totalHT).toFixed(2)}`
      );
    if (!tvaMatch)
      console.error(
        `  TVA difference: ${Math.abs(calculatedTVA - reception.totalTVA).toFixed(2)}`
      );
    if (!ttcMatch)
      console.error(
        `  TTC difference: ${Math.abs(calculatedTTC - reception.totalTTC).toFixed(2)}`
      );
  }

  return { htMatch, tvaMatch, ttcMatch };
};

/**
 * Verify all receptions calculations
 */
export const verifyAllCalculations = () => {
  console.log("🧮 Verifying all reception calculations...\n");

  let errors = 0;
  mockReceptions.forEach((r) => {
    const result = verifyCalculations(r.blNumber);
    if (!result.htMatch || !result.tvaMatch || !result.ttcMatch) {
      errors++;
    }
  });

  console.log("\n" + "=".repeat(60));
  if (errors === 0) {
    console.log("✅ All calculations verified successfully!");
  } else {
    console.error(`❌ Found ${errors} reception(s) with calculation errors`);
  }
};

// =============================================================================
// PERFORMANCE TESTING HELPERS
// =============================================================================

/**
 * Generate large dataset for testing
 */
export const generateTestDataset = (count = 100) => {
  console.log(`⏳ Generating ${count} test receptions...`);
  const startTime = performance.now();

  const dataset = generateLargeMockDataset(count);

  const endTime = performance.now();
  const duration = (endTime - startTime).toFixed(2);

  console.log(`✅ Generated ${dataset.length} receptions in ${duration}ms`);
  console.log(`📊 Average: ${(duration / count).toFixed(2)}ms per reception`);

  return dataset;
};

/**
 * Test search performance
 */
export const testSearchPerformance = (query, iterations = 100) => {
  console.log(
    `⏱️ Testing search performance for "${query}" (${iterations} iterations)...`
  );

  const times = [];

  for (let i = 0; i < iterations; i++) {
    const startTime = performance.now();

    searchReceptions(query);

    const endTime = performance.now();
    times.push(endTime - startTime);
  }

  const avgTime = times.reduce((sum, t) => sum + t, 0) / times.length;
  const minTime = Math.min(...times);
  const maxTime = Math.max(...times);

  console.log("\n📊 Performance Results:");
  console.log(`  Average: ${avgTime.toFixed(2)}ms`);
  console.log(`  Min: ${minTime.toFixed(2)}ms`);
  console.log(`  Max: ${maxTime.toFixed(2)}ms`);
};

/**
 * Test filter performance
 */
export const testFilterPerformance = (iterations = 100) => {
  console.log(`⏱️ Testing filter performance (${iterations} iterations)...`);

  const tests = [
    { name: "Filter by Status", fn: () => filterByStatus("validé") },
    {
      name: "Filter by Fournisseur",
      fn: () => filterByFournisseur("Fournisseur A"),
    },
    {
      name: "Filter by Date Range",
      fn: () => filterByDateRange("2024-10-01", "2024-10-31"),
    },
    { name: "Filter by Amount", fn: () => filterByAmountRange(5000, 15000) },
  ];

  tests.forEach((test) => {
    const times = [];

    for (let i = 0; i < iterations; i++) {
      const startTime = performance.now();
      test.fn();
      const endTime = performance.now();
      times.push(endTime - startTime);
    }

    const avgTime = times.reduce((sum, t) => sum + t, 0) / times.length;
    console.log(`${test.name}: ${avgTime.toFixed(2)}ms`);
  });
};

// =============================================================================
// DATA VALIDATION HELPERS
// =============================================================================

/**
 * Validate reception data structure
 */
export const validateReceptionStructure = (reception) => {
  const required = [
    "id",
    "blNumber",
    "date",
    "fournisseur",
    "fournisseurId",
    "totalHT",
    "totalTVA",
    "totalTTC",
    "status",
    "lignes",
  ];

  const missing = required.filter((field) => !(field in reception));

  if (missing.length > 0) {
    console.error(`❌ Missing required fields: ${missing.join(", ")}`);
    return false;
  }

  // Validate lignes
  if (!Array.isArray(reception.lignes) || reception.lignes.length === 0) {
    console.error("❌ Lignes must be a non-empty array");
    return false;
  }

  // Validate each ligne
  const ligneRequired = ["article", "articleId", "qte", "puHT", "tva"];
  reception.lignes.forEach((ligne, index) => {
    const ligneMissing = ligneRequired.filter((field) => !(field in ligne));
    if (ligneMissing.length > 0) {
      console.error(
        `❌ Ligne ${index + 1} missing: ${ligneMissing.join(", ")}`
      );
      return false;
    }
  });

  console.log("✅ Reception structure is valid");
  return true;
};

/**
 * Validate all receptions
 */
export const validateAllReceptions = () => {
  console.log("🔍 Validating all receptions...\n");

  let errors = 0;
  mockReceptions.forEach((r, index) => {
    console.log(`Validating ${r.blNumber}...`);
    if (!validateReceptionStructure(r)) {
      errors++;
    }
  });

  console.log("\n" + "=".repeat(60));
  if (errors === 0) {
    console.log("✅ All receptions are valid!");
  } else {
    console.error(`❌ Found ${errors} invalid reception(s)`);
  }
};

// =============================================================================
// QUICK TEST SCENARIOS
// =============================================================================

/**
 * Run basic test suite
 */
export const runBasicTests = () => {
  console.clear();
  console.log("🧪 Running Basic Test Suite\n");
  console.log("=".repeat(60));

  console.log("\n1️⃣ Display Statistics");
  showStatistics();

  console.log("\n2️⃣ Search Test");
  searchReceptions("Dell");

  console.log("\n3️⃣ Filter by Status");
  filterByStatus("validé");

  console.log("\n4️⃣ Filter by Fournisseur");
  filterByFournisseur("Fournisseur A");

  console.log("\n5️⃣ Verify Calculations");
  verifyCalculations("BL-2024-001");

  console.log("\n" + "=".repeat(60));
  console.log("✅ Basic tests completed!");
};

/**
 * Run performance tests
 */
export const runPerformanceTests = () => {
  console.clear();
  console.log("⚡ Running Performance Test Suite\n");
  console.log("=".repeat(60));

  console.log("\n1️⃣ Test Search Performance");
  testSearchPerformance("Dell", 50);

  console.log("\n2️⃣ Test Filter Performance");
  testFilterPerformance(50);

  console.log("\n3️⃣ Generate Large Dataset");
  generateTestDataset(100);

  console.log("\n" + "=".repeat(60));
  console.log("✅ Performance tests completed!");
};

/**
 * Run validation tests
 */
export const runValidationTests = () => {
  console.clear();
  console.log("🔍 Running Validation Test Suite\n");
  console.log("=".repeat(60));

  console.log("\n1️⃣ Validate All Reception Structures");
  validateAllReceptions();

  console.log("\n2️⃣ Verify All Calculations");
  verifyAllCalculations();

  console.log("\n" + "=".repeat(60));
  console.log("✅ Validation tests completed!");
};

/**
 * Run all tests
 */
export const runAllTests = () => {
  runBasicTests();
  console.log("\n\n");
  runPerformanceTests();
  console.log("\n\n");
  runValidationTests();
};

// =============================================================================
// EXPORT HELPER OBJECT
// =============================================================================

export const testHelpers = {
  // Display
  showAllReceptions,
  showStatistics,
  showFournisseurs,
  showArticles,
  showReceptionDetails,

  // Search & Filter
  searchReceptions,
  filterByStatus,
  filterByFournisseur,
  filterByDateRange,
  filterByAmountRange,

  // Calculations
  verifyCalculations,
  verifyAllCalculations,

  // Performance
  generateTestDataset,
  testSearchPerformance,
  testFilterPerformance,

  // Validation
  validateReceptionStructure,
  validateAllReceptions,

  // Test Suites
  runBasicTests,
  runPerformanceTests,
  runValidationTests,
  runAllTests,
};

// Make available in console
if (typeof window !== "undefined") {
  window.testHelpers = testHelpers;
  console.log(
    "✅ Test helpers loaded! Use window.testHelpers or individual functions."
  );
  console.log("📖 Try: window.testHelpers.runBasicTests()");
}

export default testHelpers;
