import { chromium } from 'playwright';
import { createClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from '@google/generative-ai';

async function runMasterSync() {
  console.log("🔥 Starting Flame Foundation Master Sync (FINAL - SDK FIX)...");

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/122 Safari/537.36',
  });

  const page = await context.newPage();

  const targets = [
    { name: 'X', url: 'https://x.com/OurFlameFoundtn' },
    { name: 'Facebook', url: 'https://www.facebook.com/OurFlameFoundation/' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/company/flamefoundation/' },
  ];

  for (const target of targets) {
    try {
      console.log(`📸 Processing ${target.name}...`);

      await page.goto(target.url, {
        waitUntil: 'domcontentloaded',
        timeout: 60000,
      });

      await page.waitForTimeout(8000);

      // ✅ SMALL + COMPRESSED IMAGE
      await page.setViewportSize({ width: 600, height: 400 });

      const screenshotBuffer = await page.screenshot({
        type: 'jpeg',
        quality: 40,
        fullPage: false,
      });

      const screenshot = screenshotBuffer.toString('base64');

      console.log("📦 Image size:", screenshot.length);

      // ✅ GEMINI SDK (NO MORE PAYLOAD ERRORS)
      const result = await model.generateContent([
        `Extract follower count and engagement % from this ${target.name} page. Return ONLY JSON: {"followers": 1234, "engagement": 2.1}`,
        {
          inlineData: {
            data: screenshot,
            mimeType: "image/jpeg",
          },
        },
      ]);

      const response = await result.response;
      const text = response.text();

      console.log(`🧠 AI RAW RESPONSE (${target.name}):`, text);

      // ✅ SAFE JSON EXTRACTION
      const jsonMatch = text.match(/\{[\s\S]*\}/);

      if (!jsonMatch) {
        throw new Error("AI did not return valid JSON");
      }

      const data = JSON.parse(jsonMatch[0]);

      const followers = parseInt(data.followers) || 0;
      const engagement = parseFloat(data.engagement) || 0;

      // ✅ SAVE TO SUPABASE
      const { error } = await supabase.from('social_stats').upsert(
        {
          platform: target.name,
          handle: target.url.split('/').filter(Boolean).pop(),
          followers_count: followers,
          engagement_rate: engagement,
          last_updated: new Date().toISOString(),
        },
        { onConflict: 'platform' }
      );

      if (error) throw error;

      console.log(`✅ ${target.name} Synced: ${followers}`);

    } catch (err) {
      console.error(`❌ ${target.name} Failed:`, err.message);
    }
  }

  await browser.close();
}

// RUN
runMasterSync().catch((err) => {
  console.error("💥 Critical Failure:", err);
  process.exit(1);
});
