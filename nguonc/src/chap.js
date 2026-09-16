load('config.js');

function execute(url) {
    // 1. Nếu url là chuỗi JSON do toc.js đóng gói chứa sẵn danh sách servers
    try {
        let parsed = JSON.parse(url);
        if (parsed && Array.isArray(parsed.servers) && parsed.servers.length > 0) {
            return Response.success(parsed.servers);
        }
    } catch (e) {
    }

    // 2. Dự phòng: nếu url là đường dẫn thông thường
    url = normalizeUrl(url);
    let slug = url.replace(/\/+$/, "").split("/").pop();
    let json = getJson(BASE_URL + "/api/film/" + slug);

    if (json && json.status === "success" && json.movie && json.movie.episodes) {
        let servers = [];
        json.movie.episodes.forEach(function (server) {
            let serverName = server.server_name || "Server";
            let items = server.items || [];
            if (items.length > 0) {
                servers.push({
                    title: serverName,
                    data: items[0].embed
                });
            }
        });
        if (servers.length > 0) {
            return Response.success(servers);
        }
    }

    return Response.error("Không tìm thấy server cho tập này");
}
