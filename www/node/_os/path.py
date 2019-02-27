import os
import bawrapper
def exists(path):
    return os.path.exists(bawrapper.resolve(path))
