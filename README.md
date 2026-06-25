# Playwright UI and API Automation Framework

## Overview
This is a sample project to demonstrate an automation framework built using Playwright and TypeScript to automate UI and API test scenarios against the Conduit demo application:
https://conduit.bondaracademy.com/

The framework is designed to demonstrate automation best practices such as:

* Page Object Model (POM)
* Reusable Playwright Fixtures
* API and UI test automation
* Test data separation
* GitHub Actions CI integration
* Allure reporting

## Tech Stack

* Playwright
* TypeScript
* Node.js
* GitHub Actions
* Allure Reporting
  
## Project Structure

- `/tests` : Contains the UI and API test spec files
- `/tests/fixtures.ts` : Contains custom Playwright fixtures
- `/pages` : Contains the page objects
- `/apis`  : Contains the API request classes
- `/env`   : Contains the environment configuration files
- `/helpers` : Contains the reusable helper methods
- `/test-data` : Contains the test data and payloads
- `/ .github/worklows` : Contains the github actions workflow files

## Environment Configuration

Before running the tests, add the following variable to `env/config.env`:
`PASSWORD=<your-password>`

## How to run the tests( from IDE)

- Clone the repository: `git clone <repository-url>`
- Open the project in a compatible IDE like Visual Studio Code
- From the terminal, install dependencies using `npm install`
- To install the playwright browsers, run `npx playwright install`
- To run all the tests from the terminal, use command `npx playwright test`
- To run the tests using the UI mode, use `npx playwright test --ui`. This opens up the UI mode and can run all or specific tests.

## Playwright Reports

### Playwright HTML Report
Generate/open report: `npx playwright show-report`

### Allure Report
Generate report : `npx allure-commandline generate allure-results --clean -o allure-report`
Open report : `npx allure-commandline open allure-report`

## CI Pipeline

GitHub Actions is configured to:

* Install dependencies
* Install Playwright browsers
* Execute tests
* Generate Allure reports
* Upload test artifacts
* Upload test execution reports

Tests are automatically executed through GitHub Actions on every push to the main branch.

## Future Improvements

Planned enhancements include:

* Additional UI coverage
* Additional API coverage
* Advanced Allure reporting
* Additional CI enhancements



