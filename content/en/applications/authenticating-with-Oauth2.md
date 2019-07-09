---
title: Authenticating with OAuth2
linktitle: Authenticating with OAuth2
description: Learn how we use OAuth2.
date: 2019-06-14
publishdate: 2019-06-14
categories: [applications]
keywords: [applications,user applications,background applications]
menu:
  docs:
    parent: "applications"
    weight: 04
weight: 04
sections_weight: 04
draft: false
aliases: [/applications/,/overview/quickstart/]
toc: true
---


To be able to actually use applications, perform two basic steps:

* Register your applications to the OLT platform.

	By registering your application to the OLT platform, you turn your application into an OAuth2 client authenticating via OpenID Connect.

* Implement OAuth2 in your application.

## Restrictions

For security reasons, custom applications are not allowed to use API endpoints related to **tenant management** and **user management**.

For more information, see [Troubleshooting Application Management](/applications/troubleshooting-application-management/).


## OAuth2

### Background 

To authenticate users and background applications, we use the OAuth2 protocol and OpenID Connect.

To access the OLT API, an OAuth2 access token is required.

To retrieve an OAuth2 access token, you need an OAuth2 client.

Without a registered application, access to the OLT API is not possible.

For more information about the OAuth2 protocol and OpenID Connect, see
 
* [RFC 6749 - The OAuth 2.0 Authorization Framework](http://tools.ietf.org/html/rfc6749) 
* [OpenID Authentication 2.0](https://openid.net/specs/openid-authentication-2_0.html).

### Permissions

We don't use the OAuth2 protocol to grant permissions to applications.

The application permissions are controlled by the user roles.

For more information, see [Managing Users](/users/managing-users/).

You can implement custom permission in your applications, assign them to custom user roles and use the OLT platform to verify the custom permissions.

For more information, see [Defining Custom Permissions and Roles](/applications/defining-custom-permissions/).

