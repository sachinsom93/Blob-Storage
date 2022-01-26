from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from model import user, token_blacklist
from core.database import engine
from rourtes.auth import auth_router

# Application instance
app = FastAPI()

# Enabling CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create Database
user.Base.metadata.create_all(bind=engine)
token_blacklist.Base.metadata.create_all(bind=engine)


# Register Routes
app.include_router(auth_router, prefix="/api/v1/user")