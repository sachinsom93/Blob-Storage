from cryptography.fernet import Fernet


def create_key():
    """
    Generates random key of bytes type.
    """
    return Fernet.generate_key()


def encrypt_file(contents, key):
    """
    Given a filename (str) and key (bytes), it
    encrypts the file.
    """
    f = Fernet(key) # Fernet object
    return f.encrypt(contents)