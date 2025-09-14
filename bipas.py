import cloudscraper

url = "https://api.permenmd.xyz/api/endpoint"

headers = {
    "User-Agent": "Mozilla/5.0",
    "Referer": "https://permenmd.xyz/",
    "Accept": "application/json"
}

scraper = cloudscraper.create_scraper()
res = scraper.get(url, headers=headers)
print(res.text)