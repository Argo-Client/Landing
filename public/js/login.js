$("form").submit(e => {
    e.preventDefault()
    if ($("#user").val().length<=2) {
        $("#user").addClass("invalid")
        return
    }
    if ($("#password").val().length<=2) {
        $("#password").addClass("invalid")
        return
    }
    axios.post(`${location.protocol}//${location.hostname}:3000/api/login`, {
        user: $("#user").val(),
        password: $("#password").val()
    }).then(d => {
        console.log(d)
        var data = d.data
        localStorage.setItem("magisterData",JSON.stringify(data))
        $("#errorMsg").text("Ingelogd, je word doorgestuurd")
        $("#errorMsg").addClass("green-text").removeClass("deep-orange-text")
        location.pathname = "main"
    }).catch(err=> {
        console.error(err);
        if (err.response) {
            var error = err.response.data
            if (error.match("InvalidUsername")) {
                $("#user").addClass("invalid").focus()
                $("#errorMsg").text("Gebruikersnaam is incorrect")
            } else if (error.match("split")) {
                $("#password").addClass("invalid").focus()
                $("#errorMsg").text("Wachtwoord is incorrect")
            }
            else {
                console.log(error);
                $("#errorMsg").text(error)
            }
        }
    })
})