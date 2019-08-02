---
title: Troubleshooting Application Management
linktitle: Troubleshooting Application Management
description: Resolve typical issues when developing custom applications.
date: 2019-08-02
publishdate: 2019-08-02
categories: [applications]
keywords: [application,troubleshooting,issues]
menu:
  docs:
    parent: "applications"
    weight: 500
weight: 500
sections_weight: 500
draft: false
aliases: [/applications/,/overview/quickstart/]
toc: true
---



## Access Denied

Your custom application can't access a certain endpoint?

Verify that an endpoint has the permission required to access the tenant's data.

---

**Background**

For security reasons, custom applications are not allowed to use API endpoints related to tenant management and user management.

You can access these endpoints only in the OLT portal.

So even if your user has the `owner` role, with a custom application the access is restricted to permissions assigned to the `writer` role.

If you need to develop custom applications that use endpoints related to user management, contact our OLT support under <contact@lightelligence.io>. 
{{% todo %}}@tbd: add new feature when available: 
	new feature application permissions (has nothing to do with custom roles) to be implemented in 2019 Q3 will allow the customer to add permissions when ceating an app, i.e. allow internal user management (tenant_user_management:read) in app:
	Apps can set a list of permissions the user has to accept when they install the app: „This app needs access to your user data“    {{% /todo %}}

---

Custom applications **cannot** access endpoints which require the following permission:

* `"tenant:read"`
* `"tenant:write"`
* `"tenant_user_management:read"` 
* `"tenant_user_management:write"`

The [`/tenants/{tenantId}/users/{userId}/roles`](https://api.lightelligence.io/v1/api-collection/#tag/user-management/paths/~1tenants~1{tenantId}~1users~1{userId}~1roles/get) endpoint, for example, requires the `"tenant_user_management:read"` permission. You cannot access it with a custom application.

**Prerequisites**

You have `owner` or `writer` authorization.


**Procedure**

Make a `GET` request to the [`/permissions`](https://api.lightelligence.io/v1/api-collection/#tag/roles-and-permissions/paths/~1permissions/get) endpoint. 

To authenticate the request, use the **OAuth2 access token**.

```curl
curl -X GET \
  	https://api.lightelligence.io/v1/permissions \
  	-H 'Authorization: Bearer {OAuth2 access token}' \
  	-H 'Content-Type: application/json' 
```

You get a response similar to the following:

```json
{
    "meta": {
        "page": 0,
        "pageSize": 50,
        "totalSize": 26
    },
    "data": {
        "permissions": [
            {
                "id": "78624d68-b09c-4e28-ae5e-812c3cfa1126",
                "alias": "devicetypes:read",
                "category": "devices",
                "name": "Access devicetypes",
                "description": "Get device types and online monitoring rules \\nList available device types and categories\n"
            },
            {
                "id": "d06e523b-d729-4b6d-b7b7-203ab8eaf102",
                "alias": "devicetypes:write",
                "category": "devices",
                "name": "Edit devicetypes",
                "description": "Create device types \\nModify device types and online monitoring rules \\nRemove device types\n"
            },

			...
        ]
    }
}
```
	
{{% todo %}} @tbd: 
check whether bug is fixed: 20190517:  Simon Nielsen [09:34 Uhr]
A) Yes that seem correct, we have a ticket to look over the permissions for applications that we will do asap. So assume you can access it and that it is correct @Christoph Albrecht (bearbeitet) 

@Simon: to be able to do this I need the permission I want to verify I have.

Issue: With the Oauth2 access token, access is denied, because the request requires user-management authorization (x-olt-permissions: ["tenant_user_management:read"]).

I have the feeling I’m in a circle: to check my app permissions I need permissions that I don’t have.

So in case access to an endpoint is denied, I can’t identify which endpoints I have permissions for.
{{% /todo %}}


