---
title: Considering Security 
linktitle: Considering Security
description: Enable two-factor authentication. Monitor user activities via the audit log.
date: 2019-08-02
publishdate: 2019-08-02
categories: [users]
keywords: [security,authentication,users,GDPR,General Data Protection Regulation]
menu:
  docs:
    parent: "users"
    weight: 100
weight: 100
sections_weight: 100
draft: false
aliases: [/users/]
toc: true
---

## Enabling Two-Factor Authentication

We recommend using two-factor authentication.

**Procedure**

As a user, proceed as follows: 

1. Choose **Profile**.
	{{< figure src="/images/users-open-profile.png" caption="Editing the Profile Settings" alt="Editing the Profile Settings" >}}

2. On the **Two-Factor Authentication** tab, follow the instructions.

{{% todo %}} @Sebastian: The function makes more sense if the tenat is able to enforce an authentication policy or at least is able to 
monitor which users have activated 2FA already, see https://lightelligence.atlassian.net/browse/OLT-5653 {{% /todo %}}

## Downloading the Audit Log

As a tenant, to comply with the General Data Protection Regulation (GDPR), you can download an csv file logging tenant-related user activities.

Audit message example: 

> User tom.tester@example.com (ID 1a7db926-e0fa-459f-ba91-7390f03b6688) accepted the invite to 'Central Plant' (ID e6a3d2ef-16f7-4d50-883f-5b17a5def7ae).


{{% todo %}} @Sebastian: Clarify Use case and tragte group {{% /todo %}}

**Procedure**

Under **Details**, choose **Download Audit Log as CSV**.

{{< figure src="/images/users-download-audit-log.png" caption="Downloading the Audit Log" alt="Downloading the Audit Log" >}}



