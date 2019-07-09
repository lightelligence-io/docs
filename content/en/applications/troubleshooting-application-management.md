---
title: Troubleshooting Application Management
linktitle: Troubleshooting Application Management
description: Resolve typical issues when developing custom applications.
date: 2019-06-27
publishdate: 2019-06-01
categories: [applications]
keywords: [application,troubleshooting,issues]
menu:
  docs:
    parent: "applications"
    weight: 60
weight: 60
sections_weight: 60
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

If you need to develop custom applications that use endpoints related to user management, contact our OLT support under <contact@lightelligence.io>. <!-- todo 10-->

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
	
<!-- todo 20 -->


