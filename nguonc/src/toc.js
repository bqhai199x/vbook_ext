load('config.js');

function execute(url) {
    url = normalizeUrl(url);
    let slug = url.replace(/\/+$/, "").split("/").pop();
    let json = getJson(BASE_URL + "/api/film/" + slug);

    if (json && json.status === "success" && json.movie && json.movie.episodes) {
        let episodes = json.movie.episodes;
        let epMap = {};
        let epOrder = [];

        episodes.forEach(function (server) {
            let serverName = server.server_name || "Server";
            let items = server.items || [];
            items.forEach(function (item) {
                let epKey = item.slug || item.name;
                if (!epMap[epKey]) {
                    epMap[epKey] = {
                        name: item.name ? item.name.toString() : "",
                        slug: epKey,
                        filmSlug: slug,
                        servers: []
                    };
                    epOrder.push(epKey);
                }
                epMap[epKey].servers.push({
                    title: serverName,
                    data: item.embed
                });
            });
        });

        let chapters = [];
        epOrder.forEach(function (epKey) {
            let ep = epMap[epKey];
            let displayName = ep.name;
            if (displayName.toLowerCase().indexOf("tập") === -1 && displayName.toLowerCase().indexOf("full") === -1) {
                displayName = "Tập " + displayName;
            }

            chapters.push({
                name: displayName,
                url: JSON.stringify({
                    filmSlug: ep.filmSlug,
                    epSlug: ep.slug,
                    servers: ep.servers
                }),
                host: BASE_URL
            });
        });

        return Response.success(chapters);
    }

    return null;
}
