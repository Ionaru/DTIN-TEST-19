FROM openjdk:11-jre-slim-buster

# Install curl
RUN apt-get update && \
  apt-get -y install curl

# Download and unarchive SoapUI
RUN curl  https://s3.amazonaws.com/downloads.eviware/soapuios/5.6.0/SoapUI-5.6.0-linux-bin.tar.gz \
  | gunzip -c - | tar -xf - -C /opt && \
  mv /opt/SoapUI-5.6.0 /opt/soapui

# Download, unarchive and override XMLBeans
RUN curl https://archive.apache.org/dist/poi/xmlbeans/release/bin/xmlbeans-bin-3.1.0.tgz \
  | gunzip -c - | tar -xf - -C /opt && \
  cp /opt/xmlbeans-3.1.0/lib/xmlbeans-3.1.0.jar /opt/soapui/lib/xmlbeans-3.1.0.jar && \
  rm /opt/soapui/lib/xmlbeans-3.1.1-sb-fixed.jar

# Set PATH
ENV PATH ${PATH}:/opt/soapui/bin

# Copy entrypoint
COPY ./entrypoint.sh /entrypoint.sh

ENTRYPOINT [ "sh", "/entrypoint.sh" ]
