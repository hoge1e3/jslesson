import numpy as np
import numpy.random as random
# import scipy
from scipy import stats, linalg, fftpack, signal, interpolate, optimize, special, integrate
from scipy.stats import norm
#from scipy import linalg, fftpack, signal, interpolate, optimize, special, integrate
from scipy.io import wavfile
np.random.seed(1750)
print("=== linalg.svd ===")
# 文法エラー
#a = np.random.randn(9, 6) + 1j * np.random.randn(9, 6)
#print(len(linalg.svd(a)))

#以下音声ファイル関連,動作未確認
print("=== io.wavfile.read ===")
#fs, data = wavfile.read("user/sample.wav")
#print(fs, len(data))
print("=== io.wavfile.read ===")
#print(wavfile.write("sample_2.wav", fs, data))
print("=== fftpack.fft ===")
#fft = fftpack.fft(data)
#print(fft.shape)
print("=== fftpack.ifft ===")
#ifft = fftpack.ifft(fft)
#print(ifft.shape)
print("=== fftpack.fftfreq ===")
#size = data.size
#print(fftpack.fftfreq(size, d=1.0 / fs).shape)
print("=== signal.stft ===")
#_, _, stft = signal.stft(data)
#print(stft.shape)
print("=== signal.istft ===")
#print(signal.istft(stft))
print("=== signal.welch ===")
#_, welch = signal.welch(x, fs, nperseg=1024)
#print(welch.shape)
print("=== signal.spectrogram ===")
#_, _, spec = signal.spectrogram(data, fs, nperseg=1024)
#print(spec.shape)
