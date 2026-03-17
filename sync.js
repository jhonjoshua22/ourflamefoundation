import { chromium } from 'playwright';
import { createClient } from '@supabase/supabase-js';

async function runMasterSync() {
  console.log("🔥 Starting Flame Foundation Master Sync (V3.1 - Stable API)...");
  
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
  const apiKey = process.env.GEMINI_API_KEY;

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
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
      
      const screenshot = await page.screenshot({ encoding: 'base64' });

      // UPDATED URL: Changed v1beta to v1
      const apiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [
              { text: `Extract follower count and engagement % from this ${target.name} page. Return ONLY JSON: {"followers": 1234, "engagement": 2.1}` },
              { inline_data: { mime_type: "image/png", data: screenshot } }
            ]
          }]
        })
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(`Gemini API Error: ${result.error?.message || JSON.stringify(result)}`);
      }

      const text = result.candidates[0].content.parts[0].text;
      const jsonMatch = text.match(/\{.*\}/s);
      
      if (!jsonMatch) throw new Error("AI did not return valid JSON");
      const data = JSON.parse(jsonMatch[0]);

      const { error } = await supabase.from('social_stats').upsert({
        platform: target.name,
        handle: target.url.split('/').filter(Boolean).pop(),
        followers_count: parseInt(data.followers) || 0,
        engagement_rate: parseFloat(data.engagement) || 0.0,
        last_updated: new Date().toISOString()
      }, { onConflict: 'platform' });

      if (error) throw error;
      console.log(`✅ ${target.name} Synced: ${data.followers} followers.`);

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
