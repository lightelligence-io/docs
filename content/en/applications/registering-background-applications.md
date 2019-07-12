---
title: Registering and Implementing Background Applications
linktitle: Registering and Implementing Background Applications
description: To turn a background application into an OAuth2 client, register it to the OLT platform and implement OAuth2 in your application.
date: 2019-06-01
publishdate: 2019-06-01
categories: [applications]
keywords: [application,background application,OAuth2]
menu:
  docs:
    parent: "applications"
    weight: 240
weight: 240
sections_weight: 240
draft: false
aliases: [/applications/,/overview/quickstart/]
toc: true
---

To turn a background application into an OAuth2 client, register it to the OLT platform and implement OAuth2 in your application.

**Prerequisites**

To register applications to the OLT platform, you have `owner` or `writer` authorization.

---

**Note**

**Checking permissions**

* If you use default roles, to verify you have `owner` or `writer` authorization, in the OLT portal, under **Users**, check your roles.

* If you use custom roles, verify the user permissions for the specific endpoints.

	For more information, see [Defining Custom Roles](/users/creating-custom-roles).

---


## Registering and Installing a Background Application


1. From the OLT portal, under **Developer Area**, obtain the tenant ID and the authentication token of the tenant who is to own the application.

	For more information, see the analogous process under [Creating and Implementing User Applications](/applications/registering-user-applications/). <!-- todo 10 -->
	
2. To register the application to the OLT platform, make a `POST` request to the [`/application-developer/applications`](https://api.lightelligence.io/v1/api-collection/#tag/application-developer/paths/~1application-developer~1applications/post) endpoint.

	The request passes the following data:

	* the authentication token
	* the tenant ID of the tenant owning the application

	---
	**Note**
		
	**Managing Applications**
		
	You can change the application properties later, for example, the application name.
		
	For more information, see [Managing Custom Applications](/applications/managing-applications/).
		
	---
	
	Example:

	{{< highlight curl  >}}
	curl -X POST \
	  https://api.lightelligence.io/v1/application-developer/applications \
	  -H 'Authorization: Bearer {authentication token}' \
	  -H 'Content-Type: application/json' \
	  -d '{
	    "name": "Sample Application",
	    "allowedTenants": [
 	       {
	            "tenantId": "{tenant Id}"
	        }
	    ]
	}'
	{{< / highlight >}}	

	You get a response similar to the following, containing the following data:
	
	* application ID (in our example "9aa3b618-8cd2-4dc0-b7a1-da6df60af254")
	* OAuth2 client ID (in our example "44c11af1-c549-4c18-98bd-bcef92c8b45b")
	* OAuth2 client secret (in our example "vr7i9-P9brKIGYIQ")

	{{< highlight json  >}}
	200: {
    	"data": {
	        "id": "9aa3b618-8cd2-4dc0-b7a1-da6df60af254",
	        "name": "Test Application",
	        "oauth2Client": {
 	           "id": "44c11af1-c549-4c18-98bd-bcef92c8b45b",
 	           "secret": "vr7i9-P9brKIGYIQ",
 	           "type": "confidential"
	        },
	        ...
	    }
	}
	{{< / highlight >}}

3. Implement a process to store the OAuth2 client secret.

	---
	
	**Note**
	
	**Why store the OAuth2 client secret?**
	
	To display application data, you can use the [`/application-developer/applications`](https://api.lightelligence.io/v1/api-collection/#tag/application-developer/paths/~1application-developer~1applications/get) endpoint.
	
	But the response does not contain the OAuth2 client secret.
	
	If you don't store it, you have to regenerate it making a `POST` request to the [`/application-developer/applications/{applicationId}/secret`](https://api.lightelligence.io/v1/api-collection/#tag/application-developer/paths/~1application-developer~1applications~1{applicationId}~1secret/post) endpoint.
	
	---

4. To install the application, make a `PUT` request to the [`/applications/{application Id}/installation`](https://api.lightelligence.io/v1/api-collection/#tag/applications/paths/~1applications~1{applicationId}~1installation/put) endpoint.

	{{< highlight curl  >}}
	curl -X PUT \
	  https://api.lightelligence.io/v1/applications/{application ID}/installation \
	  -H 'Authorization: Bearer {authentication token}' \
	  -H 'Content-Type: application/json'
	{{< / highlight >}}

	In our example:

	{{< highlight curl  >}}
	curl -X PUT \
	  https://api.lightelligence.io/v1/applications/9aa3b618-8cd2-4dc0-b7a1-da6df60af254/installation \
	  -H 'Authorization: Bearer {authentication token}' \
	  -H 'Content-Type: application/json'
	{{< / highlight >}}		

5. Optional: To verify the installation, make a `GET` request to the [/applications/{applicationId}](https://api.lightelligence.io/v1/api-collection/#tag/applications/paths/~1applications~1{applicationId}/get) endpoint.
	
**Result**

Your background application is registered to the OLT platform and installed in a tenant.

The background application can get data from the tenant in which the application is installed, without logging on to the OLT platform.

## Installing the Application in Multiple Tenants

To install an existing application in additional tenants, whitelist the tenants and install the application in each of them.

For more information, see [Managing Custom Applications](/applications/managing-applications/).

## Implementing a Background Application

Implement a confidential OAuth2 client with OAuth2 client secret.


**Procedure**

To get the OAuth2 access token, do the following:

* Implement a process to submit, in the request header, the tenant ID of the tenant in which the application is installed.
* To use the OAuth2 client credentials flow, set the `grant type` parameter to `client_credentials`.
* Submit the OAuth2 client ID and the OAuth2 client secret.


1. Make a `POST` request to the `id/auth/realms/olt/protocol/openid-connect/token` endpoint:

	```curl
	curl -X POST \
	  https://id.lightelligence.io/v1/id/auth/realms/olt/protocol/openid-connect/token \
	  -H 'Content-Type: application/x-www-form-urlencoded' \
	  -H 'tenant: {tenant ID}' \
	  -d 'grant_type=client_credentials&client_id={oauth2Client.id}&client_secret={oauth2Client.secret}'
	```

	In our example:

	```curl
	curl -X POST \
	  https://id.lightelligence.io/v1/id/auth/realms/olt/protocol/openid-connect/token \
	  -H 'Content-Type: application/x-www-form-urlencoded' \
	  -H 'tenant: {tenant ID}' \
	  -d 'grant_type=client_credentials&client_id=44c11af1-c549-4c18-98bd-bcef92c8b45b&client_secret=vr7i9-P9brKIGYIQ'
	```

	You get a response like the following, containing the OAuth2 access token allowing your application to access the tenant data.

	```json
	{
		"access_token": "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWV0VOVDNBN1FLWllFTURoWFBKd3dVa1Jpd04tREI5OThQeUpoU0gzRDZFIn0.eyJqdGkiOiI4YzhlMDAxMi1lYWFiLTRkYzYtYmZiOC1iNTUyNTQ3YTJiMGEiLCJleHAiOjE1NTgyNjA2OTIsIm5iZiI6MCwiaWF0IjoxNTU3Mzk2NjkyLCJpc3MiOiJodHRwczovL2lkLmRldi5vbHQtZGV2LmlvL3YxL2lkL2F1dGgvcmVhbG1zL29sdCIsImF1ZCI6IjI4ZjgzODE5LTE5OWYtNDQxMC1hZTdmLTcyMjE3NjUxMmI5MyIsInN1YiI6IjZmM2Q2MGQwLWJlMzAtNGNiYS1hOTU1LTczMDYzMDExNDg3YyIsInR5cCI6IkJlYXJlciIsImF6cCI6IjI4ZjgzODE5LTE5OWYtNDQxMC1hZTdmLTcyMjE3NjUxMmI5MyIsImF1dGhfdGltZSI6MCwic2Vzc2lvbl9zdGF0ZSI6IjAwNjY4OGIxLTEzZjEtNGJhZi1hNzQxLTc4NTdmZmE5NjM2ZiIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiKiJdLCJyZXNvdXJjZV9hY2Nlc3MiOnt9LCJzY29wZSI6Im9sdC1hcHBsaWNhdGlvbnMiLCJjbGllbnRJZCI6IjI4ZjgzODE5LTE5OWYtNDQxMC1hZTdmLTcyMjE3NjUxMmI5MyIsImNsaWVudEhvc3QiOiIxMC4yNDAuMC42NiIsImNsaWVudEFkZHJlc3MiOiIxMC4yNDAuMC42NiIsInRlbmFudCI6ImIxNzQ3NTc5LTM1NWQtNGI3YS1hYTcyLWMyMzM2ZDNhNzIxMSJ9.v7cu0zDJY0BqLSmTUauJW46XkGWOuNxVPV7qY4530FZU2BHwZuR5URPlJtHbWpe2QUqxSXboq4dPnL9PmCltUO11DT6cartsJAte4rvvJE2WHb_YtmRasn8b-PxZ9ZVFXIHQRDnIKDu0xPl29ijyqkWbTawdxvuLkwThi4Gu-apqWAjCX2pNBivmuT-25QVBA-FAD_cHuxRPgJ5DJ8BbFIOYR-WjGRAO9v7RLjANSRjXLCS69WP6nKtZn0xJT0GXCUyyLeo_zI4FMWosq9UEFb2hIlXi4kJbkK_pD6KsXq5RGEL7Ap812DUdTDzfA1IcqLH14S38PTnHCFwRssbx0g",
		"expires_in": 863999,
		"refresh_expires_in": 950399,
		"refresh_token": "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWV0VOVDNBN1FLWllFTURoWFBKd3dVa1Jpd04tREI5OThQeUpoU0gzRDZFIn0.eyJqdGkiOiI4ZGMxYWQ3ZC04ZDg1LTQwZjUtOWNjZS05NWZhMGQwNzNlNDEiLCJleHAiOjE1NTgzNDcwOTIsIm5iZiI6MCwiaWF0IjoxNTU3Mzk2NjkzLCJpc3MiOiJodHRwczovL2lkLmRldi5vbHQtZGV2LmlvL3YxL2lkL2F1dGgvcmVhbG1zL29sdCIsImF1ZCI6IjI4ZjgzODE5LTE5OWYtNDQxMC1hZTdmLTcyMjE3NjUxMmI5MyIsInN1YiI6IjZmM2Q2MGQwLWJlMzAtNGNiYS1hOTU1LTczMDYzMDExNDg3YyIsInR5cCI6IlJlZnJlc2giLCJhenAiOiIyOGY4MzgxOS0xOTlmLTQ0MTAtYWU3Zi03MjIxNzY1MTJiOTMiLCJhdXRoX3RpbWUiOjAsInNlc3Npb25fc3RhdGUiOiIwMDY2ODhiMS0xM2YxLTRiYWYtYTc0MS03ODU3ZmZhOTYzNmYiLCJyZXNvdXJjZV9hY2Nlc3MiOnt9LCJzY29wZSI6Im9sdC1hcHBsaWNhdGlvbnMifQ.HN0JYs0PchnO1yOiEt05ZLT0slpJgxuHjnAsR6bIPDMeB-T0g_95ejZvSHp5WsHOeNP8Iu3Z8JCBIEQnTjoSxUVycCtL13ujODsmrzzEFDz4807O4BqMcoTewx_BxlCBSxXzn9mrRPPO-QkWUnwxVLXy1tcgZns3X9DGtmfWNz7HBwzhjutk2fpY2GOMuENgjhhVLhYYYuhY1E74iCt9uK_8XcQsWZKHHxMdNheJ4-Us3-E78sM9skSUUaa6dIN9dhSD51uB-61qiA6zEX91j6FYwSnnLi6CnZMNcwT8ROhxKOyxN98JDRJCwTcPHFcAeFHlTYohRqFTHVnuwAg38Q",
		"token_type": "bearer",
		"not-before-policy": 0,
		"session_state": "006688b1-13f1-4baf-a741-7857ffa9636f",
		"scope": "olt-applications"
	}
	```


2. To verify that your application can access tenant data, fetch some data from a tenant that has installed the application, with the authorization token retrieved from the application. 

	For example, list the devices registered to the tenant by making a GET request to the `/devices` endpoint:

	```curl
	curl -X GET \
  		https://api.lightelligence.io/v1/devices \
  		-H 'Authorization: Bearer {access token}' \
  		-H 'Content-Type: application/json' \
	```

	In our example: 

	```curl
	curl -X GET \
  		https://api.lightelligence.io/v1/devices \
  		-H 'Authorization: Bearer ey ...' \
  		-H 'Content-Type: application/json' \
	```	

	You get a response similar to the following:

	```json
	{
		"meta": {
			"page": 0,
			"pageSize": 50,
			"itemsTotal": 6,
			"pagesTotal": 1
		},
		"data": [
			{
				"id": "383b8c61-a9c7-487f-b4e1-66fad753e546",
				"info": {
					"name": "RGB LED",
					"description": "",
					"deviceTypeId": "04f14462-b44f-493c-aa2c-dd6d1c439ec3",
					"tags": [],
					"location": ""
            }
        },
	...
	}
	```

	
