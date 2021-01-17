FROM openjdk:11-jre-slim-buster

# Install curl
RUN apt-get update && \
  apt-get -y install curl

# Download and unarchive SoapUI
RUN curl  https://s3.amazonaws.com/downloads.eviware/soapuios/5.6.0/SoapUI-5.6.0-linux-bin.tar.gz \
  | gunzip -c - | tar -xf - -C /opt && \
  mv /opt/SoapUI-5.6.0 /opt/soapui

# Set environment
ENV PATH ${PATH}:/opt/soapui/bin

# Copy custom testrunner
COPY ./custom-testrunner.sh /opt/soapui/bin
RUN chmod +x /opt/soapui/bin/custom-testrunner.sh

ENTRYPOINT [ "sh", "-c", "/opt/soapui/bin/custom-testrunner.sh" ]
