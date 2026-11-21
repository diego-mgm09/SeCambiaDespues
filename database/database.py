import os
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

def connect_mongo():
    print("URL cargada:", os.getenv('MONGODB_URL') is not None)
    cliente_db = MongoClient(os.getenv('MONGODB_URL'))
    db = cliente_db.hackaton
    return db