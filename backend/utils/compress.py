import zlib, sys, bz2

def compresss_file_content(data):
    """
    Compresses the given data and returns
    compressed data.
    """
    print("Before Compression: ", sys.getsizeof(data))
    compressed_data =  zlib.compress(data, zlib.Z_BEST_COMPRESSION)
    print("After Compression: ", sys.getsizeof(compressed_data))
    return compressed_data


def decompress_file_content(data):
    """
    Decompresss the given data file and returns
    decompressed data.
    """
    print("Before Decompression: ", sys.getsizeof(data))
    decompressed_data = zlib.decompress(data)
    print("After Decompression: ", sys.getsizeof(decompressed_data))
    return decompressed_data