$(document).ready(function(){
    populateMapSymptoms();
});

function map(e) {
    console.log(e);
}

function populateMapSymptoms() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var data = JSON.parse(xhttp.responseText);
            var tableData = '<li><h4 class="visible-xs">Click one to display a map</h4></li>';
            for (var i = 0; i < data["symptoms"].length; i++) {
                var symptom = data["symptoms"][i]["name"];
                tableData += '<li><a href="javascript:void(0)" onclick="map(\'' + symptom + '\')">' + symptom + '</a></li>';
            }
            document.getElementById("mapsymptoms").innerHTML = tableData;
        }
    };
    xhttp.open("GET", "//api.aircheck-ng.tk/symptoms", true);
    xhttp.send();
}
