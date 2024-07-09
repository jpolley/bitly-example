# Bitlinks API tests using Playwright

## Dev Setup

1\. Clone this repo & `cd` into root directory

2\. Create `.env` file in root directory

```bash
echo "ACCESS_TOKEN=xxxxxxxx\nACCOUNT_ID=Ch3flJJ0gtq\nAPI_URL=https://api-ssl.bitly.com\nUSER_EMAIL=user@example.com\nUSER_PASSWORD=yourPassword" > .env
```

3\. Paste your bitly account info in the `.env` file and save 💾

- valid API [ACCESS_TOKEN](https://app.bitly.com/settings/api)
- ACCOUNT_ID is the value you see in the URL after you login. For example if the URL is app.bitly.com/Ch3flJJ0gtq/home then update the `.env` file so that ACCOUNT_ID=Ch3flJJ0gtq
- USER_EMAIL and USER_PASSWORD are credentials used to [Log in](https://bitly.com/a/sign_in)


4\. Ensure [nvm](https://github.com/nvm-sh/nvm) is installed, and the correct version of nodejs used

```bash
nvm install # check .nvmrc to see the required version of node
nvm use
```

5\. Get the correct nodejs things

```bash
rm -r node_modules
nvm use
npm install
```

6\. Run the tests

```bash
npx playwright test
```

7\. Run the tests in ✨UI Mode✨ for a better experience. You can walk through each step of the test and see each request that was made. It's pretty neat for reviewing the API request, response, & body. 

```bash
npx playwright test --ui
```

Just click the ▶️ play button to kick off the tests: 
![Click the play button](ui-click-play.jpg)

8\. If you have [Docker](https://docs.docker.com/engine/install/) installed then you can run tests using this command

```bash
docker compose up
```
