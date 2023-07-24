# CircleCI-for-Jira

**Table of Contents**

1. [Description](#description)
1. [Prerequisites](#prerequisites)
1. [Development](#development)
1. [Project Structure](#project-structure)
1. [Individual Apps](#individual-apps)
1. [Contributing](#contributing)
1. [License](#license)

## Description
This project is an Atlassian Forge application written in TypeScript. The application includes multiple front-end portions (`admin-configure` and `admin-home`) which use React 18 and Material-UI v5 for the UI. 

There is also a Forge-specific portion (`forge`) that implements web triggers and resolvers. These applications are separated into different packages to ensure clear organization and separation of concerns. 

This project uses Turbo, a tool that allows for efficient building and testing in a Mono Repo environment. Turbo makes it easy to handle dependencies, execute scripts across multiple packages, and manage multiple interconnected applications within the same repository.

Each application and package is neatly separated, making it easy for individual parts to be developed, tested, and deployed separately, increasing the overall efficiency and maintainability of the project.

This project is designed for Jira and CircleCI users and offers features like associating Jira issues with builds and deployments in CircleCI. 

To use it, install the _CircleCI for Jira_ app in Atlassian and send your builds and deployments using the `circleci/jira` orb.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed the latest version of [pnpm](https://pnpm.io/installation) and [Forge CLI](https://developer.atlassian.com/platform/forge/cli-reference/#getting-started).

## Development

Here's how to get started with development:

- Clone this repository and change into the project directory.
- Run `pnpm install` to install all necessary dependencies.

Then proceed according to your role:

### CircleCI's Customer & Partner Engineering Team

If you're part of CircleCI's Customer & Partner Engineering team, please follow the internal instructions documented on our Confluence page. This should guide you through the setup and deployment process.

### Open Source Community

For our open-source contributors, we're thrilled to have you! Here's how you should set up the app:

- Log into the Forge CLI as detailed [here](https://developer.atlassian.com/platform/forge/getting-started/#log-in-with-an-atlassian-api-token).
- Recognize that the app id in `apps/forge/manifest.yml` is unique, and only the account owner can deploy the app.
- Follow these [instructions](https://developer.atlassian.com/platform/forge/build-a-hello-world-app-in-jira/#create-your-app) to create a new Forge app in a separate folder.
- Take note of the `id` from your new app.
- Replace the `id` in `apps/forge/manifest.yml` with the `id` from your new app.
- Deploy your app to the development environment with `pnpm -w run deploy:development`.
- Run `forge install` and follow the prompts to install the `circleci-for-jira` app. You should now see the app on the "Manage your apps" page.

## Project Structure

This project is structured into two main sections:

- `apps`: This directory hosts the application part of this Mono Repo.
- `packages`: This directory stores the shared UI components and hooks.

Other directories and files primarily contain configuration and metadata.

## Individual Apps

The `/apps` directory houses three applications:

- `admin-configure`: A user-oriented section for configuring the Jira app and fetching their webhook URL.
- `admin-home`: The home page of the app offers users quick access to a range of resources such as documentation and a ticket submission portal.
- `forge`: This hosts the Forge app's manifest, along with web/resolver implementations.

## Contributing

Feel free to contribute to this project by opening issues or submitting pull requests. We appreciate any feedback and improvements to make this app even better!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
