"""
    Router for user authentication.
"""

import email
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm

from backend.schema.token import Token
from backend.utils.get_db import get_db
from backend.dependencies.auth import get_current_user
from backend.schema.user import UserResponse, CreateUser, User
from backend.utils.user import create_user, get_user_by_email



auth_router = APIRouter()


@auth_router.post('/create')
async def create_new_user(user: CreateUser, db: Session = Depends(get_db)):
    old_user = get_user_by_email(db, email=user.email)
    if(old_user):
        return HTTPException(status_code=400, detail="Email already registered.")
    new_user = create_user(db, user)
    return UserResponse(email=new_user.email)



@auth_router.get("/profile")
def read_user(current_user: User = Depends(get_current_user)):
    return {
        "email": current_user.email,
        "name": current_user.name
    }


@auth_router.post('/authenticate', response_model=Token)
async def authenticate_user(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    db_user = get_user_by_email(db, email=form_data.username)
    if not db_user:
        raise HTTPException(status_code=404, detail="Email or password invalid.")
    if not db_user.check_password(password=form_data.password):
        raise HTTPException(status_code=406, detail="Email or password invalid.")
    try:
        access_token = db_user.encode_access_token()
        return {"access_token": access_token, "token_type": "bearer"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=e)



