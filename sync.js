import { chromium } from 'playwright';
import { createClient } from '@supabase/supabase-js';

async function runMasterSync() {
  console.log("🔥 Starting Social Sync (NO AI VERSION)...");

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

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
      console.log(`📡 Scraping ${target.name}...`);

      await page.goto(target.url, {
        waitUntil: 'domcontentloaded',
        timeout: 60000,
      });

      await page.waitForTimeout(6000);

      let text = "";

      // 🔵 PLATFORM-SPECIFIC SELECTORS
      if (target.name === "X") {
        text = await page.locator('a[href$="/followers"] span').first().innerText();
      }

      if (target.name === "Facebook") {
        text = await page.locator('text=/followers/i').first().innerText();
      }

      if (target.name === "LinkedIn") {
        text = await page.locator('text=/followers/i').first().innerText();
      }

      console.log(`📊 Raw text (${target.name}):`, text);

      // ✅ CLEAN NUMBER
      const followers = parseInt(text.replace(/[^\d]/g, '')) || 0;

      console.log(`✅ Parsed followers (${target.name}):`, followers);

      // ✅ SAVE TO SUPABASE
      const { error } = await supabase.from('social_stats').upsert(
        {
          platform: target.name,
          handle: target.url.split('/').filter(Boolean).pop(),
          followers_count: followers,
          engagement_rate: 0, // optional for now
          last_updated: new Date().toISOString(),
        },
        { onConflict: 'platform' }
      );

      if (error) throw error;

      console.log(`💾 Saved ${target.name}`);

    } catch (err) {
      console.error(`❌ ${target.name} Failed:`, err.message);
    }
  }

  await browser.close();
}

runMasterSync().catch((err) => {
  console.error("💥 Critical Failure:", err);
  process.exit(1);
});
