import { chromium } from 'playwright';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { createClient } from '@supabase/supabase-js';

async function runMasterSync() {
  console.log("🔥 Starting Flame Foundation Master Sync (V2.6 - Buffer Mode)...");
  
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    viewport: { width: 1280, height: 800 }
  });
  const page = await context.newPage();

  const targets = [
    { name: 'X', url: 'https://x.com/OurFlameFoundtn' },
    { name: 'Facebook', url: 'https://www.facebook.com/OurFlameFoundation/' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/company/flamefoundation/' }
  ];

  for (const target of targets) {
    try {
      console.log(`📸 Processing ${target.name}...`);
      
      await page.goto(target.url, { waitUntil: 'domcontentloaded', timeout: 60000 });
      await page.waitForTimeout(10000); 
      
      // Capture as a raw Buffer instead of base64 string
      const screenshotBuffer = await page.screenshot();
      const base64Data = screenshotBuffer.toString('base64');

      const prompt = `Extract the follower count and engagement rate from this ${target.name} page. Return ONLY JSON: {"followers": 1234, "engagement": 2.1}`;

      // Using the most explicit part-based generation
      const result = await model.generateContent([
        prompt,
        {
          inlineData: {
            data: base64Data,
            mimeType: "image/png",
          },
        },
      ]);

      const response = await result.response;
      const text = response.text();
      const jsonMatch = text.match(/\{.*\}/s);
      
      if (!jsonMatch) throw new Error("No JSON found");
      const data = JSON.parse(jsonMatch[0]);

      const { error } = await supabase.from('social_stats').upsert({
        platform: target.name,
        handle: target.url.split('/').filter(Boolean).pop(),
        followers_count: parseInt(data.followers) || 0,
        engagement_rate: parseFloat(data.engagement) || 0.0,
        last_updated: new Date().toISOString()
      }, { onConflict: 'platform' });

      if (error) throw error;
      console.log(`✅ ${target.name} Synced: ${data.followers}`);

    } catch (err) {
      console.error(`❌ ${target.name} Failed:`, err.message);
    }
  }

  await browser.close();
}

runMasterSync().catch(err => {
  console.error("💥 Critical Failure:", err);
  process.exit(1);
});
