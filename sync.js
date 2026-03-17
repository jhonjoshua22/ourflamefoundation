import axios from 'axios';
import * as cheerio from 'cheerio';
import { createClient } from '@supabase/supabase-js';

async function runMasterSync() {
  console.log("🔥 Starting Flame Foundation Master Sync (no YouTube)...");

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const targets = [
    {
      platform: 'X',
      url: 'https://x.com/OurFlameFoundtn',
      handle: 'OurFlameFoundtn'
    },
    {
      platform: 'Facebook',
      url: 'https://www.facebook.com/OurFlameFoundation/',
      handle: 'OurFlameFoundation'
    },
    {
      platform: 'LinkedIn',
      url: 'https://www.linkedin.com/company/flamefoundation/',
      handle: 'flamefoundation'
    }
    // YouTube removed as requested
  ];

  for (const target of targets) {
    try {
      console.log(`📊 Processing ${target.platform}...`);

      let followers = 0;
      let engagementRate = 0.0;

      const res = await axios.get(target.url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36'
        },
        timeout: 15000
      });

      const $ = cheerio.load(res.data);

      let countText = '';

      if (target.platform === 'X') {
        // Try to find followers in JSON data inside script tags
        $('script').each((i, el) => {
          const script = $(el).html() || '';
          const match = script.match(/"followers_count":\s*(\d+)/);
          if (match) countText = match[1];
        });
      } else if (target.platform === 'Facebook') {
        // Facebook often shows likes/followers in meta or visible text
        countText = $('meta[property="og:description"], [data-pagelet*="followers"], span:contains("followers"), span:contains("Likes")')
          .first()
          .text()
          .replace(/[^0-9KMB.]/g, '') || '0';
      } else if (target.platform === 'LinkedIn') {
        // LinkedIn company pages show followers in specific elements
        countText = $('[data-test-id="followers-count"], .followers-count, span:contains("followers")')
          .first()
          .text()
          .replace(/[^0-9KMB.]/g, '') || '0';
      }

      // Convert K/M/B shorthand
      if (countText.includes('K')) followers = Math.floor(parseFloat(countText) * 1000);
      else if (countText.includes('M')) followers = Math.floor(parseFloat(countText) * 1_000_000);
      else if (countText.includes('B')) followers = Math.floor(parseFloat(countText) * 1_000_000_000);
      else followers = parseInt(countText.replace(/,/g, '')) || 0;

      // Upsert to social_stats
      const { error } = await supabase
        .from('social_stats')
        .upsert({
          platform: target.platform.toLowerCase(),
          handle: target.handle,
          followers_count: followers,
          engagement_rate: engagementRate,
          last_updated: new Date().toISOString()
        }, { onConflict: 'platform,handle' });

      if (error) throw error;

      console.log(`✅ ${target.platform} → ${followers.toLocaleString()} followers saved`);
    } catch (err) {
      console.error(`❌ ${target.platform} failed:`, err.message);
    }
  }

  console.log("🏁 Master Sync completed – social_stats updated (X, Facebook, LinkedIn only).");
}

runMasterSync().catch(err => {
  console.error("💥 Sync crashed:", err);
  process.exit(1);
});
