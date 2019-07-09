
---
title: Managing Users
linktitle: Managing Users
description: Create users and assign the roles required. Define who is authorized to perform which activities in a tenant.
date: 2019-06-01
publishdate: 2019-06-01
categories: [users,roles]
keywords: [roles,users]
menu:
  docs:
    parent: "users"
    weight: 20
weight: 20
sections_weight: 20
draft: false
aliases: [/users/,/overview/quickstart/]
toc: true
---

## Understanding the Role Concept

When creating a tenant, a default user is created whose role is `owner`.

The owner owns the tenant and has no restrictions in the OLT portal. 

Owners can assign the following roles to users:

* A `writer` is not authorized to manage the tenant data. 

	Writers can, for example
	* develop applications
	* manage the solution by defining device types or creating devices
		
* A `reader` is not authorized to manage the solution.  Readers can read data, for example.

As the owner, you have, for example, the following options:

* Create additional owners to manage the tenant.

	To do so, invite a user and assign the `owner` role.

* Invite users and assign roles
* Assign users to a tenant
* List the tenants assigned to a user

The `owner` role implies the `writer` role permissions. The `writer` role implies the `reader` role permissions.

---

**Note**

**Restricted owner permissions in custom applications**

For security reasons, unrestricted access as an `owner` is only possible in the OLT portal.

If you develop *custom* applications, you can't access endpoints related to user management even if your user has the `owner` role.

For more information, see [Developing Custom Applications](/applications/).

---


## Inviting Users

As the tenant owner, create new users by inviting them to the tenant.

**Prerequisites**

To be able to accept your invitation, users must have created an account in the portal.

**Procedure**

1. If the user is new to the OLT platform, ask the user to create an account, to be able to accept the invitation. 
	
	To do so, ask the user to go to https://portal.lightelligence.io and choose **Register**. 
2. In the OLT portal, choose **Users**.
3. Choose **Invite User**.
4. Enter data as required.
5. To confirm, choose **Invite to tenant**.


**Result**

The invited user appears on the **Pending** tab.

The user receives an invitation e-mail with a link directing to the OLT portal. 

On logging on to the portal, the user is asked to accept the invitation.


## Assigning or Changing Roles

As a user with the `owner` role, assign roles to users or change the roles.

**Procedure**

1. As a user with `owner` authorization, log on to the OLT portal.

2. To edit the roles, click the user.

	You go to the **Edit User** window.

3. Select the required roles and confirm.












