---
title: Connecting a Device in 3 Steps
description: Connect a Raspberry Pi to the OLT platform in three automated steps. See how fast you can get connected to the OLT platform.
date: 2019-08-02
publishdate: 2019-08-02
categories: [getting-started]
keywords: [installation,setup,Raspberry]
tags: 
menu:
  docs:
    parent: "getting-started"
    weight: 10
weight: 10
sections_weight: 10
draft: false
aliases: [/getting-started/]
toc: true
---

A Raspberry Pi is an ideal companion for the first steps on your journey.
 
Connect a Raspberry Pi to the OLT platform in three easy steps:

1. Flash an operating system onto a Raspberry Pi.
2. In the OLT portal, register to the OLT platform.
3. Let a Bash script connect your Raspberry PI to the OLT platform and let and display the temperature and the IP address the Raspberry Pi transmits to the OLT platform.

By performing the required activities in the OLT portal and by analyzing what the Bash script does, you get  

* a basic technical idea of the OLT concepts and mode of operation
* orientation in the OLT portal

## Setting Up Your Raspberry Pi 

**Prerequisites**

You have

* a Raspberry Pi with an SD card
* an SD card reader

**Procedure**

1. Under [raspberrypi.org/downloads/raspbian/](https://www.raspberrypi.org/downloads/raspbian), download the Raspbian Stretch with desktop and recommended software image and unzip it.

2. With a tool like [Etcher](https://www.balena.io/etcher) flash the image to an SD card.

3. Put the SD card into your Raspberry PI and power on.

4. Adjust the settings and restart.

	Skip the software updates, that would take a while.


**Result**
	
Your physical device is running and ready to get connected to the OLT platform.

## Registering to the OLT platform and Creating a Tenant

Create a test tenant in our free plan. You just need an e-mail address.


**Procedure** 


1. Go to the OLT portal under [https://portal.lightelligence.io](https://portal.lightelligence.io). 

2. Choose **Register** and enter data as required.

3. In the e-mail you receive, activate your account.

	You go to the Welcome page.
	
	{{< figure src="/images/getting-started-welcome.png" caption="Welcome to the LIGHTELLIGENCE® Portal!" alt="Welcome to the LIGHTELLIGENCE® Portal!" >}}

4. Choose **Create Tenant**.
 
5. Choose the **Free / Starter** plan and enter data as required.

	---

	**Note**

	You need a tenant name or ID in the subsequent process.<br>

	To *test* the OLT platform within the free plan, for the sake of our example, enter some random data.<br>
   
	To create an *actual account*, familiarize yourself with the multi-tenancy concept and create multiple tenants if required.
   
	For more information, see [Creating Tenants](/users/creating-tenants/).

	---

	The tenant is created.
	
	{{< figure src="/images/users-create-tenant-result.png" caption="Creating a Tenant: Result" alt="Creating a Tenant: Result" >}}	

6. Choose **Login with new tenant**.

**Result**

Via the [Lightelligence portal](https://portal.lightelligence.io), you have access to the OLT platform.

A user is created by default.



## Connecting Your Raspberry Pi to the OLT platform With a Bash Script

As a tenant, you can obtain the information required to connect your Raspberry Pi.

**Procedure**

1. Log on to your Raspberry PI and start a Web browser.

2. Download the setup script to your Raspberry PI from [/scripts/olt_raspi_setup.sh](/scripts/olt_raspi_setup.sh)

	The script automates the setup required to establish communication with Lightelligence:
	
	* Install the MQTT broker Mosquitto
	* Install Python to process sensor and network data
	* Install the Python module paho-mqtt to pass the Python data to Mosquitto 

3. To execute the Bash script, do the following:

	1. Make it executable: `chmod +x raspiansetup.sh`
	2. Execute it: `./olt_raspi_setup.sh`

	You are prompted to enter some information.

4. As the platform URL enter `lightelligence.io`

5. To obtain the API token for authentication, do the following:

	1. Log in at the [OLT Portal](https://portal.lightelligence.io).
	2. Click the tenant you have created.
	
		{{< figure src="/images/getting-started-select-tenant.png" caption="Selecting a Tenant" alt="Selecting a Tenant" >}}	

	3. Under **Developer Area**, copy the API token.
	
	{{< figure src="/images/getting-started-display-developer-area.png" caption="Displaying the Developer Area" alt="Displaying the Developer Area" >}}	
	
6. Enter your tenant name.

	Alternatively, under **Developer Area**, copy the tenant ID.
	
7. Specify the network interface. 

	* If you have connected the Raspberry Pi via WiFi, enter `WLAN0`
	* If you have connected it via ethernet, enter `eth0`

**Result**

With these 3 steps, your Raspberry Pi is connected to the OLT portal, sending data.

Let's check it:

1. In the OLT portal, choose **Devices & Types -> Devices**.

	{{< figure src="/images/getting-started-select-device.png" caption="Displaying the Devices Overview" alt="Displaying the Devices Overview" >}}	

2.  Click the Raspberry Pi that the Bash script has created.

	Device information and the device status are displayed. 
	
	Under **Configuration**, the temperature and ip address sent by your Raspberry are displayed.  

	{{< figure src="/images/getting-started-display-status-and-configuration.png" caption="Displaying the Device Connection Status and Configuration" alt="Displaying the Device Status and Configuration" >}}	

## Understanding Device Types

The `Configuration` corresponds to a property of a so-called device type.

The Bash script has created the device type. It describes the capabilities of your device.

In our example, the capabilities of the Raspberry Pi are to have a temperature and an IP address.

Let's check:
	
1. To display the device type In the OLT portal, choose **Devices & Types -> Device Types**.

	You go to the device types overview.

	{{< figure src="/images/getting-started-select-device-type.png" caption="Displaying the Device Types Overview" alt="Displaying the Device Types Overview" >}}	

2. Click the Raspberry Pi device type that the Bash script has created.

	Under **Device Type Information**, you find attributes to define device classes.

	Under **Schema**, the JSON schema containing the `configuration` properties is displayed.
	
	It defines the `ìpaddress` and the `temperature` as `configuration` properties.
	
	{{< figure src="/images/getting-started-edit-display-type-schema.png" caption="Displaying the Device Type Schema" alt="Displaying the Device Type Schema" >}}	
		
In the [Managing the OLT Lifecycle](/devices/) chapter of this documentation you will learn how define device types to map your specific IoT system landscape.

---
	
**Note**
	
Ignore the **Reporting Rules** field for now.
	
We will deal with it in the [Storing and Retrieving Sensor Data](/devices/reporting-getting-started/) scenario. 
	
---

