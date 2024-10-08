# Bitly example tests using Playwright ![workflow](https://github.com/jpolley/bitly-example/actions/workflows/playwright.yml/badge.svg)

This project uses Typescript and Playwright to provide some test coverage for the bitlinks API and some checks on the web app https://app.bitly.com

## Dev Setup

1\. Clone this repo & `cd` into root directory

2\. Run this script to create `.env` file in root directory

```bash
echo "ACCESS_TOKEN=xxxxxxxx\nACCOUNT_ID=Ch3flJJ0gtq\nAPI_URL=https://api-ssl.bitly.com\nUSER_EMAIL=user@example.com\nUSER_PASSWORD=yourPassword" > .env
```

3\. Paste your bitly account info into the `.env` file and save 💾

- valid API [ACCESS_TOKEN](https://app.bitly.com/settings/api)
- ACCOUNT_ID is the value you see in the URL after you login. For example if the URL is app.bitly.com/Ch3flJJ0gtq/home then update the `.env` file so that ACCOUNT_ID=Ch3flJJ0gtq
- USER_EMAIL and USER_PASSWORD are credentials used to [Log in](https://bitly.com/a/sign_in)

4\. Install everything by running the setup script:

```bash
  npm run setup
```

5\. Run the tests & view report

```bash
npx playwright test
npx playwright show-report
```

6\. Optionally, you can run the tests in ✨UI Mode✨ to dig a little depper. You can you explore, run and debug tests. It's pretty neat for reviewing the API request, response, & body.

```bash
npx playwright test --ui
```

Just click the ▶️ play button to kick off the tests:
![Click the play button](ui-click-play.jpg)

7\. If you have [Docker](https://docs.docker.com/engine/install/) installed then you can run tests using this command

```bash
docker compose up
```
