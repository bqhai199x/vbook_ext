let BASE_URL = "https://phim.nguonc.com";
try {
    if (DOMAIN) {
        BASE_URL = DOMAIN;
    } else if (CONFIG_URL) {
        BASE_URL = CONFIG_URL;
    }
} catch (error) {
}

function normalizeUrl(url) {
    return url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
}

function getJson(url) {
    let response = fetch(url, {
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Referer": BASE_URL + "/"
        }
    });
    if (response.ok) {
        return response.json();
    }
    return null;
}
