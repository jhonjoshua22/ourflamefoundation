import { chromium } from 'playwright';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { createClient } from '@supabase/supabase-js';

async function runMasterSync() {
  console.log("🔥 Starting Flame Foundation Master Sync...");
  
  // 1. Setup Clients
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // 2. Your Exact Links
  const targets = [
    { name: 'X', url: 'https://x.com/OurFlameFoundtn' },
    { name: 'Facebook', url: 'https://www.facebook.com/OurFlameFoundation/' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/company/flamefoundation/' },
    { name: 'YouTube', url: 'https://www.youtube.com/@FlameFoundationTV' }
  ];

  for (const target of targets) {
    try {
      console.log(`📸 Processing ${target.name}...`);
      
      // Navigate and wait for content (LinkedIn/X are heavy)
      await page.goto(target.url, { waitUntil: 'networkidle', timeout: 60000 });
      await page.waitForTimeout(8000); 
      
      const screenshot = await page.screenshot({ encoding: 'base64' });

      // 3. The "AI Eye" Prompt
      const prompt = `Extract the follower count and an estimated engagement rate from this ${target.name} page. 
      Return ONLY a JSON object: {"followers": 1234, "engagement": 2.5}. 
      No markdown, no backticks, no text.`;
      
      const result = await model.generateContent([
        prompt,
        { inlineData: { data: screenshot, mimeType: "image/png" } }
      ]);

      // Clean the AI's response in case it adds extra formatting
      const responseText = result.response.text().replace(/```json|```/g, "").trim();
      const data = JSON.parse(responseText);

      // 4. Push to your Supabase social_stats table
      const { error } = await supabase.from('social_stats').upsert({
        platform: target.name,
        handle: target.url.split('/').filter(Boolean).pop(),
        followers_count: parseInt(data.followers) || 0,
        engagement_rate: parseFloat(data.engagement) || 0.0,
        last_updated: new Date().toISOString()
      }, { onConflict: 'platform' });

      if (error) throw error;
      console.log(`✅ ${target.name} Success: ${data.followers} followers.`);

    } catch (err) {
      console.error(`❌ ${target.name} Failed:`, err.message);
    }
  }

  await browser.close();
  console.log("🏁 All platforms synced to Scoretable.");
}

// Start the engine
runMasterSync().catch(err => {
  console.error("💥 Script exploded:", err);
  process.exit(1);
});
