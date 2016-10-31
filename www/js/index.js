/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 var watchId = null;
var positionOptions = {
   enableHighAccuracy: true,
   timeout: 15 * 1000, // 10 seconds
   maximumAge: 10 * 1000 // 5 seconds (maxiumAge is the time between readings in milliseconds)
};
 
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
		console.log("my device ready");
		watchId = navigator.geolocation.watchPosition(positionSuccess, positionError, positionOptions);
		console.log("watchID started");
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
		
		
		
    }
};

function positionSuccess(position) {
				
		var lat = position.coords.latitude;
		var lng = position.coords.longitude;
		var acc = position.coords.accuracy;
		var alt = position.coords.altitude ?  position.coords.altitude : 'unavailable';
		var altAcc = position.coords.altitudeAccuracy ? position.coords.altitudeAccuracy : 'unavailable';
		var speed = position.coords.speed ? position.coords.speed : 'unavailable';

		var divMyPos = document.getElementById("myPosition");
		divMyPos.innerHTML = "Position: " + lat + " - " + lng;
		console.log("Position: " + lat + " - " + lng);
	}

	function positionError(positionError) {
		var divMyPos = document.getElementById("myPosition");
		divMyPos.innerHTML = "GPS ERROR ";
	}
