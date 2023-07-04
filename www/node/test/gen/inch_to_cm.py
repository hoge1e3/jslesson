import bawrapper
inch=bawrapper._input("何インチ？")
cm=bawrapper._float(inch) *  2.54 
print("答えは..." + bawrapper._str(cm) + "cmです")