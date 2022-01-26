"""
    Router for user authentication.
"""

from sqlalchemy.orm import Session
from fastapi.responses import JSONResponse
from fastapi import APIRouter, Depends, HTTPException

from schema import user
from utils.get_db import get_db
from utils.user import create_user, get_user, get_user_by_email



auth_router = APIRouter()


@auth_router.post('/create')
async def create_new_user(user: user.CreateUser, db: Session = Depends(get_db)):
    old_user = get_user_by_email(db, email=user.email)
    if(old_user):
        return HTTPException(status_code=400, detail="Email already registered.")
    return create_user(db, user)


@auth_router.get("/{user_id}")
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found.")
    return db_user


@auth_router.post('/authenticate')
async def authenticate_user(user: user.AuthUser, db: Session = Depends(get_db)):
    db_user = get_user_by_email(db, email=user.email)
    if not db_user:
        raise HTTPException(status_code=404, detail="Email or password invalid.")
    if not db_user.check_password(password=user.password):
        raise HTTPException(status_code=406, detail="Email or password invalid.")
    try:
        token = db_user.encode_access_token()
        res =  {
            "status_code": 200,
            "message": "User authenticated.",
            "token": token
        }
        return JSONResponse(content=res)
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Something went wrong")



