"""
Class definition for Blob.
"""

# Importing Dependencies
from sqlalchemy.orm import relationship
from sqlalchemy import Column, String, Integer, ForeignKey

from backend.core.database import Base


# Model Class Definition
class Blob(Base):
    __tablename__ = "Blob"

    # Property Declaration
    id = Column(Integer, primary_key=True, autoincrement=True)
    blob_name = Column(String, nullable=False)
    content_type = Column(String, nullable=False)
    blob_url = Column(String, nullable=False, unique=True)
    user_id = Column(Integer, ForeignKey("User.id"))
    user = relationship("User", back_populates="blob")

    # Initialize Token
    def __init__(self, blob_url, blob_name, content_type, user):
        """
        Constructor for BlackListedToken Model Class.
        """
        self.blob_url = blob_url
        self.blob_name = blob_name
        self.content_type = content_type
        self.user = user

