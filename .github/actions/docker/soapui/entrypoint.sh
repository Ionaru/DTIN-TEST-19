#!/bin/sh -l

WORKING_DIR=$1; shift;
PROJECT_FILE=$1; shift;

if test -f "$GITHUB_WORKSPACE/$WORKING_DIR/$PROJECT_FILE"; then
  echo "Project file exists.";
  echo "testrunner.sh $* -f\"$GITHUB_WORKSPACE/$WORKING_DIR/TestResult\" $GITHUB_WORKSPACE/$WORKING_DIR/$PROJECT_FILE;

  STATUS=`sh /opt/soapui/bin/testrunner.sh $* -f\"$GITHUB_WORKSPACE/$WORKING_DIR/TestResult\" $GITHUB_WORKSPACE/$WORKING_DIR/$PROJECT_FILE | grep 'Total Failed Assertions: *'`;

  if [ "$STATUS" != "Total Failed Assertions: 0" ]; then
    return 103;
  fi
else
  echo "Project file not found at $GITHUB_WORKSPACE/$WORKING_DIR/$PROJECT_FILE";
  return 1;
fi