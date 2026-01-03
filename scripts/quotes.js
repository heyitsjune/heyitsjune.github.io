(async () => {
    const quotesElem = document.getElementById("quotes");
    const quotes = (await (async () => { const res = await fetch("quotes.txt"); return await res.text() })()).split("\n")

    let r = 0
    const length = quotes.length - 1
    quotesElem.addEventListener("click", () => {
        r++;
        if (r > length) r = 0;
        quotesElem.textContent = `"${quotes[r]}"`
    })
})()