from pydantic import BaseModel, EmailStr

class UserBase(BaseModel):
    email: EmailStr

class User(UserBase):
    id: int
    name: str
    password: str
    key: str

class CreateUser(UserBase):
    name: str
    password: str

class AuthUser(UserBase):
    password: str

class UserResponse(UserBase):
    pass
