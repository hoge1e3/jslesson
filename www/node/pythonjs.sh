#!/bin/sh
export LC_ALL=en_US.UTF-8
export LANG=en_US.UTF-8
#env
cd $(dirname "$0")
cnt=`ps -ax|grep "\bpython\b"|wc -l`
#if [ $cnt -lt 50 ] ; then  # special-change
#    timeout 10 node runpython.js $* # special-change
if [ $cnt -lt 10 ] ; then
    timeout 60 nodejs runpython.js $*
else
    echo "Pythonプログラムが多数実行されています。しばらくしてからもう一度実行してください。"
fi
