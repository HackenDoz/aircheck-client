$(document).ready(function(){
    populateMapSymptoms();
});

function populateMapSymptoms() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        console.log(xhttp);
        console.log(xhttp.status);
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            console.log("text");
            var data = JSON.parse(xhttp.responseText);
            var tableData = '<li><h4 class="visible-xs">Click one to display a map</h4></li>';
            for (var i = 0; i < data["symptoms"].length; i++) {
                var symptom = data["symptoms"][i]["name"];
                tableData += '<li><a href="javascript:void(0)" onclick="click();">' + symptom + '</a></li>';
            }
            document.getElementById("mapsymptoms").innerHTML = tableData;
        }
    };
    xhttp.open("GET", "//api.aircheck-ng.tk/symptoms", true);
    xhttp.send();
}
