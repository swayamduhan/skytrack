export function getScrapeRoute() : string {
    const env = process.env.NEXT_PUBLIC_ENV
    if (env == "dev") {
        return "scrapedev"
    } else return "scrape"
}