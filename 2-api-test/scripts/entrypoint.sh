#!/bin/sh

STATUS=`sh /opt/soapui/bin/testrunner.sh "$@" | grep 'Total Failed Assertions: *'`;

if [ "$STATUS" != "Total Failed Assertions: 0" ]; then
  return 103;
fi