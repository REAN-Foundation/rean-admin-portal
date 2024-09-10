#!/bin/bash
ENVIRONMENT=$1
# Determine the environment and set S3 paths accordingly
case "$ENVIRONMENT" in
  "dev")
    ENV_FILE_BUCKET="duploservices-dev-configs-new-167414264568/rean-admin-portal"
    CONSTANTS_FILE_BUCKET="duploservices-dev-configs-new-167414264568/rean-admin-portal"
    FAVICON_FILE_BUCKET="duploservices-dev-configs-new-167414264568/rean-admin-portal"
    ;;
  "uat")
    ENV_FILE_BUCKET="duploservices-uat-configs-new-167414264568/rean-admin-portal"
    CONSTANTS_FILE_BUCKET="duploservices-uat-configs-new-167414264568/rean-admin-portal"
    FAVICON_FILE_BUCKET="duploservices-uat-configs-new-167414264568/rean-admin-portal"
    ;;
  "prod")
    ENV_FILE_BUCKET="duploservices-prod-configs-new-167414264568/rean-admin-portal"
    CONSTANTS_FILE_BUCKET="duploservices-prod-configs-new-167414264568/rean-admin-portal"
    FAVICON_FILE_BUCKET="duploservices-prod-configs-new-167414264568/rean-admin-portal"
    ;;
  "aha-prod")
    ENV_FILE_BUCKET="duploservices-ahaprod-configs-167414264568/rean-admin-portal"
    CONSTANTS_FILE_BUCKET="duploservices-ahaprod-configs-167414264568/rean-admin-portal"
    FAVICON_FILE_BUCKET="duploservices-ahaprod-configs-167414264568/rean-admin-portal"
    ;;
  "aha-uat")
    ENV_FILE_BUCKET="duploservices-uat-configs-new-167414264568/rean-admin-portal-aha"
    CONSTANTS_FILE_BUCKET="duploservices-uat-configs-new-167414264568/rean-admin-portal-aha"
    FAVICON_FILE_BUCKET="duploservices-uat-configs-new-167414264568/rean-admin-portal-aha"
    ;;
  *)
    echo "Unknown environment: $ENVIRONMENT"
    exit 1
    ;;
esac

# Copy files from S3
aws s3 cp s3://$ENV_FILE_BUCKET/.env ./.env
if [ $? -ne 0 ]; then
  echo "Error copying .env file from S3"
  exit 1
fi

aws s3 cp s3://$CONSTANTS_FILE_BUCKET/constants.ts /app/src/lib
if [ $? -ne 0 ]; then
  echo "Error copying constants.ts from S3"
  exit 1
fi

aws s3 cp s3://$FAVICON_FILE_BUCKET/favicon.png ./static/favicon.png
if [ $? -ne 0 ]; then
  echo "Error copying favicon.png from S3"
  exit 1
fi

cd /app/build

node index.js
