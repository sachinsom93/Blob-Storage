"""
    Utility Functions for User CRUD.
"""

from fastapi import HTTPException
from sqlite3 import IntegrityError
from sqlalchemy.orm import Session

from backend.model.blob import Blob
from backend.schema.user import CreateUser, User
from backend.utils.crypto import create_key
from backend.model.user import User as UserModel


def get_user(db: Session, user_id: int):
    return db.query(UserModel).filter(UserModel.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(UserModel).filter(UserModel.email == email).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(UserModel).offset(skip).limit(limit).all()


async def save_blob(db: Session, blob_url: str, blob_name: str, content_type: str, user: User):
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

def get_user_files(db: Session):
    pass

def create_user(db: Session, user: CreateUser):
    key = create_key() # Creates random key
    db_user = UserModel(name=user.name, email=user.email, password=user.password, key=key)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_blob(current_user: User, blob_id: int):
    blobs = current_user.blob
    blob = list(filter(lambda b: b.id == blob_id, blobs))
    if(len(blob) != 1):
        raise HTTPException(status_code=406, detail="File Not Exists.")
    return blob[0]