Overlay.prototype = new google.maps.OverlayView();

function Overlay() {
}

Overlay.prototype.onAdd = function() {
    overlayCanvas = document.createElement("canvas");
    overlayCanvas.setAttribute("id", "overlay");
    overlayCanvas.style.position = "absolute";
    
    this.getPanes().overlayLayer.appendChild(overlayCanvas);
    
    scaling = 16;
    
    context = overlayCanvas.getContext("2d");
    
    context.scale(scaling, scaling);
}

var circles = [];

function genCircles() {
    if(typeof(symptoms) !== "undefined") {
        for(var c in circles) {
            //c.map = null;
        }
        circles = [];
        for(var k in symptoms) {
            var symp = symptoms[k];
            var lat = Number(symp.latitude);
            var lng = Number(symp.longitude);
            var rad = Number(symp.radius);
            var circ = new google.maps.Circle({
                strokeColor: '#00ff00',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#00ff00',
                fillOpacity: 0.35,
                map: map,
                center: new google.maps.LatLng(lat, lng),
                radius: Math.max(rad, 10)
            });
        }
   }
}

function redraw() {
    console.log(map.zoom);
    var overlayProjection = overlay.getProjection();
    var bounds = map.getBounds();
    var sw = overlayProjection.fromLatLngToDivPixel(bounds.getSouthWest());
    var ne = overlayProjection.fromLatLngToDivPixel(bounds.getNorthEast());
    
    overlayCanvas.style.left = sw.x + 'px';
    overlayCanvas.style.top = ne.y + 'px';
    
    var width = ne.x - sw.x;
    var height = sw.y - ne.y;
    
    overlayCanvas.style.width = width + 'px';
    overlayCanvas.style.height = height + 'px';
    
    var iwidth = Math.round(width / scaling);
    var iheight = Math.round(height / scaling);
    
    if(iwidth == 0 || iheight == 0) {
        return;
    }
    
    overlayCanvas.width = iwidth;
    overlayCanvas.height = iheight;
    
    var imageData = context.createImageData(iwidth, iheight);
    
    var data = imageData.data;
    
    var countS = new Float64Array(width * height);
    var countW = new Float64Array(width * height);
    
    visibleSymptoms = [];
    visibleWeather = [];
    
    if(typeof(symptoms) !== "undefined" && typeof(weatherData) !== "undefined") {
        
        for(var k in symptoms) {
            var symp = symptoms[k];
            if(bounds.contains(new google.maps.LatLng(symp.latitude, symp.longitude))) {
                visibleSymptoms.push(symp);
            }
        }
        for (var k in weatherData) {
            var weather = weatherData[k];
            if (bounds.contains(new google.maps.LatLng(weather.latitude, weather.longitude))) {
                switch (weather.weather_id) {
                    case "1": // Humidity
                        break;
                    case "2": // Temperature
                        if (Number(weather.value) < -10 || Number(weather.value) > 40)
                            visibleWeather.push(weather);
                        break;
                    case "3": // Wind Speed
                        if (Number(weather.value) > 70)
                            visibleWeather.push(weather);
                }
            }
        }
        
        for(var x = 0; x < iwidth; ++x) {
            for(var y = 0; y < iheight; ++y) {
                
                var coord = overlayProjection.fromContainerPixelToLatLng(new google.maps.Point((x + 0.5) * scaling, (y + 0.5) * scaling));

                var lat1 = coord.lat();
                var lng1 = coord.lng();

                for(var k in visibleSymptoms) {
                    var symp = visibleSymptoms[k];
                    var lat2 = Number(symp.latitude);
                    var lng2 = Number(symp.longitude);
                    var rad = Number(symp.radius);
                    
                    var R = 6371000; // metres
                    var φ1 = lat1 * Math.PI / 180;
                    var φ2 = lat2 * Math.PI / 180;
                    var Δφ = (lat2-lat1) * Math.PI / 180;
                    var Δλ = (lng2-lng1) * Math.PI / 180;
                    
                    var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                            Math.cos(φ1) * Math.cos(φ2) *
                            Math.sin(Δλ/2) * Math.sin(Δλ/2);
                    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
                    
                    var d = R * c;
                    
                    countS[y * iwidth + x] += (map.zoom < 4 ? (map.zoom < 3 ? 500000000 : 100000000) : 500000000) * Math.pow(1 / 2, map.zoom + 2) / d;
                }
                
                for (var k in visibleWeather) {
                    var weather = visibleWeather[k];
                    var lat2 = Number(weather.latitude);
                    var lng2 = Number(weather.longitude);
                    
                    var R = 6371000; // metres
                    var φ1 = lat1 * Math.PI / 180;
                    var φ2 = lat2 * Math.PI / 180;
                    var Δφ = (lat2-lat1) * Math.PI / 180;
                    var Δλ = (lng2-lng1) * Math.PI / 180;
                    
                    var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                            Math.cos(φ1) * Math.cos(φ2) *
                            Math.sin(Δλ/2) * Math.sin(Δλ/2);
                    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
                    
                    var d = R * c;

                    countW[y * iwidth + x] += 1000000000 * Math.pow(1 / 2, map.zoom + 2) / d;
                }
            }
        }
    }
    
    
      /*  for(var k in symptoms) {
            
            var xv = Math.floor(p.x / scaling);
            var yv = Math.floor(p.y / scaling);
            
            
            for(var x = -1; x <= 1; ++x) {
                for(var y = -1; y <= 1; ++y) {
                    var xx = xv + x;
                    var yy = yv + y;
                    var dx = p.x / scaling - xx;
                    var dy = p.y / scaling - yy;
                    var d = Math.sqrt(dx * dx + dy * dy);
                    if(xx < 0|| yy < 0 || xx >= iwidth || yy >= iheight) {
                        continue;
                    }
                    count[yy * iwidth + xx] += symp.severity * 100.0 / d / d;
                }
            }
        }
    }*/
    
    for(var i = 0; i < data.length; ++i) {
        data[i * 4] = countW[i];
        data[i * 4 + 1] = countS[i];
        data[i * 4 + 3] = countS[i] + countW[i];
        //data[i * 4 + 2] = Math.random() * 255;
    }
    
    context.putImageData(imageData, 0, 0, 0, 0, width, height);
    
    for(var i = 0; i < 20; ++i) {
        context.moveTo(-sw.x % 100 + i * 100, 0);
        context.lineTo(-sw.x % 100 + i * 100, height);
        context.moveTo(0, -ne.y % 100 + i * 100);
        context.lineTo(width, -ne.y % 100 + i * 100);
    }
    
    /*if(symptoms != undefined) {
        for(var k in symptoms) {
            var symp = symptoms[k];
            var lat = Number(symp.latitude);
            var lng = Number(symp.longitude);
            var rad = Number(symp.radius);
            
            rad = Math.max(rad, 10);
            
            var p = overlayProjection.fromLatLngToContainerPixel(new google.maps.LatLng({lat: lat, lng: lng}));
            
            context.beginPath();
            context.arc(p.x, p.y, rad, 0, 2 * Math.PI, false);
            context.fillStyle = 'rgba(255, 128, 0, 0.25)';
            context.fill();
        }
    }*/
}

Overlay.prototype.draw = function() {
    redraw();
}

Overlay.prototype.onRemove = function() {
}

function boundsChange() {
    redraw();
}

function move(e) {
    
    var overlayProjection = overlay.getProjection();
    
    if(typeof(visibleSymptoms) !== "undefined" && typeof(visibleWeather) !== "undefined") {
        var sympDist = Number.POSITIVE_INFINITY;
        var weatherDist = Number.POSITIVE_INFINITY;
        
        var coord = overlayProjection.fromLatLngToContainerPixel(e.latLng);

        for(var k in visibleSymptoms) {
            var symp = visibleSymptoms[k];
            var lat2 = Number(symp.latitude);
            var lng2 = Number(symp.longitude);
            var rad = Number(symp.radius);
            
            var c = overlayProjection.fromLatLngToContainerPixel(new google.maps.LatLng(lat2, lng2));
            
            var d = Math.sqrt((c.x - coord.x) * (c.x - coord.x) + (c.y - coord.y) * (c.y - coord.y));
            
            if(d < sympDist) {
                sympDist = d;
                bestSymp = symp;
                bestSympX = c.x;
                bestSympY = c.y;
            }
            
        }
        
        for (var k in visibleWeather) {
            var weather = visibleWeather[k];
            var lat2 = Number(weather.latitude);
            var lng2 = Number(weather.longitude);
            
            var c = overlayProjection.fromLatLngToContainerPixel(new google.maps.LatLng(lat2, lng2));
            
            var d = Math.sqrt((c.x - coord.x) * (c.x - coord.x) + (c.y - coord.y) * (c.y - coord.y));
            
            if(d < weatherDist) {
                weatherDist = d;
                bestWeather = weather;
                bestWeatherX = c.x;
                bestWeatherY = c.y;
            }
        }
        
        if(sympDist > 20) {
            bestSymp = undefined;
        }
        
        if(weatherDist > 20) {
            bestWeather = undefined;
        }
        
        createTooltip(bestSymp, bestWeather);
        
    }
}

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
      zoom: 16,
      center: {lat: 43.648, lng: -79.370},
      mapTypeId: google.maps.MapTypeId.MAP
    });
    
    google.maps.event.addListener(map, 'bounds_changed', boundsChange);

    overlay = new Overlay();
    overlay.setMap(map);
    genCircles();
    populateMap(); 
    
    google.maps.event.addListener(map, 'idle', function() {
        var center = map.getCenter();
        google.maps.event.trigger(map, 'resize');
        map.setCenter(center);
    });
    
    google.maps.event.addListener(map, 'mousemove', move);
}

google.maps.event.addDomListener(window, 'load', initMap);