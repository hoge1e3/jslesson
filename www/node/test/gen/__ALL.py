import os
import json
import subprocess
import re
import sys
# set PYTHONPATH=..\..
#sys.path.append("../..")

def execute_python_programs(folder_path):
    output_results = {}
    test_in=""
    for i in range(1,10):
        test_in+=str(i)+"\n"
    for file_name in os.listdir(folder_path):
        file_path = os.path.join(folder_path, file_name)

        # Pythonファイルのみを実行する
        if file_name.endswith(".py") and not re.match(r"__", file_name):
            try:
                print("Running" ,file_path)
                # Pythonプログラムを実行し、出力を取得
                result = subprocess.check_output(["python", file_path], stderr=subprocess.STDOUT, timeout=1,input=test_in,text=True)
#                output_results[file_name] = result.decode("Shift_JIS").strip()
                output_results[file_name] = result.strip()
            except subprocess.CalledProcessError as e:
                # 実行エラーが発生した場合は、エラーメッセージを取得
                output_results[file_name] = e.output.strip()
            except subprocess.TimeoutExpired:
                # タイムアウトが発生した場合は、タイムアウトメッセージを設定
                output_results[file_name] = "Timeout error"
            except Exception as e:
                # その他のエラーが発生した場合は、エラーメッセージを設定
                output_results[file_name] = str(e)

    return output_results

folder_path = "."  # 適切なフォルダのパスに変更する
output = execute_python_programs(folder_path)

# 結果をJSONファイルに保存
with open("output.json", "w") as f:
    json.dump(output, f, indent=4)


