from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles

app = FastAPI()

app.mount("/home", StaticFiles(directory="frontend", html=True), name="static")

@app.get("/getip")
def getip(request:Request):
    ip = request.client.host
    return {"ip": ip}



if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host = "0.0.0.0", port = 3333, reload = True)