// all of this fake spa garbo just so i have a layout page 🥹

const body = document.getElementById("app");

const whitelist = ["projects", "home", "blog"]

let postRender = [];
window.postRender = postRender;

async function updateCurrent(loc) {
    const links = document.querySelectorAll(".top a");

    loc = loc.startsWith("http") ? new URL(loc) : new URL(window.location.href + loc);
    loc = new URL(loc);
    loc = loc.pathname.replaceAll("/", "").replaceAll(".html", "").replaceAll("routes", "")

    links.forEach(link => {
        if (link.href.includes(loc)) {
            link.classList = `active`;
        } else {
            link.classList = ``;
        }
    })
}

async function render(data, loc) {
    const templates = {
        // i should add support for multiple templates in one file, just in case.
        //key   template str   to replace
        "home.html": ["loading-last-fm", window.fmResponse]
    }

    for (const template in templates) {
        if (loc.includes(template)) {
            const vals = templates[template];
            if (vals[1]) {
                data = data.replaceAll(`{{${vals[0]}}}`, vals[1])
            }
        }
    }

    body.innerHTML = data;

    // fuck the promise api bro 
    const scripts = Array.from(body.querySelectorAll("script"));
    const scriptPromises = scripts.map(old => {
        return new Promise((resolve, reject) => {
            const script = document.createElement("script");
            if (old.src) {
                script.src = old.src;
                script.onload = resolve;
                script.onerror = reject;
                if (old.type) {
                    script.type = old.type;
                }
            } else {
                script.textContent = old.textContent;
                resolve();
            }
            old.parentNode.replaceChild(script, old);
        });
    });

    await Promise.all(scriptPromises);

    postRender.forEach(fn => fn());
    postRender.length = 0;
};

async function navigate(loc) {
    try {
        const res = await fetch(loc);
        const data = await res.text();
        updateCurrent(loc);
        render(data, loc);
    } catch (e) {
        console.error(e);
    }
}

window.addEventListener("click", (e) => {
    const link = e.target.closest("a[href]");
    if (!link) return;
    if (!link.href.includes(window.location.hostname)) {
        link.target = "_blank";
        return;
    };
    e.preventDefault();
    navigate(link.href);
})

const search = window.location.search;
const params = new URLSearchParams(search);
if (params.get("a") && whitelist.includes(params.get("a"))) {
    navigate(params.get("a") + ".html");
} else {
    navigate("routes/home.html");
}
