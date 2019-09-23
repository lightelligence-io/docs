---
title: Synchronizing Device Configurations
linktitle: Synchronizing Device Configurations
description: Change configuration values in devices and verify the changes.
date: 2019-06-01
publishdate: 2019-06-01
categories: [devices]
keywords: [device types,configuration,synchronization]
menu:
  docs:
    parent: "devices"
    weight: 30
weight: 30
sections_weight: 30
draft: false
aliases: [/devices/,/overview/quickstart/]
toc: true
---


> The config sync process is still under discussion: This chapter is a placeholder.


---

____ Begin Notes 20190611:

@José: config subject is changing fast; is going to be discussed with Michael -- 2nd way of updating will not be implemented: 
4.20


config changes come from OLT to the adapter; same logic as with actions: 
gateway knows which adapter this device for this change belongs to
gateway roots the config to the corresponding adapter, adapter roots config to field device

validate values and post them if changed: not yet finished in SDK

analogous to actions: OLT routes to gateway, sends action with payload, 
info is posted to gateway that is referenced by connectdBy attribute.
Gateway routes to adapter. Adapter routes to field device using the specific field device communication.

a gateway can have any number of apps in form of adapters	   

2 configurations: for 

1. polling: minimum/max period and chache value that can be set for every attribute

2. event-based



As for Config update:
1. subscribe it to the devices/{deviceId}/configuration topic
2. To actually trigger the configuration change, implement a PATCH request to the /devices/{deviceId} endpoint



When gateway has an adapter and the adapter creates a device

When I write an adapter, I make calls only to the gateway

Gateway has 2 API: 
* HTTP
* MQTT

a kind of mini OLT runs in the Gateays: acts as a filter, man in th emiddle to decide what gets posted and to route information back

gateway needs adapter, only adapter can route action back to the device

The Adapter can talk to both the gateway and the field protocol it manages

E.g. BLE adapter: if config change in gateway, gateway knows the device corresponds to BLE adapter, 
sends config update to adapter, 
adapter passes the configuration to the device and reports back to OLT to acknowledge that config has actually changed

On creating a device I get an MQQT configuration update message at the gateway with the configuration used to create the device.

Then, this config update message is processed as if it had been received later, by just parsing the configuration by the appropriate processing and then the ackknowledgement.



____ End Notes  20190611

--- 











	   


Let's now change configuration data, in the following example a thermostat's target temperature.

The associated device type property is `configuration`. You employed it to read network and sensor data when you connected your first device (see [Connecting a Device in 3 Steps](/getting-started/setting-up-getting-started/)):

A configuration change is bi-directional: In our example write a new target temperature to the device. And we read the configuration, to verify changes or monitor the configuration.


## Synchronizing Configuration Data

<!--
OLT-3578:
Configuration values can be set on digital twin and are automatically send to device
Device can notify digital twin about changed configuration values
Digital twin can be used to get an overview over current device configuration
-->

@Jose, our virtual adapter implements two ways to change configuration data:

* Send either start or stop update action to the device, in this case start/stop incrementing a counter (generated in lieu of sensor data, for example): stop = value not incremented and not posted 
or
* Write new config value "update values" to the device in OLT, then send action to reload config action: it will grab the config from OLT and adapt adapter behavior.

@José: Is there a real-world use case behind the alternative?


**Procedure**

1. Inspect the device communication

	Use, for example, the Firefox console (Crtl+Shift+K) to inspect the HTTP requests the device's web client sends to the device.

	The following example inspects the status and configuration of a thermostat and a shutter contact controlled by a gateway.

	{{< figure src="/images/device-type-inspect-request.png" caption="Inspecting the Device Communication in the Firefox Console" alt="Inspecting the Device Communication in the Firefox Console" >}}


2. In the OLT portal, create the device type.

	1. Classify the relevant data and apply the JSON schema properties accordingly: 

		* Use the `attributes` property to read and store sensor data, in our example the current temperature (`currentAutoTemperature`).
	
			You are familiar with the `attributes` property from the [Storing and Retrieving Sensor Data in 3 Steps](/devices/reporting-getting-started/) scenario. 
	
		* Assign the target temperature to the `configuration` property. Define, for example, a `setPointTemperature` property.
	
			The `configuration` property is intended for read/write data.
	
		* Assign the battery status or the connection status, for example, to the `event` property.
	
		You are familiar with the `event` property from the [Monitoring Devices and Alerting](/devices/monitoring-devices/) scenario. 

@tbd: event is currently fixed type, e.g. "overheated"; it's under discussion

		JSON Schema Example Thermostat:
	
		```JSON
		{
		"attributes": {   
		"currentAutoTemperature": {
			"type": "number"},
				},
		"configuration": {
			"setPointTemperature": {
				"type": "number"},
			"temperatureOffset": {
				"type": "number"}	
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

	2. Enable reporting for the relevant `attributes`. @José:would one also write the events to the database, in our case the battery status? ("and `event` properties"?) 
	
	@José -- if it makes sense to store event data, would I define the reporting rule the same way as with attributes?: events are under discussion.
	not yet clear what granularity we need for the timeseries; 

		```JSON
		{
			"path": "$.attributes.currentAutoTemperature",
				"reportTo": [
					"timeseries"
					]
			},
			{
			"path": "$.event.batteryLow",
				"reportTo": [
					"timeseries"
					]
		}
		```
	
	3. Implement a process to store and retrieve the sensor data and process event data. 

4. To write new configuration to the device, in our example, set the target temperature to `21`, do the following.

	1. To enable your thermostat to receive configuration updates, subscribe it to the `devices/{deviceId}/configuration` topic:

		```sh
		mosquitto_sub -h mqtt.lightelligence.io \
		-p 8883 --cafile olt_ca.pem --cert device_cert.pem --key device_key.pem \
		-V "mqttv311" 
		-t 'devices/{deviceId}/configuration' 
		-d 
		```
	
		The thermostat now listens for configuration changes.  

	2. To actually trigger the configuration change, implement a PATCH request to the [/devices/{deviceId}](https://api.lightelligence.io/v1/api-collection/#tag/devices/paths/~1devices~1{deviceId}/patch) endpoint. 
	
		Your request contains the configuration name and its payload in the request body, in our example `setPointTemperature` and the new target temperature `21`.
	
		```sh
		curl -X PATCH \
		https://api.lightelligence.io/v1/devices/{deviceId} \
		-H 'Authorization: Bearer {TOKEN}' \
		-H 'Cache-Control: no-cache' \
		-H 'Content-Type: application/json' \
		-d '{
		"configuration": {
			"setPointTemperature": 21
		}
		}'
		```
		

	Result: When you've performed the device configuration change, on your device you receive an MQTT message similar to the following:

	@tbd: verify

	```json
	{
		"deviceId": "{deviceId}",
		"configuration": {
			"setPointTemperature": 21
		}
	}
	```

	This updates your device's internal configuration according to its digital twin in the cloud.
	
5. Implement a process to verify the configuration change.

	To do so, use an MQTT message to the `data-ingest` topic. The process is analogous to processing sensor data as described under [Storing and Retrieving Sensor Data](/devices/reporting-getting-started/):
	
	```
	mosquitto_pub -h mqtt.lightelligence.io \   
	-p 8883 --cert device_cert.pem --key device_key.pem \
	-d -t data-ingest \
	-m '{ "type": "configuration", "value": { "setPointTemperature": setPointTemperature } }' \  
	-V mqttv311 --cafile olt_ca.pem
	```

	---
	
	**Note**
	
	**Quality of Service (QoS)**
	
	The OLT platform supports the QoS levels 0 and 1.
	
	---
	

@José: In case of actions and config changes, Problem: How the device acknowledge the change? --  why would we use a `reload confic` action instead of sending an MQTT message to the `data-ingest` topic as above?

So use action (to be included in the SDK as a standard feature): ReloadConfiguration
Re: Adapter reads new configuration from OLT and do changes accordingly

request to the  devices/{deviceID}/actions endpoint

Example: 

```sh
curl -X POST \
  https://api.lightelligence.io/v1/devices/b3ec0d14-6ad5-4dbd-90ee-be019b1aae62/actions \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: b09d74b9-063d-47a6-8d77-af558045b0d4' \ 
  -H 'cache-control: no-cache' \
  -d '{
    "action": "ReloadConfiguration",
    "payload": {}
``` 





