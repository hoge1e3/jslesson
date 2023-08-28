#!/bin/sh
export LC_ALL=en_US.UTF-8
export LANG=en_US.UTF-8
#env
ulimit -v 1000000
cd $(dirname "$0")
cnt=`ps -ax|grep "\bpython\b"|wc -l`
#if [ $cnt -lt 50 ] ; then  # special-change
#    timeout 10 node runpython.js $* # special-change
duration=60
if [ $cnt -lt 10 ] ; then
    start_time=`date +%s`
    timeout $duration nodejs runpython.js $*
    end_time=`date +%s`
    elapsed=`expr $end_time - $start_time`
    #echo "Time=$elapsed"
    if [ $elapsed -ge $duration ]
    then
        echo "実行時間が$duration 秒を過ぎたので強制終了しました。"
    fi
else
    echo "Pythonプログラムが多数実行されています。しばらくしてからもう一度実行してください。"
fi
