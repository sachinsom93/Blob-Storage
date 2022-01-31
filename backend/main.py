from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from backend.model import blob, user, token_blacklist
from backend.core.database import engine
from backend.routes.auth import auth_router
from backend.routes.blob import blob_router

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
blob.Base.metadata.create_all(bind=engine)

# health check api
@app.get("/healthcheck")
def healthCheck():
    return { "healthcheck": "Everything OK!" }


# Register Routes
app.include_router(auth_router, prefix="/api/v1/user", tags=["User"])
app.include_router(blob_router, prefix="/api/v1/blob", tags=["Blob"])