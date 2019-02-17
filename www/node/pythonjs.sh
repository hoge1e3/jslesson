#!/bin/sh
export LC_ALL=en_US.UTF-8
export LANG=en_US.UTF-8
#env
cd $(dirname "$0")
nodejs runpython.js $*
