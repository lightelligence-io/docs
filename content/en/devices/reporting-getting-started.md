

---
title: Storing and Retrieving Sensor Data
linktitle: Storing and Retrieving Sensor Data
description: Store sensor data in the OLT platform and simulate an application retrieving the data.
date: 2019-08-02
publishdate: 2019-08-02
categories: [devices,data]
keywords: [reporting,sensor data,device types,attributes]
menu:
  docs:
    parent: "devices"
    weight: 10
weight: 10
sections_weight: 10
draft: false
aliases: [/devices/,/overview/quickstart/]
toc: true
---


{{% todo %}}   @tbd: Add note about prices, or link: up to 20 devices free etc. {{% /todo %}}



You got started with setting up a Raspberry Pi and transmitting configuration data such as the IP address to the OLT platform. See [Connecting a Device in 3 Steps](/getting-started/setting-up-getting-started/).

By walking through the process manually, you got an idea of how the elements of the OLT platform interact. see [Walking Through the OLT Portal, Step by Step](/getting-started/connectivity-getting-started/).

Now we add a new device type, to cover a typical IoT scenario: Storing time series sensor data in the OLT platform, and retrieving the data. 

To do so, we attach a motion sensor to the Raspberry Pi.

Again, we provide you with a Bash script to install software and send the sensor to the OLT platform, automatically.

The Bash script creates a device type with a JSON schema containing a property called `attributes`.

We use the `configuration` property in the first scenario for read/write activities, for example setting the target temperature of a thermostat.

The `attributes` property is for read-only activities, its typical use case is reading sensor data.

Here we go:

1. Use the Bash script to set up your sensor and connect it to the OLT platform.

2. To store the sensor data in the OLT platform, enable reporting.

3. Simulate an application retrieving the time series data from the OLT platform. To do so, make a `GET` request to one of the [`timeseries`](https://api.lightelligence.io/v1/api-collection/#tag/timeseries) endpoints of the OLT API.

## Setting Up Your Sensor

Attach a motion sensor to your Raspberry Pi and execute a Bash script to connect it to the OLT platform. 

**Prerequisites**

* You have connected your Raspberry Pi with the `raspiansetup.sh` Bash script described under [Connecting a Device in 3 Steps](/getting-started/setting-up-getting-started/).	
	With this scenario, you have installed an MQTT client, Python, and the Python module `paho-mqtt` on your Raspberry.
	
* You have attached a sensor to your Raspberry Pi.	
	In our example, we connect a motion sensor HC-SR501 PIR to GPIO pin 4.

**Procedure**

1. Ensure that your sensor is connected to your Raspberry Pi.

	In our example, we connect an HC-SR501 PIR sensor as follows: 
   
	| Sensor | Raspberry Pi |
	|:-------|:-------------|
	| VCC    | VCC 5V       |
	| Out    | GPIO Pin 4   |
	| GND    | Ground       |

2. Under [github.com/lightelligence-io/scripts](https://github.com/lightelligence-io/scripts), download the [`install_motion-sensor.sh`](github.com/lightelligence-io/scripts/install_motion-sensor.sh) Bash script.

	The script does the following:
	
	* Prompt you to enter your API token.
	* Prompt you to enter the tenant name or ID.
	* Create a device in the OLT platform and a corresponding device type.
	* Generate a device key
	* Generate a device certificate.
	* Save a Python program `presence.py` in the directory created. The Python program passes the sensor data to the OLT platform via MQTT messages.
	* Create a cron job to execute the Python program.
 
3. To execute the Bash script, do the following:

	1. Make it executable: `chmod +x install_motion-sensor.sh`.
	2. Execute the script: `./install_motion-sensor.sh`.

4. On request of the Bash script, do the following: 

	* Enter the platform URL ´lightelligence.io`.
	* Enter the API token displayed in in the OLT portal under **Developer Area**.
	* Enter your tenant name or your tenant ID displayed in in the OLT portal under **Developer Area**.
	
**Result**

The Bash script creates a device certificate and sets up the MQTT communication. 

Your Raspberry Pi is now sending the motion sensor's data.

If you analyze the Bash script, you see it does so by pushing updates from your device to the server via the `mosquitto_pub` command:

{{< highlight curl  >}}
mosquitto_pub -h mqtt.lightelligence.io \
  -p 8883 --cert device_cert.pem --key device_key.pem  \
  -d -t data-ingest  \
  -m '{ "type": "configuration", "value": { "presence": 1 } }  \
  -V mqttv311 --cafile olt_ca.pem
{{< / highlight >}}

The topic is `data-ingest`. 
	
The payload is the device type property and the current value. 


Let's check: 

1. In the OLT portal, choose **Devices & Types**.
2. In the **Devices** overview, click the presence sensor the Bash script has created.

	The latest sensor signal is displayed under **Status & Diagnosis**.

	{{< figure src="/images/reporting-getting-started-status-sensor.png" caption="Verifying Sensor Data Is Transmitted" alt="Verifying Sensor Data Is Transmitted" >}} {{% todo %}} @tbd: insert new image in 150 px resolution   {{% /todo %}}
	
	Note that the sensor data is displayed under **Attributes**.
	
	This corresponds to the `attributes` Property in the JSON schema the Bash script has created.

	{{< figure src="/images/reporting-getting-started-displaying-json-schema.png" caption="Displaying `attributes` Property in the JSON Schema" alt="Displaying `attributes` Property in the JSON Schema" >}}

3. Optional: To verify if your sensor is actually sending data, execute `./presence/presence.py` and move the sensor. 

	`1` means the sensor is detecting motion, `0` means there is no motion.
	
	
## Enabling Reporting

So far, we have connected the sensor to the OLT platform. That means we get the latest sensor reading.

But our use case is to store the sensor data in the OLT platform and retrieve times series data from the OLT platform.

To store the data, activate reporting in the corresponding device type. 

**Procedure**

1. Open the device type, in our example the device type corresponding to the motion sensor.

2. Under **Reporting Rules**, choose **Edit**.

3. Insert the following reporting rule:

	{{< highlight json  >}}
	[
	 {
	   "path": "$.attributes.presence",
	   "reportTo": [
		 "timeseries"
		]
	 }
	]
	{{< / highlight >}}

	A reporting rule is composed of a [JSON Path](https://goessner.net/articles/JsonPath/) and a `reportTo` property. 
	
	{{< figure src="/images/reporting-getting-started-editing-reporting-rules.png" caption="Editing Reporting Rules" alt="Editing Reporting Rules" >}}


**Result**

Your motion sensor data is stored in the OLT platform. Let's verify this in the last step.


## Retrieving Time Series Data

Simulate an application access your sensor data stored in the OLT platform.

To get, for example, the last hour of the sensor's time series data, make a `GET` request to the [`/v1/devices/{deviceId}/last-timeseries`](https://api.lightelligence.io/v1/api-collection/#tag/timeseries/paths/~1devices~1{deviceId}~1last-timeseries/get) endpoint.

**Procedure**

1. To obtain the motion sensor's device ID, choose **Devices & Types**.

	The ID is displayed in the device overview.
	
	{{< figure src="/images/reporting-getting-started-device-ids.png" caption="Displaying Device IDs" alt="Displaying Device IDs" >}}

2. Obtain the API token under **Developer Area**. 

3. Provide the query parameter `path` to make the request, in our example `path=$.attributes.presence`.

	Ensure that the request is URL-encoded, as in the following cURL example.

	{{< highlight curl  >}}
	curl -X GET \
	  "https://api.lightelligence.io/v1/devices/c42ff2fb-007f-4bd4-ac05-c4e610f34895/last-timeseries?path=%24.attributes.presence" \
	  -H 'Authorization: Bearer {authenticationToken}' \
	  -H 'Cache-Control: no-cache' \
	  -H 'Content-Type: application/json'
	{{< / highlight >}}

**Result**

Your sensor data is retrieved.

{{< figure src="/images/reporting-getting-started-displaying-time-series-data.png" caption="Retrieving Time Series Data" alt="Retrieving Time Series Data" >}}

---

**Note**

The time stamp format is Coordinated Universal Time (UTC).

---


 


