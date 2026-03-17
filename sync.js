// sync.js - FINAL WORKING VERSION (March 2026)
// Lightweight, no browser, no vision AI

import axios from 'axios';
import * as cheerio from 'cheerio';
import { createClient } from '@supabase/supabase-js';

async function runMasterSync() {
  console.log("🔥 Starting Flame Foundation Master Sync (stable version)...");

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
    },
    {
      platform: 'YouTube',
      url: 'https://www.youtube.com/@FlameFoundationTV',
      handle: 'UCxxxxxxxxxxxxxxxxxxxxxx', // ← CHANGE TO YOUR REAL CHANNEL ID
      useApi: true
    }
  ];

  for (const target of targets) {
    try {
      console.log(`📊 Processing ${target.platform}...`);

      let followers = 0;
      let engagementRate = 0.0;

      // ==================== YOUTUBE - OFFICIAL API (best) ====================
      if (target.platform === 'YouTube' && process.env.YOUTUBE_API_KEY) {
        const apiUrl = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${target.handle}&key=${process.env.YOUTUBE_API_KEY}`;
        const res = await axios.get(apiUrl, { timeout: 10000 });
        const stats = res.data.items?.[0]?.statistics;

        if (stats) {
          followers = parseInt(stats.subscriberCount || 0);
          console.log(`✅ YouTube API success: ${followers.toLocaleString()} subscribers`);
        }
      }
      // ==================== X, FACEBOOK, LINKEDIN - LIGHT SCRAPING ====================
      else {
        const res = await axios.get(target.url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36'
          },
          timeout: 15000
        });

        const $ = cheerio.load(res.data);

        let countText = '';

        if (target.platform === 'X') {
          // X stores data in JSON inside script tags
          $('script').each((i, el) => {
            const script = $(el).html() || '';
            const match = script.match(/"followers_count":\s*(\d+)/);
            if (match) countText = match[1];
          });
        } else {
          // Facebook / LinkedIn - common patterns
          countText = $('.followers, .text-followers, span:contains("followers"), span:contains("Followers"), [data-testid*="followers"]')
            .first()
            .text()
            .replace(/[^0-9KMB.]/g, '') || '0';
        }

        // Convert K/M/B
        if (countText.includes('K')) followers = Math.floor(parseFloat(countText) * 1000);
        else if (countText.includes('M')) followers = Math.floor(parseFloat(countText) * 1_000_000);
        else if (countText.includes('B')) followers = Math.floor(parseFloat(countText) * 1_000_000_000);
        else followers = parseInt(countText) || 0;
      }

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

  console.log("🏁 Master Sync completed – social_stats updated every hour.");
}

runMasterSync().catch(err => {
  console.error("💥 Sync crashed:", err);
  process.exit(1);
});
