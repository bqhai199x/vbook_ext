load('config.js');

function resolveEmbedToStream(embed) {
    try {
        let r = fetch(embed, {
            headers: {
                "User-Agent": UserAgent.chrome(),
                "Referer": BASE_URL + "/"
            }
        });
        if (!r.ok) return "";
        let text = r.text();
        let m = text.match(/https?[:\\\/]+[^"'\s\\]+\.m3u8[^"'\s\\]*/i);
        if (m) return m[0].replace(/\\/g, "");
        m = text.match(/https?[:\\\/]+[^"'\s\\]+\.mp4[^"'\s\\]*/i);
        if (m) return m[0].replace(/\\/g, "");
    } catch (e) {
    }
    return "";
}

function execute(data) {
    if (!data) return Response.error("Không tìm thấy liên kết video");

    let playerType = "auto";
    try {
        if (PLAYER_MODE) {
            playerType = PLAYER_MODE;
        }
    } catch (e) {
    }

    // 1. Nếu đã là direct link m3u8 hoặc mp4
    if (data.indexOf(".m3u8") !== -1 || data.indexOf(".mp4") !== -1) {
        return Response.success({
            type: "native",
            data: data,
            host: BASE_URL,
            mimeType: "application/x-mpegURL",
            headers: {
                "User-Agent": UserAgent.chrome(),
                "Referer": BASE_URL + "/"
            },
            timeSkip: []
        });
    }

    // 2. Thử bóc tách trực tiếp link stream từ trang embed
    let stream = resolveEmbedToStream(data);
    if (stream) {
        return Response.success({
            type: "native",
            data: stream,
            host: BASE_URL,
            mimeType: "application/x-mpegURL",
            headers: {
                "User-Agent": UserAgent.chrome(),
                "Referer": data
            },
            timeSkip: []
        });
    }

    // 3. Sử dụng playerType (auto hoặc webview)
    return Response.success({
        type: playerType,
        data: data,
        host: BASE_URL,
        headers: {
            "User-Agent": UserAgent.chrome(),
            "Referer": BASE_URL + "/"
        },
        timeSkip: []
    });
}
