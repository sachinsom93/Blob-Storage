import io
import os
from sqlalchemy.orm import Session
from fastapi.responses import StreamingResponse
from fastapi import UploadFile, APIRouter, Depends, HTTPException
from backend.schema.blob import BlobRename

from backend.utils.get_db import get_db
from backend.schema.user import User
from backend.dependencies.auth import get_current_user
from backend.utils.io_helper import read_from_file, write_to_file
from backend.utils.user import get_user_by_email
from backend.utils.blob import delete_blob_obj, get_blob, rename_blob_obj, save_blob


blob_router = APIRouter()
base = os.path.abspath(".")


@blob_router.post("/upload")
async def upload_blob(new_file: UploadFile, current_user: User = Depends(get_current_user) ,db: Session = Depends(get_db)):

    contents = await new_file.read()
    await new_file.close()

    # file path
    filepath = f"{base}/data/{current_user.email}/{new_file.filename}"

    # check if directory exists
    if not os.path.exists(base + '/data/' + current_user.email):
        os.makedirs(base + "/data/" + current_user.email)

    # Write encrypted data to file
    if(write_to_file(filepath, contents, current_user.key)):

        # Store file url to database
        await save_blob(
            db=db,
            blob_url=filepath,
            blob_name=new_file.filename,
            content_type=new_file.content_type,
            user=current_user
        )
        return { "success": True, "file": new_file.filename }

    HTTPException(status_code=500, detail="Internal Server Error")


@blob_router.get("/files")
async def file_list(current_user: User = Depends(get_current_user)):
    return current_user.blob


@blob_router.get("/download/{file_id}")
async def downlaod_blob(file_id: int, current_user: User = Depends(get_current_user)):

    # Get blob object
    blob_obj =  get_blob(current_user=current_user, blob_id=file_id)

    try:
        # Get blob content
        blob_content = read_from_file(blob_obj.blob_url, current_user.key)

        # Stream the blob content
        return StreamingResponse(io.BytesIO(blob_content), media_type=blob_obj.content_type)

    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Something Went Wrong.")



@blob_router.put("/rename")
async def rename_blob(request: BlobRename, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):

    # Get Blob Object
    blob_obj = get_blob(current_user, request.id)

    # Updated Blob Path
    blob_path =  f"{base}/data/{current_user.email}/{request.new_blob_name}"

    try:
        # Rename Blob Object
        updated_blob = await rename_blob_obj(
            db=db,
            new_blob_name=request.new_blob_name,
            blob=blob_obj,
            new_blob_path=blob_path,
            user=current_user
        )

        return {
            "success": True,
            "message": "File Renamed.",
            "file": updated_blob
        }
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Something Went Wrong.")


@blob_router.delete("/delete/{file_id}")
async def delete_blob(file_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):

    # Get Blob Object
    blob_obj = get_blob(current_user, file_id)

    try:
        # Rename Blob Object
        await delete_blob_obj(
            db=db,
            blob=blob_obj,
            user=current_user
        )
        return {
            "success": True,
            "message": "File Deleted.",
        }
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Something Went Wrong.")