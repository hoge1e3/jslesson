from scipy.io import wavfile
import bawrapper

def read(file, **k):
    f=bawrapper.resolve(file)
    return wavfile.read(f, **k)

def write(file, **k):
    f=bawrapper.resolve(file)
    return wavfile.write(f, **k)
