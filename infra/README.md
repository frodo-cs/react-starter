# React Starter Infrastructure

S3 + CloudFront static site hosting with GitHub Actions deployment.

## Structure

```
infra/
├── template.yaml             # CloudFormation template
├── cloudfront-function.js    # CloudFront viewer request function
├── samconfig.toml            # SAM deployment configuration per environment
├── .env.example              # Environment variables template
└── deploy.sh                 # Creates/updates the CloudFormation stack
```

## Prerequisites

Before deploying the infrastructure, ensure you have the following installed and configured:

1.  **AWS CLI**: [Installed](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) and [configured](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html) with appropriate credentials.
2.  **AWS SAM CLI**: [Installed](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html).
3.  **Environment Variables**: Create a local `.env` file in the `infra/` directory (see [Deployment](#deployment) below).

## Deployment

1. Copy the environment variables template and fill in your values:
```bash
cp infra/.env.example infra/.env
```

2. Deploy the infrastructure stack for your environment:
```bash
./infra/deploy.sh <development|staging|production>
```

3. Grab the `GitHubRoleArn` from the stack outputs and add it as a secret in your
GitHub repository so the Actions workflow can assume it.

