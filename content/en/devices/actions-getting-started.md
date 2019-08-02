---
title: Executing Commands on Devices
linktitle: Executing Commands on Devices
description: Write values to devices, to trigger actions.
date: 2019-06-01
publishdate: 2019-06-01
categories: [devices]
keywords: [device types,attributes,actions]
menu:
  docs:
    parent: "devices"
    weight: 20
weight: 20
sections_weight: 20
draft: false
aliases: [/devices/,/overview/quickstart/]
toc: true
---

<!-- todo 10-->

<!-- todo 20-->

Besides reading sensor data, executing commands on devices is another basic IoT use case.

So, let's write values to devices, to trigger actions.

In the JSON schema of a device type, we have another dedicated property for this, `actions`. 

While the `attributes` property is read-only, the `actions` property is write-only.

Actions are commands that a device can execute.

In the following example light up an RGB LED by sending a certain color code in 2 steps:

1. Use the Bash script to set up your RGB LED and connect it to the OLT platform.
2. Simulate an application lighting up the LED. To do so, make a `POST` request to the [`/devices/{deviceId}/actions`](https://api.lightelligence.io/v1/api-collection/#tag/devices/paths/~1devices~1{deviceId}~1actions/post) MQTT endpoint.


## Setting Up Your LED

Attach an RGB LED to your Raspberry Pi and execute a Bash script to connect it to the OLT platform.

**Prerequisites**

You have connected your Raspberry Pi with the `raspiansetup.sh` Bash script described under [Connecting a Device in 3 Steps](/getting-started/setting-up-getting-started/).

With this scenario, you have installed an MQTT client, Python, and the Python module `paho-mqtt` on your Raspberry.


**Procedure**

1. Attach a 4-pin RGB-LED to your Raspberry Pi.

	In our example, we map the GPI pins as follows:

	| LED     | Raspberry Pi |
	|:--------|:-------------|
	| Red     | GPIO Pin 23  |
	| Cathode | Ground       |
	| Green   | GPIO Pin 24  |
	| Blue    | GPIO Pin 25  |

2. Under [github.com/lightelligence-io/scripts](https://github.com/lightelligence-io/scripts), download the [`install_rgb-led.sh`](github.com/lightelligence-io/scripts/install_rgb-led.sh) Bash script.<!-- todo 30  -->

	The bash script does the following:
	
	* Prompt you to enter your API token.
	* Prompt you to enter the tenant name or ID.
	* Create a device in the OLT platform and a corresponding device type.
	* Generate a device key
	* Generate a device certificate.
	* Save a Python program `rgb.py` in the directory created. The Python program passes the action data from the OLT platform to the device via MQTT messages
	* Create a cron job to execute the Python program
	* Subscribe your device to the MQTT endpoint of the OLT platform
 
3. To execute the Bash script, do the following:

	1. Make it executable: `chmod +x install_rgb-led.sh`.
	2. Execute the script: `./install_rgb-led.sh`. 

4. On request of the Bash script, do the following: 

	* Enter the platform URL ´lightelligence.io`.
	* Enter the API token displayed in in the OLT portal under **Developer Area**.
	* Enter your tenant name or your tenant ID displayed in in the OLT portal under **Developer Area**.


**Result**

Your Raspberry Pi is now able to receive actions from the OLT platform. 
	
When you inspect the script, you will see its purpose is to connect your device to the MQTT endpoint of the OLT platform.
	
To do so, it subscribes the Raspberry Pi to the `devices/{deviceId}/actions` MQTT topic:

{{< highlight curl  >}}
mosquitto_sub -h mqtt.lightelligence.io \
  -p 8883 --cafile olt_ca.pem --cert device_cert.pem --key device_key.pem \
  -V "mqttv311" -t 'devices/{deviceId}/actions' \
  -d
{{< / highlight >}}


Also, the Bash script has created the following:

* a device type with a JSON schema containing the `actions` property.
	
	{{< figure src="/images/actions-getting-started-displaying-json-schema.png" caption="Editing the `actions` Property" alt="Editing the `actions` Property" >}}

* a digital twin associated with the device type.



## Triggering an Action on Your Device

Trigger an action on your device.

To do so, make a `POST` request to the [`/devices/{deviceId}/actions`](https://api.lightelligence.io/v1/api-collection/#tag/devices/paths/~1devices~1{deviceId}~1actions/post) MQTT endpoint, as in the following cURL example.

To light up the LED in blue, use the following message, for example:

{{< highlight curl  >}}
curl -X POST \
  "https://api.lightelligence.io/v1/devices/383b8c61-a9c7-487f-b4e1-66fad753e546/actions" \
  -H 'Authorization: Bearer {authenticationToken}' \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -d '{ 
  "action": "ambientLight",
	"payload": {
	"r": 0,
	"g": 0,
	"b": 1
	},
	"description": "Switch on blue light"			
}'
{{< / highlight >}}
<!-- "action": "ambientLight",  : todo 65 -->

**Result**

An action ID is generated (`{"data":{"actionId":"5895f5f0-93e9-428c-a4b6-580eb814f11e"}}`, for example).

The LED is switched on. In our example, it lights up blue.

{{< figure src="/images/send-action-rgb-led.png" caption="Triggering an Action" alt="Triggering an Action" >}}

You have successfully forwarded an action to your device.


	