const { spawn } = require("child_process");

const modules = [
  "request",
  "socks",
  "express",
  "axios",
  "chalk",
  "fs",
  "path",
  "set-cookie-parser",
  "crypto-js",
  "http",
  "https",
  "net",
  "tls",
  "url",
  "crypto",
  "events",
  "stream",
  "util",
  "zlib",
  "node-fetch@2",
  "hpack",
  "ws",
  "async",
  "cluster",
  "buffer",
  "dns",
  "querystring",
  "puppeteer-real-browser",
  "os",
  "http2",
  "user-agents",
  "node-bash-title",
  "child_process",
  "http2-wrapper",
  "puppeteer",
  "puppeteer-extra",
  "puppeteer-extra-plugin-stealth",
  "puppeteer-extra-plugin-anonymize-ua",
  "resemblejs",
  "canvas",
  "undici",
  "http-proxy-agent",
  "colors",
  "sockopt",
  "random-useragent",
  "puppeteer-extra-plugin-adblocker",
  "fake-useragent",
  "cloudscraper",
  "cheerio",
  "header-generator"
];

console.log("Memulai instalasi semua module...\n");

async function installModule(pkg) {
  return new Promise((resolve) => {
    console.log(`Menginstal ${pkg}...`);
    const process = spawn("npm", ["install", pkg], { shell: true });

    process.stdout.on("data", (data) => console.log(`Stdout: ${data.toString()}`));
    process.stderr.on("data", (data) => console.error(`Stderr: ${data.toString()}`));

    process.on("error", (err) => {
      console.error(`Error saat menginstal ${pkg}: ${err.message}`);
      resolve(false);
    });

    process.on("close", (code) => {
      console.log(`Proses instalasi ${pkg} selesai dengan kode: ${code}\n`);
      setTimeout(() => resolve(true), 1000); // Jeda 1 detik sebelum lanjut ke modul berikutnya
    });
  });
}

async function installModules() {
  for (const pkg of modules) {
    await installModule(pkg);
  }
}

async function changePermissions() {
  const paths = [
    "tcp-pps",
    "tcp",
    "udp"
  ];

  for (const path of paths) {
    console.log(`Mengubah permission ${path} menjadi 777...`);
    await new Promise((resolve) => {
      const process = spawn("chmod", ["777", path], { shell: true });

      process.stdout.on("data", (data) => console.log(`Stdout: ${data.toString()}`));
      process.stderr.on("data", (data) => console.error(`Stderr: ${data.toString()}`));

      process.on("error", (err) => {
        console.error(`Error saat mengubah permission ${path}: ${err.message}`);
        resolve(false);
      });

      process.on("close", (code) => {
        console.log(`Proses chmod ${path} selesai dengan kode: ${code}\n`);
        resolve(true);
      });
    });
  }
}

async function runNodeIndex() {
  console.log("Menjalankan `node index.js`...\n");
  const process = spawn("node", ["index.js"], { shell: true, detached: true });

  process.stdout.on("data", (data) => console.log(`Stdout: ${data.toString()}`));
  process.stderr.on("data", (data) => console.error(`Stderr: ${data.toString()}`));

  process.on("error", (err) => console.error(`Error saat menjalankan index.js: ${err.message}`));

  process.on("close", (code) => console.log(`Proses index.js selesai dengan kode: ${code}`));
}

// **Eksekusi berurutan**
(async () => {
  await installModules();
  await changePermissions();
  runNodeIndex();
})();