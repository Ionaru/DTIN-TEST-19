FROM openjdk:11-jre-slim-buster

# Install curl
RUN apt-get update && \
  apt-get -y install curl

# Download and unarchive SoapUI
RUN curl  https://s3.amazonaws.com/downloads.eviware/soapuios/5.6.0/SoapUI-5.6.0-linux-bin.tar.gz \
  | gunzip -c - | tar -xf - -C /opt && \
  mv /opt/SoapUI-5.6.0 /opt/soapui

# Set PATH
ENV PATH ${PATH}:/opt/soapui/bin

# Copy entrypoint
COPY ./scripts/entrypoint.sh /entrypoint.sh

ENTRYPOINT [ "sh", "/entrypoint.sh" ]