# Bitlinks API tests using Playwright

## Dev Setup

1\. Clone this repo

2\. Ensure `nvm` is installed, and the correct version of nodejs used

```bash
nvm install # check .nvmrc to see the required version of node
nvm use
```

3\. Get the correct nodejs things

```bash
rm -r node_modules
nvm use
npm install
```

4\. Set the proper values in `.env` 

```bash
API_URL=https://api-ssl.bitly.com
ACCESS_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

5\. Run the tests

```bash
npx playwright test
```

Or run the tests in UI Mode for a better experience. You can walk through each step of the test and see each request that was made. It's pretty neat for reviewing the API request, response, & body. 

```bash
npx playwright test --ui
```

Just click the play button to kick off the tests: 
![Click the play button](ui-click-play.jpg)