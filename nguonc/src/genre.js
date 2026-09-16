load('config.js');

function execute() {
    return Response.success([
        // Thể loại
        { title: "Hành Động", input: BASE_URL + "/api/films/the-loai/hanh-dong", script: "gen.js" },
        { title: "Cổ Trang", input: BASE_URL + "/api/films/the-loai/co-trang", script: "gen.js" },
        { title: "Tình Cảm", input: BASE_URL + "/api/films/the-loai/tinh-cam", script: "gen.js" },
        { title: "Tâm Lý", input: BASE_URL + "/api/films/the-loai/tam-ly", script: "gen.js" },
        { title: "Hài", input: BASE_URL + "/api/films/the-loai/phim-hai", script: "gen.js" },
        { title: "Hoạt Hình", input: BASE_URL + "/api/films/the-loai/hoat-hinh", script: "gen.js" },
        { title: "Phiêu Lưu", input: BASE_URL + "/api/films/the-loai/phieu-luu", script: "gen.js" },
        { title: "Khoa Học Viễn Tưởng", input: BASE_URL + "/api/films/the-loai/khoa-hoc-vien-tuong", script: "gen.js" },
        { title: "Kinh Dị", input: BASE_URL + "/api/films/the-loai/kinh-di", script: "gen.js" },
        { title: "Hình Sự", input: BASE_URL + "/api/films/the-loai/hinh-su", script: "gen.js" },
        { title: "Gây Cấn", input: BASE_URL + "/api/films/the-loai/gay-can", script: "gen.js" },
        { title: "Bí Ẩn", input: BASE_URL + "/api/films/the-loai/bi-an", script: "gen.js" },
        { title: "Chiến Tranh", input: BASE_URL + "/api/films/the-loai/chien-tranh", script: "gen.js" },
        { title: "Lịch Sử", input: BASE_URL + "/api/films/the-loai/lich-su", script: "gen.js" },
        { title: "Chính Kịch", input: BASE_URL + "/api/films/the-loai/chinh-kich", script: "gen.js" },
        { title: "Gia Đình", input: BASE_URL + "/api/films/the-loai/gia-dinh", script: "gen.js" },
        { title: "Giả Tưởng", input: BASE_URL + "/api/films/the-loai/gia-tuong", script: "gen.js" },
        { title: "Tài Liệu", input: BASE_URL + "/api/films/the-loai/tai-lieu", script: "gen.js" },
        { title: "Phim Nhạc", input: BASE_URL + "/api/films/the-loai/phim-nhac", script: "gen.js" },
        { title: "Miền Tây", input: BASE_URL + "/api/films/the-loai/mien-tay", script: "gen.js" },
        { title: "Phim 18+", input: BASE_URL + "/api/films/the-loai/phim-18", script: "gen.js" },

        // Quốc gia
        { title: "Trung Quốc", input: BASE_URL + "/api/films/quoc-gia/trung-quoc", script: "gen.js" },
        { title: "Hàn Quốc", input: BASE_URL + "/api/films/quoc-gia/han-quoc", script: "gen.js" },
        { title: "Âu Mỹ", input: BASE_URL + "/api/films/quoc-gia/au-my", script: "gen.js" },
        { title: "Nhật Bản", input: BASE_URL + "/api/films/quoc-gia/nhat-ban", script: "gen.js" },
        { title: "Việt Nam", input: BASE_URL + "/api/films/quoc-gia/viet-nam", script: "gen.js" },
        { title: "Thái Lan", input: BASE_URL + "/api/films/quoc-gia/thai-lan", script: "gen.js" },
        { title: "Hồng Kông", input: BASE_URL + "/api/films/quoc-gia/hong-kong", script: "gen.js" },
        { title: "Đài Loan", input: BASE_URL + "/api/films/quoc-gia/dai-loan", script: "gen.js" },
        { title: "Ấn Độ", input: BASE_URL + "/api/films/quoc-gia/an-do", script: "gen.js" },
        { title: "Anh", input: BASE_URL + "/api/films/quoc-gia/anh", script: "gen.js" },
        { title: "Pháp", input: BASE_URL + "/api/films/quoc-gia/phap", script: "gen.js" }
    ]);
}
