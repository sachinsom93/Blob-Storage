from pydantic import BaseModel


class Blob(BaseModel):
    id: int
    user_id: int
    blob_name: str
    blob_url: str
    content_type: str

class BlobRename(BaseModel):
    id: int
    new_blob_name: str