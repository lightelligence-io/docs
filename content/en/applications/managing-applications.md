---
title: Managing Custom Applications
linktitle: Managing Custom Applications
description: Perform activities to maintain your custom applications as an application developer or as a tenant owner using custom applications.
date: 2019-06-27
publishdate: 2019-06-01
categories: [applications]
keywords: [application,whitelisting,installing applications]
tags: [deactivating applications]
menu:
  docs:
    parent: "applications"
    weight: 300
weight: 300
sections_weight: 300
draft: false
aliases: [/applications/,/overview/quickstart/]
toc: true
---

As the developer, deactivate custom applications temporarily or whitelist additional tenants, for example.

As a tenant owner, install or uninstall custom applications, for example.


## Verifying Permissions

To manage custom applications, verify you have the permissions required for the specific endpoints.

**Procedure**

1. To identify your user ID, make a `GET` request to the [`tenants/{tenantID}/users`](https://api.lightelligence.io/v1/api-collection/#tag/user-management/paths/~1tenants~1{tenantId}~1users/get) endpoint.

	You get user data such as the user ID (in our example `72fa ...`).

	```json
	{
		"data": [
			{
				"id": "72fac0d5-fe32-4599-8f9c-a033e42faaa9",
				"email": "John.Doe@example.com",
				"firstName": "John",
				"lastName": "Doe",
				"userRoles": [
					{
						"id": "3100bdf8-90d9-471d-86ae-f7ba9eff0a86",
						"name": "owner",
						"displayName": "Owner",
						"description": "Default owner role with full access to all resources.",
						"locked": true
					}
				]
			}
		],
		...
		}
	}
	``` 

2. To list your permissions, make a `GET` request to the [`/users/{userId}/permissions`](https://api.lightelligence.io/v1/api-collection/#tag/users/paths/~1users~1{userId}~1tenants~1{tenantId}/get) endpoint.

**Result**

You get the user's permissions, for example, the permissions related to application management:

```json
{
    "data": {
        "permissions": [
            
			...
			
            {
                "id": "1a484122-4276-452f-86fe-35328a269e0e",
                "alias": "applications_development:read"
            },
            {
                "id": "c4d20bb1-40a9-4e23-9ceb-ca970b6cd29d",
                "alias": "applications_development:write"
            },
            {
                "id": "b25a38ad-86f9-458d-825a-8c0234f146e7",
                "alias": "applications:read"
            },
            {
                "id": "d430282c-a7a3-4163-92f7-b6055466d318",
                "alias": "applications:write"
            },
            
			...
			
        ]
    }
}
```


## Managing Applications as a Developer

We provide functions to manage custom applications you have developed. 

Examples:

* Deactivate an application temporarily or change application properties
* Allow tenants to install applications by registering an application to tenants (whitelisting)

## Changing Application Properties

Change the following properties, if required:

* application name
* application type (web application with confidential OAuth2 client or user agent application with public OAuth2 client)
* redirect URLs
* teaser description to describe the application briefly.
* URL to provide additional information about the application

**Procedure**

Make a `PATCH` request to the use the [`/application-developer/applications/{applicationId}`](https://api.lightelligence.io/v1/api-collection/#tag/application-developer/paths/~1application-developer~1applications~1{applicationId}/patch) endpoint.



## Deactivating an Application Temporarily		

To maintain a custom application, deactivate it temporarily.

Do some fixes, for example, and ensure the application isn't being used during this time.

The user will see a message that the app is inactive and is asked to contact the developer for more information. 

**Procedure**

Make a `PATCH` request to the use the [`/application-developer/applications/{applicationId}`](https://api.lightelligence.io/v1/api-collection/#tag/application-developer/paths/~1application-developer~1applications~1{applicationId}/patch) endpoint.

Set the `status` property to `inactive`.


## Regenerating the OAuth2 Client Secret

Regenerate the OAuth2 client secret in the following cases, for example:

* You have given the OAuth2 client secret out to someone that shouldn't have it. For security reasons, you want to make sure no possible attacker has access to your application data.
* You have forgotten or lost the OAuth2 client secret when registering your application.

You can always generate a new OAuth2 client secret.

The new OAuth2 client secret invalidates any previous OAuth2 client secret.

For security reasons, we don't allow for fetching OAuth2 client secrets already created.


**Procedure**

Make a `POST` request to the [`/application-developer/applications/{applicationId}/secret`](https://api.lightelligence.io/v1/api-collection/#tag/application-developer/paths/~1application-developer~1applications~1{applicationId}~1secret/post) endpoint.


## Whitelisting Additional Tenants

To install applications in additional tenants, whitelist the tenants. Control the tenants that are to use an application.

Background: To be able to install an application in a tenant, you must have whitelisted the tenant.

**Procedure**

* To whitelist a tenant, make a `PUT` request to the [`/application-developer/applications/{applicationId}/allowed-tenants/{tenantId}`](https://api.lightelligence.io/v1/api-collection/#tag/application-developer/paths/~1application-developer~1applications~1{applicationId}~1allowed-tenants~1{tenantId}/put) endpoint.
* To control the tenants that are to use an application, make requests to the following endpoints: 

	* To list whitelisted tenants, make a `GET` request to the [`/application-developer/applications/{applicationId}/allowed-tenants`](https://api.lightelligence.io/v1/api-collection/#tag/application-developer/paths/~1application-developer~1applications~1{applicationId}~1allowed-tenants/get) endpoint.
	* <!-- todo 10 -->To revoke whitelisting for a tenant, make a `DELETE` request to the [`/application-developer/applications/{applicationId}/allowed-tenants/{tenantId}`](https://api.lightelligence.io/v1/api-collection/#tag/application-developer/paths/~1application-developer~1applications~1{applicationId}~1allowed-tenants~1{tenantId}/delete) endpoint.


## Deleting an Application

Delete a custom application if it's obsolete, for example.

**Procedure**

1. Identify the whitelisted tenants who might have installed the application. 

	Inform the tenant owners to uninstall the application.
	
	To identify whitelisted tenants, make a `GET`request to the [/application-developer/applications/{applicationId}/allowed-tenants](https://api.lightelligence.io/v1/api-collection/#tag/application-developer/paths/~1application-developer~1applications~1{applicationId}~1allowed-tenants/get) endpoint.

	---
	
	**Note**
	
	If you have a background application, you can list the tenants that have actually installed your application.
	
	See [Listing Tenants](#listing-tenants).
	
	---

2. Make a `DELETE` request to the [/application-developer/applications/{applicationId}](https://api.lightelligence.io/v1/api-collection/#tag/application-developer/paths/~1application-developer~1applications~1{applicationId}/delete) endpoint.

## Listing Tenants

If you have a background application, list all tenants which have currently installed the application and to whose data the application, therefore, has access to.

You get the tenant IDs and tenant names.

The endpoint only fetches up-to-date data from the tenants that currently have installed your application.


**Prerequisites**

Your custom application is a background application using client credentials. 

For more information, see [Registering and Implementing Background Applications](/applications/registering-background-applications/).

**Procedure**

Make a `GET` request to the [`/application-info/installed-tenants`](https://api.lightelligence.io/v1/api-collection/#tag/application-info/paths/~1application-info~1installed-tenants/get) endpoint.



## Managing Applications as a Tenant Owner

Install or uninstall custom applications.


## Installing an Application

Roll out custom applications to a tenant.

**Prerequisites**

The custom application is whitelisted.

**Procedure**

1. List all applications available (whitelisted) for a tenant: 

	1. Log on to the tenant.
	2. Under **Developer Area**, copy the authorization token.
	2. Make a `GET` request to the [`/applications`](https://api.lightelligence.io/v1/api-collection/#tag/applications/paths/~1applications/get) endpoint.
		
		To get only the applications not yet installed, set the query parameter `installed` to `false`.
	
	{{< figure src="/images/applications-list-apps.png" caption="Displaying Applications Available or Installed" alt="Displaying Applications Available or Installed" >}}
	
	You get the application name and application ID.
	
	If the application property `available` is `true`, the application can be installed.
	
	```json
	"data": [
		{
			"id": "570e0a66-974b-40dd-8108-844da77719e9",
			"name": "Display Motion Sensor Time Series Data",
			"available": true,
			"availableCode": "APP_AVAILABLE",
			"installation": {
				"tenantId": "570e0a66-974b-40dd-8108-844da77719e9",
				"createdAt": "2019-04-28T23:17:21Z"
			}
		}
	]
	```

2. Install an application:

	1. Ensure that the application property `available` is `true`.
	
		Only available (whitelisted) applications can be installed.
	
	2. Ensure that your user has authorization as `writer` or `owner`.
	
	3. Make a `PUT` request to the [`/applications/{applicationId}/installation`](https://api.lightelligence.io/v1/api-collection/#tag/applications/paths/~1applications~1{applicationId}~1installation/put) endpoint.
	
		<!-- todo 20 -->
	
		{{< figure src="/images/applications-install-app.png" caption="Installing an Application" alt="Installing an Application" >}}
	

## Performing Miscellaneous Activities

Uninstall a custom application no longer needed, for example.

**Procedure**
	
* To verify the application properties, make a `GET` request to the [`/applications/{applicationId}`](https://api.lightelligence.io/v1/api-collection/#tag/applications/paths/~1applications~1{applicationId}/get) endpoint.

	* whether an application is available to be installed in a tenant
	* in which tenants an application is currently installed

* To uninstall an application, make a `DELETE` request to the [`/applications/{applicationId}/installation`](https://api.lightelligence.io/v1/api-collection/#tag/applications/paths/~1applications~1{applicationId}~1installation/delete) endpoint.

	---
	
	**Note**
	
	**Your custom application implements custom permissions?**
	
	{{% todo %}}@Lars: check:{{% /todo %}}
	
	If you uninstall a custom application with custom permissions, all role assignments of those custom permissions are removed.

	If you re-install the application, you have to assign the custom permissions to the custom role again.
	
	For more information about custom roles and permissions, see [Defining Custom Permissions and Roles](/applications/defining-custom-permissions/).
		
	---
	
	



