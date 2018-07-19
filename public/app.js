var searchInput = document.querySelector('#inputBox');
var searchButton = document.querySelector('#button');
var tableDiv = document.querySelector('.tableDiv')
var noEntryAlert = document.querySelector('.alert');

//Compliling my search template
var searchTemplate = document.querySelector("#searchTemplate").innerHTML;
var searchTemplateInstance = Handlebars.compile(searchTemplate);

var url = '/search';

function getSearches(){
    $.ajax({
        url: url,
        type: "get"
    }).done(function(data){
        //console.log(data.data);

        var searchData = data.data;     
        for(var i = 0; i < searchData.length; i++){  
            
            tableDiv.innerHTML = searchTemplateInstance({
                search: data.data
            });
        }
    })
}

getSearches();


function saveSearch(evt){
    evt.preventDefault();
    var searchToUpload = {
        "takeSearch": searchInput.value
    }
    if(!searchToUpload.takeSearch){
        noEntryAlert.style.display = 'block';
        setTimeout(function(){
            noEntryAlert.style.display = 'none';
        }, 4000);

    }
    $.ajax({
        url: url,
        type: "post",
        data: JSON.stringify(searchToUpload),
        contentType: 'application/json'
    }).done(function(data){
        console.log(searchInput.value);
        console.log(data);
        searchInput.value = '';
        getSearches();
    })
}

$(document).ready(function() {
    console.log('ready---->');

    //event lister for add modal
    searchButton.addEventListener('click', saveSearch);
    console.log("Button clicked");
});
