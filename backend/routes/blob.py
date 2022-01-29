import os
from sqlalchemy.orm import Session
from fastapi import UploadFile, APIRouter, Depends, HTTPException
from backend.dependencies.auth import get_current_user

from backend.utils.get_db import get_db
from backend.schema.user import User
from backend.utils.io_helper import write_to_file
from backend.utils.user import get_user_by_email


blob_router = APIRouter()
base = os.path.abspath(".")


@blob_router.post("/upload")
async def upload_blob(new_file: UploadFile, current_user: User = Depends(get_current_user) ,db: Session = Depends(get_db)):

    contents = await new_file.read()
    await new_file.close()

    # Get user
    db_user = get_user_by_email(db, email=current_user.email)
    if not db_user:
        raise HTTPException(status_code=404, detail="Email invalid.")

    # file path
    filepath = f"{base}/data/{current_user.email}/{new_file.filename}"

    # check if directory exists
    if not os.path.exists(base + '/data/' + current_user.email):
        os.makedirs(base + "/data/" + current_user.email)

    # Write encrypted data to file
    if(write_to_file(filepath, contents, db_user.key)):
        return { "file": new_file.filename }

    HTTPException(status_code=500, detail="Internal Server Error")