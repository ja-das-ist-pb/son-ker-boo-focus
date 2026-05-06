from fastapi import FastAPI, Request, WebSocket, WebSocketDisconnect
from fastapi.staticfiles import StaticFiles

app = FastAPI()



@app.get("/getip")
def getip(request:Request):
    ip = request.client.host
    return {"ip": ip}


connections = []

@app.websocket("/ws")
async def magic_ws(ws: WebSocket):
    await ws.accept()
    connections.append(ws)

    try:
        while True:
            data = await ws.receive_json()
            for client in connections:
                await client.send_json(data)
    
    except WebSocketDisconnect:
        connections.remove(ws)


app.mount("/home", StaticFiles(directory="frontend", html=True), name="static")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host = "0.0.0.0", port = 3333, reload = True)