---
title: "Creating Devices"
date: 2019-04-16
draft: true
weight: 20
---

Creating a device basically means the following

* Assigning a device type describing the device capabilities
* Assigning a device certificate and registering it to the the OLT platform, to ensure encrypted communication
* Describing the device so as to be able to manage devices efficiently

<!-- Background:
Creating a device
Devices are associated to a device type, via the device type ID
Each device has a UUID.
There are aliases, if the devices are connected via a gateway
The gateway has a sender ID
Login: Fingerprint of the device is validated; we don’t know the private key of the devices.
-->

## Creating a Device Type

@tbd: Explain device type as prerequisite

## Creating a Device Certificate

  <!-- @tbd: Add the cURL and java code sample in a separate file. -->

<!-- @tbd: glossref to device certificate -->

<!-- @tbd: check OLT-4311 and reactivate Windows-related info:  -->
<!--**Prequisites**  -->

<!--If you use Microsoft Windows, you have  -->

<!--* [x] Installed [OpenSSL for Windows](http://slproweb.com/products/Win32OpenSSL.html) 				@tbd: create glossref: (lightelligence-glossary#OpenSSL)   -->
<!--* [x] Set the folloing environment variables (depending on where oppenSSL is installed and the certificate is to be created):   -->

<!--   * `set RANDFILE=c:\certificate\.rnd`-->
<!--   * `set OPENSSL_CONF=C:\OpenSSL-Win32_102r\bin\openssl.cfg`-->

<!--* [x] Installed [Git for Windows](https://gitforwindows.or)    -->

---

**Note**

**Using a Custom Certificate Authority**

Our example is based on the [OpenSSL command line utility](https://www.openssl.org/) to create a self-signed device certificate for a particular device.

Alternatively, you can use or create your own certificate authority (CA) and have your device certificates issued by that CA.

Just make sure the device certificate is assigned to the particular tenant and device via the the Organization Name and Common Name parameters, as described in the following.

---


<!-- @tbd Adress UI feature request to what team, who is responsible for the UI, Rams? 
	   1. Under Developer Area, display not only the tenant ID but also the tenant name. The user might not be sure about how the tenant technical name is spelled. Analogously to the device name/ID.
	   2. Replace "Tenant-ID" with "Tenant ID" (w/o hyphen). 
 @tbd: check whether OLT-4311 is resolved and insert the following: (Achtung: Bildrefs gehen in Note nicht!) 


Under Android (and Windows without bash):   You are asked to enter additional information.

4. Enter data as required:

   * **Country Name**: Enter the country code (`DE` for Germany, for example).  @Henri: do we use this info, is it relevant or can we leave it empty? 
   * **State or Province**
   * **Locality (city, for example)**
   * **Organization Name**:
   * **Organizational Unit**: 
   * **Common name** (server FQDN, for example):  @tbd: what is FQDN? 
   * **E-Mail Address**:   @Henri: Whose e-mail is supposed to be relevant here?
   



   ---
   
   **Note**
   
   **Creating a Device Certificate under Windows**
   
   Under Windows, pass the `-subj` argument with leading `//` (double forward slashes). Use `\` (backslash) 
   to separate the key/value pair (see [Creating a Device Certificate under Windows](#image-device_certificate_windows): 
   
   `openssl req -new -key device_key.pem -x509 -days 365 -out device_cert.pem -subj '//O=Sample-Tenant\CN=Sample-Device'` 

   []{#image-device_certificate_windows}

   ![Creating a Device Certificate under Windows, using the IDs](images\device_certificate_windows.png) 

	{{< figure src="/images/device_certificate_windows.png" caption="Creating a Device Certificate under Windows, using the IDs" alt="Creating a Device Certificate under Windows, using the IDs" >}}

   
   ```
   user@win-device MINGW64 ~
   $ openssl ecparam -out device_key.pem -name prime256v1 -genkey

   cuser@win-device MINGW64 ~
   $ openssl req -new -key device_key.pem -x509 -days 365 -out device_cert.pem -subj '//O=Muster-Tenant\CN=W541'
   ```
   
   ---
## Creating a device

In the OLT platform, create a digital twin of your device based on the device type created.

**Procedure**

1. Under **Devices & Types | Devices**, choose **Create Device**.
2. Select the device type .
3. Describe the device.

	Name, description and tags help you to monitor and maintain the devices in your system landschape. 
		
   * **Name**: Enter a number according to your floor plan and naming schema, for example. <!-- @Henri: what is a typical device name? E.g. if it’s a LED bulb -->
   * **Location**: "Office 1, Desk 1", for example. <!-- @Henri/@Markus Jung: info about how customers typically describe their system landscape -->
   * **Description**: Describe the function: „Illuminates desk 1“, for example. <!-- @Henri: What’s a typical meaningful description? -->
   * **Tags**: To be able to apply queries and filters, you can specify relevant device properties.		
4. To confirm, choose **Create Device**.











