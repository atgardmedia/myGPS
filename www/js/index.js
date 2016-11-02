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
   timeout: 15 * 1000, // 15 seconds
   maximumAge: 10 * 1000 // 10 seconds (maxiumAge is the time between readings in milliseconds)
};

$( document ).bind( "mobileinit", function() {
	$.support.cors                 = true;
	$.mobile.allowCrossDomainPages = true;
	$.mobile.pushStateEnabled      = false;
});
 
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
		
		startTrack();
		
    }
};


var divMyPos = document.getElementById("myPosition");
var divMyAcc = document.getElementById("myAccuracy");
var divMyAlt = document.getElementById("myAltitude");
var divMySpd = document.getElementById("mySpeed");
var divMyLog = document.getElementById("myLog");
var divMyError = document.getElementById("myError");

function startTrack() {
	divMyLog.innerHTML = "Tracker started";
	watchId = navigator.geolocation.watchPosition(positionSuccess, positionError, positionOptions);
}

function stopTrack() {
	divMyLog.innerHTML = "Tracker stoped";
	navigator.geolocation.clearWatch(watchId);
}


function positionSuccess(position) {
				
	var lat = position.coords.latitude;
	var lng = position.coords.longitude;
	var acc = position.coords.accuracy;
	var alt = position.coords.altitude ?  position.coords.altitude : 'unavailable';
	var altAcc = position.coords.altitudeAccuracy ? position.coords.altitudeAccuracy : 'unavailable';
	var speed = position.coords.speed ? position.coords.speed : 'unavailable';

	var divMyPos = document.getElementById("myPosition");
	divMyPos.innerHTML = "Lat: " + lat + " Lng:" + lng;
	divMyAcc.innerHTML = acc;
	divMyAlt.innerHTML = alt;
	divMySpd.innerHTML = speed;
	divMyLog.innerHTML = "Recieved position..";
	
	insertWaypoint(lat, lng, acc, alt, altAcc, speed);
}

function positionError(positionError) {
	
	divMyError.innerHTML = "GPS ERROR ";
}

function insertWaypoint(latitude, longitude, accuracy, altitude, altitudeAccuracy, speed) {
	divMyLog.innerHTML = "Call ajax..";
	var data = {
		latitude			: latitude,
		longitude			: longitude,
		accuracy			: accuracy,
		altitude			: altitude,
		altitudeAccuracy	: altitudeAccuracy,
		speed				: speed
	}
	
	$.ajax({
		type: "POST",
		data: data, // pass as data
		crossDomain: true,
		dataType:'JSON', //Expected datatype to come back
		url: "http://www.atgard.se/jakt/insertWaypoint.php"
	})

	.done(function (reply) {
		var replyStatus = reply.status;
		var replyExtra = reply.extra;
				
		if(replyStatus != 'OK'){
			divMyError.innerHTML = "Error: " + reply;
		}

		else {
			divMyLog.innerHTML = "Added succesfully!";
		}
	})
	divMyLog.innerHTML = "Waiting for ajax..";
}
