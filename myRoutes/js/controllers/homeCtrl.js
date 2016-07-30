angular.module('HomeCtrl', [])
    .controller('HomeController', function($rootScope, $scope, $timeout, Route) {

        $rootScope.isDataLoading = true;
        $rootScope.setSelected(0);
        $scope.title = "Home";

        $scope.route = {
            "name" : "",
            "origin_place_id" : "",
            "origin_place_name" : "",
            "destination_place_id" : "",
            "destination_place_name" : "",
            "travel_mode" : "",
            "total" : 0
        };

        $scope.checkMapLoaded = function(){
            if(typeof google == 'undefined') {
                $timeout(function() {
                    $scope.checkMapLoaded();
                }, 200);
            }
            else {
                $scope.initMap();
            }
        };

        $scope.initMap = function() {
            $scope.map = new google.maps.Map(document.getElementById('map'), {
                zoom: 14,
                center: {lat: 45.0664338, lng: 7.6657845},
                // disableDefaultUI: true
            });

            $scope.route.travel_mode = google.maps.TravelMode.WALKING;

            $scope.directionsService = new google.maps.DirectionsService;
            $scope.directionsDisplay = new google.maps.DirectionsRenderer({
                map: $scope.map
            });

            $scope.directionsDisplay.setMap($scope.map);

            // MAP UI
            var originInput = document.getElementById('origin-input');
            var destinationInput = document.getElementById('destination-input');

            // AUTOCOMPLETE
            $scope.autocompleteOrigin = new google.maps.places.Autocomplete(originInput);
            $scope.autocompleteOrigin.bindTo('bounds', $scope.map);

            $scope.autocompleteDestination = new google.maps.places.Autocomplete(destinationInput);
            $scope.autocompleteDestination.bindTo('bounds', $scope.map);

            $scope.autocompleteOrigin.addListener('place_changed', $scope.updateOrigin);
            $scope.autocompleteDestination.addListener('place_changed', $scope.updateDestination);

            $('#mode-selector').on('change', function() {
                switch(this.value) {
                    case 'walking':
                        $scope.route.travel_mode = google.maps.TravelMode.WALKING;
                        break;
                    case 'transit':
                        $scope.route.travel_mode = google.maps.TravelMode.TRANSIT;
                        break;
                    case 'driving':
                        $scope.route.travel_mode = google.maps.TravelMode.DRIVING;
                        break;
                }
            });

            $rootScope.isDataLoading = false;
        };

        $scope.updateOrigin = function() {
            var place = $scope.autocompleteOrigin.getPlace();
            if (place == undefined || !place.geometry) {
                $rootScope.showError('Luogo di partenza non valido');
                return;
            }

            // If the place has a geometry, then present it on a map.
            if (place.geometry.viewport) {
                $scope.map.fitBounds(place.geometry.viewport);
            } else {
                $scope.map.setCenter(place.geometry.location);
                // $scope.map.setZoom(17);  // Why 17? Because it looks good.
            }
        };

        $scope.updateDestination = function() {
            var place = $scope.autocompleteDestination.getPlace();
            if (place == undefined || !place.geometry) {
                $rootScope.showError('Luogo di destinazione non valido');
                return;
            }

            // If the place has a geometry, then present it on a map.
            if (place.geometry.viewport) {
                $scope.map.fitBounds(place.geometry.viewport);
            } else {
                $scope.map.setCenter(place.geometry.location);
                // $scope.map.setZoom(17);  // Why 17? Because it looks good.
            }
        };

        $scope.calcola = function() {
            if($scope.isFormValid()) {
                $scope.callRouteService(false);
            }
        };

        $scope.save = function() {
            if($scope.isFormValid()) {
                $rootScope.isDataLoading = true;
                $scope.callRouteService(true);
            }
        };

        $scope.isFormValid = function() {
            var originPlace = $scope.autocompleteOrigin.getPlace();
            var destinationPlace = $scope.autocompleteDestination.getPlace();

            if (originPlace == undefined || !originPlace.geometry
                || destinationPlace == undefined || !destinationPlace.geometry) {

                $rootScope.showError('Devi inserire dei luoghi validi');
                return false;
            }

            return true;
        };

        $scope.callRouteService = function(save) {
            var originPlace = $scope.autocompleteOrigin.getPlace();
            var destinationPlace = $scope.autocompleteDestination.getPlace();

            $scope.directionsService.route({
                origin: {'placeId': originPlace.place_id},
                destination: {'placeId': destinationPlace.place_id},
                travelMode: $scope.route.travel_mode
            }, function(response, status) {
                if (status === google.maps.DirectionsStatus.OK) {

                    $scope.route.origin_place_id = originPlace.place_id;
                    $scope.route.origin_place_name = originPlace.formatted_address;
                    $scope.route.destination_place_id = destinationPlace.place_id;
                    $scope.route.destination_place_name = destinationPlace.formatted_address;

                    $scope.directionsDisplay.setDirections(response);
                    $scope.computeTotalDistance();

                    if(save) {
                        Route.store($scope.route)
                            .then(
                                function(data) {
                                    $rootScope.showInfo("Itinerario salvato con successo!")
                                },
                                function(error) {
                                    $rootScope.showInfo("Errore nel salvataggio dell'itinerario.")
                                }
                            )
                            .finally(function() {
                                $rootScope.isDataLoading = false;
                                $scope.callRouteService(false);
                            });
                    }

                } else {
                    $rootScope.showError('Calcolo tragitto fallito!');
                }
            });
        };

        $scope.computeTotalDistance = function() {
            var total = 0;
            var myroute = $scope.directionsDisplay.getDirections().routes[0];
            for (var i = 0; i < myroute.legs.length; i++) {
                total += myroute.legs[i].distance.value;
            }

            $timeout(function() {
                $scope.route.total = total / 1000;
            });
        };

        $scope.checkMapLoaded();

    });