from cryptography.fernet import Fernet


def create_key():
    """
    Generates random key of bytes type.
    """
    return Fernet.generate_key()


def encrypt_file(contents, key):
    """
    Given file contents (bytes) and key (bytes), it
    encrypts the file.
    """
    f = Fernet(key) # Fernet object
    return f.encrypt(contents)


def decrypt_file(contents, key):
    """
    Given file contents (byte) and key (bytes), it
    decrypts the file.
    """
    f = Fernet(key)
    return f.decrypt(contents)