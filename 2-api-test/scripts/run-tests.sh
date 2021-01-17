#!/bin/sh

DIR=`dirname $0`;
PWD=`cd $DIR/..; pwd`;
DOCKER_DIR="/opt/soapui/projects/dockerproject";
PROJECT_FILE="$DOCKER_DIR/SoapUI-tests.xml";

docker run -i --name=soapui-5.6.0 \
    -v $PWD:$DOCKER_DIR \
    -v $PWD/TestResult:$DOCKER_DIR/testresult \
    soapui-5.6.0 \
    -s"$1" \
    -r -j \
    -f$DOCKER_DIR/testresult \
    -I "$PROJECT_FILE";

echo "$?";

docker rm soapui-5.6.0 &> /dev/null;
