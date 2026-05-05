const userip = document.getElementById("ip")
const msgarea = document.getElementById("msg-area")
const input = document.getElementById("input")
const username = document.getElementById("name").value
const baseurl = "http://192.168.0.69:3333"
const ws = new WebSocket("ws://192.168.0.69:3333/ws")

async function getip() {
    const res = await fetch(`${baseurl}/getip`)
    const data = await res.json()
    userip.innerText = "IP : " + data.ip
}

getip()

ws.onmessage = (event) => {
    const msg = document.createElement("div")
    const mt = document.createElement("div")
    const mn = document.createElement("div")
    mt.innerText = event.data.text
    mn.innerText = event.data.name
    msg.appendChild(mt)
    msg.appendChild(mn)
}

function sendmsg() {
    const usertext = input.value
    let msgdata = {
        text: usertext,
        name: username,
        ip: userip
    }
    ws.send(msgdata)
    input.value = ""
}

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        if (username.trim() === "")
            alert("Please enter your name")

        if (input.value.trim() !== "")
            sendmsg()
    }
})