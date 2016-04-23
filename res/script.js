$(document).ready(function(){
    populateTable();
    $('[data-toggle="tooltip"]').tooltip();
});

function populateTable() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var data = JSON.parse(xhttp.responseText);
            var tableData = "";
            for (var i = 1; i < data["symptoms"].length + 1; i++) {
                var cur = data["symptoms"][i - 1];
                var id = i;
                var symptom = cur["name"];
                var desc = cur["desc"];
                tableData += '<tr class="tableRow3251">';
                tableData += '<td class="col-md-3">' + symptom + '</td>';
                tableData += '<td class="col-md-1 cent"><a href="#" data-toggle="tooltip" data-placement="top" title="' + desc + '"><i class="fa fa-info-circle fa-2x" aria-hidden="true"></i></a></td>';
                tableData += '<td class="col-md-8"><input type="range" name="' + id + '" id="' + id + '" value="0" min="0" max="5"></td>';
                tableData += '</tr>';
            }
            tableData += '<tr><td colspan="3"><button class="btn" style="width: 100%" onclick="submitToServer()">SUBMIT</button></td></tr>';
            document.getElementById("submitTable").innerHTML = tableData;
            $('[data-toggle="tooltip"]').tooltip();
        }
    };
    xhttp.open("GET", "//api.aircheck-ng.tk/symptoms", true);
    xhttp.send();
}

function populateMapSymptoms() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            console.log("text");
            var data = JSON.parse(xhttp.responseText);
            var tableData = "";
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

function submitToServer() {
    var usrInfo = {};
    $.getJSON('http://ipinfo.io', function(data){
        usrInfo = data["loc"].split(",");
    })
    var elems = document.getElementsByClassName("tableRow3251");
    var toSend = {
        "latitude": usrInfo[0],
        "longitude": usrInfo[1],
        "symptoms": {}
    };
    for (var i = 1; i < elems.length + 1; i++) {
        toSend["symptoms"][i + ""] = parseInt(document.getElementById(i).value);
    }
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            alert(xhttp.responseText +"|"+usrInfo[0]+"|"+usrInfo[1]);
        }
    }
    xhttp.open("POST", "//api.aircheck-ng.tk/submit", true);
    xhttp.send(JSON.stringify(toSend));
}