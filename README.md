## Todo
#### Current issue : 
Deployed on vercel with @sparticuz/chromium-min package with a .tar chromium file being imported from github cdn. this way vercel has to install chromium everytime on a scrape request which takes up time, and hits the 10s request timeout on a free plan.
#### Possible workarounds : 
- Try to replicate process using @sparticuz/chromium and storing chromium files in /public and see if it doesn't surpass the bundle size limit or
- seperate the scraping service to a different backend ( most prolly use Go ) and host it somewhere else, possibly AWS or Google. For the scrape routine that runs every 12 hours, put all requests in a queue and send to that backend one by one to reduce the request time on Next.js backend.
- Learn advanced docker, queues and Go to build this.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
