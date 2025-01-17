import puppeteer from "puppeteer-core"
import chromium from "@sparticuz/chromium-min"
import { NextRequest, NextResponse } from "next/server";

chromium.setHeadlessMode = true;
chromium.setGraphicsMode = false

export async function GET(){
    try{
        console.log("Request received...")
        const browser = await puppeteer.launch({
            args : chromium.args,
            defaultViewport : chromium.defaultViewport,
            executablePath : await chromium.executablePath('https://github.com/Sparticuz/chromium/releases/download/v131.0.1/chromium-v131.0.1-pack.tar'),
            headless : chromium.headless
        });
        console.log("Browser initiated!")
        const page = await browser.newPage();
        
        await page.goto("https://www.google.co.in/");
        const title = await page.title();
        console.log("Title : " + title);
        
        await browser.close()

        return NextResponse.json({ message : "Success", title}, { status : 200})
    } catch(err){
        console.log(err)
        return NextResponse.json({ error : 'Internal Error'}, { status : 500})
    }
};