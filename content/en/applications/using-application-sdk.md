---
title: Developing Applications with the SDK 
linktitle: Developing Applications with the SDK
description: Use the Lightelligence Application SDK to develop custom applications.
date: 2019-06-14
publishdate: 2019-06-12
categories: [applications]
keywords: [customapplication,sdk]
menu:
  docs:
    parent: "applications"
    weight: 100
weight: 100
sections_weight: 100
draft: false
aliases: [/applications/,/overview/quickstart/]
toc: true
---

{{< todo >}}  @Jonathan, how would I proceed as a Lightelligence customer, step-by-step? {{< /todo  >}}

> @tbd, this chapter is a placeholder



## Installing the Lightelligence Demo App

Use: Get an idea what "applications" using the OLT API are. 

Procedure

1. Install node.js (if I don't have it already).

2. Install the @lightelligence/browser-sdk dependency. How exactly: `npm install git@bitbucket.org:lightelligence/lightelligence-demo-app.git` ?
	Result: As of now, I get "Could not install from "bitbucket.org:lightelligence\lightelligence-demo-app.git" as it does not contain a package.json file."
	Reason: I probably need the local private read access token to our npm, since the demo app is not public. When it's public, the customers won't need it, correct? 

3. Start the app: cd into /lightelligence-demo-app, `npm start`.

4. Open http://localhost:3000 to view it in the browser.
