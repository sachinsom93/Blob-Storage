from pydantic import BaseModel, EmailStr


class Blob(BaseModel):
    id: int
    user_id: int
    blob_name: str
    blob_url: str
    content_type: str

class BlobRename(BaseModel):
    id: int
    new_blob_name: str


class BlobShare(BaseModel):
    blob_id: int
    user_email: EmailStr