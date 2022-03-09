import bs4 as b
import requests

class BeautifulSoup:
    def __init__(self, url, *a, **k):
        # if url="..eplang.jp"
        r=requests.urlopen(url) if isinstance(url, str) else url
        raw=b.BeautifulSoup(r.read(),"html.parser") #*a,**k)
        self.BeautifulSoup=raw.BeautifulSoup
        self.find_all=raw.find_all
        self.find=raw.find
        self.get_text=raw.get_text

        self.body=raw.body
        self.head=raw.head
        self.title=raw.title
        self.a=raw.a
        self.p=raw.p
        self.b=raw.b

        self.contents=raw.contents
        self.children=raw.children
        self.descendants=raw.descendants
        self.parent=raw.parent
        self.parents=raw.parents
        self.next_sibling=raw.next_sibling
        self.next_siblings=raw.next_siblings
        self.previous_sibling=raw.previous_sibling
        self.previous_siblings=raw.previous_siblings
