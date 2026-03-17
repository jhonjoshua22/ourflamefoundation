import { chromium } from 'playwright';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { createClient } from '@supabase/supabase-js';

async function runMasterSync() {
  console.log("🔥 Starting Flame Foundation Master Sync...");
  
  // 1. Initialize Clients using Environment Variables from GitHub Secrets
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // 2. Define your Social Media Targets
  const targets = [
    { name: 'X', url: 'https://x.com/OurFlameFoundtn' },
    { name: 'Facebook', url: 'https://www.facebook.com/OurFlameFoundation/' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/company/flamefoundation/' },
    { name: 'YouTube', url: 'https://www.youtube.com/@FlameFoundationTV' }
  ];

  for (const target of targets) {
    try {
      console.log(`📸 Syncing ${target.name}...`);
      
      // Navigate to the profile
      await page.goto(target.url, { waitUntil: 'networkidle', timeout: 60000 });
      
      // Wait for the UI to settle so numbers are visible
      await page.waitForTimeout(7000); 
      
      // Take the screenshot for Gemini to "read"
      const screenshot = await page.screenshot({ encoding: 'base64' });

      // 3. Prompt Gemini to extract the data as JSON
      const prompt = `Extract the follower/subscriber count and an estimated engagement rate percentage from this ${target.name} page screenshot. 
      Return ONLY a raw JSON object: {"followers": 1234, "engagement": 2.5}. 
      Do not include markdown formatting or backticks.`;
      
      const result = await model.generateContent([
        prompt,
        { inlineData: { data: screenshot, mimeType: "image/png" } }
      ]);

      // Clean the response string (removing any accidental backticks from AI)
      const cleanJson = result.response.text().replace(/```json|```/g, "").trim();
      const data = JSON.parse(cleanJson);

      // 4. Update your Supabase 'social_stats' table
      const { error } = await supabase.from('social_stats').upsert({
        platform: target.name,
        handle: target.url.split('/').filter(Boolean).pop(),
        followers_count: parseInt(data.followers) || 0,
        engagement_rate: parseFloat(data.engagement) || 0.0,
        last_updated: new Date().toISOString()
      }, { onConflict: 'platform' });

      if (error) throw error;
      console.log(`✅ ${target.name} Updated | Followers: ${data.followers} | Engagement: ${data.engagement}%`);

    } catch (err) {
      console.error(`❌ ${target.name} Failed:`, err.message);
    }
  }

  await browser.close();
  console.log("🏁 Master Sync Complete.");
}

// Execute the function
runMasterSync().catch(err => {
  console.error("💥 Critical Sync Failure:", err);
  process.exit(1);
});
