load('config.js');

function execute(url) {
    // 1. Nếu url chứa chuỗi JSON (từ cache phiên bản cũ)
    try {
        let jsonStr = url;
        let idx = url.indexOf('{');
        if (idx !== -1) {
            jsonStr = url.slice(idx);
            let parsed = JSON.parse(decodeURIComponent(jsonStr));
            if (parsed && Array.isArray(parsed.servers) && parsed.servers.length > 0) {
                return Response.success(parsed.servers);
            }
        }
    } catch (e) {
    }

    // 2. Phân tích URL: dạng https://phim.nguonc.com/phim/{filmSlug}/{epSlug}
    url = normalizeUrl(url).replace(/\/+$/, "");
    let match = url.match(/\/phim\/([^\/?#]+)(?:\/([^\/?#]+))?/);
    let filmSlug = match ? match[1] : "";
    let epSlug = (match && match[2]) ? match[2] : "";

    if (!filmSlug) {
        let parts = url.split("/");
        epSlug = parts.pop();
        filmSlug = parts.pop();
    }

    let json = getJson(BASE_URL + "/api/film/" + filmSlug);

    if (json && json.status === "success" && json.movie && json.movie.episodes) {
        let servers = [];
        json.movie.episodes.forEach(function (server) {
            let serverName = server.server_name || "Server";
            let items = server.items || [];
            let matchedItem = null;

            if (epSlug) {
                for (let i = 0; i < items.length; i++) {
                    if (items[i].slug === epSlug || String(items[i].name) === epSlug) {
                        matchedItem = items[i];
                        break;
                    }
                }
            }

            // Nếu không tìm thấy tập cụ thể (hoặc phim lẻ), lấy tập đầu tiên
            if (!matchedItem && items.length > 0) {
                matchedItem = items[0];
            }

            if (matchedItem && matchedItem.embed) {
                servers.push({
                    title: serverName,
                    data: matchedItem.embed
                });
            }
        });

        if (servers.length > 0) {
            return Response.success(servers);
        }
    }

    return Response.error("Không tìm thấy server cho tập này");
}
