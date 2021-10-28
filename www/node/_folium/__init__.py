import folium
import os

seq=0
class Map:
	def __init__(self,*a,**k):
		self.__raw=folium.Map(*a, **k)
		self.add_child=self.__raw.add_child
		#self.save=raw.save
	def show(self):
		global seq
		seq+=1
		fn="{}/figure{}.html".format(os.getcwd(), seq)
		self.__raw.save(fn)
		print("##PLOT##%s"%(fn))
class Marker:
	def __init__(self,*a,**k):
		self.__raw=folium.Marker(*a,**k)
		self.add_to=self.__raw.add_to
