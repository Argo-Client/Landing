axios("https://cors.netlob.dev/pantarijn.magister.net/api/account", {
    headers: {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("magisterData")).access_token
    }
}).then(d => {
    console.log(d.data)
    $(".content").html("<span class=\"white-text\">Hallo " + d.data.Persoon.Roepnaam + " " + d.data.Persoon.Achternaam)
}).catch(console.error)