import { Firecrawl } from "firecrawl";

const firecrawlApiKey = process.env.FIRECRAWL_API_KEY;

if (!firecrawlApiKey) {
  throw new Error("FIRECRAWL_API_KEY is not set");
}

export const firecrawl = new Firecrawl({ apiKey: firecrawlApiKey });

// Scrape a website
export const scrapeResponse = await firecrawl.scrape("https://firecrawl.dev", {
  formats: ["markdown", "html"],
});

// Crawl a website
export const crawlResponse = await firecrawl.crawl("https://firecrawl.dev", {
  limit: 100,
  scrapeOptions: {
    formats: ["markdown", "html"],
  },
});
