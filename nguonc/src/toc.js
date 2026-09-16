load('config.js');

function execute(url) {
    let slug = url.replace(/\/+$/, "").split("/").pop();
    let json = getJson(BASE_URL + "/api/film/" + slug);

    if (json && json.status === "success" && json.movie && json.movie.episodes) {
        let episodes = json.movie.episodes;
        let chapters = [];
        let multiServers = episodes.length > 1;

        episodes.forEach(server => {
            let serverName = server.server_name || "Server";
            let items = server.items || [];
            items.forEach(item => {
                let epName = item.name ? item.name.toString() : "";
                if (epName.toLowerCase().indexOf("tập") === -1 && epName.toLowerCase().indexOf("full") === -1) {
                    epName = "Tập " + epName;
                }
                let displayName = multiServers ? ("[" + serverName + "] " + epName) : epName;
                chapters.push({
                    name: displayName,
                    url: item.embed,
                    host: BASE_URL
                });
            });
        });

        return Response.success(chapters);
    }

    return null;
}
