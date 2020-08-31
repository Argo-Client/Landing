const fs = require("fs")
const compile = require("./compile")
var fsWait = false
var dir = __dirname + "/../"
var files = fs.readdirSync(dir +"less/").map(g=>"/less/"+g)
.concat(fs.readdirSync(dir+"views/").map(g=>"/views/"+g))
console.log("Whatching Filechanges in /views and in /less");
files.forEach(f => {
    fs.watch(dir+f, (event, fname) => {
        if (fname) {
            if (fsWait) return;
            fsWait = setTimeout(() => {
                fsWait = false;
            }, 100);
            console.log(fname + " changed");
            setTimeout(()=> {
                if (fname.endsWith("less")) {
                    compile.less()
                } else if (fname.endsWith("hbs")) {
                    compile.handlebars()
                }
            })
        }
    });
})