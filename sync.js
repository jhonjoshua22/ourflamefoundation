const { chromium } = require('playwright');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { createClient } = require('@supabase/supabase-js');

async function runMasterSync() {
  console.log("🔥 Starting Flame Foundation Master Sync...");
  
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // --- 1. YOUTUBE (API Method) ---
  try {
    // This ID is extracted from your @FlameFoundationTV handle
    const ytChannelId = "UC3_8P9_kZ8mXm6S7GvH0W_A"; 
    const ytUrl = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${ytChannelId}&key=${process.env.YOUTUBE_API_KEY}`;
    const ytRes = await fetch(ytUrl);
    const ytData = await ytRes.json();
    const ytSubs = ytData.items[0].statistics.subscriberCount;

    await supabase.from('social_stats').upsert({
      platform: 'YouTube',
      followers_count: parseInt(ytSubs),
      handle: '@FlameFoundationTV',
      engagement_rate: 0 // YouTube API doesn't give this for free easily
    }, { onConflict: 'platform' });
    console.log("✅ YouTube Synced:", ytSubs);
  } catch (e) { console.error("❌ YouTube Error:", e.message); }

  // --- 2. VISUAL SYNC (X, Facebook, LinkedIn) ---
  const visualTargets = [
    { name: 'X', url: 'https://x.com/OurFlameFoundtn' },
    { name: 'Facebook', url: 'https://www.facebook.com/OurFlameFoundation/' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/company/flamefoundation/' }
  ];

  for (const target of visualTargets) {
    try {
      console.log(`📸 Capturing ${target.name}...`);
      await page.goto(target.url, { waitUntil: 'networkidle', timeout: 60000 });
      await page.waitForTimeout(5000); 
      
      const screenshot = await page.screenshot({ encoding: 'base64' });

      const prompt = `Look at this ${target.name} profile. Find the follower count. 
      Return ONLY JSON: {"followers": 1842}. 
      If you see "1.8K", try to find the exact number. If not, convert to 1800.`;

      const result = await model.generateContent([
        prompt,
        { inlineData: { data: screenshot, mimeType: "image/png" } }
      ]);

      const data = JSON.parse(result.response.text().replace(/```json|```/g, ""));

      await supabase.from('social_stats').upsert({
        platform: target.name,
        followers_count: data.followers,
        handle: target.url.split('/').filter(Boolean).pop(),
        engagement_rate: 0
      }, { onConflict: 'platform' });

      console.log(`✅ ${target.name} Synced:`, data.followers);
    } catch (err) {
      console.error(`❌ ${target.name} Sync Failed:`, err.message);
    }
  }

  await browser.close();
  console.log("🏁 Master Sync Complete.");
}

runMasterSync();
