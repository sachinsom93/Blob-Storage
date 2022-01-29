from pydantic import BaseModel

class UserBase(BaseModel):
    email: str

class User(UserBase):
    id: int
    name: str
    password: str

class CreateUser(UserBase):
    name: str
    password: str

class AuthUser(UserBase):
    password: str

class UserResponse(UserBase):
    pass
