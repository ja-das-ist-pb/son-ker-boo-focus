const userip = document.getElementById("ip")
const msgarea = document.getElementById("msg-area")
const input = document.getElementById("input")
const baseip = "192.168.0.69:3333"
let ws = new WebSocket(`ws://${baseip}/ws`)

ws.onopen = () => {
    console.log("connected")
}
ws.onerror = (error) => {
    console.log("error", error)
}

async function getip() {
    const res = await fetch(`http://${baseip}/getip`)
    const data = await res.json()
    userip.innerText = "IP : " + data.ip
}

getip()

ws.onmessage = (event) => {
    const msg = document.createElement("div")
    const mn = document.createElement("div")
    const mt = document.createElement("div")
    const data = JSON.parse(event.data)

    mt.innerText = data.text
    mn.innerText = data.name
    msg.appendChild(mt)
    msg.appendChild(mn)
    msgarea.appendChild(msg)
    msgarea.scrollTop = msgarea.scrollHeight
}

function sendmsg() {
    const usertext = input.value
    const username = document.getElementById("name").value
    let msgdata = {
        text: usertext,
        name: username,
        ip: userip.innerText
    }
    ws.send(JSON.stringify(msgdata))
    input.value = ""
}

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const username = document.getElementById("name").value
        if (username.trim() === "")
            alert("Please enter your name")

        else
            sendmsg()
    }
})