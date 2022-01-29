from backend.utils.compress import compresss_file_content
from backend.utils.crypto import encrypt_file


def write_to_file(filename, content, key):
    try:
        with open(filename, 'wb') as f:
            encrypted_data = encrypt_file(content, key) # Encryption
            compressed_data = compresss_file_content(encrypted_data) # Compression
            f.write(compressed_data) # write
            f.close()
    except Exception as e:
        print(e)
        return False
    return True