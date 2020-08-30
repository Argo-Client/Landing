const less = require("less")
const hbs = require("handlebars")
const fs = require("fs");
const layouts = require('handlebars-layouts');
hbs.registerHelper(layouts(hbs));
hbs.registerPartial('layout', fs.readFileSync('views/layout.hbs', 'utf8'));
(function() { // Compile less
    var files = fs.readdirSync("less")
    files.forEach(f => {
        var file = fs.readFileSync(`less/${f}`)+''
        less.render(file, {
            filename: `less/${f}`, compress: true
        }).then(less => {
            if (less.css.length > 1) {
                fs.writeFileSync("public/stylesheets/" + f.replace(/less$/,"css"), less.css)
            }
        }).catch(console.error)
    })
})();
(function () { // Compile Handlebars
    var files = fs.readdirSync("views").filter(g=>g!=="layout.hbs")
    files.forEach(f=> {
        var file = fs.readFileSync(`views/${f}`)+''
        var compiled = hbs.compile(file)({title:f})
        if (compiled.length>1) {
            f = f.replace("index", "") // For creating the /index.html at the root folder
            var folder = "public/" + f.replace(/.hbs$/, "")
            if (!fs.existsSync(folder)) {
                fs.mkdirSync("public/" + f.replace(/.hbs$/, ""))
            }
            fs.writeFileSync(folder + "/index.html", compiled)
        }
    })
})()