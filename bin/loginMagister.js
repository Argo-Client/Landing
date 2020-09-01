const { AuthManager } = require("magister-openid")
const axios = require("axios")
var authCode
async function getCode() {
    var d = (await axios("https://authcode.samtaen.nl/")).data
    authCode = d.code
    console.log("Authcode: " + d.code);
    return d.code

}
getCode()
module.exports.checkCredentials = function (data) {
    var user = data.user
    var pass = data.password
    return new Promise((res, rej) => {
        if (user.length <= 2 && pass.length <= 2) {
            rej("Error: please enter more characters")
        }
        var manager = new AuthManager("pantarijn.magister.net")
        
        manager.login(user, pass, authCode).then(token => {
            res(token)
        }).catch(err => {
            if (err.toString().match("AuthCodeValidation")) {
                getCode()
                rej("Magister heeft de authCode veranderd, dit programma laad hem nu opnieuw op, probeer opnieuw over een aantal seconden. (Als je dit alleen maar krijgt heeft iddink iets verpest)")
            } else {
                console.error(err);
                rej(err.toString())
            }
        })
        // magister(opt).then(m => {
        //     res({
        //         profiel: m.profileInfo,
        //         tokenSet: m.authManager.tokenSet
        //     })
    })
}