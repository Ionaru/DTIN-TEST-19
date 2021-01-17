#!/bin/sh

WORKING_DIR=$1; shift
PROJECT_FILE=$1; shift
STATUS=`sh /opt/soapui/bin/testrunner.sh "$@" \
  -f"$GITHUB_WORKSPACE/$WORKING_DIR/TestResult" \
  "$GITHUB_WORKSPACE/$WORKING_DIR/$PROJECT_FILE" \
  | grep 'Total Failed Assertions: *'`;

if [ "$STATUS" != "Total Failed Assertions: 0" ]; then
  return 103;
fi