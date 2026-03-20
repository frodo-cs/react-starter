#!/bin/bash

# Fail immediately if a command exits with a non-zero status,
# if an undefined variable is used, or if a command in a pipeline fails.

# Require an environment argument
if [[ -z "${1:-}" ]]; then
  echo "Error: Missing environment specifier."
  echo "Usage: ./deploy.sh <environment>"
  echo "Example: ./deploy.sh development"
  exit 1
fi

ENVIRONMENT="$1"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SAM_TEMPLATE="$SCRIPT_DIR/template.yaml"
SAM_CONFIG="$SCRIPT_DIR/samconfig.toml"
FUNCTION_FILE="$SCRIPT_DIR/cloudfront-function.js"
ENV_FILE="$SCRIPT_DIR/.env"

if [[ ! -f "$ENV_FILE" ]]; then
  echo "Error: Environment file $ENV_FILE not found."
  exit 1
fi
source "$ENV_FILE"

export AWS_PAGER=""

echo -e "------------------------------------------------------------"
echo -e ">> Starting deployment for $ENVIRONMENT environment"
echo -e "------------------------------------------------------------"

echo -e "\n>> Reading CloudFront function code..."
FUNCTION_CODE=$(cat "$FUNCTION_FILE" | tr '\n' ' ' | sed "s/'/\"/g")

echo -e "\n>> Deploying $ENVIRONMENT infrastructure stack"
echo -e ">> Running 'sam deploy --config-file $SAM_CONFIG --config-env $ENVIRONMENT'"
sam deploy \
  --template-file "$SAM_TEMPLATE" \
  --config-file "$SAM_CONFIG" \
  --config-env "$ENVIRONMENT" \
  --parameter-overrides \
    "Environment=$ENVIRONMENT" \
    "AppName=$APP_NAME" \
    "GitHubOrg=$GITHUB_ORG" \
    "GitHubRepo=$GITHUB_REPO" \
    "ParameterKey=FunctionCode,ParameterValue='$FUNCTION_CODE'"

echo -e "------------------------------------------------------------"
echo -e ">> Deployment completed successfully"
echo -e "------------------------------------------------------------"

echo -e "\n>> Done."