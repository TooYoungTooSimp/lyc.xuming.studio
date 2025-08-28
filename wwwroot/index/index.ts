// @entrypoint

const sleep = async (duration: number) => new Promise(resolve => setTimeout(resolve, duration));

document.addEventListener("DOMContentLoaded", async () => {
    const body = document.querySelector("body")!;
    const pixiv_id = document.querySelector<HTMLAnchorElement>("#pixiv_id")!;
    let metadata = await fetch("https://pixiv.ccf.workers.dev/").then(x => x.json());
    metadata = metadata["pixivBackgroundSlideshow.illusts"]["landscape"];
    let cur_objurl: string | null = null;
    (async function changeBackground() {
        let cur_image = metadata[Math.floor(Math.random() * metadata.length)];
        let url = "https://pixiv.ccf.workers.dev/" + cur_image["url"]["1200x1200"];
        let img_req = await fetch(url);
        let img = new Blob([await img_req.arrayBuffer()], { type: img_req.headers.get('content-type')! });
        let objurl = URL.createObjectURL(img);
        body.style.backgroundImage = `url(${objurl})`;
        pixiv_id.innerHTML = `PixivID: ${cur_image["illust_id"]}`;
        pixiv_id.href = cur_image["www_member_illust_medium_url"];
        pixiv_id.title = `${cur_image["illust_title"]} @ ${cur_image["user_name"]}`;
        if (cur_objurl) URL.revokeObjectURL(cur_objurl);
        cur_objurl = objurl;
        setTimeout(changeBackground, 60 * 1000);
    })();
    const titles = document.querySelectorAll("article h1");
    titles.forEach(title => {
        // let date=/\((\d{2})\/(\d{2})\/(\d{2})\)/.exec(title.innerHTML);
        // The Replay (25/06/18)
        let title_parts = /^(.*)\((\d{2})\/(\d{2})\/(\d{2})\)$/.exec(title.innerHTML);
        if (title_parts) {
            let [_, title_txt, year, month, day] = title_parts;
            title.innerHTML = title_txt.trim();
            console.log(`Title: ${title_txt}, Date: ${year}-${month}-${day}`);
            let pDate = document.createElement("p");
            pDate.innerText = `20${year}/${month}/${day}`;
            pDate.style.textAlign = "right";
            title.after(pDate);
        }
    });
});
