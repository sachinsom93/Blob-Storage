"""
    Utility Functions for User CRUD.
"""

from sqlalchemy.orm import Session

from backend.schema.user import CreateUser, User
from backend.utils.crypto import create_key
from backend.model.user import User as UserModel


def get_user(db: Session, user_id: int):
    return db.query(UserModel).filter(UserModel.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(UserModel).filter(UserModel.email == email).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(UserModel).offset(skip).limit(limit).all()


def get_user_files(db: Session):
    pass


def create_user(db: Session, user: CreateUser):
    key = create_key() # Creates random key
    db_user = UserModel(name=user.name, email=user.email, password=user.password, key=key)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

