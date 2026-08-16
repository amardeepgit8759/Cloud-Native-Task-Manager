import os
from dotenv import load_dotenv

load_dotenv()

class Config:

    MONGO_URL = os.getenv(
        "MONGO_URL",
        "mongodb://host.docker.internal:27017/"
    )

    DB_NAME = os.getenv(
        "DB_NAME",
        "taskdb"
    )