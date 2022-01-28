from backend.utils.crypto import encrypt_file


def write_to_file(filename, content, key):
    try:
        with open(filename, 'wb') as f:
            encrypted_data = encrypt_file(content, key)
            f.write(encrypted_data)
            f.close()
    except Exception as e:
        print(e)
        return False
    return True