---
title: "Drafts and notes to be deleted"
date: 2019-04-11
draft: true
weight: 100
description: ""
---

The following open questions are in the following files. The are indicated by `<!-- todo 1 -->` comments: 


registering-user-applications.md:

todo 10 replace https://oauthdebugger.com/debug by OLT debuggger as soon as available: in Q3

todo 20  @Jewgeni: *So this will completely change*, I'm not sure exactly how but hopefully they actually can create Applications through the UI soon. So you should probably update the getting started guide you have to include some UI elements (talk to #team-rams). Because the APIs for creating and managing APIs will not be used in the same way (as default at least) - talk to @Jewgeni here as well because he's driving the change.

<!-- todo 30 @Simon: provide code example for the browser callback function-->

registering-background-applications.md:

* todo 10: in  @Jewgeni: *So this will completely change*, see todo 1
	
* troubleshooting-application-management.md:

	todo 10: add new feature when available: 
	new feature application permissions (has nothing to do with custom roles) to be implemented in 2019 Q3 will allow the customer to add permissions when ceating an app, i.e. allow internal user management (tenant_user_management:read) in app:
	Apps can set a list of permissions the user has to accept when they install the app: „This app needs access to your user data“
	
	
	todo 20: check whether bug is fixed: 20190517:  Simon Nielsen [09:34 Uhr]
A) Yes that seem correct, we have a ticket to look over the permissions for applications that we will do asap. So assume you can access it and that it is correct @Christoph Albrecht (bearbeitet) 

@Simon: to be able to do this I need the permission I want to verify I have.

Issue: With the Oauth2 access token, access is denied, because the request requires user-management authorization (x-olt-permissions: ["tenant_user_management:read"]).

I have the feeling I’m in a circle: to check my app permissions I need permissions that I don’t have.

So in case access to an endpoint is denied, I can’t identify which endpoints I have permissions for.

* managing-applications.md: 

	<!-- todo 10 -->  @Timon: what happens if an app is installed already? Who gets which error message? How will the respective tenant owner get informed about it? -->
	@tbd: status mentioning it is not available to be used: `available: false` in it's data. The UI will show this in some nice UX to make sure the user know exactly what has happned to the installed application.
    Talk more to Team Rams (Timon Hass) for information on the UX.
	
	<!-- todo 20 @tbd: make new image with prod.io and whitelisted app -->








	

	
# Public User App 0510

1. Verify role: John	Doe	christoph.albrecht@posteo.de OWNER

2. Register app:
{
        "name": "Public User App 0510",
        "withPublicOauth2Client": true,
        "allowedTenants": [
            {
                "tenantId": "b1747579-355d-4b7a-aa72-c2336d3a7211",
                "comment": "Example Inc., northern plant"
            }
        ],
        "redirectUris": [
            "https://oauthdebugger.com/debug",
            "https://prod.application.com/auth/callback"
        ]
    }
	
Response:

{
    "data": {
        "id": "cd8f0ad6-290a-4fea-b3ba-8df5e9ae88e9",
        "name": "Public User App 0510",
        "withPublicOauth2Client": true,
        "oauth2Client": {
            "id": "d49014f7-4f2f-420c-ae2c-166a5709ee83",
            "secret": "YTaaCasWELOb6fqH",
            "type": "confidental"
        },
        "publicOauth2Client": {
            "id": "bb6ed503-ad2e-42f3-b5d3-45f338ecea02",
            "type": "public"
        },
        "tenantId": "b1747579-355d-4b7a-aa72-c2336d3a7211",
        "status": "active",
        "createdAt": "2019-05-10T09:00:31.376Z",
        "updatedAt": "2019-05-10T09:00:31.376Z",
        "redirectUris": [
            "https://oauthdebugger.com/debug",
            "https://prod.application.com/auth/callback"
        ],
        "allowedTenants": [
            {
                "tenantId": "b1747579-355d-4b7a-aa72-c2336d3a7211",
                "createdAt": "2019-05-10T09:00:31.392Z",
                "installed": false,
                "comment": "Example Inc., northern plant"
            }
        ]
    }
}


3. install the application, with a PUT request to the /applications/{applicationId}/installation endpoint.

https://api.dev.olt-dev.io/v1/applications/cd8f0ad6-290a-4fea-b3ba-8df5e9ae88e9/installation

Response:
{
    "data": {
        "tenantId": "b1747579-355d-4b7a-aa72-c2336d3a7211",
        "createdAt": "2019-05-10T09:07:16.801Z"
    }
}


4. verify the app is installed: 

https://api.dev.olt-dev.io/v1/applications

Response:
{
            "id": "cd8f0ad6-290a-4fea-b3ba-8df5e9ae88e9",
            "name": "Public User App 0510",
            "available": true,
            "availableCode": "APP_AVAILABLE",
            "installation": {
                "tenantId": "b1747579-355d-4b7a-aa72-c2336d3a7211",
                "createdAt": "2019-05-10T09:07:16.801Z"
            }




5. get the Oauth2 authorization code, [{"key":"Content-Type","name":"Content-Type","value":"application/x-www-form-urlencoded","description":"","type":"text"}]

https://id.dev.olt-dev.io/v1/id/auth/realms/olt/protocol/openid-connect/auth
?client_id=d49014f7-4f2f-420c-ae2c-166a5709ee83
&redirect_uri=https://oauthdebugger.com/debug
&scope=openid
&response_type=code
&response_mode=form_post

a) Enter the following request in the browser address field: 
oauth2Client d490...: https://id.dev.olt-dev.io/v1/id/auth/realms/olt/protocol/openid-connect/auth?client_id=d49014f7-4f2f-420c-ae2c-166a5709ee83&redirect_uri=https://oauthdebugger.com/debug&scope=openid&response_type=code&response_mode=form_post
public oauth2Client bb6...: https://id.dev.olt-dev.io/v1/id/auth/realms/olt/protocol/openid-connect/auth?client_id=bb6ed503-ad2e-42f3-b5d3-45f338ecea02&redirect_uri=https://oauthdebugger.com/debug&scope=openid&response_type=code&response_mode=form_post




Result: 

"Hello John, you are using the application Public User App 0510"

On selecting the tenant, I get the auth code:
		
eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..V5SWNAKS_NY6yV9ZQTpcRw.yc0j0veovN2XKMp4dUMvErDC43tKH1J1mvJdMZW53v6_t3LCyJhaRSVXZhPI-SwO8HgR017oSNb7f91Uim1qbtXuJ3yrOrBzbKrENW0J78jnkOB1BrxumClQnsgF7DXnIEeYd_7wy7ZwYxz9v6UHgOmc-iDrEaRQ_txiSLYr66ahMNjQqznVd-e1gvHtfp9t7EbzaF_lsx0sJHNbnnVpUbL0hvpNW_NHv_xjKiR8WTsidXpmVKv3OoYzOF4vLjgn.VUlxPwMiMFyXSt57vtudaQ

6. Get access token

Put request in browser address field:

https://id.dev.olt-dev.io/v1/id/auth/realms/olt/protocol/openid-connect/token?grant_type=authorization_code&code=eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..V5SWNAKS_NY6yV9ZQTpcRw.yc0j0veovN2XKMp4dUMvErDC43tKH1J1mvJdMZW53v6_t3LCyJhaRSVXZhPI-SwO8HgR017oSNb7f91Uim1qbtXuJ3yrOrBzbKrENW0J78jnkOB1BrxumClQnsgF7DXnIEeYd_7wy7ZwYxz9v6UHgOmc-iDrEaRQ_txiSLYr66ahMNjQqznVd-e1gvHtfp9t7EbzaF_lsx0sJHNbnnVpUbL0hvpNW_NHv_xjKiR8WTsidXpmVKv3OoYzOF4vLjgn.VUlxPwMiMFyXSt57vtudaQ&client_id=d49014f7-4f2f-420c-ae2c-166a5709ee83&redirect_uri=https://oauthdebugger.com/debug
		
Result:

"Lightelligence 

An internal server error has occurred	"	

The same query posted in Postman renders

{
    "error": "invalid_request",
    "error_description": "Missing form parameter: grant_type"
}

Note: 
* grant type is defined in the query params as "authorization_code"
* content type is defined in the Header as "/x-www-form-urlencoded"
* I have tried fifferent browsers


So step 5. in your description "The user takes this token and does a normal API call to `id.lightelligence.io.../token` with the code (as you defined in your example)." doesn't work for me.


# Code flow confidential 0515

POST \
    https://api.dev.olt-dev.io/v1/application-developer/applications \
    -H 'Authorization: Bearer {API token}' \
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

resoponse:
{
    "data": {
        "id": "d5e83d58-c4c5-41d5-9733-69aa97373b71",
        "name": "code flow confidential 0515",
        "withPublicOauth2Client": false,
        "oauth2Client": {
            "id": "eb1f3941-7227-4cbc-a572-fb81196842b9",
            "secret": "R0hE0hcCUrrkXJGu",
            "type": "confidental"
        },
        "tenantId": "b1747579-355d-4b7a-aa72-c2336d3a7211",
        "status": "active",
        "createdAt": "2019-05-15T10:45:13.710Z",
        "updatedAt": "2019-05-15T10:45:13.710Z",
        "redirectUris": [
            "https://oauthdebugger.com/debug",
            "https://dev.application.com/auth/callback",
            "https://prod.application.com/auth/callback"
        ],
        "allowedTenants": [
            {
                "tenantId": "b1747579-355d-4b7a-aa72-c2336d3a7211",
                "createdAt": "2019-05-15T10:45:13.725Z",
                "installed": false,
                "comment": "Example Inc., northern plant"
            }
        ]
    }
}

Install the app: 

PUT \
    https://api.dev.olt-dev.io/v1/applications/d5e83d58-c4c5-41d5-9733-69aa97373b71/installation \
    -H 'Authorization: Bearer {API token}'
    -H 'Content-Type: application/json'
Response.	
	{
    "data": {
        "tenantId": "b1747579-355d-4b7a-aa72-c2336d3a7211",
        "createdAt": "2019-05-15T10:56:07.306Z"
    }
}


Get auth code

https://id.dev.olt-dev.io/v1/id/auth/realms/olt/protocol/openid-connect/auth
?client_id=eb1f3941-7227-4cbc-a572-fb81196842b9
&redirect_uri=https://oauthdebugger.com/debug 
&scope=openid
&response_type=code
&response_mode=form_post

If I check "token", the response is: "Client is not allowed to initiate browser login with given response_type. Implicit flow is disabled for the client."




# Client credentials, 3rd try

Simon, I have repeated the whole process, including verification steps. At the end, in step 7 below, access with access token invariably fails while it works with API token. 

As per step 1, I have `owner` permission. As per step 2, I have the `tenant_user_management:read` permission required for the `/tenants/{tenantId}/users/{userId}/roles` query.

1. identify user:
https://api.dev.olt-dev.io/v1/tenants/b1747579-355d-4b7a-aa72-c2336d3a7211/users
{
    "data": [
        {
            "id": "72fac0d5-fe32-4599-8f9c-a033e42faaa9",
            "email": "christoph.albrecht@posteo.de",
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
    "meta": {
        "page": 0,
        "pageSize": 10,
        "itemsTotal": 1,
        "pagesTotal": 1
    }
}



2. Verify permissions: 
https://api.dev.olt-dev.io/v1/users/72fac0d5-fe32-4599-8f9c-a033e42faaa9/permissions


@tbd: attention: is done with portal auth token: do it with access token




I have the `tenant_user_management:read` permission required for the `/tenants/{tenantId}/users/{userId}/roles` query:

{
    "data": {
        "permissions": [
		
            ...
			
            {
                "id": "6a6d57ac-7cc7-4318-a349-4227d6f9edb5",
                "alias": "tenant_user_management:read"
            },
            {
                "id": "f76aea85-6153-4471-9f98-d59a3657e259",
                "alias": "tenant_user_management:write"
            },
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

3. Register background app

https://api.dev.olt-dev.io/v1/application-developer/applications
{
    "name": "Background Application 3",
    "allowedTenants": [
           {
            "tenantId": "b1747579-355d-4b7a-aa72-c2336d3a7211"
        }
    ]
}

Response:

{
    "data": {
        "id": "6b7dee71-4dbb-4efe-9c19-b265300327e0",
        "name": "Background Application 3",
        "withPublicOauth2Client": false,
        "oauth2Client": {
            "id": "f45bffbf-00b6-44bf-9952-1e9e2a1f06ad",
            "secret": "ntkbqzlzLuqa6Fqk",
            "type": "confidental"
        },
        "tenantId": "b1747579-355d-4b7a-aa72-c2336d3a7211",
        "status": "active",
        "createdAt": "2019-05-09T15:38:30.152Z",
        "updatedAt": "2019-05-09T15:38:30.152Z",
        "allowedTenants": [
            {
                "tenantId": "b1747579-355d-4b7a-aa72-c2336d3a7211",
                "createdAt": "2019-05-09T15:38:30.152Z",
                "installed": false,
                "comment": ""
            }
        ]
    }
}

4. Install Background Application 3:

PUT 
    https://api.dev.olt-dev.io/v1/applications/6b7dee71-4dbb-4efe-9c19-b265300327e0/installation \
    -H 'Authorization: Bearer {API token}'
    -H 'Content-Type: application/json'

Response:

{
    "data": {
        "tenantId": "b1747579-355d-4b7a-aa72-c2336d3a7211",
        "createdAt": "2019-05-09T15:48:02.668Z"
    }
}	


5. Verify Background Application 3 is installed:

GET https://api.dev.olt-dev.io/v1/applications

{
    "meta": {
        "page": 0,
        "pageSize": 10
    },
    "data": [
        {
            "id": "2d8d676f-9dac-464b-bf48-94d1ff1b07ca",
            "name": "Background Application",
            "available": true,
            "availableCode": "APP_AVAILABLE",
            "installation": {
                "tenantId": "b1747579-355d-4b7a-aa72-c2336d3a7211",
                "createdAt": "2019-05-08T14:11:03.380Z"
            }
        },
        {
            "id": "6b7dee71-4dbb-4efe-9c19-b265300327e0",
            "name": "Background Application 3",
            "available": true,
            "availableCode": "APP_AVAILABLE",
            "installation": {
                "tenantId": "b1747579-355d-4b7a-aa72-c2336d3a7211",
                "createdAt": "2019-05-09T15:48:02.668Z"
            }
        },
		
		...


6. Get get the client credential flow OAuth2 access token

POST \
https://id.dev.olt-dev.io/v1/id/auth/realms/olt/protocol/openid-connect/token \
-H 'Content-Type: application/x-www-form-urlencoded' \
-H 'tenant: b1747579-355d-4b7a-aa72-c2336d3a7211' \
-d 'grant_type=client_credentials&client_id=f45bffbf-00b6-44bf-9952-1e9e2a1f06ad&client_secret=ntkbqzlzLuqa6Fqk'

response:

{
    "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWV0VOVDNBN1FLWllFTURoWFBKd3dVa1Jpd04tREI5OThQeUpoU0gzRDZFIn0.eyJqdGkiOiI3ZmYwM2QyMS0yOThiLTRjNTEtOTgwZC02Yjk1Y2Y3NjdmNmMiLCJleHAiOjE1NTgyODIzMjgsIm5iZiI6MCwiaWF0IjoxNTU3NDE4MzI4LCJpc3MiOiJodHRwczovL2lkLmRldi5vbHQtZGV2LmlvL3YxL2lkL2F1dGgvcmVhbG1zL29sdCIsImF1ZCI6ImY0NWJmZmJmLTAwYjYtNDRiZi05OTUyLTFlOWUyYTFmMDZhZCIsInN1YiI6ImI4MjY4MzA1LTk5MjQtNGRkMy1hNmE1LWUyNTFkODY4NzRiMiIsInR5cCI6IkJlYXJlciIsImF6cCI6ImY0NWJmZmJmLTAwYjYtNDRiZi05OTUyLTFlOWUyYTFmMDZhZCIsImF1dGhfdGltZSI6MCwic2Vzc2lvbl9zdGF0ZSI6ImUyZWQyY2ViLTJmNDAtNGI2ZC04YTI4LWQyNjhlNTYzNWQ3MCIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiKiJdLCJyZXNvdXJjZV9hY2Nlc3MiOnt9LCJzY29wZSI6Im9sdC1hcHBsaWNhdGlvbnMiLCJjbGllbnRIb3N0IjoiMTAuMjQwLjAuOTciLCJjbGllbnRJZCI6ImY0NWJmZmJmLTAwYjYtNDRiZi05OTUyLTFlOWUyYTFmMDZhZCIsImNsaWVudEFkZHJlc3MiOiIxMC4yNDAuMC45NyIsInRlbmFudCI6ImIxNzQ3NTc5LTM1NWQtNGI3YS1hYTcyLWMyMzM2ZDNhNzIxMSJ9.v5HV3AQ2cQiGFcPb6pesi4Q3pRrD9M3k_ElbsiHuHzxLxNeP80sjHrlWO7hcTFuZgdFVCDCxIDezKnZN81CSNFf3X7srclvqnPuEHu9MbeIbisO93uzcdOVzUwDGC2cOtY4cG5CYCasPMY8FYp9LGEb0EsbMvd0MbNCFiJdYhz45GWMt1fKQEJfby91oyHNFACv0fM4NufWha6w0jSklhUsQBVZ_PAFOHlLcVDsZl4ypTcQPTZIHxpfKmXow0xjcORDbpCJMKNFEoSQBBEltXNWypZF44PmMV5Gy3j6FWmrMG7n1OIleS7AXFhJcvJiKl2p5tA0C5q4hfStzyxgdWg",
    "expires_in": 864000,
    "refresh_expires_in": 950400,
    "refresh_token": "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWV0VOVDNBN1FLWllFTURoWFBKd3dVa1Jpd04tREI5OThQeUpoU0gzRDZFIn0.eyJqdGkiOiIwOTcyMmExMy00YjYyLTQ3Y2MtYmY3ZC00MTk5YjM5NTBkZjYiLCJleHAiOjE1NTgzNjg3MjgsIm5iZiI6MCwiaWF0IjoxNTU3NDE4MzI4LCJpc3MiOiJodHRwczovL2lkLmRldi5vbHQtZGV2LmlvL3YxL2lkL2F1dGgvcmVhbG1zL29sdCIsImF1ZCI6ImY0NWJmZmJmLTAwYjYtNDRiZi05OTUyLTFlOWUyYTFmMDZhZCIsInN1YiI6ImI4MjY4MzA1LTk5MjQtNGRkMy1hNmE1LWUyNTFkODY4NzRiMiIsInR5cCI6IlJlZnJlc2giLCJhenAiOiJmNDViZmZiZi0wMGI2LTQ0YmYtOTk1Mi0xZTllMmExZjA2YWQiLCJhdXRoX3RpbWUiOjAsInNlc3Npb25fc3RhdGUiOiJlMmVkMmNlYi0yZjQwLTRiNmQtOGEyOC1kMjY4ZTU2MzVkNzAiLCJyZXNvdXJjZV9hY2Nlc3MiOnt9LCJzY29wZSI6Im9sdC1hcHBsaWNhdGlvbnMifQ.uP2AceDJOiqua3BEsodkYhSn6vSJd59r1_1jjujzzbMv5cZsNI3YZ-hWSWJdGtr4lABnphH1Raw1PRFWENgaZpw-ISrG71MXEXkdp3wkhsigpg8ieJbg5CKz1p-OpVZ5FLUP2R_B9Q0tPe8Mz5HGiyJnMqXh0nq4euXDoRPxCgZG5FTxcr5i1zmM_7D7Nq_6GB6WCuo0ETtoh1ElT8oDCs54I_Ocir7Ts6hcePWib6EfZIbcCMR-SeGcFwvKqIpo1rh94T2UEmoQLjhTP3ntimGk6MQEywHdRj0wnaqTAIjc-XxJ_UkcGBWKZwbFMJntTbW3-wWeTamTsZw6lIE5RQ",
    "token_type": "bearer",
    "not-before-policy": 0,
    "session_state": "e2ed2ceb-2f40-4b6d-8a28-d268e5635d70",
    "scope": "olt-applications"
}


7. Fetch roles

a) with access token:

GET \
        https://api.dev.olt-dev.io/v1/tenants/b1747579-355d-4b7a-aa72-c2336d3a7211/roles \
        -H 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWV0VOVDNBN1FLWllFTURoWFBKd3dVa1Jpd04tREI5OThQeUpoU0gzRDZFIn0.eyJqdGkiOiI3ZmYwM2QyMS0yOThiLTRjNTEtOTgwZC02Yjk1Y2Y3NjdmNmMiLCJleHAiOjE1NTgyODIzMjgsIm5iZiI6MCwiaWF0IjoxNTU3NDE4MzI4LCJpc3MiOiJodHRwczovL2lkLmRldi5vbHQtZGV2LmlvL3YxL2lkL2F1dGgvcmVhbG1zL29sdCIsImF1ZCI6ImY0NWJmZmJmLTAwYjYtNDRiZi05OTUyLTFlOWUyYTFmMDZhZCIsInN1YiI6ImI4MjY4MzA1LTk5MjQtNGRkMy1hNmE1LWUyNTFkODY4NzRiMiIsInR5cCI6IkJlYXJlciIsImF6cCI6ImY0NWJmZmJmLTAwYjYtNDRiZi05OTUyLTFlOWUyYTFmMDZhZCIsImF1dGhfdGltZSI6MCwic2Vzc2lvbl9zdGF0ZSI6ImUyZWQyY2ViLTJmNDAtNGI2ZC04YTI4LWQyNjhlNTYzNWQ3MCIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiKiJdLCJyZXNvdXJjZV9hY2Nlc3MiOnt9LCJzY29wZSI6Im9sdC1hcHBsaWNhdGlvbnMiLCJjbGllbnRIb3N0IjoiMTAuMjQwLjAuOTciLCJjbGllbnRJZCI6ImY0NWJmZmJmLTAwYjYtNDRiZi05OTUyLTFlOWUyYTFmMDZhZCIsImNsaWVudEFkZHJlc3MiOiIxMC4yNDAuMC45NyIsInRlbmFudCI6ImIxNzQ3NTc5LTM1NWQtNGI3YS1hYTcyLWMyMzM2ZDNhNzIxMSJ9.v5HV3AQ2cQiGFcPb6pesi4Q3pRrD9M3k_ElbsiHuHzxLxNeP80sjHrlWO7hcTFuZgdFVCDCxIDezKnZN81CSNFf3X7srclvqnPuEHu9MbeIbisO93uzcdOVzUwDGC2cOtY4cG5CYCasPMY8FYp9LGEb0EsbMvd0MbNCFiJdYhz45GWMt1fKQEJfby91oyHNFACv0fM4NufWha6w0jSklhUsQBVZ_PAFOHlLcVDsZl4ypTcQPTZIHxpfKmXow0xjcORDbpCJMKNFEoSQBBEltXNWypZF44PmMV5Gy3j6FWmrMG7n1OIleS7AXFhJcvJiKl2p5tA0C5q4hfStzyxgdWg' \
        -H 'Content-Type: application/json' 

response:

{
    "errorMessage": "Access to resource is forbidden",
    "errorCode": "NO_ACCESS_TO_RESOURCE"
}



b) The same request with auth token works:

{
    "meta": {
        "page": 0,
        "pageSize": 10
    },
    "data": [
        {
            "id": "2f62f733-0b4f-461d-aeaf-3485b205a880",
            "name": "writer",
            "displayName": "Writer",
            "description": "Default writer role including read and write access to  every resource except the tenant itself and the tenant's user management.",
            "createdAt": "2019-03-19T14:21:39.392Z",
            "updatedAt": "2019-03-19T14:21:39.392Z"
        },
        {
            "id": "3100bdf8-90d9-471d-86ae-f7ba9eff0a86",
            "name": "owner",
            "displayName": "Owner",
            "description": "Default owner role with full access to all resources.",
            "createdAt": "2019-03-19T14:21:39.392Z",
            "updatedAt": "2019-03-19T14:21:39.392Z"
        },
        {
            "id": "a51ea36f-f83d-4f86-bab1-a2bb00965401",
            "name": "reader",
            "displayName": "Reader",
            "description": "Default reader role including read access to every  resource except the tenant's user management.",
            "createdAt": "2019-03-19T14:21:39.392Z",
            "updatedAt": "2019-03-19T14:21:39.392Z"
        }
    ]
}










Confluence: https://lightelligence.atlassian.net/wiki/spaces/OCP/pages/887291905/Application+Management+What+is+it

# OAuth Debug

1. Register https://oauthdebugger.com/debug
{
        "name": "OAuth Debug application",
        "withPublicOauth2Client": false,
        "allowedTenants": [
            {
                "tenantId": "b1747579-355d-4b7a-aa72-c2336d3a7211",
                "comment": "Example Inc., northern plant"
            }
        ],
        "redirectUris": [
            "https://oauthdebugger.com/debug",
            "https://prod.application.com/auth/callback"
        ]
    }

Result: 

{
    "data": {
        "id": "74500c6c-9bfd-4f2e-aef3-e0d76c1bc3a7",
        "name": "OAuth Debug application",
        "withPublicOauth2Client": false,
        "oauth2Client": {
            "id": "7fae27ed-2a78-400c-9cef-5848b045d85c",
            "secret": "DsdPjKe2zR4ZEdTp",
            "type": "confidental"
        },
        "tenantId": "b1747579-355d-4b7a-aa72-c2336d3a7211",
        "status": "active",
        "createdAt": "2019-05-09T06:20:49.214Z",
        "updatedAt": "2019-05-09T06:20:49.214Z",
        "redirectUris": [
            "https://oauthdebugger.com/debug",
            "https://prod.application.com/auth/callback"
        ],
        "allowedTenants": [
            {
                "tenantId": "b1747579-355d-4b7a-aa72-c2336d3a7211",
                "createdAt": "2019-05-09T06:20:49.214Z",
                "installed": false,
                "comment": "Example Inc., northern plant"
            }
        ]
    }
}


2. Install app:
Result:
{
    "data": {
        "tenantId": "b1747579-355d-4b7a-aa72-c2336d3a7211",
        "createdAt": "2019-05-09T06:23:22.777Z"
    }
}


3. Get auth code

https://id.dev.olt-dev.io/v1/id/auth/realms/olt/protocol/openid-connect/auth?client_id=7fae27ed-2a78-400c-9cef-5848b045d85c&redirect_uri=https://oauthdebugger.com/debug&scope=openid&response_type=code&response_mode=form_post

<!-- @tbd: insert response, test oauth flows with https://oauthdebugger.com/ -->

Response: 

```sh
<script language="javascript">
    window.serverInfo = {
        method: "POST",
        referer: "https://id.dev.olt-dev.io/v1/id/auth/realms/olt/login-actions/authenticate?client_id=7fae27ed-2a78-400c-9cef-5848b045d85c&amp;tab_id=5s4YqHSknxc",
        formBody: [
{ name: 'code', value: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..QvmzuK2enM5rXgG26eWV9A.fKpNH3ud44vFN1iVr5c-bQntteOe0dAk2gJCTG-eGNE5IwKk4CrLbC3c2MfPqsDbyoARo5t2kg4LLB39rGjSHzHqp3TIFWrCWM-bO3dUIj3PYh7boO4TyKazkVWUzgrbUl4qZIYMm12fzjaWFHf4vj1uXkFV9YbZhtj04_msujOac6iOmtlVGYMEuzTrdU0K-qg_CTkQ7V6iYB_nyI4AocDDuNfTZYRVF-GKbY9SsaZNG9PVZKQFMnzo8rpwxU0Y.lvWW7TLF_n9Ll-EuFdxB6w' },{ name: 'session_state', value: 'da6ee469-6030-495f-a1ce-7262a7b65ef9' }        ]
    }
</script>
```sh


4. Get acces token

https://id.dev.olt-dev.io/v1/id/auth/realms/olt/protocol/openid-connect/token?grant_type=authorization_code&code=eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..17D7A6KgpGkVqmBOTgEbCg.lBMhDEoZ_yiUSUx8gTVjb8h837rXrkFuTmoqD4B6dojG480NVYFpFP_Ixd2POo9diBM22Svq-dw9vIV1DWbwow32ypoRzH9Tca0LYa9Sg8q7CWGdqt5DnOikYb0Siu6Ox8J3U-l2Gh1MsZDJA-UVRhz6U65ixkpAJoZwJ2czJzr19YQnjCmM2fhpcbSOnbbljS1bmuVhtVcBec-1jbWuHFbbfuXrjXYV9fR6W1DKKBbV-s7eUVa-pl2gZCD3ef50._rZ58d2WSpIpVN2f-1UU2g&client_id=7fae27ed-2a78-400c-9cef-5848b045d85c&redirect_uri=https://oauthdebugger.com/debug&client_secret=DsdPjKe2zR4ZEdTp



eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..17D7A6KgpGkVqmBOTgEbCg.lBMhDEoZ_yiUSUx8gTVjb8h837rXrkFuTmoqD4B6dojG480NVYFpFP_Ixd2POo9diBM22Svq-dw9vIV1DWbwow32ypoRzH9Tca0LYa9Sg8q7CWGdqt5DnOikYb0Siu6Ox8J3U-l2Gh1MsZDJA-UVRhz6U65ixkpAJoZwJ2czJzr19YQnjCmM2fhpcbSOnbbljS1bmuVhtVcBec-1jbWuHFbbfuXrjXYV9fR6W1DKKBbV-s7eUVa-pl2gZCD3ef50._rZ58d2WSpIpVN2f-1UU2g






# Test Application
{
    "data": {
        "id": "6f23aca9-9f53-4465-87e1-b580cf497cda",
        "name": "Test Application",
        "withPublicOauth2Client": false,
        "oauth2Client": {
            "id": "6c6caade-c6dc-4759-ac2e-2169dd99b39d",
            "secret": "HXOyiBBeq_88WQ4y",
            "type": "confidental"
        },
        "tenantId": "b1747579-355d-4b7a-aa72-c2336d3a7211",
        "status": "active",
        "createdAt": "2019-05-08T10:05:57.308Z",
        "updatedAt": "2019-05-08T10:05:57.308Z",
        "redirectUris": [
            "https://dev.application.com/auth/callback",
            "https://prod.application.com/auth/callback"
        ],
        "allowedTenants": [
            {
                "tenantId": "b1747579-355d-4b7a-aa72-c2336d3a7211",
                "createdAt": "2019-05-08T10:05:57.324Z",
                "installed": false,
                "comment": "Example Inc., northern plant"
            }
        ]
    }
}


https://api.dev.olt-dev.io/v1/applications/6f23aca9-9f53-4465-87e1-b580cf497cda/installation:

{
    "data": {
        "tenantId": "b1747579-355d-4b7a-aa72-c2336d3a7211",
        "createdAt": "2019-05-08T10:27:20.312Z"
    }
}


Oauth2 authorization code:

https://api.dev.olt-dev.io/v1/id/auth/realms/olt/protocol/openid-connect/auth?client_id=6c6caade-c6dc-4759-ac2e-2169dd99b39d&redirect_uri=https://dev.application.com/auth/callback&scope=openid&response_type=code&response_mode=form_post


Registering an public app that has client secret
{
    "data": {
        "id": "b8fcaf33-9c60-4958-ae1e-5a55ea58ef74",
        "name": "Public application",
        "withPublicOauth2Client": true,
        "oauth2Client": {
            "id": "148e8aa9-f71c-4e7c-9a1e-a68de6357558",
            "secret": "HMdXpVllVQpLlarh",
            "type": "confidental"
        },
        "publicOauth2Client": {
            "id": "18b075df-010e-44ca-8ad2-081a80a969df",
            "type": "public"
        },
        "tenantId": "b1747579-355d-4b7a-aa72-c2336d3a7211",
        "status": "active",
        "createdAt": "2019-05-08T12:55:18.070Z",
        "updatedAt": "2019-05-08T12:55:18.070Z",
        "redirectUris": [
            "https://dev.application.com/auth/callback",
            "https://prod.application.com/auth/callback"
        ],
        "allowedTenants": [
            {
                "tenantId": "b1747579-355d-4b7a-aa72-c2336d3a7211",
                "createdAt": "2019-05-08T12:55:18.086Z",
                "installed": false,
                "comment": "Example Inc., northern plant"
            }
        ]
    }
}

installed:

{
    "data": {
        "tenantId": "b1747579-355d-4b7a-aa72-c2336d3a7211",
        "createdAt": "2019-05-08T13:12:03.090Z"
    }
}


https://id.dev.olt-dev.io/v1/id/auth/realms/olt/protocol/openid-connect/auth?client_id=148e8aa9-f71c-4e7c-9a1e-a68de6357558&redirect_uri=https://dev.application.com/auth/callback&scope=openid&response_type=code&response_mode=form_post


?client_id={oauth2Client.id}
&redirect_uri={redirectUri}
&scope=openid
&response_type=code
&response_mode=form_post


## Client credentials app

app2
{
    "data": {
        "id": "e09eeb8e-1574-4c56-b49d-daa9f3e8c609",
        "name": "Background Application 2",
        "withPublicOauth2Client": false,
        "oauth2Client": {
            "id": "f622b664-bc91-4f2d-ad4f-538b038ae549",
            "secret": "K3NGgpnQa4vLFNwr",
            "type": "confidental"
        },
        "tenantId": "b1747579-355d-4b7a-aa72-c2336d3a7211",
        "status": "active",
        "createdAt": "2019-05-09T10:53:18.619Z",
        "updatedAt": "2019-05-09T10:53:18.619Z",
        "allowedTenants": [
            {
                "tenantId": "b1747579-355d-4b7a-aa72-c2336d3a7211",
                "createdAt": "2019-05-09T10:53:18.635Z",
                "installed": false,
                "comment": ""
            }
        ]
    }
}



Install app 
curl -X PUT \
    https://api.dev.olt-dev.io/v1/applications/e09eeb8e-1574-4c56-b49d-daa9f3e8c609/installation \
    -H 'Authorization: Bearer {API token}'
	
From app 2	
installed:
{
    "data": {
        "tenantId": "b1747579-355d-4b7a-aa72-c2336d3a7211",
        "createdAt": "2019-05-09T11:02:40.591Z"
    }
}

3. Get access token

App 1
curl -X POST \
https://id.dev.olt-dev.io/v1/id/auth/realms/olt/protocol/openid-connect/token \
-H 'Content-Type: application/x-www-form-urlencoded' \
-H 'tenant: {tenant ID}' \
-d 'grant_type=client_credentials&client_id=28f83819-199f-4410-ae7f-722176512b93&client_secret=IoSP8S78VRyrPZ2V'

response:
{
    "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWV0VOVDNBN1FLWllFTURoWFBKd3dVa1Jpd04tREI5OThQeUpoU0gzRDZFIn0.eyJqdGkiOiJjZDc5NGM5YS1jZGQzLTQ4ZTYtYmM5ZC01YmVkNGYzNzBlODIiLCJleHAiOjE1NTgyNjM5MjQsIm5iZiI6MCwiaWF0IjoxNTU3Mzk5OTI0LCJpc3MiOiJodHRwczovL2lkLmRldi5vbHQtZGV2LmlvL3YxL2lkL2F1dGgvcmVhbG1zL29sdCIsImF1ZCI6ImY2MjJiNjY0LWJjOTEtNGYyZC1hZDRmLTUzOGIwMzhhZTU0OSIsInN1YiI6ImFmYjM4NWYyLTIyYmMtNDcwMS1hNmMzLTk0NjkxOTQ2ZDM4NiIsInR5cCI6IkJlYXJlciIsImF6cCI6ImY2MjJiNjY0LWJjOTEtNGYyZC1hZDRmLTUzOGIwMzhhZTU0OSIsImF1dGhfdGltZSI6MCwic2Vzc2lvbl9zdGF0ZSI6Ijc3NjhiNzg4LTU1YjYtNDM0Ny04N2IwLTkyYmM3ZTVmNjM0ZSIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiKiJdLCJyZXNvdXJjZV9hY2Nlc3MiOnt9LCJzY29wZSI6Im9sdC1hcHBsaWNhdGlvbnMiLCJjbGllbnRJZCI6ImY2MjJiNjY0LWJjOTEtNGYyZC1hZDRmLTUzOGIwMzhhZTU0OSIsImNsaWVudEhvc3QiOiIxMC4yNDAuMC4xMjgiLCJjbGllbnRBZGRyZXNzIjoiMTAuMjQwLjAuMTI4IiwidGVuYW50IjoiYjE3NDc1NzktMzU1ZC00YjdhLWFhNzItYzIzMzZkM2E3MjExIn0.Fw8ZV_nDTm6pZL8q9V3q86gk3oSG3ph6VwkzZo2iVbp21C4y8-V7yc3raBpAmcUcZK8YfpN2Mzn1QiCMUavdPysSiCYpyF5UzEVNZJY7kIOUEg0PHZKsnQypOzip_xtNHToD1YtososZdySyS12T7FhI7-_ad_gOI5jo0wxD-kjxs8h-brZHJPFNrB9rHm6iGYcnirUgABbYt0vYzsvZULdM7Vkx9ihrkwcl7PFFojz9ESSiPi6eThrvRL5rmfuisqqI628dBwIuhjhmS7Of9oX2-8If16NNe9kdSBau3Yq5LA0sZbNN3GG7YxfmKcYSN9lsd2_hJEI1eyv1zMLVxQ",
    "expires_in": 864000,
    "refresh_expires_in": 950400,
    "refresh_token": "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWV0VOVDNBN1FLWllFTURoWFBKd3dVa1Jpd04tREI5OThQeUpoU0gzRDZFIn0.eyJqdGkiOiI3YjE4OTg5Mi04ZWViLTQyZTYtYTNhNy05MDI5ZjZhYWI2YzAiLCJleHAiOjE1NTgzNTAzMjQsIm5iZiI6MCwiaWF0IjoxNTU3Mzk5OTI0LCJpc3MiOiJodHRwczovL2lkLmRldi5vbHQtZGV2LmlvL3YxL2lkL2F1dGgvcmVhbG1zL29sdCIsImF1ZCI6ImY2MjJiNjY0LWJjOTEtNGYyZC1hZDRmLTUzOGIwMzhhZTU0OSIsInN1YiI6ImFmYjM4NWYyLTIyYmMtNDcwMS1hNmMzLTk0NjkxOTQ2ZDM4NiIsInR5cCI6IlJlZnJlc2giLCJhenAiOiJmNjIyYjY2NC1iYzkxLTRmMmQtYWQ0Zi01MzhiMDM4YWU1NDkiLCJhdXRoX3RpbWUiOjAsInNlc3Npb25fc3RhdGUiOiI3NzY4Yjc4OC01NWI2LTQzNDctODdiMC05MmJjN2U1ZjYzNGUiLCJyZXNvdXJjZV9hY2Nlc3MiOnt9LCJzY29wZSI6Im9sdC1hcHBsaWNhdGlvbnMifQ.Dk0MtfG4CRe-ilv6eEnhiOal5cyArYwv-LzLOmazEvC1HZpHke0pAXEu7gWTOpVjHmBX8jaTIBEe9CukI4yOGezss7mZ2mp35G4gVKeK12YYSafMY7zsqxly4i_ylnplb2O4ZjV4TI5lomSXHlXU9g2szP1YnwwLN0RpzFL3rpqsuELglBPq-o6RV99N3md4d9YiIEaEKeLOgIwWrQMJDDcdb3Ow5vSCT9GuYXUYEfA1gTvRUIeakf0hbD8DsTCxHIcUOx43FniLJu8Ly6v_bBkO5uQcELo6rXxOHKIHDvR_wrTpCdIh002pWwYfrg72vQZrs-03K8Ol9fL8EIW-xg",
    "token_type": "bearer",
    "not-before-policy": 0,
    "session_state": "7768b788-55b6-4347-87b0-92bc7e5f634e",
    "scope": "olt-applications"
}





App 2
curl -X POST \
https://id.dev.olt-dev.io/v1/id/auth/realms/olt/protocol/openid-connect/token \
-H 'Content-Type: application/x-www-form-urlencoded' \
-H 'tenant: {tenant ID}' \
-d 'grant_type=client_credentials&client_id=28f83819-199f-4410-ae7f-722176512b93&client_secret=IoSP8S78VRyrPZ2V'



response:
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

4. fetch some data

curl -X GET \
  		https://api.dev.olt-dev.io/v1/tenants/b1747579-355d-4b7a-aa72-c2336d3a7211/roles \
  		-H 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWV0VOVDNBN1FLWllFTURoWFBKd3dVa1Jpd04tREI5OThQeUpoU0gzRDZFIn0.eyJqdGkiOiI4YzhlMDAxMi1lYWFiLTRkYzYtYmZiOC1iNTUyNTQ3YTJiMGEiLCJleHAiOjE1NTgyNjA2OTIsIm5iZiI6MCwiaWF0IjoxNTU3Mzk2NjkyLCJpc3MiOiJodHRwczovL2lkLmRldi5vbHQtZGV2LmlvL3YxL2lkL2F1dGgvcmVhbG1zL29sdCIsImF1ZCI6IjI4ZjgzODE5LTE5OWYtNDQxMC1hZTdmLTcyMjE3NjUxMmI5MyIsInN1YiI6IjZmM2Q2MGQwLWJlMzAtNGNiYS1hOTU1LTczMDYzMDExNDg3YyIsInR5cCI6IkJlYXJlciIsImF6cCI6IjI4ZjgzODE5LTE5OWYtNDQxMC1hZTdmLTcyMjE3NjUxMmI5MyIsImF1dGhfdGltZSI6MCwic2Vzc2lvbl9zdGF0ZSI6IjAwNjY4OGIxLTEzZjEtNGJhZi1hNzQxLTc4NTdmZmE5NjM2ZiIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiKiJdLCJyZXNvdXJjZV9hY2Nlc3MiOnt9LCJzY29wZSI6Im9sdC1hcHBsaWNhdGlvbnMiLCJjbGllbnRJZCI6IjI4ZjgzODE5LTE5OWYtNDQxMC1hZTdmLTcyMjE3NjUxMmI5MyIsImNsaWVudEhvc3QiOiIxMC4yNDAuMC42NiIsImNsaWVudEFkZHJlc3MiOiIxMC4yNDAuMC42NiIsInRlbmFudCI6ImIxNzQ3NTc5LTM1NWQtNGI3YS1hYTcyLWMyMzM2ZDNhNzIxMSJ9.v7cu0zDJY0BqLSmTUauJW46XkGWOuNxVPV7qY4530FZU2BHwZuR5URPlJtHbWpe2QUqxSXboq4dPnL9PmCltUO11DT6cartsJAte4rvvJE2WHb_YtmRasn8b-PxZ9ZVFXIHQRDnIKDu0xPl29ijyqkWbTawdxvuLkwThi4Gu-apqWAjCX2pNBivmuT-25QVBA-FAD_cHuxRPgJ5DJ8BbFIOYR-WjGRAO9v7RLjANSRjXLCS69WP6nKtZn0xJT0GXCUyyLeo_zI4FMWosq9UEFb2hIlXi4kJbkK_pD6KsXq5RGEL7Ap812DUdTDzfA1IcqLH14S38PTnHCFwRssbx0g' \
  		-H 'Content-Type: application/json' 



Result: 
With the client credentials flow, I'm able to get the access token. But when i try to get the roles, for example (`curl -X GET \
  		https://api.dev.olt-dev.io/v1/tenants/b1747579-355d-4b7a-aa72-c2336d3a7211/roles \
  		-H 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR ...' \
  		-H 'Content-Type: application/json' `), access is denied:


Display users with auth token

https://api.dev.olt-dev.io/v1/tenants/b1747579-355d-4b7a-aa72-c2336d3a7211/users

result:
{
    "data": [
        {
            "id": "72fac0d5-fe32-4599-8f9c-a033e42faaa9",
            "email": "christoph.albrecht@posteo.de",
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
    "meta": {
        "page": 0,
        "pageSize": 10,
        "itemsTotal": 1,
        "pagesTotal": 1
    }
}


Display user with access token:
https://api.dev.olt-dev.io/v1/tenants/b1747579-355d-4b7a-aa72-c2336d3a7211/users 
"Access to resource is forbidden",

That seems not to be the solution, I'm making a different error.

When I display the tenant's user with https://api.dev.olt-dev.io/v1/tenants/b1747579-355d-4b7a-aa72-c2336d3a7211/users, ("tenant_user_management:read") with the API token from the portal,
my user is displayed as expected.

When I do the same with the access token for my app, access is denied.

Also, I have ensured in the portal that I'm `owner`, so I also should be able to fetch the roles, correct? But access is still denied.

```
{
    "data": [
        {
            "id": "72fac0d5-fe32-4599-8f9c-a033e42faaa9",
            "email": "christoph.albrecht@posteo.de",
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
    "meta": {
        "page": 0,
        "pageSize": 10,
        "itemsTotal": 1,
        "pagesTotal": 1
    }
}
```





Display permissions for my user ID:

In the portal, I have now ensured that I'm `owner`.

Nevertheless, "Access to resource is forbidden".

So I tried the permissions endpoint 

https://api.dev.olt-dev.io/v1/users/6f3d60d0-be30-4cba-a955-73063011487c/permissions \
  		-H 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR ...' \
  		-H 'Content-Type: application/json' `), access is denied:

{
    "errorMessage": "User is not permitted to access this resource",
    "errorCode": "ID_FORBIDDEN"
}



## List installed tenants

When I do https://api.dev.olt-dev.io/v1/application-info/installed-tenants with access token, access is granted: 
```
 {
    "meta": {
        "page": 0,
        "pageSize": 10
    },
    "data": [
        {
            "tenantId": "b1747579-355d-4b7a-aa72-c2336d3a7211",
            "name": "Muster-Tenant"
        }
    ]
}
```

Get invites:

For example,
https://api.dev.olt-dev.io/v1/tenants/b1747579-355d-4b7a-aa72-c2336d3a7211/invites
works with auth token but not access token. 
What is it that I don't get?

@tbd:

Simon, I assume the Client Credentials flow is for our internal use only, not for customers, correct?

`withPublicOauth2Client=true` does not mean that we actually support 3 flow types, the third being the "implicit flow" where the browser gets the access token directly from the server, without first having to exchange the authorization code with the access token, correct? (see https://speakerdeck.com/nbarbettini/oauth-and-openid-connect-in-plain-english?slide=38 and https://speakerdeck.com/nbarbettini/oauth-and-openid-connect-in-plain-english?slide=21)


ErledigenLikegestern
Simon Nielsen
1. Client credentials flow is fully supported for all our applications. When you're building a background service that for example list all devices for all installed tenants you're not accessing the data as a user, but rather as a client. We have this specific endpoint that can be used only by clients to see all "Installed Tenants" which the service then can query to the API with: https://api.lightelligence.io/v1/api-collection/#tag/application-info/paths/~1application-info~1installed-tenants/get

2. No, we don't support implicit flow due to recommendations from the OAuth2 board[1][2]. What it opens up is to use the Authorization Code Grant from a browser with a Public client (without a secret - less secure). 
[1]: https://oauth.net/2/grant-types/implicit
[2]: https://medium.com/oauth-2/why-you-should-stop-using-the-oauth-implicit-grant-2436ced1c926


@tbd

Simon, I have the impression the we have to add the step to get the Oauth2 authorization code (that we then can exchange for the access token) by redirecting the app to the URL of our OLT authorization server:

https://id.lightelligence.io/v1/id/auth/realms/olt/protocol/openid-connect/auth
?client_id={oauth2Client.id}
&redirect_uri={redirectUri}
&scope=openid
&response_type=code
&response_mode=form_post
How does the response with the auth. code look like?

Yes that would be good to have in the public documentation but we should also recommend our users to use our JavaScript-SDK whenever that is available. please talk to Jonathan Stoye about that.

Otherwise the callback is a form_post where in the body you can get the code . 

For browsers you often use the query parameters and there it will also be the code parameter that you take. The flow is explained more in the getting started guide:Application Management | Getting Started 


Likevor 21 Minuten
Simon Nielsen
I use this tool for testing oauth flows. https://oauthdebugger.com/ works pretty good



<!-- 
https://lightelligence.atlassian.net/wiki/spaces/OCP/pages/887291905/Manage+Applications+through+API,
https://api.lightelligence.io/v1/api-collection/#tag/application-developer/paths/~1application-developer~1applications/post
https://lightelligence.atlassian.net/wiki/spaces/OCP/pages/884015118/Vendor+Side+of+Application+Management -->



<!-- UI Flow: https://lightelligence.atlassian.net/wiki/spaces/OCP/pages/884015118/Vendor+Side+of+Application+Management -->


Application management for developers

* List the capabilities the `applicaton-developer endpoint provides.
* Link to the `/application-developer/ endpoint in the OpenAPI docs


OAuth 2.0 Client Types:
http://tutorials.jenkov.com/oauth2/client-types.html

