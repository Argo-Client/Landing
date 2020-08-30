$("form").submit(e => {
    if ($("#user").val().length<=2) {
        $("#user").addClass("invalid")
        // e.preventDefault()
    }
    if ($("#password").val().length<=2) {
        $("#password").addClass("invalid")
    }
    e.preventDefault()
    axios.post("/api/login", {
        data: {
            user: $("#user").val(),
            password: $("#password").val()
        }
    }).then(d => {
        console.log(d)
    }).catch(console.error)
})