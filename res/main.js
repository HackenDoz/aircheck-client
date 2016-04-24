var idToName = ["", "Cough", "Wheezing", "Nasal Obstruction", "Itchy Eye", "Lung Cancer", "Shortness of Breath", "Sneezing"];

function removeMap(){
    document.getElementById("map").className = "col-sm-9 fullheight hidden-xs";
    document.getElementById("mapsymptoms").className = "nav nav-sidebar";
}

function openMap(){
    if(window.innerWidth <= 767){
        document.getElementById("map").className = "";
        document.getElementById("mapsymptoms").className = "nav nav-sidebar hidden-xs";
        
        history.pushState({}, "", document.location);
        
        refresh();
        var center = map.getCenter();
        google.maps.event.trigger(map, 'resize');
        map.setCenter(center);
    }
}

$(document).ready(function(){
    populateSymptoms();
    populateWeather();
    populateMap();
    window.onpopstate = removeMap;
    
    removeMap();
});

function createTooltip(symp, weather) {
    if (symp != undefined && symp.severity != 0) {
        var box = document.getElementById('4431');
        box.innerHTML = "<h5>" + idToName[Number(symp.symptom_id)] + "</h5>" + "<p>Severity: " + symp.severity + "</p>";
    } else if (weather != undefined) {
        var box = document.getElementById('4431');
        console.log(weather.weather_id);
        switch (Number(weather.weather_id)) {
            case 1:
                box.innerHTML = "<h5>Humidity: " + weather.value + "</h5>";
                break;
            case 2:
                box.innerHTML = "<h5>Temperature: " + weather.value + "</h5>";
                break;
            case 3:
                box.innerHTML = "<h5>Temperature: " + weather.value + "</h5>";
                break;
        }
    }
    else {
        var box = document.getElementById('4431');
        box.innerHTML = "";
    }
}

function symptomClick(e) {
    openMap();
    var elements = document.getElementById("mapsymptoms").childNodes;

    for (var i = 0; i < elements.length; i++) {
        if (i == e) {
            continue;
        }
        elements[i].className = "";
    }
    
    if (elements[e].className.indexOf("active") > -1) {
        elements[e].className = "";
        elements[e].blur();
        
        fuckSymptoms([]);
    } else {
        elements[e].className = "active";
        
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "//api.aircheck-ng.tk/mapping?symptom=" + e);
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200) {
                fuckSymptoms(JSON.parse(xhttp.responseText)["heatmap"]);
                redraw();
                console.log("here");
            }
        };
        xhttp.send();
    }
}

function populateSymptoms() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var w = document.getElementById("mapsymptoms");
            var i = 0;
            w.innerHTML = '<li><h4>Symptoms</h4></li>';
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
                        symptomClick(i);
                    }
                    w.appendChild(li);
                })(++i);
            });
            var li = document.createElement("li");
            var a = document.createElement("button");
            a.className = "btn btn-primary btn-fullwidth visible-xs";
            a.appendChild(document.createTextNode("Show map"));
            li.appendChild(a);
            li.onclick = openMap;
            w.appendChild(li);
        }
    }
    xhttp.open("GET", "//api.aircheck-ng.tk/symptoms", true);
    xhttp.send();
}

function populateMap() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "//api.aircheck-ng.tk/mapping", false);
    xhttp.send();
    fuckSymptoms(JSON.parse(xhttp.responseText)["heatmap"]);
}

function fuckSymptoms(symp) {
    symptoms = symp;
}

function fuckWeather(weather) {
    weatherData = weather;
}

function getWeatherConditions() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            weather = JSON.parse(xhttp.responseText);
        }
    };
    xhttp.open("GET", "//api.aircheck-ng.tk/weather", true);
    xhttp.send();
}

function populateWeather() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "//api.aircheck-ng.tk/weather/mapping", false);
    xhttp.send();
    fuckWeather(JSON.parse(xhttp.responseText)["heatmap"]);
}