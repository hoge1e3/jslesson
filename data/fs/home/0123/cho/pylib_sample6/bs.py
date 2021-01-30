from bs4 import BeautifulSoup

b=BeautifulSoup("https://bitarrow.eplang.jp")
print(b.find("title"))

