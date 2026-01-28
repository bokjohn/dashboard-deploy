#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read the current data
const dataPath = path.join(__dirname, 'data.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

console.log('🔍 Analyzing data structure...');
console.log(`Found ${data.businessModels.length} business models`);

// Transform each business model
data.businessModels = data.businessModels.map((model, index) => {
  console.log(`\n📝 Processing: ${model.title}`);
  
  // Flatten quickMetrics to top-level (required for sorting/filtering)
  if (model.quickMetrics) {
    model.revenueScore = model.quickMetrics.revenueScore || 0;
    model.profitMargin = model.quickMetrics.profitMargin || 0;
    model.automationPercent = model.quickMetrics.automationPercent || 0;
    model.timeToProfit = model.quickMetrics.timeToProfit || 0;
    model.capitalNeeded = model.quickMetrics.capitalNeeded || 'low';
    model.qualityScore = model.quickMetrics.qualityScore || 0;
    console.log(`  ✅ Flattened quickMetrics fields`);
  } else {
    console.log(`  ⚠️  Missing quickMetrics!`);
  }
  
  // Create details object (required for expanded card view)
  if (!model.details) {
    model.details = {};
    
    // Extract caseStudy from decisionData.caseStudies
    if (model.decisionData && model.decisionData.caseStudies && model.decisionData.caseStudies.length > 0) {
      const mainCase = model.decisionData.caseStudies[0];
      model.details.caseStudy = `${mainCase.name} - ${mainCase.revenue}. ${mainCase.key}. Team: ${mainCase.team}.`;
      console.log(`  ✅ Generated caseStudy from decisionData`);
    } else {
      model.details.caseStudy = 'No case study available yet. This is a validated business model based on market research.';
      console.log(`  ⚠️  No case studies found, using default`);
    }
    
    // Extract CAC from costs or create estimate
    if (model.decisionData && model.decisionData.costs) {
      const startup = model.decisionData.costs.startup || 'Unknown';
      const monthly = model.decisionData.costs.monthly || 'Unknown';
      model.details.cac = `Startup: ${startup}, Monthly: ${monthly}. CAC depends on channel - SEO (low), paid ads (medium), cold outreach (high).`;
      console.log(`  ✅ Generated CAC from decisionData.costs`);
    } else {
      model.details.cac = 'Customer acquisition cost varies by channel. Typically $50-500 per customer depending on strategy.';
      console.log(`  ⚠️  No cost data found, using default`);
    }
    
    // Extract marketing plan from decision data
    if (model.decisionData && model.decisionData.launchRoadmap && model.decisionData.launchRoadmap.steps) {
      const marketingSteps = model.decisionData.launchRoadmap.steps
        .filter(step => step.title.toLowerCase().includes('marketing') || step.title.toLowerCase().includes('acquisition') || step.title.toLowerCase().includes('launch'))
        .map(step => step.tasks.slice(0, 3).join('; '))
        .join(' → ');
      
      if (marketingSteps) {
        model.details.marketingPlan = marketingSteps;
        console.log(`  ✅ Extracted marketing plan from launchRoadmap`);
      } else {
        // Fallback: use automation info
        if (model.decisionData.automation && model.decisionData.automation.aiHandles) {
          model.details.marketingPlan = `Automated approach: ${model.decisionData.automation.aiHandles.slice(0, 3).join(', ')}. Manual: ${model.decisionData.automation.yourRole ? model.decisionData.automation.yourRole.slice(0, 2).join(', ') : 'Strategic decisions'}.`;
          console.log(`  ✅ Generated marketing plan from automation data`);
        } else {
          model.details.marketingPlan = 'Multi-channel approach combining SEO, content marketing, partnerships, and targeted outreach. Focus on automation-first strategies.';
          console.log(`  ⚠️  No roadmap found, using default`);
        }
      }
    } else {
      model.details.marketingPlan = 'Multi-channel approach combining SEO, content marketing, partnerships, and targeted outreach. Focus on automation-first strategies.';
      console.log(`  ⚠️  No launchRoadmap found, using default`);
    }
  } else {
    console.log(`  ✅ Already has details object`);
  }
  
  return model;
});

// Backup original file
const backupPath = path.join(__dirname, `data.json.backup.${Date.now()}`);
fs.writeFileSync(backupPath, fs.readFileSync(dataPath, 'utf8'));
console.log(`\n💾 Backup saved to: ${backupPath}`);

// Write fixed data
fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
console.log(`\n✅ Fixed data written to: ${dataPath}`);

console.log('\n📊 Summary:');
console.log(`  - Processed ${data.businessModels.length} business models`);
console.log(`  - Added/verified details object with: caseStudy, cac, marketingPlan`);
console.log(`  - Flattened quickMetrics to top-level fields`);
console.log('\n🎉 Data structure fix complete!');
