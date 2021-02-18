import pandas as pd
import numpy as np
print("=== DataFrame ===")
ary = np.arange(27).reshape(-1, 3)
ary[-1] = np.array([2021, 1, 4])  # 最後の行だけ上書き
df = pd.DataFrame(data=ary)
print(df)