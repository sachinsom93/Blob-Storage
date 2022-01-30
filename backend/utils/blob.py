import os
from fastapi import HTTPException
from sqlalchemy.orm import Session
from sqlite3 import IntegrityError


from backend.schema.user import User
from backend.schema.blob import Blob as BlobSchema
from backend.model.blob import Blob


def get_blob(current_user: User, blob_id: int):
    """
    Returns a Blob object of given blob_id and
    user object.
    """
    blobs = current_user.blob
    blob = list(filter(lambda b: b.id == blob_id, blobs))
    if(len(blob) != 1):
        raise HTTPException(status_code=406, detail="File Not Exists.")
    return blob[0]


async def save_blob(db: Session, blob_url: str, blob_name: str, content_type: str, user: User):
    """
    Saves a new blob object to database.
    """
    try:
        blob = Blob(
            blob_url=blob_url,
            blob_name=blob_name,
            content_type=content_type,
            user=user
        )
        db.add(blob)
        db.commit()
        db.refresh(blob)
        return blob
    except IntegrityError as e:
        print(e)
        raise HTTPException(status_code=404, detail="Already Exists file.")
    except Exception as e:
        print(e)
        raise HTTPException(status_code=404, detail="Already Exists file.")


async def rename_blob_obj(db: Session, new_blob_name: str, new_blob_path: str, blob: BlobSchema, user: User):
    """
    Renames a given blob object.
    """
    try:
        # File extension
        ext = blob.blob_url.split(".")[-1]

        # Rename On-Disk Storage path
        os.rename(blob.blob_url, f"{new_blob_path}.{ext}")

        # Update database
        blob.blob_name = f"{new_blob_name}.{ext}"
        blob.blob_url = f"{new_blob_path}.{ext}"
        db.add(blob)
        db.commit()
        db.refresh(blob)
        return blob
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=e)
