(async () => {
    const res = await fetch("https://raw.githubusercontent.com/heyitsjune/stupid-projects/refs/heads/main/grokisgay.js");
    const data = await res.text();
    document.getElementById("grokslop").href = data
})()