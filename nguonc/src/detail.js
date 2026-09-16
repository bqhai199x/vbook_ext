load('config.js');

function execute(url) {
    url = normalizeUrl(url);
    let slug = url.replace(/\/+$/, "").split("/").pop();
    let json = getJson(BASE_URL + "/api/film/" + slug);

    if (json && json.status === "success" && json.movie) {
        let movie = json.movie;
        let detailParts = [];
        if (movie.current_episode) detailParts.push("Tập hiện tại: " + movie.current_episode);
        if (movie.time) detailParts.push("Thời lượng: " + movie.time);
        if (movie.quality) detailParts.push("Chất lượng: " + movie.quality);
        if (movie.language) detailParts.push("Ngôn ngữ: " + movie.language);
        if (movie.director) detailParts.push("Đạo diễn: " + movie.director);
        if (movie.casts) detailParts.push("Diễn viên: " + movie.casts);

        let genres = [];
        if (movie.category) {
            for (let k in movie.category) {
                let catGroup = movie.category[k];
                if (catGroup && catGroup.list) {
                    catGroup.list.forEach(item => {
                        genres.push({
                            title: item.name,
                            input: BASE_URL + "/api/films/search?keyword=" + encodeURIComponent(item.name),
                            script: "gen.js"
                        });
                    });
                }
            }
        }

        let isOngoing = true;
        if (movie.current_episode && (movie.current_episode.indexOf("Hoàn tất") >= 0 || movie.current_episode.indexOf("Full") >= 0)) {
            isOngoing = false;
        }

        return Response.success({
            name: movie.name,
            cover: movie.thumb_url || movie.poster_url,
            author: movie.director || "Đang cập nhật",
            description: (movie.original_name ? "<b>" + movie.original_name + "</b><br><br>" : "") + (movie.description || ""),
            detail: detailParts.join("<br>"),
            url: BASE_URL + "/phim/" + movie.slug,
            type: "video",
            format: "series",
            ongoing: isOngoing,
            genres: genres
        });
    }

    return null;
}
