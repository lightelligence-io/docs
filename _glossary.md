---
title: Lightelligence Glossary
---


{{% todo %}}

This is a term collection to ensure terminological consistency. The definitions etc. are of course yet to be maintained.

@tbd: figure out how to reference terms in Hugo 

Use `~`to insert line breaks without space between the lines

Use the following term definition schema:{{% /todo %}}





Term {#Term}
  ~ Definition 1
  ~ Definition 2
  ~ Rejected Term:
  ~ Superordinate Term:
  ~ Synonym(s):
  ~ Component/Context: 
  ~ German: 


Components/Contexts: 

* Connectivity
* Devices
* Reporting
* Applications

-->


 

Action {#action}
  ~ @tbd
  ~ Definition 2
  ~ Rejected Term:
  ~ Superordinate Term: Device Type
  ~ Synonym(s):
  ~ Component/Context: Devices
  ~ German: 

Application {#application}
  ~ @tbd: The application is the app itself.Clarify: 
		Endpoints in the application-info section is only accessible with a client_credential client-token and no tenant in the token.
  ~ Definition 2
  ~ Rejected Term:
  ~ Superordinate Term:
  ~ Synonym(s):
  ~ Component/Context: Applications
  ~ German: 

Application ID {#application}
  ~ ID I get when I register an application ito the OLT platform. 
  ~ Definition 2
  ~ Rejected Term:
  ~ Superordinate Term:
  ~ Synonym(s):
  ~ Component/Context: Applications
  ~ German:    

Application management {#application-management}
  ~ @tbd: defines the application control flow
  ~ Definition 2
  ~ Rejected Term:
  ~ Superordinate Term:
  ~ Synonym(s):
  ~ Component/Context: Applications
  ~ German:
 
Application user {#application-user}
  ~ An application user is a tenant (or the developer-tenant) that has been whitelisted of the developer and can install the application to its tenant.
  ~ Rejected Term:
  ~ Superordinate Term:
  ~ Synonym(s):
  ~ Component/Context: Applications
  ~ German: 
 
Application vendor {#application-vendor}
  ~ Owns applications, whitelists customer tenants, revoces application accces
  ~ A developer is the tenant in which the application is created. 
		A developer is never one single person but will be accessible for all users with owner role of tenant.
  ~ Rejected Term: Application owner, application developer @tbd: decide which term to use: Simon uses "developer", Jewgeni uses "vendor"
  ~ Superordinate Term:
  ~ Synonym(s):
  ~ Component/Context: Applications
  ~ German: 
  

 

Attribute {#attribute}
  ~ @tbd
  ~ Definition 2
  ~ Rejected Term:
  ~ Superordinate Term: Device Type
  ~ Synonym(s):
  ~ Component/Context: Devices
  ~ German: 
  
API Token {#API token}
  ~ @tbd: def.
  ~ To be obtained in the OLT portal und **Developer Area**. As of 7/2019: "API Token".
  ~ Rejected Term: Authorization token, authentication token
  ~ Superordinate Term:
  ~ Synonym(s):
  ~ Component/Context: Connectivity
  ~ German: Authentisierungs-Token
  
Category {#category}
  ~ @tbd: used to group and query devices based on their capabilities
  ~ @tbd: Allows to use established resource identifier schemas (e.g. LWM2M) or to create one's own identifier schemas
  ~ @tbd: allows to query devices based on the categories
  ~ Rejected Term:
  ~ Superordinate Term:
  ~ Synonym(s):
  ~ Component/Context: devices
  ~ German: 
  
Configuration {#configuration}
  ~ @tbd pushed to/from device, e.g. brightness values; content of an MQTT message
  ~ Definition 2
  ~ Rejected Term:
  ~ Superordinate Term: Device Type
  ~ Synonym(s):
  ~ Component/Context: Devices
  ~ German: 
  
Device {#device}
  ~ Definition @tbd
  ~ Definition 2
  ~ Superordinate Term:
  ~ Synonym(s):
  ~ Component/Context: 
  ~ German:
  
Device certificate {#device-certificate}
  ~ Definition @tbd
  ~ Definition 2
  ~ Superordinate Term:
  ~ Synonym(s):
  ~ Invalid Synonym(s):
  ~ Component/Context: 
  ~ German: 
  
Device key {#device-key}
  ~ `.pem` file containing a private key. 
  ~ Rejected Term:
  ~ Superordinate Term: Private key
  ~ Synonym(s):
  ~ Component/Context: Connectivity
  ~ German:
  
Device type {#device-type}
  ~ A device type describes the capabilities of your device generically.
  ~ The system requires it to validate individual device definitions.
  ~ Superordinate Term:
  ~ Synonym(s):
  ~ Component/Context: Devices
  ~ German: -



Device type schema {#device-type-schema}
  ~ Definition @tbd Define to make it easier to differentiate between the object that allows to conect to portal and the schema decribing the capabilities of the device.
  ~ <!-- Used in Getting started.md -->
  ~ Superordinate Term: Device type
  ~ Synonym(s):
  ~ Component/Context: Devices
  ~ German: 
  
Directory {#directory}
  ~ When referring to a command line interface, "directory" is used rather than "folder".
  ~ Definition 2
  ~ Rejected Term: Folder
  ~ Synonym(s): Folder
  ~ Component/Context: Generic
  ~ German: Verzeichnis
  
Endpoint {#endpoint}
  ~ Specifies where an OLT resource can be accessed by the OLT API.
  ~ Definition 2
  ~ Rejected Term:
  ~ Superordinate Term: 
  ~ Synonym(s): API endpoint
  ~ Component/Context: API
  ~ German:
  
Firmware slot {#firmware slot}
  ~ @tbd: Henri: how is it supposed to be used?
  ~ Definition 2
  ~ Rejected Term:
  ~ Superordinate Term: Device Type
  ~ Synonym(s):
  ~ Component/Context: Devices
  ~ German: 
 
Keycloak {keycloak}
  ~ @Simon: what are users supposed to know about it?
  ~ Definition 2
  ~ Rejected Term:
  ~ Superordinate Term:
  ~ Synonym(s):
  ~ Component/Context: 
  ~ German:
 
Lightelligence API key
  ~ @tbd: Result of registering an application to the OLT platform as an application vendor.
  ~ Definition 2
  ~ Rejected Term:
  ~ Superordinate Term: Device Type
  ~ Synonym(s): API key
  ~ Component/Context: Applications
  ~ German:
  
Mosquitto {#mosquitto}
  ~ A MQTT broker to turn a device into an MQTT client.
  ~ Rejected Term:
  ~ Superordinate Term: MQTT
  ~ Synonym(s): MQTT client
  ~ Component/Context: Connectivity
  ~ German:
  
Multi-tenancy {#multi-tenancy}
  ~ Definition 1
  ~ Definition 2
  ~ Superordinate Term:
  ~ Synonym(s):
  ~ Component/Context: 
  ~ German:
  
MQTT {#MQTT}
  ~ Message Queue Telemetry Transport
  ~ MQTT is a publish-subscribe-based messaging protocol especially suited for IoT devices, where bandwidth and storage space are limited.
  ~ Rejected Term:
  ~ Superordinate Term:
  ~ Synonym(s):
  ~ Component/Context: Connectivity
  ~ German:  
  
MQTT messages {#MQTT-message}
  ~ Definition 1
  ~ Definition 2
  ~ Rejected Term:
  ~ Superordinate Term: MQTT
  ~ Synonym(s):
  ~ Component/Context: Connectivity
  ~ German: 
  
MQTT client {#MQTT-client}
  ~ Device that is enable by an MQTT broker to communicate via MQTT.
  ~ IoT-enabled device.
  ~ Rejected Term:
  ~ Superordinate Term: MQTT
  ~ Synonym(s): 
  ~ Component/Context: Connectivity
  ~ German: 
  
MQTT broker {#MQTT-broker}
  ~ Software to turn a device into an MQTT client. We use Mosquitto. 
  ~ Rejected Term:
  ~ Superordinate Term: MQTT
  ~ Synonym(s): Mosquitto
  ~ Component/Context: Connectivity
  ~ German:
  
OAuth2 {#OAuth2}
  ~ Protocol the OLT platform uses to authenticate users with the OpenID Connect extension.
  ~ OAuth2 implies terms such as OAujth2 access token, OAuth2 client, OAuth2 client secret, redirect URL, OAuth2 authorization code
  ~ Rejected Term:
  ~ Superordinate Term: 
  ~ Synonym(s): 
  ~ Component/Context: Authentication
  ~ German:

OLT API {#OLT API}
  ~ Collection of endpoints to access the OLT platform ([Lightelligence API](https://api.lightelligence.io/v1/api-collection/))
  ~ Superordinate Term:
  ~ Rejected Term: Server
  ~ Synonym(s): Lightelligence API
  ~ Component/Context: 
  ~ German:  
  
OLT platform {#OLT-platform}
  ~ Definition @tbd
  ~ Definition 2
  ~ Superordinate Term:
  ~ Rejected Term: Server
  ~ Synonym(s): Lightelligence platform
  ~ Component/Context: 
  ~ German:

OLT portal {#OLT-portal}
  ~ Definition @tbd: Collection of applications to communicate with the OLT platform via a GUI.
  ~ Rejected Term: Lightelligence Portal <!-- @Timo: Lightelligence portal or OLT portal? -->
  ~ Superordinate Term:
  ~ Synonym(s):  Lightelligence portal
  ~ Component/Context: Connectivity
  ~ German: OLT-Portal
  
OLT certificate {#public-ca-certificate}
  ~ Certificate of the Certificate Authority that has issued the TLS certificate of the OLT platform�s MQTT service. 
  ~ It contains the public key that allows your device to encrypt the MQTT messages it sends to the OLT platform.
  ~ You store it on each device. 
  ~ [Certificate authority](https://en.wikipedia.org/wiki/Certificate_authority) <!-- @tbd: Check how the DLs deal with external links --> 
  ~ Rejected Term: Public CA certificate
  ~ Superordinate Term: 
  ~ Synonym(s): Public key
  ~ Component/Context: Connectivity
  ~ German: 

  
OpenSSL {#OpenSSL}
  ~ Definition @tbd
  ~ Definition 2
  ~ Superordinate Term:
  ~ Synonym(s):
  ~ Component/Context: 
  ~ German:

Private key {#private-key}
  ~ Created on your device with OpenSSL and used to create and sign a device certificate.
  ~ [Public-key cryptography](https://en.wikipedia.org/wiki/Public-key_cryptography) <!-- @tbd: Check how the DLs deal with external links --> 
  ~ Rejected Term:
  ~ Superordinate Term: Device certificate
  ~ Synonym(s):
  ~ Component/Context: Connectivity
  ~ German:
  

Property {#property}
  ~ @tbd: device property: 1. sth. for which you can activate reporting, 2. reportingRules is a device property that is part of the device type, see reporting-getting-started.md
  ~ Definition 2
  ~ Rejected Term:
  ~ Superordinate Term:
  ~ Synonym(s):
  ~ Component/Context: Devices
  ~ German: 

Reporting rule {#reporting-rule}
  ~ @tbd to enable time series data being stored in the OLT platform
  ~ Definition 2
  ~ Rejected Term:
  ~ Superordinate Term:
  ~ Synonym(s):
  ~ Component/Context: Reporting
  ~ German:

Tag {#tag}
  ~ @tbd: To be able to apply queries and filters, users can specifiy the properties of the device, for example. light, heating, humidity, for example?
  ~ Definition 2
  ~ Rejected Term:
  ~ Superordinate Term:
  ~ Synonym(s):
  ~ Component/Context: Devices
  ~ German: 


Tenant {#tenant}
  ~ See [Multi-tenancy](#multi-tenancy)
  ~ See [Application user](#application-user)
  
Tenant ID {#tenant-id}
  ~ @tbd
  ~ It can be used, for example, to identify individual device certificates associated to a tenant. 
    See [Getting Started](lightelligence-getting-started#Generating-the-device-certificate-in-a-production-environment). <!-- @tbd: verify the link -->

Topic {#topic}
  ~ @tbd: something you can subscribe to; see 15-cloud-to-device-communiation.md
  ~ Definition 2
  ~ Superordinate Term:
  ~ Synonym(s): 
  ~ Component/Context: 
  ~ German: Benutzer

User {#user}
  ~ Definition 1
  ~ Definition 2
  ~ Superordinate Term:
  ~ Synonym(s): 
  ~ Component/Context: 
  ~ German: Benutzer

Whitelisting {#whitelisting}
  ~ Registerig an application to a tenant. Allowing a tenant to install an application via the [/application-developer/applications/{applicationId}/allowed-tenants/{tenantId}](https://api.lightelligence.io/v1/api-collection/#tag/application-developer/paths/~1application-developer~1applications~1{applicationId}~1allowed-tenants~1{tenantId}/put) endpoint.. 
  ~ Definition 2
  ~ Superordinate Term:
  ~ Synonym(s): Available
  ~ Component/Context: Applications
  ~ German:






<!-- Invalid term definition schemas (due to layout issues 
  
Term 1
:   Term Definition
    2. line
	
Term 2 {Term3}
:   Term Definition
    
2. line

Term {Term4}
:   Term Definition

Term  {Term5}
:   Term Definition

Term {Term6}
:   Term Definition

-->