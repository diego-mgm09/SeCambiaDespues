from database.database import connect_mongo
from fastapi import FastAPI

app = FastAPI()

client = connect_mongo()

@app.get("/")
def init_session():
    return {'mensaje':'Hola mundo'}

try:
    client.command("ping")
    print("Conectado a MongoDB")
except Exception as e:
    print("Error de conexión:", e)

if __name__ == '__main__': 
    app.run(debug=True)



