const puppeteer = require('puppeteer');


async function authCode() {
    var start = new Date() // Start time
    const browser = await puppeteer.launch({ args: ['--no-sandbox']}); // Launch the browser
    const page = await browser.newPage();
    page.goto('https://accounts.magister.net/account/login?sessionId=38e102712e514d9994b2deb73bff566c&returnUrl=%2Fconnect%2Fauthorize%2Fcallback%3Fclient_id%3DM6-kajmunk.magister.net%26redirect_uri%3Dhttps%253A%252F%252Fkajmunk.magister.net%252Foidc%252Fredirect_callback.html%26response_type%3Did_token%2520token%26scope%3Dopenid%2520profile%26state%3D7cded9d424d644b4a2a90dc61f7ccb48%26nonce%3De3594997f45543a28a5fd467b43420b4%26acr_values%3Dtenant%253Akajmunk.magister.net');
    const request = await page.waitForRequest('https://accounts.magister.net/challenges/current');
    const data = JSON.parse(request.postData());
    const newAuthCode = data.authCode;
    browser.close();
    console.log(`Duurde: ${new Date()-start}ms`) // Log the amount of time the script ran
    return newAuthCode;
};
authCode().then(code => {
    require("fs").writeFileSync("../data/authcode", code)
    process.exit()
})