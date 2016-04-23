<!DOCTYPE html>
<html class="fullheight">
    <head>
        <?php $title = "Aircheck-NG - Home"; require("res/head.php"); ?>
    </head>
    <body class="fullheight">
        <?php $SUBactive=false; $MAPactive = true; require("res/header.php") ?>
        <div class="container-fluid fullheight">
            <div class="row fullheight">
                <div class="col-sm-3 navbar-default">
                    <ul class="nav nav-sidebar" id="mapsymptoms">
                        <li><h4 class="visible-xs">Click one to display a map</h4></li>
                        <li><a href="javascript:void(0)" onclick="click();">Shortness of breath</a></li>
                        <li><a href="javascript:void(0)" onclick="click();">Anal-lysis</a></li>
                        <li><a href="javascript:void(0)" onclick="click();">Fucking Jim randomly</a></li>
                    </ul>
                </div>
                <div id="map" class="col-sm-9 fullheight hidden-xs">
                </div>
            </div>
        </div>
        
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDojGhUyOXCLHs9ek0iMJohJK8MF8AFvfQ"></script>
        <script>
        function click(){
            console.log(this);
        } 
            var overlay;
      USGSOverlay.prototype = new google.maps.OverlayView();

      // Initialize the map and the custom overlay.

      function initMap() {
        var map = new google.maps.Map(document.getElementById("map"), {
          zoom: 16,
          center: {lat: 43.648, lng: -79.370},
          mapTypeId: google.maps.MapTypeId.MAP
        });

        var bounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(43.648, -79.370),
            new google.maps.LatLng(43.7, -79.3));

        // The photograph is courtesy of the U.S. Geological Survey.
        var srcImage = 'https://developers.google.com/maps/documentation/' +
            'javascript/examples/full/images/talkeetna.png';

        // The custom USGSOverlay object contains the USGS image,
        // the bounds of the image, and a reference to the map.
        overlay = new USGSOverlay(bounds, srcImage, map);
      }

      /** @constructor */
      function USGSOverlay(bounds, image, map) {

        // Initialize all properties.
        this.bounds_ = bounds;
        this.image_ = image;
        this.map_ = map;

        // Define a property to hold the image's div. We'll
        // actually create this div upon receipt of the onAdd()
        // method so we'll leave it null for now.
        this.div_ = null;

        // Explicitly call setMap on this overlay.
        this.setMap(map);
      }

      /**
       * onAdd is called when the map's panes are ready and the overlay has been
       * added to the map.
       */
      USGSOverlay.prototype.onAdd = function() {

        var div = document.createElement('div');
        div.style.borderStyle = 'none';
        div.style.borderWidth = '0px';
        div.style.position = 'absolute';

        // Create the img element and attach it to the div.
        var img = document.createElement('img');
        img.src = this.image_;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.position = 'absolute';
        div.appendChild(img);

        this.div_ = div;

        // Add the element to the "overlayLayer" pane.
        var panes = this.getPanes();
        panes.overlayLayer.appendChild(div);
      };

      USGSOverlay.prototype.draw = function() {

        // We use the south-west and north-east
        // coordinates of the overlay to peg it to the correct position and size.
        // To do this, we need to retrieve the projection from the overlay.
        var overlayProjection = this.getProjection();

        // Retrieve the south-west and north-east coordinates of this overlay
        // in LatLngs and convert them to pixel coordinates.
        // We'll use these coordinates to resize the div.
        var sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
        var ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());

        // Resize the image's div to fit the indicated dimensions.
        var div = this.div_;
        div.style.left = sw.x + 'px';
        div.style.top = ne.y + 'px';
        div.style.width = (ne.x - sw.x) + 'px';
        div.style.height = (sw.y - ne.y) + 'px';
      };

      // The onRemove() method will be called automatically from the API if
      // we ever set the overlay's map property to 'null'.
      USGSOverlay.prototype.onRemove = function() {
        this.div_.parentNode.removeChild(this.div_);
        this.div_ = null;
      };

      google.maps.event.addDomListener(window, 'load', initMap);
        </script>

    </body>
</html>