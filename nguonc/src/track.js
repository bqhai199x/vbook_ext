load('config.js');

function execute(data) {
    if (!data) return Response.error("Không tìm thấy liên kết video");

    let isDirect = data.indexOf(".m3u8") >= 0 || data.indexOf(".mp4") >= 0;

    return Response.success({
        type: isDirect ? "native" : "webview",
        data: data,
        host: BASE_URL,
        mimeType: isDirect ? "application/x-mpegURL" : "",
        headers: {
            "Referer": BASE_URL + "/"
        }
    });
}
