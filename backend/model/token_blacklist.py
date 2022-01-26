"""
Class definition for BlackList token.
"""

# Importing Dependencies
from sqlalchemy import Column, String, Integer
from core.database import Base


# Model Class Definition
class BlacklistedToken(Base):
    __tablename__ = "token_blacklist"

    # Property Declaration
    id = Column(Integer, primary_key=True, autoincrement=True)
    token = Column(String(500), unique=True, nullable=False)

    # Initialize Token
    def __init__(self, token):
        """
        Constructor for BlackListedToken Model Class.
        """
        self.token = token

    def __repr__(self):
        """
         Official way of representing BlackListedToken Instance.
        """
        return f"<BlacklistToken token={self.token} >"

    @classmethod
    def check_blacklist(cls, token):
        """
        Returns True if token already exists in blacklisted_token.
        """
        exists = cls.query.filter_by(token=token).first()
        return True if exists else False
