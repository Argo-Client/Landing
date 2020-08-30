const {default: magister} = require("magister.js")
const {readFileSync} = require("fs")
const {refreshCode} = require("./getAuthCode")
var authCode = readFileSync(__dirname+"/../data/authcode").toString()
module.exports.checkCredentials = function (data) {
    var user = data.user
    var pass = data.password
    return new Promise((res, rej) => {
        if (user.length<=2&&pass.length<=2) {
            rej("Error: please enter more characters")
        }
        var opt = {
            school: { url: "https://pantarijn.magister.net" },
            username: user,
            password: pass,
            authCode
        }
        magister(opt).then(m => {
            res({
                profiel: m.profileInfo,
                tokenSet: m.authManager.tokenSet
            })
        }).catch(err => {
            if (err.toString().match("AuthCodeValidation")) {
                refreshCode()
                rej("Magister heeft de authCode veranderd, dit programma laad hem nu opnieuw op, probeer opnieuw over een aantal seconden. (Als je dit alleen maar krijgt heeft iddink iets verpest)")
            } else {
                console.error(err);
                rej(true)
            }
        })
    })
}