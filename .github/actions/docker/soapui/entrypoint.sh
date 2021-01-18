#!/bin/sh -l

GITHUB_WORKSPACE="/opt/soapui/projects";
WORKING_DIR=$1; shift;
PROJECT_FILE=$1; shift;
TEST_SUITE=$1; shift;

if test -f "$GITHUB_WORKSPACE/$WORKING_DIR/$PROJECT_FILE"; then
  echo "Project file exists.";

  SOAPUI_HOME="/opt/soapui";
  SOAPUI_CLASSPATH=$SOAPUI_HOME/bin/soapui-5.6.0.jar:$SOAPUI_HOME/lib/*
  JFXRTPATH=`java -cp $SOAPUI_CLASSPATH com.eviware.soapui.tools.JfxrtLocator`
  SOAPUI_CLASSPATH=$JFXRTPATH:$SOAPUI_CLASSPATH
  JAVA_OPTS="-Xms128m -Xmx1024m -Dsoapui.properties=soapui.properties -Dsoapui.home=$SOAPUI_HOME/bin"
  JAVA_OPTS="$JAVA_OPTS -Dsoapui.ext.libraries=$SOAPUI_HOME/bin/ext"
  JAVA_OPTS="$JAVA_OPTS -Dsoapui.ext.listeners=$SOAPUI_HOME/bin/listeners"
  JAVA_OPTS="$JAVA_OPTS -Dsoapui.ext.actions=$SOAPUI_HOME/bin/actions"
  STATUS=`java $JAVA_OPTS -cp $SOAPUI_CLASSPATH com.eviware.soapui.tools.SoapUITestCaseRunner "-r" "-j" "-I" "-f$GITHUB_WORKSPACE/$WORKING_DIR/TestResult" "-s$TEST_SUITE" "$GITHUB_WORKSPACE/$WORKING_DIR/$PROJECT_FILE" | grep 'Total Failed Assertions: *'`;

  echo $STATUS;

  if [ "$STATUS" != "Total Failed Assertions: 0" ]; then
    return 103;
  fi
else
  echo "Project file not found at $GITHUB_WORKSPACE/$WORKING_DIR/$PROJECT_FILE";
  return 1;
fi