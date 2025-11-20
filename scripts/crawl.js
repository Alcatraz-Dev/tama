import "dotenv/config";
import FirecrawlApp from "@mendable/firecrawl-js";
import fs from "fs";

const client = new FirecrawlApp({
  apiKey: process.env.FIRECRAWL_API_KEY,
});

// ضع رابط Vercel الخاص بك
const websiteUrl = "https://tama-shop.vercel.app";

async function crawl() {
  console.log("🔥 Starting crawl for:", websiteUrl);

  const result = await client.crawlUrl(websiteUrl, {
    limit: 100,
    scrapeOptions: {
      formats: ["markdown"]
    }
  });

  fs.mkdirSync("./data", { recursive: true });
  fs.writeFileSync("./data/crawl.json", JSON.stringify(result, null, 2));

  console.log("✅ Crawl finished and saved to /data/crawl.json");
}

crawl();