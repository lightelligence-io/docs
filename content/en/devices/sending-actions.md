---
title: "Sending Actions to Devices"
date: 2019-04-12
draft: true
weight: 90
---

<!-- https://lightelligence.atlassian.net/wiki/spaces/OCP/pages/408191007/F-006+Cloud-to-Device+Communication
@tbd: perform process with prod-platform -->

@Turing

* What does Cloud To Device do?
* What guarantees does the current solution provide?
* What are current limitations in the implementation?
* What does a device need to do to receive actions from the cloud?
* How can actions be sent?


An action is for executables. 

E.g. Define the ambient light color with RGB LEDs.

**Prerequisites**

* [x] You have performed the Getting Sensor Data In and Out of the OLT Platform scenario. <!-- @tbd: add the link -->

	With this scenario, you have installed an MQTT client, Python, and the Python module `paho-mqtt` on your Raspberry.


**Procedure**

1. In the OLT portal, create a device type and device for the sensor attached.

	You have the device IDs required to generate the device certificates.
	
	<!-- @tbd: new image: {{< figure src="/images/reporting-getting-started-device-ids.png" caption="Displaying Device Names and IDs" alt="Displaying Device Names and IDs" >}} -->

2. Attach a 4-pin RGB-LED to your Raspberry Pi.

	In our example, we map the GPI pins as follows:

	| LED     | Raspberry Pi |
	|:--------|:-------------|
	| Red     | GPIO Pin 23  |
	| Cathode | Ground       |
	| Green   | GPIO Pin 24  |
	| Blue    | GPIO Pin 25  |

3. Download our bash scipt. <!-- @tbd: add URL -->

	The bash script does the following:
	
	* Create a directory `/home/pi/rgb` for the LED device certificate and a Python program to process the LED data.
	* Generate a device key.
	* Prompt you to enter the tenant name or ID.
	* Prompt you to enter the device name and ID. <!-- @Hatem: why both in this case? -->
	* Generate a device certificate and prompt you to copy & paste it in the **Certificates** field of your Raspberry Pi device in the OLT platform.
<!--	* Save the OLT certificate on your device. @Hatem: tin this case we use the raspberry olt_ca.pem certificate -->
	* Save a Python program `rgb.py` in the directory created. The Python program passes the action data from the OLT platform to the device via MQTT messages.
	* Create a cron job to execute the Python program.
	* Generate a device certificate and prompt you to copy & paste it in the **Certificates** field of your sensor device in the OLT platform.
	* Prompt you to include the required parameter in the device type associated with your motion sensor.
 
4. To execute the Bash script, do the following:

	1. Make it executable: `chmod +x install_rgb.sh`.
	2. Execute the script: `./install_rgb.sinstall_rgb`. 

5. On request of the Bash script, do the following: 

	* Enter the tenant ID.
	* Enter the Raspberry PI device name or device ID.
	* Copy the Raspberry Pi device certificate and paste it into the corresponding **Certificate** field in the OLT portal.

	Your Raspberry Pi is now able to receive actions from the OLT platform.

6. Adapt your LED device type so as to enable the OLT platform to receive the action data.

	To do so, in the **Schema** field, enter the configuration parameter `ipaddress`: <!-- @tbd: in the script ensure we escape the quotation marks, they are not displayed. -->
	
	<!-- @Hatem: why do we use type = sting instead of number -->
	
	`ambientLight` contains the color definition. <!-- @Hatem: why must we use type = object -->
	
	The color definition is composed of three values, Red, Green, and Blue.
	
	<!-- @Henri: in the API doc, we use the rgb color mix as an example for a configuration; what's the real-world use? -->
	
	```
	{
	"actions": {
		"ambientLight": {
		"type": "object",
		"properties": {
			"r": {
			"type": "string"
			},
			"g": {
			"type": "string"
			},
			"b": {
			"type": "string"
			}
		  }
	    }
	  }
	}
	```



7. Trigger an action on your device

<!-- https://api.lightelligence.io/v1/api-collection/#tag/devices/paths/~1devices~1{deviceId}~1actions/post --> 

To do so, make a `POST ` request to the `https://api.lightelligence.io/v1/devices/{deviceId}/actions` endpoint, as in the following cURL example.

```
curl -X GET \
  "https://api.lightelligence.io/v1/devices/383b8c61-a9c7-487f-b4e1-66fad753e546/actions" \
  -H 'Authorization: Bearer {TOKEN}' \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json'
``` 

To light up the LED in blue, use the followong message, for example:

```
{
	"action": "ambientLight",
		"payload": {
			"r": 0,
			"g": 0,
			"b": 1
			},
			"description": "Switch on blue light"			
}
```

**Result**

An action ID is generated (`{"data":{"actionId":"5895f5f0-93e9-428c-a4b6-580eb814f11e"}}`, for example).

The LED is switched on. In our example, it lights up blue.

{{< figure src="/images/send-action-rgb-led.png" caption="Triggering an Action" alt="Triggering an Action" >}}


	
	