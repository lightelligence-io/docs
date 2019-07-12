---
title: Defining Custom Permissions and Roles
linktitle: Defining Custom Permissions and Roles
description: Define custom permissions and roles, if required.
date: 2019-06-27
publishdate: 2019-06-01
categories: [applications]
keywords: [application,permission,custom role]
menu:
  docs:
    parent: "applications"
    weight: 400
weight: 400
sections_weight: 400
draft: false
aliases: [/applications/,/overview/quickstart/]
toc: true
---

Custom permissions allow you to use the OLT role management to control how users can use your custom applications.

How you design and implement custom permissions in a custom application depends on your user role concept. 

{{% todo %}}
**Example**

@tbd: @Jewgeni: give an example of what a customer wished to have custom permissions/roles for.
{{% /todo %}}

## How it Works

How does the custom roles mechanism work?

1. As an application developer, implement, in your custom application, permissions that a user must have to perform a specific activity.

2. As an application developer, create custom permissions corresponding to the permissions implemented in your custom application, in the OLT portal.

3. As a tenant, create custom roles based on the custom permissions.

4. As a tenant, assign the custom roles to users.

Result: When your custom application accesses the OLT platform, it can query for custom user permissions, based on the user's role.

Developing custom roles and developing custom creations are processes that are mutually dependent:

* You need an idea of user roles to be able to implement custom permissions in your custom applications accordingly.
* You need to have implemented and installed the custom applications to be able to register the custom permissions and custom roles in the OLT platform.
 

## Creating a Custom Permission

**Prerequisites**

* As the application developer, you have implemented custom permissions in your user application.

* You have registered your custom application to the OLT platform.

	For more information, see [Registering and Implementing User Applications](/applications/registering-user-applications/).
	
	Background applications don't have users. Therefore, you can't control them via custom permissions/roles.


**Procedure**

1. Log on to the OLT portal as an application developer.

2. Under **Developer Area**, obtain the authentication token.

3. Optional: To identify the application ID, make a `GET` request to the [`/application-developer/applications`](https://api.lightelligence.io/v1/api-collection/#tag/application-developer/paths/~1application-developer~1applications/get) endpoint. 

4. To create a custom permission, make a `POST` request to the [`/application-developer/applications/{applicationId}/custom-permissions`](https://api.lightelligence.io/v1/api-collection/#tag/roles-and-permissions/paths/~1application-developer~1applications~1{applicationId}~1custom-permissions/post) endpoint.

	{{% todo %}}@Lars: endpoint not yet published yet @tbd: verify link {{% /todo %}}

	Specify the following properties:
	
	* `alias`: Enter, for example, the technical name of the custom permission implemented in your custom application.
	* `category`: Describe, for example, the resource the custom permission is associated with.  
	* `name`: Enter a name.
	* `description`: Describe the activity the custom permissions allows to perform.

	```curl
	curl -X \
	POST https://api.lightelligence.io/v1/application-developer/applications/{applicationId}/custom-permissions \
	-H 'Authorization: Bearer {authenticationToken}' \
	-H 'Content-Type: application/json' \
	-d '{
		"alias": "sample-resource:read",
		"category": "Sample resource",
		"name": "Read sample resource",
		"description": "Allows to read the sample resource."
		}'
	```

	You get a response such as the following:
	
	```json
	{
		"data": {
			"id": "2429c9d1-8f56-43a8-9813-c3ae94853aaf",
			"applicationId": "6f23aca9-9f53-4465-87e1-b580cf497cda",
			"alias": "sample-resource:read",
			"name": "Read sample resource",
			"description": "Allows to read the sample resource.",
			"category": "Sample resource",
			"createdAt": "2019-05-27T12:22:15.681Z",
			"updatedAt": "2019-05-27T12:22:15.681Z"
		}
	}
	```
	


## Creating and Assigning a Custom Role

As a tenant, create a custom role and assign the custom application permission(s). Assign the role to users.

**Prerequisites**

* You have `owner` authorization.
* You have installed an application with custom permissions.

	Custom permissions of a custom application can only be assigned to custom roles if the custom application is installed.

**Procedure**

1. Log on to the OLT portal as a user with `owner` authorization.

2. Under **Developer Area**, obtain the authentication token.

3. Optional: To identify the application ID of the custom application and to verify it's installed, make a `GET` request to the [/applications](https://api.lightelligence.io/v1/api-collection/#tag/applications) endpoint.

	To only list installed applications, use the corresponding search parameter: `/applications?installed=true`.

4. To identify the ID of the custom permission(s) associated with the application, make a `GET` request to the [`/applications/{applicationId}/custom-permissions`](https://api.lightelligence.io/v1/api-collection/#tag/applications/paths/~1applications~1{applicationId}~1custom-permissions/get) endpoint.

	{{% todo %}}@Lars: endpoint not yet published yet @tbd: verify link {{% /todo %}}

5. To create a role, make a `POST` request to the [`/roles`](https://api.lightelligence.io/v1/api-collection/#tag/roles-and-permissions/paths/~1roles/post) endpoint.
	
	Post the
	* role name and a description of its use 
	* custom permission ID(s)

	In our example, the device manager has write and read authorization. In other use cases, it might make sense to differentiate between roles that have read/write authorization and read-only authorization only. 

	```curl
	curl -X POST \
		https://api.lightelligence.io/v1/roles \
		-H 'Content-Type: application/json' \
		-H 'Authorization: Bearer {authenticationToken}' \
		-d '{
			"name": "Device Manager",
			"description": "Manages devices with write permission",
			"customPermissions": [
				{ "id": "2429c9d1-8f56-43a8-9813-c3ae94853aaf" },
				{ "id": "9ecebed0-804c-11e9-b475-0800200c9a66" }
		]
	}'
	```

	You get a response such as the following, containing the role ID:
	
	```json
	{
		"data": {
			"id": "8be5ebd5-b8b3-4d25-98ec-4d42f45154c9",
			"name": "Device manager",
			"displayName": "Device Manager",
			"description": "Manages devices with read and write permission",
			"locked": false,
			"usersCount": 0,
			"createdAt": "2019-05-28T12:00:50.289Z",
			"updatedAt": "2019-05-28T12:00:50.289Z",
			"permissionIds": [],
			"customPermissionIds": [
				"2429c9d1-8f56-43a8-9813-c3ae94853aaf",
				"9ecebed0-804c-11e9-b475-0800200c9a66"
			]
		}
	}
	```
6. To identify the user IDs of user assigned to a tenant, make a `GET` request to the [`/tenants/{tenantId}/users`](https://api.lightelligence.io/v1/api-collection/#tag/user-management/paths/~1tenants~1{tenantId}~1users/get) endpoint.

7. To assign the custom role to a user, make a `PUT` request to the [`/tenants/{tenantId}/users/{userId}/roles`](https://api.lightelligence.io/v1/api-collection/#tag/user-management/paths/~1tenants~1{tenantId}~1users~1{userId}~1roles/put) endpoint.

	```curl
	curl -X PUT \
		https://api.lightelligence.io/v1/tenants/{tenantId}/users/{userId}/roles \
		-H 'Content-Type: application/json' \
		-H 'Authorization: Bearer {authenticationToken}' \
		-d '{
			"id": "8be5ebd5-b8b3-4d25-98ec-4d42f45154c9"
			}'
	```

	`Status 204` means the user's roles are updated and the custom role is assigned.
	
	{{< figure src="/images/users-assign-custom-role.png" caption="Assigning a Custom Role" alt="Assigning a Custom Role" >}}

	
8. Optional: Verify the roles assigned to users:

	* To list the roles assigned to a user, make a `GET` request to the [`/tenants/{tenantId}/users/{userId}/roles`](https://api.lightelligence.io/v1/api-collection/#tag/user-management/paths/~1tenants~1{tenantId}~1users~1{userId}~1roles/get) endpoint.	

		In our example, you get the following response:
		
		```json
		{
			"meta": {
				"page": 0,
				"pageSize": 10
			},
			"data": [
				{
					"id": "8be5ebd5-b8b3-4d25-98ec-4d42f45154c9",
					"name": "Device manager",
					"displayName": "Device Manager",
					"description": "Manages devices with read and write permission",
					"locked": false,
					"usersCount": 1,
					"createdAt": "2019-05-28T12:00:50.289Z",
					"updatedAt": "2019-05-28T12:00:50.289Z",
					"permissionIds": [],
					"customPermissionIds": []
				}
			]
		}
		```
		
	* To list the users assigned to a role, make a `GET` request to the [`/roles/{roleId}/users`](https://api.lightelligence.io/v1/api-collection/#tag/user-management/paths/~1roles~1{roleId}~1users/get) endpoint.	


## Maintaining Custom Permission Properties

### Changing the Category and Description

As a tenant, make a `PATCH` request to the [`/roles/{roleId}`](https://api.lightelligence.io/v1/api-collection/#tag/roles-and-permissions/paths/~1roles~1{roleId}/patch) endpoint.

### Changing the Name or Alias

Once a custom permission is created you can't change its name or alias. 

This is to avoid any manipulation of a permission by the developer after it has been assigned by an application user. 

To change name or alias, do the following:

1. As an application developer, create a new custom permission.

2. As a tenant, to assign the newly created custom permission, make a `PATCH` request to the [`/roles/{roleId}`](https://api.lightelligence.io/v1/api-collection/#tag/roles-and-permissions/paths/~1roles~1{roleId}/patch) endpoint.

3. As an application developer, to delete the obsolete custom permission, make a `DELETE` request to the [`/application-developer/applications/{applicationId}/custom-permissions/{permissionId}`](https://api.lightelligence.io/v1/api-collection/#tag/roles-and-permissions/paths/~1application-developer~1applications~1{applicationId}~1custom-permissions~1{permissionId}/delete) endpoint. 

	{{% todo %}}@Lars: endpoint not yet published yet @tbd: verify link {{% /todo %}} 

	`Status 204` means the custom permission has been deleted.
	
	{{< figure src="/images/users-assign-custom-role.png" caption="Deleting a Custom Permission" alt="Deleting a Custom Permission" >}}

4. Optional: As an application developer, to verify the custom permission has been deleted, make a `GET` request to the [`/application-developer/applications/{applicationId}/custom-permissions`](https://api.lightelligence.io/v1/api-collection/#tag/roles-and-permissions/paths/~1application-developer~1applications~1{applicationId}~1custom-permissions/get) endpoint.
	

When you delete a custom application with custom permissions or a custom permission, the custom permissions are removed from any role to which they were assigned.



