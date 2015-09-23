#! /bin/bash
sleep 1
ps -ef|grep html5demo|grep -v grep|grep -v tail|awk 'BEGIN{printf "kill "}{printf "%s ", $2}'|bash
echo "html5demo stopped!"
