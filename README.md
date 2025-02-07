# Introduction
deployed at [Skytrack](https://www.skytrack.onrender.com)
- Use this app to track flights and notify about price drops via mail.
- stack used => Next.js, Puppeteer with @sparticuz/chromium for scraping, Docker, SQL with Prisma 

## Backend Improvements
- currently deployed on free tier on Render ( 512mb, 0.1 CPU ) which is pretty low to run up a headless browser which explains the long 30s delay to get data
- as of now, uses "long polling" to get flight data from server - not scalable, shift to either Short polling or Pub / Sub architecture
- to reduce load on backend, use a queueing service to perform scrape tasks one by one instead of performing parallely

## Frontend Improvements
- add a hide/unhide password on auth screen
- add login with google functionality
- complete forgot password functionality
- add loading buttons on auth
- add page transitions
- add tanstack react query to handle auto refreshing of card component on /track ( optional )


## How to Run Locally

1. Install Docker on your system.
2. Navigate to the root directory of the project.
3. Ensure you have a `.env` file in the project root with the necessary environment variables.
4. Build the Docker image:
   ```sh
   docker build -t skytrack .
   ```
5. Run the container
    ```sh
    docker run -d --env-file .env -p 3000:3000 skytrack
    ```
6. Open `localhost:3000` on your browser.  

  
# Authors
Swayam Duhan 🖤