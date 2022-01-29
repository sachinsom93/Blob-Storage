from sqlalchemy.orm import Session
from fastapi import HTTPException, status, Depends

from backend.utils.get_db import get_db
from backend.model.user import User
from backend.schema.token import TokenData
from backend.utils.user import get_user_by_email
from backend.core.extensions import oauth2_scheme


async def get_current_user(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        # SECRET_KEY = config.JWT_SECRET_KEY
        # ALGORITHM = "HS256"
        # payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        # username: str = payload.get("sub")
        # if username is None:
        #     raise credentials_exception
        payload = User.decode_access_token(token)
        if not payload.success:
            raise credentials_exception
        email = payload.value["email"]
        if email is None:
            raise credentials_exception
        token_data = TokenData(email=email)
    except Exception as e:
        print(e)
        raise credentials_exception
    user = get_user_by_email(db=db, email=token_data.email)
    if user is None:
        raise credentials_exception
    return user
