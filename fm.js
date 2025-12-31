// im too lazy to make and api key and use the official ty whoevers hosting this
// realized while testing this that I didn't have youtube music scrobbling on </3
const fmElem = document.getElementById("last");

(async () => {
    const res = await fetch("https://www.ballix.net/whatsplaying/?user=heyitsjune");

    let message = "Failed to get song info :c"
    if (res.ok) {
        const { artist, name, url, nowplaying } = await res.json();

        if (artist && name && url) {
            message = `<a href="${url}">`
            if (nowplaying) {
                message += "I'm currently listening to "
            } else {
                message += "I last listened to ";
            }
            message += `${name} by ${artist}</a>`
        };
    }
    fmElem.innerHTML = `<p>${message}</p>`

})();