from cryptography.fernet import Fernet


def create_key():
    """
    Generates random key of bytes type.
    """
    return Fernet.generate_key()