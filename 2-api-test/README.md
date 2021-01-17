# 2-api-test

## Description

This folder contains the SoapUI project and scripts for the api-test portion of the DTIN-TEST-19
assignment.

## Requirements

[Docker Desktop](https://docs.docker.com/get-docker/) to run the `build-tests.sh` and `run-tests.sh` files.
[Bash for Windows](https://www.howtogeek.com/249966/how-to-install-and-use-the-linux-bash-shell-on-windows-10/) if running Windows

## Usage

1. Clone repository
2. Navigate to 2-api-test
3. `./build-tests.sh`
4. `./run-tests.sh "TestSuite 1"`

## Artifacts

- The report will be in ./TestResult together with any failed test cases after running the tests.
- The script will return **The StatusCode** `103` if any assertions fail during the test run.

## Technologies used

- [Docker Desktop](https://docs.docker.com/get-docker/) to make running tests system agnostic and run them in the delivery pipeline.
- [SoapUI Open Source](https://www.soapui.org/downloads/latest-release/) to create the API tests in.
