"""
Class definition for Blob.
"""

# Importing Dependencies
from sqlalchemy import Column, String, Integer

from backend.core.database import Base


# Model Class Definition
class Blob(Base):
    __tablename__ = "Blob"

    # Property Declaration
    id = Column(Integer, primary_key=True, autoincrement=True)
    filepath = Column(String, nullable=False)

    # Initialize Token
    def __init__(self, filepath):
        """
        Constructor for BlackListedToken Model Class.
        """
        self.filepath = filepath

