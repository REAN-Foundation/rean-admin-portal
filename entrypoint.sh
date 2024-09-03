#!/bin/bash

# Determine the environment and set S3 paths accordingly
case "$ENVIRONMENT" in
  "dev")
    ENV_FILE_BUCKET="duploservices-dev-configs-new-167414264568/rean-admin-portal"
    CONSTANTS_FILE_BUCKET="duploservices-dev-configs-new-167414264568/rean-admin-portal"
    FAVICON_FILE_BUCKET="duploservices-dev-configs-new-167414264568/rean-admin-portal"
    ;;
  "uat")
    ENV_FILE_BUCKET="duploservices-dev-configs-new-167414264568/rean-admin-portal"
    CONSTANTS_FILE_BUCKET="duploservices-dev-configs-new-167414264568/rean-admin-portal"
    FAVICON_FILE_BUCKET="duploservices-dev-configs-new-167414264568/rean-admin-portal"
    ;;
  "prod")
    ENV_FILE_BUCKET="duploservices-dev-configs-new-167414264568/rean-admin-portal"
    CONSTANTS_FILE_BUCKET="duploservices-dev-configs-new-167414264568/rean-admin-portal"
    FAVICON_FILE_BUCKET="duploservices-dev-configs-new-167414264568/rean-admin-portal"
    ;;
  "aha-prod")
    ENV_FILE_BUCKET="duploservices-dev-configs-new-167414264568/rean-admin-portal"
    CONSTANTS_FILE_BUCKET="duploservices-dev-configs-new-167414264568/rean-admin-portal"
    FAVICON_FILE_BUCKET="duploservices-dev-configs-new-167414264568/rean-admin-portal"
    ;;
  "aha-uat")
    ENV_FILE_BUCKET="duploservices-dev-configs-new-167414264568/rean-admin-portal"
    CONSTANTS_FILE_BUCKET="duploservices-dev-configs-new-167414264568/rean-admin-portal"
    FAVICON_FILE_BUCKET="duploservices-dev-configs-new-167414264568/rean-admin-portal"
    ;;
  *)
    echo "Unknown environment: $ENVIRONMENT"
    exit 1
    ;;
esac

# Copy files from S3
aws s3 cp s3://$ENV_FILE_BUCKET/.env ./.env
aws s3 cp s3://$CONSTANTS_FILE_BUCKET/constants.ts /app/src/lib
aws s3 cp s3://$FAVICON_FILE_BUCKET/favicon.png ./static/favicon.png

cd /app/build
# Add any other scripts here...

# Start the service
# npm run start
node index.js