---
title: Managing Devices
linktitle: Managing Devices
description: Categorize and tag devices and use your metadata to query and filter devices. 
date: 2019-06-01
publishdate: 2019-06-01
categories: [devices,]
keywords: [device,category,tag,query,filter]
menu:
  docs:
    parent: "devices"
    weight: 70
weight: 70
sections_weight: 70
draft: true
aliases: [/devices/,/overview/quickstart/]
toc: true
---

When you create digital twins representing your physical devices in the OLT platform, add metadata to be able to manage them effeciently.

Managing devices means, for example, 

* Make queries to list existing devices.
* Use filters to stream data provided by specific device groups https://lightelligence.slack.com/messages/DHUFMMW9W/), slide 6)

We provide two levels of metadata:

* semantic description: On the device type level, 

	* categorize your devices by describing the capabilities and use.
	* specify external specifications the device conforms to.
	
	Use established resource identifier schemas (e.g. LWM2M) or your create your own identifier schemas.
	Query devices based on the categories assigned to them: https://lightelligence.slack.com/messages/DHUFMMW9W/), slide 6
		
 
* On the devices level, describe individual devices by describing their location, for example.




## Categorizing devices

Classify devices by specifying categories in the the accociated device types.

To assign categories, define custom ones resource identifier schemas or use established ones.

Use for example:

* URN Namespace for Open Mobile Alliance (OMA) Lightweight M2M resource model -- urn:oma:{OMAresource}:{ResourceSpecificString}
* Open Connectivity Foundation (OCF)/Ipso: interoperability for consumers, businesses and industries (communications platform, a bridging specification,  an open source implementation and a certification program)

**Procedure**

To assign a category, make a 

@tbd: in the portal, I don't find the option to add/edit a category.





@José: how do we apply the following, for example? Do we have examples?
* What other resource models are relevant in the industry?

```sh
"temperature": {
"type": "number",
"property": "urn:oma:lwm2m:ext:5700"
```


## Describing Device Types

**Prerequisites**

You have `writer` authorization. 

**Procedure**

1. Under **Devices & Types**, on the **Device Types** tab, choose the device type.

2. Under **Device Type Information**, choose **Edit**.


Alternatively, make a `PATCH`request to the [`/device-types/{deviceTypeId}]`(https://api.lightelligence.io/v1/api-collection/#tag/device-types/paths/~1device-types~1{deviceTypeId}/patch) endpoint.


## 




# Querying Devices





# Filtering, Querying

https://lightelligence.atlassian.net/wiki/spaces/OCP/pages/793411660/Device+Filtering+Guidelines

https://lightelligence.slack.com/messages/DHUFMMW9W/), slide 8:
Query timeseries data based on a combination of filter criteria with a single API call
New /device/timeseries-dump endpoint allows to query data based on a variety of filter criteria §This allows to retrieve data more efficiently with less API calls


# Tagging a Device


@José: How do we actually use the fields of the device (i.e. location, description, tags)?

# Categorizing Devices and Device Types



Specify the device type, to allow for filtering and querying.

<!-- @Henri: should the description describe relevant device attributes or the class? E.g. properties like „dimmable“: 
or is this kind of information stored in the „category“ element which is not yet to appear in the portal?  
@tbd: crossref to chapter Managing Devices". -->