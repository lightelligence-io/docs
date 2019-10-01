---
title: Monitoring Devices and Alerting
linktitle: Monitoring Devices and Alerting
description: Monitor the devices' operational status and implement notifications and alerts.
date: 2019-06-01
publishdate: 2019-06-01
categories: [devices]
keywords: [device types,events,monitoring,alerting]
menu:
  docs:
    parent: "devices"
    weight: 40
weight: 40
sections_weight: 40
draft: true
aliases: [/devices/,/overview/quickstart/]
toc: true
---

< The event-ingest process is still under discussion: This chapter is a placeholder. >

---

Begin Notes 20190611:

Note: it's being discussed whether the event type is fixed modeled like attributes, allowing to pass values.

@José: 
Eventdef: does not have type
events: {
         ‘greatEvent’: {}
       }

raw docu as of 20190611:

https://lightelligence.atlassian.net/wiki/spaces/OCP/pages/97419311/MQTT+Messages	:

Payload example:

{
  "deviceId": "123e4567-e89b-12d3-a456-426655440000",
  "type": "overheated",
  "createdAt": "2015-08-04T19:05:14.318570484Z"
}   
	   
new time attribute createdAt
type hardcoded: under discussion whether it should be fixed or whether payloud should be possible.

overheating event: temperature payload data would make sense

@José: if I understand it correctly, the following applies both to events and attributes? the difference being event-ingest vs. data-ingest.

2 configurations: for 

1. polling: minimum/max period and chache value that can be set for every attribute to manage how the information is stored in OLT

polling: query device every x seconds

If chache is enabled: only changed values will be posted.

Polling use case: e.g. steinel only allows polling: polling webpage in JSON format: is posted; 

Use polling if field device protocol does not support event-based communication, , e.g. DALI

2. event-based: preferred way to structure adapter: it consumes less resources, is more efficient

device initiates event, sends event to adapter: subscribe to topic; notifications are sent if values change

e.g. bluetooth low energy (BLE): 
subscribe to a topic (characteristics)
you get notifications if values of charactersitics change
Adapter: set up listener for notifications to arrive a field BT adapter (hardware)
adapter re-posts events from BT hardware

the mechanism is implemented in the protocol: no need to pull


mixed use cases: event-based for some features for others might necessary


@José: `reportingTime` should be configurable in the OLT portal, analogously to reporting rules, for example, correct?

Example: reporting time object

```
reportingTime: [{
            path: '$.attributes.ReadAttribute',
            pmin: 1,
            pmax: 1,
            usecache: false
          }]
```		  

@José: check my interpretations:

Max: value will be re-posted if max value is reached, 
Min: value will be re-posted at least every n units of time? Or: shortest period of time the value can be refreshed ( at least n units of time must have passed)?
Cache: same value re-posted or not

@José: is cache =true/false independent of pmin/pmax? Or are the interdependent?

```
attrs.pmin = _.isNumber(attrs.pmin) ? attrs.pmin : qn.so.get('lwm2mServer', 0, 'defaultMinPeriod');   
attrs.pmax = _.isNumber(attrs.pmax) ? attrs.pmax : qn.so.get('lwm2mServer', 0, 'defaultMaxPeriod');  

attrs.mute = _.isBoolean(attrs.mute) ? attrs.mute : true;
attrs.cancel = _.isBoolean(attrs.cancel) ? attrs.cancel : true;
attrs.lastRpVal = attrs.lastRpVal || null;

attrs.usecache = _.isBoolean(attrs.usecache) ? attrs.usecache : false; 
```



____ End Notes  20190611

--- 







Implement funnctions to monitor your devices and create alert.

For this, the OLT platform provides the `event` device type property ant the associated `event-ingest` MQTT topic. 


## Reading Status Data

Let's take a shutter contact as an example.

In this simple example, the relevant properties in the device type JSON schema are `attributes` for sensor data and `events` for one-time events.

**Procedure**

1. If your existing solution or a new device you want integrate doesn't have an API documentation, intercept the communication. 

	Use, for example, the Firefox console (Crtl+Shift+K) to inspect the HTTP requests the device's web client sends to the device.

	The following example inspects the status and configuration of a thermostat and a shutter contact controlled by a gateway.

	{{< figure src="/images/device-type-inspect-request.png" caption="Inspecting the Device Communication in the Firefox Console" alt="Inspecting the Device Communication in the Firefox Console" >}}

2. Classify the relevant data and apply the JSON schema properties accordingly. 

	* Use the `attributes` property to read and store sensor data, in the case of the shutter contact our example the current window status  (`windowOpen`).
	
		The `attributes` property is intended for read-only data such as sensor data.
	
	* Assign the battery status or the connection status to the `event` property.
	
		The `event` property is intended for one-time events that can occur, for example overheating or low battery. 
		@José: tries to find example and also include events, since events are not yet well documented 

	JSON Schema Example Shutter Contact:
	
	```JSON
	{
	"attributes": {   
		"windowOpen": {
			"type": "boolean"}
		},
	"event": {
		"batteryLow": {
			"type": "boolean"},
		"transmitError": {
			"type": "boolean"},		
			},
		"stateInfo": {
			"type": "string"},		
			},	
		"radioState": {
			"type": "string"},
			}		 
	}
	```

3. Enable reporting for the relevant `attributes`. @Jose: would you enable reporting for events, too, e.g. to establish SLA statistrics?

	```JSON
	{
	"path": "$.attributes.windowOpen",
		"reportTo": [
		"timeseries"
		]
	}
	```

4. To push the shutter contact sensor data to the OLT platform via Mosquitto, create an MQTT message.
	
	The topic is `data-ingest`.
	
	The payload is the device type property and the current value.

	```sh
	mosquitto_pub -h mqtt.lightelligence.io \
	-p 8883 --cert device_cert.pem --key device_key.pem \
	-d -t data-ingest \
	-m '{ "type": "attributes", "value": { "windowOpen": true } }' \
	-V mqttv311 --cafile olt_ca.pem
	```

5. To push the shutter contact event data to the OLT platform via Mosquitto, create a corresponding MQTT message.
	
	The topic is `event-ingest`.
	
	The payload is the device type property and the current value.

	```sh
	mosquitto_pub -h mqtt.lightelligence.io \
	-p 8883 --cert device_cert.pem --key device_key.pem \
	-d -t event-ingest \
	-m '{ "type": "event", "value": { "batteryLow": false } }' \
	-V mqttv311 --cafile olt_ca.pem
	```
	
6. Implement and test monitoring and alerting.

	To allow you to emulate a device generating one-time events, we provide the [`/event-ingest`](https://api.lightelligence.io/v1/api-collection/#tag/events/paths/~1event-ingest/post) endpoint.
	
	So, to test your monitoring and alerting function, instead of sending an MQTT message, make an HTTP request.
	
	@José: as per the API docu, the type is not "event" but "overheated", or, in our example, "batteryLow" -- is it correct?
	
	```sh
	curl -X GET \
		"https://api.lightelligence.io/v1/event-ingest" \
		-H 'Authorization: Bearer {TOKEN}' \
		-H 'Cache-Control: no-cache' \
		-H 'Content-Type: application/json' \
		-d '{ \
			"type": "event", \ 
			"value": { \
			"batteryLow": true \
			}, \
			"createdAt": "2018-07-07T11:50:12+00:00", \
			"deviceId": "550e8400-e29b-11d4-a716-446655440000", \
			"senderId": "550e8400-e29b-11d4-a716-446655440000" \
			}
	``` 
	
	
	As per https://api.lightelligence.io/v1/api-collection/#tag/events/paths/~1devices~1{deviceId}~1last-events/get: 
	
	```
	
			-d '{ \
			"type": "overheated", \ @
			"value": { \
			"temperature": 45 \
			}, \
			"createdAt": "2018-07-07T11:50:12+00:00", \
			"deviceId": "550e8400-e29b-11d4-a716-446655440000", \
			"senderId": "550e8400-e29b-11d4-a716-446655440000" \
			}
	```










<!--

## Setting Up Alerting




## Monitor the connection status of your devices.

<!-- currently, the compliance check does not detect if a device is compliant with the corresponding device type. Is being fixed. -->

**Procedure**

In the OLT portal, open the device.

**Result**

Under **Diagnostics**, a diagnostics log listing invalid MQTT messages is displayed.

If a device doesn't send date information continuously, the status `Offline` is displayed.
@Alex: - this seems not to be the case in the dev-portal as of 20190412; also: how am I alerted if a device fails? We should have a dashboard for that.

@tbd: add screenshot, clarify and verify; can the interval be configured?

Currently we display:

```
Last Seen: 11.4.2019 13:53:38
Diagnostics: Last hour messages

12:53:40
Device connected
12:53:41
Device disconnected
```
--> 



