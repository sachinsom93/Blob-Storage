"""
    Utility Functions for User CRUD.
"""

from sqlalchemy.orm import Session
from model.user import User as UserModel
from schema.user import CreateUser


def get_user(db: Session, user_id: int):
    return db.query(UserModel).filter(UserModel.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(UserModel).filter(UserModel.email == email).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(UserModel).offset(skip).limit(limit).all()


def create_user(db: Session, user: CreateUser):
    db_user = UserModel(name=user.name, email=user.email, password=user.password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
