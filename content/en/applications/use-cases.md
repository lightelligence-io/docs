---
title: Identifying Your Use Case
linktitle: Identifying Your Use Case
description: Check which kind of application you build and proceed accordingly.
date: 2019-06-14
publishdate: 2019-06-12
categories: [applications]
keywords: [customapplication,user application,background application]
menu:
  docs:
    parent: "applications"
    weight: 05
weight: 05
sections_weight: 05
draft: false
aliases: [/applications/,/overview/quickstart/]
toc: true
---


Choose an applications type depending on your use case, and off you go.

## Applications with User Interaction

To retrieve an OAuth2 access token, you can implement an OAuth2 client with or without OAuth2 client secret, depending on the application type:

* Web application running on a web server (in which the application source code is protected): Implement a confidential OAuth2 client with OAuth2 client secret.
* User agent application running in a browser (in which the application source code may be viewed), a JavaScript application, for example: Implement a public OAuth2 client without OAuth2 client secret.

For safety reasons, we recommend web applications using a backend service providing the OAuth2 client secret.
	
In this case, proceed with [Creating and Implementing Applications with User Interaction](/applications/registering-user-applications/).
	

## Background Applications without User Interaction

A background application is installed on the computer. 
	
Background applications are not connected to a user.
	
Create background applications for the following use cases, for example:

* A server running scheduled events fetching data from the OLT platform
* A background script fetching device data for all tenants which have installed an application, independent of users
* Slackbot or other notification applications
	
In this case, proceed with [Creating Background applications without user interaction](/applications/registering-background-applications/).