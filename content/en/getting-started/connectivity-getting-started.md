---
title: Walking Through the OLT Portal, Step by Step
description: To see what's under the hood and understand basic mechanisms easier, connect your device to the OLT platform manually.
date: 2019-03-16
categories: [getting-started]
keywords:
tags: [configuration,Device Type,MQTT,Device Certificate,Mosquitto Client]
menu:
  docs:
    parent: "getting-started"
    weight: 20
weight: 20
sections_weight: 20
draft: false
aliases: [/getting-started/]
toc: true
---

In the first scenario, our Bash script connects an existing device to the OLT platform automatically, in our example a Raspberry Pi.

Now we describe how you would connect a device manually. 

The process gives you 

* an idea of the components of a solution, especially how we guarantee secure communication
* an overview of the OLT portal functions

The OLT platform talks MQTT with the devices attached, so we want to achieve that your device exchanges MQTT messages with the OLT platform.

To verify the connection works you'll send a sample MQTT message to the OLT platform manually. 

The process does the the same as our Bash script.

<!-- todo 10 -->


## Creating a Device Type

The following procedure is equivalent to the `POST` request to the [`/device-types`](https://api.lightelligence.io/v1/api-collection/#tag/device-types/paths/~1device-types/post) endpoint in our Bash script.

**Procedure**

1. Log on to the [OLT portal](https://portal.lightelligence.io).
2. Click the tenant you have created.
2. Under **Devices & Types**, choose **Device Types**.
3. Choose **Create Device Type**.
4. Enter data as required. In our example, enter "Raspberry Pi" as the device type name.        
5. Choose **Proceed to Parameters**.
6. In the **Configurations, Attributes and Actions** field, add the following sample configuration parameter `ipaddress`.

	---
	
	**Note**
	
	Ignore the **Reporting Rules** field for now.
	
	We will deal with it in the [Storing and Retrieving Sensor Data](/devices/reporting-getting-started/) scenario. 
	
	---
	
	{{< highlight JSON  >}}
    {
      "attributes": {},
      "configuration": {
        "ipaddress": {
            "type": "string"}
          },
      "actions": {}
    }
	{{< / highlight >}}
	
	{{< figure src="/images/device-type-schema.png" caption="Defining a Device Type Schema" alt="Defining a Device Type Schema" >}}

7. To confirm, choose **Create Device Type**.
	
	The device type is displayed on the **Device Types** tab.

	At the moment, the content doesn't matter. We just need any device type.


## Creating a Device


In the OLT platform, create a digital twin of your device based on the device type created.

The following procedure is equivalent to the `POST` request to the [`/devices`](https://api.lightelligence.io/v1/api-collection/#tag/devices/paths/~1devices/post) endpoint in our Bash script.

**Procedure**

1. Under **Devices & Types | Devices**, choose **Create Device**.
2. Select the device type you have created under [Creating a Device Type](/getting-started/connectivity-getting-started/#creating-a-device-type) and choose **Proceed to Device**.
3. Describe the device. In our example, enter "Raspberry Pi" as the device name.

	---
	
	**Note**
	
	In a production system, metadata like name, location, description and tags help you to monitor and maintain the devices in your system landschape.
	
	For more information, see [Managing Devices](/devices/).
	
	---
	
4. To confirm, choose **Create Device**.
5. Choose **Skip**.

	---
	
	**Why skip?**
	
	You don't have a device certificate yet. You'll create it in the next step and perform the skipped step later (under [Register the Device To the OLT Platform](/getting-started/connectivity-getting-started/#register-the-device-to-the-OLT-platform)). 
	
	But to create the device certificate, you need the device name or ID in the first place.
	
	---
	

**Result**

The device name and ID are displayed.

{{< figure src="/images/device-id.png" caption="Displaying the Device ID" alt="Displaying the Device ID" >}}



## Generating a Device Certificate

Create a unique SSL/TLS client certificate for your device.
 
During the TLS handshake between your device and the platform, the platform uses the device certificate to identify and authenticate your device.

In our example, use the [OpenSSL command line utility](https://www.openssl.org/) to create a self-signed device certificate for your Raspberry PI. 

The following procedure is equivalent to the `POST` request to the [`/devices`](https://api.lightelligence.io/v1/api-collection/#tag/devices/paths/~1devices/post) endpoint in our Bash script.

**Procedure**

1. Create a directory in which to create the device certificate.
2. To create a private key to sign the device certificate to be generated, execute `openssl ecparam -out device_key.pem -name prime256v1 -genkey`<!-- todo 20  -->.

     A file called `device_key.pem` containing the private key is in your directory.
   
3. Create a device certificate and sign it with the private key generated.

	Proceed as follows:

	1. Obtain the following information: 
	
		* Look up the tenant ID under **Developer Area** or the tenant name on the **Tenant Selection** page.
		
		{{< figure src="/images/tenant-id.png" caption="Displaying the Tenant ID in the Developer Area" alt="Displaying the Tenant ID in the Developer Area" >}}
		
		* Look up the device name or the device ID displayed under **Devices & Types | Devices**. 
	2. 	Use the `-subj parameter` to insert the information in the following command: `openssl req -new -key device_key.pem -x509 -days 365 -out device_cert.pem -subj '/O=<Tenant ID>/CN=<Device ID>'` and execute the command.   
	    
		Example: `req -new -key device_key.pem -x509 -days 365 -out device_cert.pem -subj '\O=Sample-Tenant\CN=Sample-Device'`  
   
**Result**

That's it! The device certificate is in your directory.

{{< figure src="/images/device_certificate.png" caption="Displaying the Device Certificate" alt="Displaying the Device Certificate" >}}



## Registering the Device to the OLT Platform

Enter the device certificate you have created under [Generating a Device Certificate](/getting-started/connectivity-getting-started/#generating-a-device-certificate).

**Procedure**

1. Open the device certificate<!-- todo 40 -->.
2. In the OLT portal, paste the device certificate content into the **Certificates** field.
	{{< figure src="/images/device_certificate_pasting.png" caption="Adding the Device Certificate" alt="Adding the Device Certificate" >}}
3. To confirm, choose **Save**.

**Result**

The device is registered to the OLT platform.

The device certificate status is displayed.
{{< figure src="/images/device_certificate_valid.png" caption="Displaying the Device Certificate Status" alt="Displaying the Device Certificate Status" >}}

Congrats! Your device is now able to talk to OLT platform. 

## Turning Your Device into a Mosquitto Client

The OLT platform talks MQTT (Message Queue Telemetry Transport).

So next you turn your device into an MQTT client. To establish the connection to the cloud, install Mosquitto, for example.

**Procedure** <!-- todo 50 -->

1. To install Mosquitto, follow the guidelines for your operation system under [https://www.eclipse.org/mosquitto/download/](https://www.eclipse.org/mosquitto/download/).
2. Copy and paste the certificate below into a file named `olt_ca.pem` and you are ready to go. <!-- ensure glossref to OLT certificate ; @tbd: update certificate-->

	{{< code file="/getting-started/connectivity-getting-started/" >}} {{% todo %}}file="" link to our script repo {{% /todo %}}
	-----BEGIN CERTIFICATE-----
	MIICBzCCAaygAwIBAgIBADAKBggqhkjOPQQDAjBcMQswCQYDVQQGEwJERTEOMAwG
	A1UEChMFT1NSQU0xDDAKBgNVBAsTA09MVDEvMC0GA1UEAxMmT1NSQU0gT0xUIERl
	dmljZVNlcnZpY2VzIFRydXN0QW5jaG9yIDEwIBcNMTgwNjEyMTU1NTMwWhgPMjA1
	ODA2MTIxNTU1MzBaMFwxCzAJBgNVBAYTAkRFMQ4wDAYDVQQKEwVPU1JBTTEMMAoG
	A1UECxMDT0xUMS8wLQYDVQQDEyZPU1JBTSBPTFQgRGV2aWNlU2VydmljZXMgVHJ1
	c3RBbmNob3IgMTBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABIRHefdjW8eKPEpi
	RV88sqk/7nqOIDdg4v2KcIsX8LQD94YGkDEDO4Alg3EdtibTXMtztbSiRMmy/BeB
	7Fmbr+KjXTBbMB0GA1UdDgQWBBQmEJ8uur+FfHaFxDYw1oeYNu1M6TAfBgNVHSME
	GDAWgBQmEJ8uur+FfHaFxDYw1oeYNu1M6TAMBgNVHRMEBTADAQH/MAsGA1UdDwQE
	AwIBBjAKBggqhkjOPQQDAgNJADBGAiEA1dAeBWcIDUyOzuQSzhO0cajg3mZfiHp/
	NwryIKRR9fgCIQDKqKmKv1STjPEePu4NL2YEqsVauaVl4CVQIYVjEwN3cw==
	-----END CERTIFICATE-----
	{{% /code %}} 
      
3. Ensure that the following files are in your Mosquitto directory: <!-- todo 60  -->
   
      * `device_cert.pem`
	  * `device_key.pem`
	  * `olt_ca.pem`


## Verifying Your Device Can Communicate with the OLT Platform

Send a message from your device to the OLT platform. 

Under [Creating a Device Type](#creating-a-device-type) you have defined a device type schema specifying a configuration parameter called `ipaddress` whose data type is `string`.

Via an MQTT message, send a random IP address, `192.168.1.1`, for example.

Then check whether the IP address has actually been sent to the OLT platform.

**Procedure**

To change the configuration in the OLT platform, enter the following command:

{{< highlight curl  >}}
mosquitto_pub -h mqtt.lightelligence.io \  
  -p 8883 --cert device_cert.pem --key device_key.pem \
  -d -t data-ingest  \
  -m '{ "type": "configuration", "value": { "ipaddress": "192.168.1.1" } }'  \
  -V mqttv311 --cafile olt_ca.pem
{{< / highlight >}}

The command is composed of the following components:
  
   * `mqtt.lightelligence.io` is the address of the OLT platform you want to connect to.
   * `mqttv311` is the protocol to be used.
   * `cafile` is the OLT certificate of the Certificate Authority that has issued the TLS certificate of the OLT platform's MQTT service.
   * `{ "type": "configuration", "value": { "ipaddress": "192.168.1.1" } }` is the MQTT message containing the configuration change you want to publish for your device. <!-- todo 70  -->
   
   <!--  todo 80 -->

**Result**

Your output is similar to the one below:

{{< highlight curl  >}}
Client mosqpub/9736-W541 sending CONNECT
Client mosqpub/9736-W541 received CONNACK
Client mosqpub/9736-W541 sending PUBLISH (d0, q0, r0, m1, 'data-ingest', ... (51 bytes))
Client mosqpub/9736-W541 sending DISCONNECT
{{< / highlight >}}
  
{{< figure src="/images/mosquitto_pub-configuration-windows.png" caption="Sending an MQTT Message" alt="Sending an MQTT Message" >}}
The updated configuration is displayed in the OLT portal, under **Status & Diagnostics**.
<!-- todo 90  --> 
{{< figure src="/images/mosquitto_pub-configuration-result.png" caption="Displaying the Updated Configuration" alt="Displaying the Updated Configuration" >}}
  
 
**Result**

Congrats! You have connected your device to the OLT platform. 

You have a detailed idea of our Bash script enabled your Raspberry PI to talk with the OLT platform via encrypted messages.