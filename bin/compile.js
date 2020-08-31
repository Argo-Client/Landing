const less = require("less")
const hbs = require("handlebars")
const fs = require("fs");
const layouts = require('handlebars-layouts');
hbs.registerHelper(layouts(hbs));
var dir = __dirname + "/../"
hbs.registerPartial('layout', fs.readFileSync(dir+'views/layout.hbs', 'utf8'));
module.exports.less = function () {
    var files = fs.readdirSync(dir + "less")
    if (!fs.existsSync(dir + "public/css")) {
        fs.mkdirSync(dir + "public/css")
    }
    files.forEach(f => {
        var file = fs.readFileSync(dir + `less/${f}`) + ''
        less.render(file, {
            filename: dir + `less/${f}`, compress: true
        }).then(less => {
            if (less.css.length > 1) {
                fs.writeFileSync(dir + "public/css/" + f.replace(/less$/, "css"), less.css)
            }
        }).catch(console.error)
    })
    console.log("Compiled Less");
}
module.exports.handlebars = function() {
    var files = fs.readdirSync(dir + "views").filter(g => g !== "layout.hbs")
    files.forEach(f => {
        var file = fs.readFileSync(dir + `views/${f}`) + ''
        var compiled = hbs.compile(file)({ title: f })
        if (compiled.length > 1) {
            f = f.replace("index", "") // For creating the /index.html at the root folder
            var folder = dir + "public/" + f.replace(/.hbs$/, "")
            if (!fs.existsSync(folder)) {
                fs.mkdirSync(folder)
            }
            fs.writeFileSync(folder + "/index.html", compiled)
        }
    })
    console.log("Compiled Handlebars");
}