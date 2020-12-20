const sleep = async (duration) => new Promise(resolve => setTimeout(resolve, duration));

document.addEventListener("DOMContentLoaded", async () => {
    const body = document.querySelector("body");
    const pixiv_id = document.querySelector("#pixiv_id");
    let metadata = await fetch("https://pixiv.ccf.workers.dev/").then(x => x.json());
    metadata = metadata["pixivBackgroundSlideshow.illusts"]["landscape"];
    let cur_objurl = null;
    (async function changeBackground() {
        let cur_image = metadata[Math.floor(Math.random() * metadata.length)];
        let url = "https://pixiv.ccf.workers.dev/" + cur_image["url"]["1200x1200"];
        let img_req = await fetch(url);
        let img = new Blob([await img_req.arrayBuffer()], { type: img_req.headers.get('content-type') });
        let objurl = URL.createObjectURL(img);
        body.style.backgroundImage = `url(${objurl})`;
        pixiv_id.innerHTML = `PixivID: ${cur_image["illust_id"]}`;
        pixiv_id.href = cur_image["www_member_illust_medium_url"];
        if (cur_objurl) URL.revokeObjectURL(cur_objurl);
        cur_objurl = objurl;
        setTimeout(changeBackground, 60 * 1000);
    })();
});