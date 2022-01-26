from fastapi import Header, HTTPException


async def verify_token(x_token: str = Header(...)):
    if x_token != 'dkjfdkf':
        raise HTTPException(status_code=400, details="Token Required")