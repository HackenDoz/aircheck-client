function removeMap(){
    document.getElementById("map").className = "hidden-xs";
    document.getElementById("mapsymptoms").className = "nav nav-sidebar";
}

function openMap(){
    document.getElementById("map").className = "";
    document.getElementById("mapsymptoms").className = "nav nav-sidebar hidden-xs";
}

$(document).ready(function(){
    populateSymptoms();
    populateMap();
    window.onpopstate = removeMap;
});

function click(e) {
    if(window.innerWidth <= 767){
        openMap();
        google.maps.event.trigger(map, "resize");
        history.pushState({}, "", document.location);
    }
    var element = document.getElementById("mapsymptoms").childNodes[e];
    if(element.className.indexOf("active") > -1){
        element.className = "";
        element.blur();
    }else{
        element.className = "active";
    }
}

function populateSymptoms() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var w = document.getElementById("mapsymptoms");
            var i = 0;
            w.innerHTML = '<li><h4 class="visible-xs">Click one to display a map</h4></li>';
            var data = JSON.parse(xhttp.responseText)["symptoms"];
            console.dir(data);
            data.forEach(function(element){
                (function(i){
                    var symptom = element.name;
                    console.log(symptom);
                    
                    var li = document.createElement("li");
                    var a = document.createElement("a");
                    a.setAttribute("href", "javascript:void(0)");
                    a.appendChild(document.createTextNode(symptom));
                    li.appendChild(a);
                    li.onclick = function(){
                        click(i);
                    }
                    w.appendChild(li);
                })(++i);
            });
        }
    }
    xhttp.open("GET", "//api.aircheck-ng.tk/symptoms", true);
    xhttp.send();
}

function populateMap() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var data = JSON.parse(xhttp.responseText)["heatmap"];
            showMap(data);
        }
    };
    xhttp.open("GET", "//api.aircheck-ng.tk/mapping", true);
    xhttp.send();
}

function showMap(symp) {
    symptoms = symp;
}


function getWeather(lat, long) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Temperature, Pressure, Humidity, Wind Speed
            var data = JSON.parse(xhttp.responseText);
            console.dir(data);
            var output = {};
            output["temperature"] = data["main"]["temp"];
            output["humidity"] = data["main"]["humidity"];
            output["wind"] = data["wind"]["speed"];
            console.dir(output);
        }
    };
    xhttp.open("GET", "//api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&appid=58e80df1ecf484fd3c75c6ee1ee12eab", true);
    xhttp.send();
}