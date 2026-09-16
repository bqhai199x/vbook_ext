load('config.js');

function execute(url, page) {
    if (!page) page = '1';
    if (!url.startsWith("http")) {
        url = BASE_URL + url;
    }
    let sep = url.indexOf("?") >= 0 ? "&" : "?";
    let fullUrl = url + sep + "page=" + page;
    let json = getJson(fullUrl);

    if (json && json.status === "success" && json.items) {
        let list = [];
        json.items.forEach(item => {
            let descParts = [];
            if (item.current_episode) descParts.push(item.current_episode);
            if (item.quality) descParts.push(item.quality);
            if (item.year) descParts.push(item.year);

            list.push({
                name: item.name,
                link: BASE_URL + "/phim/" + item.slug,
                cover: item.thumb_url || item.poster_url,
                description: descParts.join(" • ") || item.original_name || "",
                host: BASE_URL
            });
        });

        let next = "";
        if (json.paginate && json.paginate.current_page < json.paginate.total_page) {
            next = (json.paginate.current_page + 1).toString();
        }
        return Response.success(list, next);
    }
    return null;
}
