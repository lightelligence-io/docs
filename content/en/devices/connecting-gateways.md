---
title: Connecting Gateway Devices
linktitle: Connecting Gateway Devices
description: Connect devices that don't communicate with the OLT platform directly but via a gateway. 
date: 2019-06-01
publishdate: 2019-06-01
categories: [devices]
keywords: [device type,alias,connectedBy,gateway]
menu:
  docs:
    parent: "devices"
    weight: 50
weight: 50
sections_weight: 50
draft: true
aliases: [/devices/,/overview/quickstart/]
toc: true
---




> The gateway process is still under discussion: This chapter is a placeholder.

In a typical setup, devices don't communicate with the OLT platform directly but via a gateway. 

A gateway allows you to integrate device that are not IoT enabled.

{{< figure src="/images/gateway-setup.png" caption="Gateway Setup" alt="Gateway Setup" >}}

In this setup, you proceed as follows:

1. Create the device type for each device.
2. Create a device type for the gateway device.
3. Create a device for the gateway.
4. Create a device for each sensor with the right device type.
5. Modify all sensor devices to make them connectedBy the gateway device, Assign a unique alias, which is also available later for the gateway (i.e. mac address) to each of the device.
5. In the gateway, 
	Create certificate
	Enable MQTT to data-ingest
 
Aliases are used only in MQTT and HTTP data- and event-ingest messages 

In the /devices/:id/... REST-API, aliases can only be used on the GET /devices endpoint as query.

The devices aliases array is included in the cloud to device message (in addition to the device’s uuid).




<!-- https://lightelligence.atlassian.net/wiki/spaces/OCP/pages/340426778/Aliases+v2+spec -->

---

____ Begin Notes 20190611:

Adapter SDK encapsulates calls of the gateway API, bot MQTT and HTPP.
It binds libraries and facilities, e.g.

if it creates a device in the gateway and in the OLT platform, it automatically adds the gatreway device ID as the connectedBy, including the the adapter and the field devices.

Every device that needs to be reached from the cloud needs to have the `connectedBy` attribute set.

The gateway can be virtual or physical.

adapters are software only: run in gateway or something similar, e.g. have 1 gateway and multiple devices running adapters, to have enough RAM or processing power

Field device either virtual for testing and illustration, or physical (with protocol)

Adapter: translates field communication to OLT and vice versa, if interface between gateway and field;

e.g. Gateway has GUI with devices available in LAN; if compatible  (i.e.: has an adapter), 
then onboarding: Gateway launches adapter hat translates communication from device to gateway and from gateway to OLT, and vice versa

Typically send attributes

Adapter first uses the HTTP API to create types, devices and schema, 
then uses MQTT API to post attributes configuration changes to OLT
and if supported, get config updates from OLT which need to be parsed and implemented in field device
get actions from OLT that need to be parsed and implemented in field, e.g. turn bulb on


Gateway is a self-contained development solution: developer can connect to gateway Swagger interface to know which calls are possible, and test the calls
Also supports MQTT and HTPP endpoinmts, similar to OLT

Has SDK: a collection and integration API: storing
SDK makes writing adapters easy, a.g. Zigbee adapter, can then ported to other wireless technology

1. The gateway is a device type, get unique ID
it will somehow be shared in OLT: to be discussed with Henri: different tenants or users can share gateways
2. Gateways is ARM-based hardware or can be embedded in existing hardware, e.g. DALI Pro; runs under node.js; platform-agnostic: e.g. Raspi, Win

Adapter SDK should allow to easily writer glue code to bind the gateway and the field code.

The gateway is a translator: to talk the protocol.

____ End Notes  20190611

--- 



A gateway allows you to integrate device that are not IoT enabled.

The devices have aliases.


## Via script

Some kind of process that describes how I control devices via a gateway.

To check the devices are related to the gateway via the `connectedby` property and represented by aliases.


Imagine a customer using Hue. The enduser controls lights via the app, but the customer wants to have usage statistics.

Here comes the OLT platform.

There is a bulb in every room. As per the hue API it has a unique endpoint id in the form: AA:BB:CC:DD:EE:FF:00:11-XX.

Also, it has an `on` state.

Our customer wants the `on` state to be reported to the OLT database for each bulb attached to the bridge.

To do so, he might make `GET`requests to the `/api/<username>/lights/<id>` endpoint, see the `https://developers.meethue.com/develop/hue-api/lights-api/#get-attr-and-state` endpoint:

{
	"state": {
		"hue": 50000,
		"on": true,
		"effect": "none",
		"alert": "none",
		"bri": 200,
		"sat": 200,
		"ct": 500,
		"xy": [0.5, 0.5],
		"reachable": true,
		"colormode": "hs"
	},
	"type": "Living Colors",
	"name": "LC 1",
	"modelid": "LC0015",
	"swversion": "1.0.3"
}

How would our customer proceed to get the state data into the OLT platform?

1. Create device type: The `on` state corresponds to an `on` attributes property in the bulb's device type.

2. Create device: The hue device ID AA:BB:CC:DD:EE:FF:00:11-XX, I assume, correponds to an alias, the "connectedBy" property contains the gateway ID.

See https://api.lightelligence.io/v1/api-collection/#tag/devices:

{
"info": {
"name": "Gateway North 1",
"deviceTypeId": "123e4567-e89b-12d3-a456-426655440003",
"description": "Gateway left from the right door, under the orange pillow.",
"installationTimestamp": "1985-04-12T23:20:50.52Z",
"tags": [],
"connectedBy": "123e4567-e89b-12d3-a456-426655441337",
"location": "siteA.buildingB.floorC.roomD",
"aliases": [
"frontdoor",
"RoomA",
"06-00-00-00-00-00"
],
"coordinates": {}
},
"configuration": {
"brightness": 60,
"color": {}
},
"custom": {
"my": {}
}
}



##  Modeling Gateways 

@José: how do I manage gateway? -- in progress

`conectedby`: means: device is behind a gateway. (28.44); the device depends on the 3e12... device which is a gateway

https://lightelligence.atlassian.net/browse/OLT-1713: Support External Device IDs
https://lightelligence.atlassian.net/wiki/spaces/OCP/pages/342261874/F-001+Support+External+Device+IDs

Aliases can be added at creation of the device or later on edit.

if I send action, the gateway has to dispatch it to the device [@José: how do I refer to the gateway ID when posting anaction the corresponsing device?]

@Turing

* What do we define a gateway?
* How can a device be configured to be a gateway in the cloud?
* What does it mean to configure a device to be a gateway in the cloud?
* How does the connectedBy attribute work? What does it allow the other device to do?
* How can the aliases be used to use protocol specific identifiers in the gateway?
* How does the gateway integrate in the cloud to device concept?


## Complex Device Type Schema Data
You have already used two different kinds of schema data types, numbers and objects. JSON schema also allows strings, booleans and arrays. The following command creates a device type that has an array of booleans as an attribute. The array must contain 2 up to 5 items defined by minItems and maxItems. While you cannot report an array to timeseries, your reportingRules can contain a rule to report an item with a specified index. In this case the first array element, a boolean, is reported to timeseries.

See https://lightelligence.io/docs/getting-started




