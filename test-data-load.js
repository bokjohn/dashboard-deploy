#!/usr/bin/env node

// Simulate the dashboard's data loading logic to catch any errors
const fs = require('fs');
const path = require('path');

console.log('🧪 Testing data.json loading...\n');

try {
  // Load data like the dashboard does
  const dataPath = path.join(__dirname, 'data.json');
  const text = fs.readFileSync(dataPath, 'utf8');
  const data = JSON.parse(text);
  
  console.log('✅ Data parsed successfully');
  console.log(`✅ Found ${data.businessModels.length} business models\n`);
  
  // Test each model has required fields
  let errors = [];
  
  data.businessModels.forEach((model, index) => {
    console.log(`Testing model ${index + 1}: ${model.title}`);
    
    // Check top-level fields (used for sorting/filtering)
    if (typeof model.revenueScore === 'undefined') {
      errors.push(`  ❌ Missing revenueScore`);
    } else {
      console.log(`  ✅ revenueScore: ${model.revenueScore}`);
    }
    
    if (typeof model.profitMargin === 'undefined') {
      errors.push(`  ❌ Missing profitMargin`);
    } else {
      console.log(`  ✅ profitMargin: ${model.profitMargin}`);
    }
    
    if (typeof model.automationPercent === 'undefined') {
      errors.push(`  ❌ Missing automationPercent`);
    } else {
      console.log(`  ✅ automationPercent: ${model.automationPercent}`);
    }
    
    if (typeof model.timeToProfit === 'undefined') {
      errors.push(`  ❌ Missing timeToProfit`);
    } else {
      console.log(`  ✅ timeToProfit: ${model.timeToProfit}`);
    }
    
    // Check details object (used in expanded view)
    if (!model.details) {
      errors.push(`  ❌ Missing details object`);
    } else {
      console.log(`  ✅ details object exists`);
      
      if (typeof model.details.caseStudy === 'undefined') {
        errors.push(`    ❌ Missing details.caseStudy`);
      } else {
        console.log(`    ✅ details.caseStudy: "${model.details.caseStudy.substring(0, 50)}..."`);
      }
      
      if (typeof model.details.cac === 'undefined') {
        errors.push(`    ❌ Missing details.cac`);
      } else {
        console.log(`    ✅ details.cac: "${model.details.cac.substring(0, 50)}..."`);
      }
      
      if (typeof model.details.marketingPlan === 'undefined') {
        errors.push(`    ❌ Missing details.marketingPlan`);
      } else {
        console.log(`    ✅ details.marketingPlan: "${model.details.marketingPlan.substring(0, 50)}..."`);
      }
    }
    
    console.log('');
  });
  
  if (errors.length > 0) {
    console.log('\n❌ ERRORS FOUND:');
    errors.forEach(err => console.log(err));
    process.exit(1);
  } else {
    console.log('\n✅ ALL TESTS PASSED!');
    console.log('✅ Data structure is complete and matches index.html requirements');
    console.log('\n🎉 Dashboard should load without errors!');
  }
  
} catch (error) {
  console.error('❌ ERROR:', error.message);
  process.exit(1);
}
