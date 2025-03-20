# CircleCI for Jira

**Table of Contents**

1. [Description](#description)
1. [Prerequisites](#prerequisites)
1. [Development](#development)
1. [Project structure](#project-structure)
1. [Individual apps](#individual-apps)
1. [Contributing](#contributing)
1. [License](#license)

## Description
This project contains an Atlassian Forge app written in TypeScript with React 18 and Material-UI v5. It integrates two front-end sections: `admin-configure` and `admin-home`. 

CircleCI for Jira aims to enable the association of Jira issues with builds and deployments in CircleCI. To leverage these features, install the app in Atlassian and send your builds and deployments using the `circleci/jira` orb.

## Prerequisites

Before starting, ensure you have the latest version of [pnpm](https://pnpm.io/installation) and [Forge command-line tool](https://developer.atlassian.com/platform/forge/cli-reference/#getting-started) installed.

## Development

To begin development, follow these steps:

- Clone the repository and navigate into the project directory.
- Run `pnpm install` to secure all necessary dependencies.

Then, follow the next steps based on your role:

### Open-source community contributors

- Log into the Forge command-line tool as outlined [here](https://developer.atlassian.com/platform/forge/getting-started/#log-in-with-an-atlassian-api-token).
- Follow these [instructions](https://developer.atlassian.com/platform/forge/build-a-hello-world-app-in-jira/#create-your-app) to establish a new Forge app in a separate folder.
- Replace the `id` in `apps/forge/manifest.yml` with the `id` from your new app's `manifest.yml`.
- Deploy the app to the development environment with `pnpm -w run deploy:development`.
- Run `forge install` and follow the prompts to install the CircleCI for Jira app. The app should now appear on the "Manage your apps" page.

> **Note**
> The app id in `apps/forge/manifest.yml` remains unique and restrict app deployment to the account owner.

### CircleCI's customer & partner engineering team

Refer to the steps defined in the internal Confluence document.

### Common Issues

1. For unsuccessful `forge deploy`, run `forge deploy --no-verify` if everything is good except for 2 acceptable errors...
     - `invalid value 'devops:deploymentInfoProvider' in modules`
     - `invalid value 'devops:buildInfoProvider' in modules` 
    

## Project structure

The project divides into two main parts:

- `apps`: This directory hosts the app part of this monorepo.
- `packages`: This directory houses shared UI components and hooks.

Other directories and files consist of configuration and metadata.

## Individual apps

The `/apps` directory includes three apps:

- `admin-configure`: A user-oriented section enabling configuration of the Jira app and retrieval of their webhook URL.
- `admin-home`: The app's home page offers users quick access to resources such as documentation and a ticket submission portal.
- `forge`: This section contains the Forge app's manifest and web/resolver implementations.

## Contributing

Please contribute to this project by opening issues or submitting pull requests. This project appreciates and welcomes any feedback and enhancements to enrich the app.

## License

This project falls under the MIT License - see the [LICENSE](LICENSE) file for more information.
