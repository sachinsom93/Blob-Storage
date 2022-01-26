import os

from dotenv import load_dotenv
from sqlalchemy import false

load_dotenv("./.env")


TESTING = False
API_USERNAME = os.environ["API_USERNAME"]
API_PASSWORD = os.environ["API_PASSWORD"]

# Auth configs.
API_SECRET_KEY = os.environ["API_SECRET_KEY"]
API_ALGORITHM = os.environ["API_ALGORITHM"]
API_ACCESS_TOKEN_EXPIRE_MINUTES = int(
    os.environ["API_ACCESS_TOKEN_EXPIRE_MINUTES"]
)  # infinity

# Bcrypt
BCRYPT_LOG_ROUNDS = int(os.environ["LOG_ROUNDS"])

# JWt tokens
TOKEN_EXPIRE_HOURS = int(os.environ["TOKEN_EXPIRE_HOURS"])
TOKEN_EXPIRE_MIN = int(os.environ["TOKEN_EXPIRE_MINUTES"])
JWT_SECRET_KEY = os.environ["JWT_SECRET_KEY"]