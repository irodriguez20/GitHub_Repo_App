'use strict';

function displayResults(responseJson) {
    console.log(responseJson)
    $("#results-list").empty();
    
    for (let i =0; i < responseJson.length; i++){
        console.log(responseJson[i]);
        $("#results-list").append(
            `<li><h3>test${responseJson[i].name}</h3>
            <p><a href=${responseJson[i].html_url}>${responseJson[i].html_url}</a></p>
            </li>`
        );
    }

   $("#results").removeClass("hidden");

}


function getGithubRepository(login) {

    const params ={
        type: "owner",
        sort: "full_name",
        direction: "asc"
    };

    let queryString = $.param(params);
    const url = `https://api.github.com/users/${login}/repos` + "?" + queryString;
    console.log("url",url);

 fetch(url).then(response => {
     if(response.ok) {
         return response.json();
     }
     throw new Error(respons.statusText);
    }).then(responseJson => displayResults(responseJson))
    .catch(err=> {
        $("#js-error-message").text(`Something failed: ${err.message}`);
    })
}

function watchForm(){
    $('form').submit(event => {
        event.preventDefault();
        let login = $("#js-username").val();
        console.log("data", login);
        getGithubRepository(login);
    })
}

$(watchForm);