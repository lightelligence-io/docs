---
title: Recapulating Basic Concepts
linktitle: Recapulating Basic Concepts
description: Understand "tenants", "device types", and "devices".
date: 2019-06-01
publishdate: 2019-06-01
categories: [getting-started]
keywords: [tenant, device type, device]
tags: [tenant, device type, device]
menu:
  docs:
    parent: "getting-started"
    weight: 40
weight: 40
sections_weight: 40
draft: false
aliases: [/getting-started/]
toc: true
---

## Understanding the Concepts

You now know some basic concepts:

* A *tenant* owns the physical devices in an IoT system landscapes.

	You create a tenant by registering to the OLT platform.
	
* A *device type* describes the capabilities of a class of devices: which data they can exchange with the OLT platform.

	You can create and edit device types for device classes such as sensors, actors, or gateways in the OLT portal. Or create it with an HTTP request to the OLT API, as our Bash script does.

* A *device* is a digital twin of a physical device, representing it in the OLT platform with the properties defined in the corresonding device type.

	You can create and edit device types and display their status in the OLT Portal. Or create them with HTTP requests as in our Bash script.
	
## Practicing

To learn what's under the hood when you execute the Bash script, perform the steps manually. Go to [Walking Through the OLT Portal, Step by Step](/getting-started/connectivity-getting-started/),  
	




