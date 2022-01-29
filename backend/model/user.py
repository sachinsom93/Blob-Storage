"""
Class definition for Base User Model.
"""

# Importing Dependencies
import jwt
import bcrypt
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, LargeBinary, ForeignKey
from datetime import datetime, timezone, timedelta

from backend.core import config
from backend.core.database import Base
from backend.utils.result import Result
from backend.model.token_blacklist import BlacklistedToken


# Model Class Definition
class User(Base):
    """
    Class definition for User Model.
    """
    __tablename__="User"
    # Properties Declaration
    id = Column(Integer, primary_key=True, autoincrement=True)
    key = Column(LargeBinary, nullable=False, unique=True)
    name = Column(String(255), nullable=False, unique=False)
    email = Column(String(255), nullable=False, unique=True)
    password_hash = Column(String(255), nullable=False)
    blob = relationship("Blob", back_populates="user")

    def __init__(self, name, email, password, key):
        """
        Constructor for base user model.
        """
        self.name = name
        self.email = email
        self.password = password
        self.key = key

    @property
    def password(self):
        """
        Write only password field.
        """
        raise AttributeError("Password: write only access.")

    @password.setter
    def password(self, password):
        """
        Storing password as password_hash.
        """
        log_rounds =  config.BCRYPT_LOG_ROUNDS
        salt = bcrypt.gensalt(log_rounds)
        self.password_hash = bcrypt.hashpw(password.encode('utf8'), salt)

    def check_password(self, password):
        """
        Comparing pasword with password_hash.
        """
        return bcrypt.checkpw(password.encode('utf8'), self.password_hash)

    def __repr__(self):
        """
        Official way of representing user in db.
        """
        return (
            f"<User email={self.email}, public_id={self.id}"
        )


    # Methods for encoding and Decoding
    def encode_access_token(self):
        """
        Generating jwt access tokens.
        """

        # Token Properties
        now = datetime.now(timezone.utc)
        token_age_h = config.TOKEN_EXPIRE_HOURS
        token_age_min = config.TOKEN_EXPIRE_MIN
        expires = now + timedelta(hours=token_age_h, minutes=token_age_min)

        # Check for TESTING environment
        if config.TESTING:
            expires = now + timedelta(seconds=5)

        # Create Payload
        payload = dict(exp=expires, iat=now, sub=self.email)

        # Get secret key
        key = config.JWT_SECRET_KEY

        # Return encoded user
        return jwt.encode(payload, key, algorithm="HS256")

    @staticmethod
    def decode_access_token(access_token):
        """
        Decodes the access token.
        """

        # Check for token type
        if isinstance(access_token, bytes):
            access_token = access_token.decode("ascii")

        # Check for Bearer
        if access_token.startswith("Bearer"):
            split = access_token.split("Bearer")
            access_token = split[1].strip()
        try:
            key = config.JWT_SECRET_KEY
            payload = jwt.decode(access_token, key, algorithms="HS256")

        # Handle Errors
        except jwt.ExpiredSignatureError:
            error = "Access token expired, Please login again."
            return Result.Fail(error_message=error)

        except jwt.InvalidTokenError:
            error = "Invalid token. Please  log in again."
            return Result.Fail(error_message=error)

        # if BlacklistedToken.check_blacklist(access_token):
        #     error = "Token blacklisted. Please try to log in again."
        #     return Result.Fail(error_message=error)

        # Following keys would be accessible
        # to decorated functinos
        user_dict = dict(
            email=payload["sub"],
            token=access_token,
            expires_at=payload["exp"],
        )

        return Result.Ok(value=user_dict)