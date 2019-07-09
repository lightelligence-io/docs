---
title: "Managing Tenants"
date: 2019-05-10
draft: true
weight: 30
---



# Assigning a User to a Tenant

Assign an existing tenant to a user.

If you created a tenant you are already assigned to it, in this way you don't need to execute this step for the owner user. 


<!-- todo 10 Assigning a User to a Tenant #tbd: What's the use case? 
The process seems to imply I can manage the users in the platform independent of tenants. Explain!
-->

**Procedure**

Use the API endpoint `/tenants/{tenantId}/users/{userId}`. 

Just replace the placeholders with the `userId` you want to assign and your `tenantId`:

cURL:

```
curl -X PUT \
  https://api.lightelligence.io/v1/tenants/{tenantId}/users/{userId} \
  -H 'Authorization: Bearer {TOKEN}' \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json'
```

Java:

```java

var token = '{TOKEN}';
var tenantId = '{tenantId}';
var userId = '{userId}';

var apiUrl = 'https://api.lightelligence.io/v1/tenants/' + tenantId + '/users/' + userId;

var headers = {
  'Authorization': 'Bearer ' + token,
  'Cache-Control': 'no-cache',
  'Content-Type': 'application/json'
};

var options = {
  method: 'PUT',
  cache: 'no-cache',
  headers: headers
};

fetch(apiUrl, options)
  .then(res => res.json())
  .then(json => console.log(json));
```

**Result**

You receive an HTTP response with the code `204 No Content`.

## Identifying the Tenants Assigned to a User
 
To list the tenant currently assigned to a user, make a `GET` request to the `v1/users/{userId}/tenants`endpoint.

Currently, only one tenant per user is allowed.

<!-- @tbd: Am I supposed to do this as an OWNER exclusively, or also as writer or reader? -- what would be the use case? -->

**Procedure**

1. In the OLT portal, identfy the user ID. <!-- @Gropius: I don't find the idea neither und Developer Area nor under Users. -->

	---
	
	Alternatively, decode your access token with a jwt library in your code and take the sub property, which is your userId, from the decoded data section.
	
	<!-- @tbd: find out how exactly it is to be done -->
	
	---
   
2. Insert the `userId`:

	cURL:
	
	```
	curl -X GET \
	 https://api.lightelligence.io/v1/users/{userId}/tenants \
	 -H 'Authorization: Bearer {TOKEN}' \
	 -H 'Cache-Control: no-cache' \
	 -H 'Content-Type: application/json'
	```

	Java:
	
	```java
	var token = '{TOKEN}';
	var userId = '{userId}';
	var apiUrl = 'https://api.lightelligence.io/v1/users/' + userId + '/tenants';

	var headers = {
		'Authorization': 'Bearer ' + token,
		'Cache-Control': 'no-cache',
		'Content-Type': 'application/json'
		};

	var options = {
		method: 'GET',
		headers: headers,
		};

	fetch(apiUrl, options)
		.then(res => res.json())
		.then(json => console.log(json));
	```

**Result**

You get a response similar to this:

```
{
  "meta": {
    "page": 0,
    "pageSize": 10
  },
  "data": [
    {
      "id": "546acca5-796c-4d48-9873-cd5ae261098b",    <!-- @Feynman: the parametes should be more meaningful: userID, tenantName
      "name": "My Corporation",
      "role": "owner"
    }
  ] 
}
```

<!-- todo 10: list tenants -->




