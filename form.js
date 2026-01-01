const input = document.getElementById("message-text");
const api = "https://formsubmit.co/ajax/4d61db996cd229353a3b5c7b2aaffbf2";

async function sendMessage(e) {
    e.preventDefault();
    try {
        const res = await fetch(api, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: input.value })
        })
        console.log(res.ok);
        if (res.ok) {
            input.value = "";
            input.setAttribute('placeholder', 'Sent!')
            input.blur();
        }
        setTimeout(() => {
            input.setAttribute('placeholder', 'Send me a message ^-^')
        }, 2500)
    } catch (e) {
        window.alert("Failed to send message :c")
    }
}

input.addEventListener("keydown", (e) => { e.key == "Enter" ? sendMessage(e) : false; })