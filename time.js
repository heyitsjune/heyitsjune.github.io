const timeElem = document.getElementById("time")

//ty stack https://stackoverflow.com/questions/11124322/get-date-time-for-a-specific-time-zone-using-javascript
function getTime() {
    let date = new Date(new Date().toLocaleString(undefined, { timeZone: "America/New_York" }));

    const time = date.toLocaleTimeString();
    let icon = time.includes("AM") ? "sun" : "moon";

    timeElem.innerHTML = `<img src="${icon}.svg"><span>${time.toLocaleLowerCase()}</span>`
}

setInterval(getTime, 1000)
getTime();