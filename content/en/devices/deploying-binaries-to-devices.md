
---
title: Deploying Binaries to Devices
linktitle: Deploying Binaries to Devices
description: Maintain your devices by updating their firmware or by deploying bootloaders or configuration files to them. 
date: 2019-06-14
publishdate: 2019-06-01
categories: [devices  ]
keywords: [device type,firmware,bootloader,configuration,slots]
tags: [alias,connectedBy,types,firmware,bootloader,configuration files,slots]
menu:
  docs:
    parent: "devices"
    weight: 70
sections_weight: 60
draft: true
aliases: [/devices/,/overview/quickstart/]
toc: true
---

> SDK refactoring not yet finished. The firmware process is still under discussion.  This chapter is a placeholder.


---

____ Begin Notes 20190611:

@José: not in scope of V.1.0 Adapter SDK roadmap -- has changed a lot; is going to be discussed -- discuss test case

____ End Notes  20190611

---

<!-- no test case, it's coverd by system tests: Steffen Baumgart ; automated tests-> hatem, t understand the flow--> 

<!-- https://lightelligence.atlassian.net/wiki/spaces/OCP/pages/740524173/F-017+Blob+Push+Firmware+Update?focusedCommentId=781254735 -->

Host firmware in the OLT platform centrally and deploy it to your devices.

To deploy firmwares, bootloaders, or configuration files to your devices, schedule downloads to your devices.

To keep track whether biaries have been installed successfully, perform status updates.

## Hosting files

**Procedure**

1. Create file and provide metadata (UUID, tenant ID etc.): https://api.lightelligence.io/v1/firmwares 
2. Upload file = Attach a blob to a firmware? : /firmwares/{id}/blob
	A download link for the blob is added to the firmware resource which can be used to download the blob.


## Installing a Firmware On a Device 

POST /devices/{deviceId}/firmware-installations

@tbd: Clarify the following: "This endpoint creates a new firmware installation resource. This resource 
represents the status of installation into the slot for the specific device. Once it created, 
the device start receives installation instructions via MQTT."

@tbd: How do I schedule the process?

## Monitoring the Installation Status

* Get firmware installation status: GET /devices/{deviceId}/firmware-installations/{installationId}
* Update firmware installation status: PATCH /devices/{deviceId}/firmware-installations/{installationId}
	Clarify: "This endpoint enables updating the status of firmware installation for a device. This installation status is tracking on the cloud side. 
	Used by devices/gateways/analytics/etc which report statuses of the installation firmware into the slot."

@tbd: In what case would I use GET vs. PATCH?

## Managing Files

* Download file: GET /firmwares/{id}/blob @tbd: in what case do I download the file? 
* List tenant files: GET /firmwares
* Get details: GET /firmwares/{id}
* Update files: 
	"Please note, that it's only allowed to attach a blob once. 
	In case a blob is attached more than once you will get a 423 status code indicating that the resource is locked."
	@tbd: What's the workaround: Delete and Create new? What does this mean for scheduled processes?
* Delete file: DELETE /firmwares/{id}

s

@Jewgeni: PPT, Info

## Installing Binaries

https://lightelligence.atlassian.net/wiki/spaces/OCP/pages/740524173/F-017+Blob+Push+Firmware+Update

More complex device have a firmware or other binary executables installed that need to get updated from time to time.

How do we do it?

@José: When SDK refactoring is finished: adapters will be updated: José will be able to test all actions including firmware update -- what's the status?

Process outline: 

* First need to have the binary somewhere accessible, in the slot
* Action: Gateway downloads binary for that firmware update and push it to the device with the field procedure for the device 
* Report back to OLT an answer to the action: success/failure, for example (config)
 
Inspect the communication in the Steinel web client:  
	1. "Firmware Update": Gives URL for upload
	2. Click *update*: triggers REST API call initiating the installation of the new binary



@José: used already? Example:

There are 3 slots:

* Firmware
* Bootloader,
* Configuration



Slots for binaries:  @José: not yet looked into it, is going to perform first -- what's the status?

```
{
  "name": "Extended OSR Light switch",
  "manufacturer": "OSRAM",
  "model": "C3PO",
  "description": "Newest version of the switch.",
  "categories": [
    "urn:oma:lwm2m:ext:3001",
    "urn:oma:example:ext:1002",
    "urn:oma:example:ext:1003"
  ],
  "reportingRules": [
    {
      "path": "$.configuration.brightness",
      "reportTo": [
        "timeseries"
      ]
    }
  ],
  "schema": {
    "configuration": {
      "brightness": {
        "type": "number",
        "property": "urn:oma:lwm2m:ext:5548",
        "minimum": 0,
        "maximum": 100
      },
      "color": {
        "type": "object",
        "properties": {
          "r": {
            "type": "number",
            "minimum": 0,
            "maximum": 255
          },
          "g": {
            "type": "number",
            "minimum": 0,
            "maximum": 255
          },
          "b": {
            "type": "number",
            "minimum": 0,
            "maximum": 255
          }
        },
        "required": [
          "r",
          "g",
          "b"
        ]
      }
    },
    "attributes": {
      "temperature": {
        "type": "number",
        "property": "urn:oma:lwm2m:ext:5700"
      },
      "humidity": {
        "type": "number",
        "minimum": 0,
        "maximum": 100
      }
    },
    "events": {
      "overheated": {}
    },
    "actions": {
      "raiseTemperature": {
        "type": "object",
        "properties": {
          "value": {
            "type": "number"
          },
          "description": {
            "type": "string"
          }
        }
      }
    }
  },
  "slots": {
    "firmware": {
      "name": "Test name"
    }
  }
}
```

## 