---
title: Registering and Implementing User Applications
linktitle: Registering and Implementing User Applications
description: To turn a user application into an OAuth2 client, register it to the OLT platform and implement OAuth2 in your application.
date: 2019-06-01
publishdate: 2019-06-01
categories: [applications]
keywords: [application,user application,OAuth2]
menu:
  docs:
    parent: "applications"
    weight: 20
weight: 20
sections_weight: 20
draft: false
aliases: [/applications/,/overview/quickstart/]
toc: true
---

To turn a user application into an OAuth2 client, register it to the OLT platform and implement OAuth2 in your application.

---
<!-- todo 10 -->
**Note**
	
**Simulating Applications**
	
In the following, we use [`OAuth 2.0 <debugger/>` (https://oauthdebugger.com)](https://oauthdebugger.com/)  to simulate an application.
	
---
	

**Prerequisites**

To register applications to the OLT platform, you have `owner` or `writer` authorization.

---

**Note**

**Checking permissions**

* If you use default roles, to verify you have `owner` or `writer` authorization, in the OLT portal, under **Users**, check your roles.

* If you use custom roles, verify the user permissions for the specific endpoints.

	For more information, see [Defining Custom Roles](/users/creating-custom-roles).

---


## Registering and Installing an Application

To access your data in the OLT platform, create an application using the OLT API.

To allow your application to communicate with the OLT platform, create an OAuth2 client.


**Procedure**

1. Obtain your tenant ID and an authentication token:

	1. Log on to the OLT portal [https://portal.lightelligence.io/](https://portal.lightelligence.io/).
	2. Select the tenant who is to own the application.
	3. Under **Developer Area**, look up the 
	 * authentication token (in our example "eyJhbGciOi ...")
	 * tenant ID (in our example "b1747579-355 ...")
	 {{< figure src="/images/tenant-id.png" caption="Displaying the Authentication Token and Tenant ID in the Developer Area" alt="Displaying the Authentication Token and Tenant ID in the Developer Area" >}}		
		<!-- todo 20 -->
2. To register the application to the OLT platform, make a `POST` request to the [`/application-developer/applications`](https://api.lightelligence.io/v1/api-collection/#tag/application-developer/paths/~1application-developer~1applications/post) endpoint.

	You have the following options, depending on the application type:
	
	* **Web** application (recommended): Create web applications authenticating users *with* the OAuth2 client secret. 
	
		Ensure that the `withPublicOauth2Client` property is set to `false` (confidential).
	* **User Agent** application: If you don't have a backend service to store the OAuth2 client secret, set the `withPublicOauth2Client` property to `true` (public). 

	The request passes the following data:

	* one or more redirect URLs where your application is to be hosted.
		
		Define different redirect URLs for development, test, and production, for example.
		
		Wildcards (*) are not allowed in the redirect URLs.
		
		In our simulation, the redirect URL is `https://oauthdebugger.com/debug`.	<!-- todo 10 -->	
	* the authentication token
	* the tenant ID of the tenant owning the application
		
		---
		**Note**
		
		**Managing Applications**
		
		You can change the application properties later.
		
		Add a description and a URL to provide additional information, for example.

		If you have multiple tenants, to facilitate application management consider assigning all applications to the same tenant owning the applications.
		
		For more information, see [Managing Custom Applications](/applications/managing-applications/).
		
		---

	Example of a **web** application authenticating users *with* the OAuth2 client secret (`"withPublicOauth2Client": false`): <!-- todo 10 --> 

	{{< highlight curl  >}}
	curl -X POST \
		https://api.lightelligence.io/v1/application-developer/applications \
		-H 'Authorization: Bearer {authentication token}' \
		-H 'Content-Type: application/json' \
		-d '{
			"name": "My application name",
			"withPublicOauth2Client": false,
			"allowedTenants": [
				{
					"tenantId": "b1747579-355d-4b7a-aa72-c2336d3a7211",
					"comment": "Example Inc., northern plant"
				}
			],
			"redirectUris": [
				"https://oauthdebugger.com/debug", 
				"https://dev.application.com/auth/callback",
				"https://prod.application.com/auth/callback"
			]
		}'
	{{< / highlight >}}	

	You get a response similar to the following. The `type` is `confidential` (**web** application) or `public` (**user agent** application).
	
	The response contains the following data:
	
	* application ID (in our example "3333333-1111-2222-3333-4534g4gd4")
	* OAuth2 client ID (in our example "7222223-1111-2222-3333-fb4444444b7c")
	* OAuth2 client secret (in our example "-9vxPaAd3HmXhNXf")
	
	Example of a response for a **web** application (`"withPublicOauth2Client": false`):
	
	{{< highlight json  >}}
	{
		"data": {
			"id": "3333333-1111-2222-3333-4534g4gd4",
			"name": "My Web Application",
			"withPublicOauth2Client": false,
			"oauth2Client": {
				"id": "7222223-1111-2222-3333-fb4444444b7c",
				"secret": "-9vxPaAd3HmXhNXf",
				"type": "confidential"
			},
			"tenantId": "b1747579-355d-4b7a-aa72-c2336d3a7211",
			"status": "active",
			"createdAt": "2019-04-25T15:07:15.392Z",
			"updatedAt": "2019-04-25T15:07:15.392Z",
			"allowedTenants": [
				{
					"tenantId": "b1747579-355d-4b7a-aa72-c2336d3a7211",
					"createdAt": "2019-04-25T15:07:15.407Z",
					"installed": false,
					"comment": "Example Inc., northern plant"
				}
			],
			"redirectUris": [
				"https://oauthdebugger.com/debug",
				"https://dev.application.com/auth/callback",
				"https://prod.application.com/auth/callback"
			],
		}
	}
	{{< / highlight >}}
	
	
	Example of a response for a **user agent** application (`"withPublicOauth2Client": true`):

	{{< highlight json  >}}
	{
		"data": {
			"id": "2f594b28-411e-4334-9f72-75e1bff2e7f3",
			"name": "My User Agent Application",
			"withPublicOauth2Client": true,
			"oauth2Client": {
				"id": "fe1e5704-1fb1-4e66-818d-f7724f1743e0",
				"secret": "gX1WLw4O7YBwjsw5",
				"type": "confidental"
			},
			"publicOauth2Client": {
				"id": "3f7225f7-9818-4634-8613-c9676935847a",
				"type": "public"
			},
			"tenantId": "b1747579-355d-4b7a-aa72-c2336d3a7211",
			"status": "active",
			"createdAt": "2019-05-16T09:01:10.825Z",
			"updatedAt": "2019-05-16T09:01:10.825Z",
			"redirectUris": [
				"https://oauthdebugger.com/debug",
				"https://dev.application.com/auth/callback",
				"https://prod.application.com/auth/callback"
			],
			"allowedTenants": [
				{
                "tenantId": "b1747579-355d-4b7a-aa72-c2336d3a7211",
                "createdAt": "2019-05-16T09:01:10.918Z",
                "installed": false,
                "comment": "Example Inc., northern plant"
				}
			]
		}
	}
	{{< / highlight >}}
	
	You have now registered the application to your tenant, so the application is available to be installed in the tenant.

3. Implement a process to store the OAuth2 client secret.

	If you develop a **user agent** application without a backend service to store the OAuth2 client secret, ensure that you have set the `withPublicOauth2Client` property to `true`, in step 1.

	---
	
	**Note**
	
	**Why store the OAuth2 client secret?**
	
	To display application data, you can use the [`/application-developer/applications`](https://api.lightelligence.io/v1/api-collection/#tag/application-developer/paths/~1application-developer~1applications/get) endpoint.
	
	But the response does not contain the OAuth2 client secret.
	
	If you don't store it, you have to regenerate it making a `POST` request to the [`/application-developer/applications/{applicationId}/secret`](https://api.lightelligence.io/v1/api-collection/#tag/application-developer/paths/~1application-developer~1applications~1{applicationId}~1secret/post) endpoint.
	
	---
	
4. To install the application, make a `PUT` request to the [`/applications/{applicationId}/installation`](https://api.lightelligence.io/v1/api-collection/#tag/applications/paths/~1applications~1{applicationId}~1installation/put) endpoint.

	{{< highlight curl  >}}
	curl -X PUT \
		https://api.lightelligence.io/v1/applications/{applicationID}/installation \
		-H 'Authorization: Bearer {authentication token}' \
		-H 'Content-Type: application/json'
	{{< / highlight >}}

	In our example:

	{{< highlight curl  >}}
	curl -X PUT \
		https://api.lightelligence.io/v1/applications/3333333-1111-2222-3333-4534g4gd4/installation \
		-H 'Authorization: Bearer {eyJhbGciOi ...} \
		-H 'Content-Type: application/json'
	{{< / highlight >}}
	
5. Optional: To verify the installation, make a `GET` request to the [/applications/{applicationId}](https://api.lightelligence.io/v1/api-collection/#tag/applications/paths/~1applications~1{applicationId}/get) endpoint.
	
**Result**

You get a response similar to the following:

{{< highlight json  >}}
{
    "data": {
        "tenantId": "b1747579-355d-4b7a-aa72-c2336d3a7211",
        "createdAt": "2019-04-25T10:27:20.312Z"
    }
}
{{< / highlight >}}

Your application is registered to the OLT platform and installed in the tenant owning the application. 

A user can logon to the OLT platform and use your application as an OAuth2 client to get data from the tenant in which the application is installed.

## Installing the Application in Multiple Tenants

To install an existing application in additional tenants, whitelist the tenants and install the application in each of them.

For more information, see [Managing Custom Applications](/applications/managing-applications/).


## Implementing OAuth2 in the Application

Enable your application to act as an OAuth2 client, depending on the application type:

* **Web** application running on a web server
* **User agent** application running in a browser

### Implementing a Web Application

If you have a **web** application (in which the application source code is protected), implement a confidential OAuth2 client with OAuth2 client secret.

We recommend web applications due to safety reasons.

**Prerequisites**

When registering the application to the OLT platform, you have set the application property `withPublicOauth2Client` to `false` (see above).


**Procedure**

1. To get the OAuth2 authorization code, redirect the API call to the URL of our OLT authorization server (`id.lightelligence.io`):

	{{< highlight curl  >}}
	https://id.lightelligence.io/v1/id/auth/realms/olt/protocol/openid-connect/auth \
	  ?client_id={oauth2Client.id} \
	  &redirect_uri={redirectUri} \
	  &scope=openid \
	  &response_type=code \
	  &response_mode=form_post \
	{{< / highlight >}}

	In our example, we authenticate the [`OAuth 2.0 <debugger/>`](https://oauthdebugger.com/) application simulation hosted under `https://oauthdebugger.com/debug`: <!-- todo 10 -->

	{{< highlight curl  >}}
	https://id.lightelligence.io/v1/id/auth/realms/olt/protocol/openid-connect/auth \
	  ?client_id=7222223-1111-2222-3333-fb4444444b7c \
	  &redirect_uri=https://oauthdebugger.com/debug \
	  &scope=openid \
	  &response_type=code \
	  &response_mode=form_post \
	{{< / highlight >}}
	
	{{< figure src="/images/applications-codeflow-public-request-authcode.png" caption="Simulating an Authorization Code Request with `OAuth 2.0 <debugger/>`" alt="Requesting the Authorization Code" >}}

	If the user isn't logged on to the OLT platform already, the login screen appears.
	
	On selecting the tenant, the user is redirected to the redirect URL.
	
	You get the OAuth2 authorization code, in our example `eyJhb ...`:
	
	{{< highlight json  >}}
	{
	name: 'code', value: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..ZT1EOZlAoohBhGj2J24ydw.uyRYHynYGlrNpve4UmjsMXzVfXp2XBQPfXHrQWjfqYrPOUZVWoDWDJp7DpWvL8YAPnKANQnUsfEyE3JMA7qdOUHNr5wf2mT1tU3L1RBARui3gefXWlSZXTcC-ULnPmwjqyfVKRb5IPG-6N2Y20Xn0BBFEZEtN1AXslYvts4nKUG-Metg03NKP9Pi3CYVFrlUZIR6sAGsIeNXRiJPtXZ7CtQPStQGOMK_Y-TCXKWT9WUem7FOn3b_U_p7dEWR5Grp.I6Me3lQsqicV9zoH6i293g' },{ name: 'session_state', value: 'da6ee469-6030-495f-a1ce-7262a7b65ef9' }        ]
	}
	{{< / highlight >}}
	
	{{< figure src="/images/applications-codeflow-public-get-authcode.png" caption="Getting the OAuth2 Authorization Code with `OAuth 2.0 <debugger/>`" alt="Requesting the Authorization Code" >}}

	
2. To get an OAuth2 access token, implement a browser callback function to extract the OAuth2 authorization code and make the following `POST` request to the `/id/auth/realms/olt/protocol/openid-connect/token`. 

	The request passes the following data to the OLT authorization server:
	
	* the OAuth2 authorization code
	* the OAuth2 client ID of your application
	* the redirect URL
	* the client_secret

	{{< highlight curl  >}}
	curl -X POST \
		https://id.lightelligence.io/v1/id/auth/realms/olt/protocol/openid-connect/token \
		-H 'Content-Type: application/x-www-form-urlencoded' \
		-d 'grant_type=authorization_code&code={authorizationCode}&client_id={oauth2Client.id}&redirect_uri={redirectUri}&client_secret={oauth2Client.secret}'
	{{< / highlight >}}

	In our example:
	
	{{< highlight curl  >}}
	curl -X POST \
		https://id.lightelligence.io/v1/id/auth/realms/olt/protocol/openid-connect/token \
		-H 'Content-Type: application/x-www-form-urlencoded' \
		-d 'grant_type=authorization_code&code=eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..ZT1EOZlAoohBhGj2J24ydw.uyRYHynYGlrNpve4UmjsMXzVfXp2XBQPfXHrQWjfqYrPOUZVWoDWDJp7DpWvL8YAPnKANQnUsfEyE3JMA7qdOUHNr5wf2mT1tU3L1RBARui3gefXWlSZXTcC-ULnPmwjqyfVKRb5IPG-6N2Y20Xn0BBFEZEtN1AXslYvts4nKUG-Metg03NKP9Pi3CYVFrlUZIR6sAGsIeNXRiJPtXZ7CtQPStQGOMK_Y-TCXKWT9WUem7FOn3b_U_p7dEWR5Grp.I6Me3lQsqicV9zoH6i293g&client_id=7222223-1111-2222-3333-fb4444444b7c&redirect_uri=https://dev.application.com/auth/callback&client_secret=-9vxPaAd3HmXhNXf'
	{{< / highlight >}}
	
	---
	
	**Note** <!-- todo 30 -->
	
	We can't simulate this step because the request requires the application to be in the same session, in our example the `https://oauthdebugger.com/debug` application session.
	
	---
	
**Result**

You get the OAuth2 access token allowing your application to access the tenant data.

{{< highlight json  >}}
200: 
	{
		"access_token": "eyAdG ..."
	}
{{< / highlight >}}


###  Implementing a User Agent Application

If you have a browser application without a backend service, a JavaScript application, for example, retrieve the OAuth2 authorization code *without* the OAuth2 client secret.

**Prerequisites**

You have registered and installed the applicattion as described above.

When registering your application to the OLT platform, you have set the application property `withPublicOauth2Client` to `true`.

**Procedure**

1. To get the OAuth2 authorization code, redirect the API call to the URL of our OLT authorization server (`id.lightelligence.io`):

	{{< highlight curl  >}}
	https://id.lightelligence.io/v1/id/auth/realms/olt/protocol/openid-connect/auth \
	  ?client_id={oauth2Client.id} \
	  &redirect_uri={redirectUri} \
	  &scope=openid \
	  &response_type=code \
	  &response_mode=form_post
	{{< / highlight >}}

2. To get an OAuth2 access token, implement a browser callback function to extract the OAuth2 authorization code and make the following `POST` request to the `/id/auth/realms/olt/protocol/openid-connect/token`. 

	The request passes the following data to the OLT authorization server:	

	* the OAuth2 authorization code
	* the OAuth2 client ID of your application
	* the redirect URL

	{{< highlight curl  >}}
	curl -X POST \
		https://id.lightelligence.io/v1/id/auth/realms/olt/protocol/openid-connect/token \
		-H 'Content-Type: application/x-www-form-urlencoded' \
		-d 'grant_type=authorization_code&code={authorizationCode}&client_id={oauth2Client.id}&redirect_uri={redirectUri}'
	{{< / highlight >}}

	In our example: <!-- todo 10 -->
	
	{{< highlight curl  >}}
	curl -X POST \
		https://id.lightelligence.io/v1/id/auth/realms/olt/protocol/openid-connect/token \
		-H 'Content-Type: application/x-www-form-urlencoded' \
		-d 'grant_type=authorization_code&code={authorizationCode}&client_id=7222223-1111-2222-3333-fb4444444b7c&redirect_uri=https://oauthdebugger.com/debug'  
	{{< / highlight >}}



