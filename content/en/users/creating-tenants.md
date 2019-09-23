---
title: Creating Tenants
linktitle: Creating Tenants
description: Create one or multiple tenants depending on your organizational structure or monitoring needs.
date: 2019-08-02
publishdate: 2019-08-02
categories: [users,tenants]
keywords: [tenant,users]
menu:
  docs:
    parent: "users"
    weight: 10
weight: 10
sections_weight: 10
draft: false
aliases: [/users/,/overview/quickstart/]
toc: true
---


## What's a Tenant?

A tenant is the owner of a system landscape.

As a tenant, assign users and roles to manage the system landscape composed of IoT devices.

{{% todo %}}@tbd: Who is supposed to create tenant, what's the typical role in the company?

@tbd: What prerequisites must be met: e.g. payment information I have to have at hand{{% /todo %}}

## Use Cases

Create multiple tenants in one of the following cases, for example:

* Your organization manages system landscapes for various customers. 
	Separate tenants help you facilitate the billing process.
* You manage system landscapes at different sites. 
	Separate tenants can help you to keep the overview of complex system landscapes and monitor devices more efficiently. 
	Alternatively, you can tag the devices according to their site.
* For reporting reasons, you want to assign tenants to cost centers.

{{% todo %}}@tbd: Where do I find information about how to be compliant with Osaram export regulation (managed in SAP GTS)?  {{% /todo %}}

## Creating A Tenant

**Procedure** 


1. Go to the OLT portal under [https://portal.lightelligence.io](https://portal.lightelligence.io). 

2. Choose **Register** and enter data as required.

3. In the e-mail you receive, activate your account.
 
4. On the **Welcome** page, choose **Create Tenant**.
 
5. Choose the appropriate plan according to your organizational needs and enter data as required:

	* **Tenant Name**: Indicate the location to be connected to the OLT platform, `Northern plant`, for example. 
	* **VAT Registration Number** {{% todo %}}@tbd: in a multi-tenency envoronemt, what must I know about the VAT no.? Will Osram check it in the public register?   {{% /todo %}} 
	* **Contact Person** {{% todo %}}@tbd: Which formal qualification must a contact person have to create a tenant; e.g., power of attorney (Prokura)?  {{% /todo %}} 

	{{< figure src="/images/users-create-tenant.png" caption="Creating a Tenant" alt="Creating a Tenant" >}}	

	The tenant is created.

	{{< figure src="/images/users-create-tenant-result.png" caption="Creating a Tenant: Result" alt="Creating a Tenant: Result" >}}	

6. Choose **Login with new tenant**.

**Result**

Your tenant is displayed. You can select it.

{{< figure src="/images/users-select-tenant.png" caption="Selecting a Tenant" alt="Selecting a Tenant" >}}	

Via the [OLT portal](https://portal.lightelligence.io), you have access to the OLT platform.

A user with `owner` role is created by default. <!-- todo 30 -->

**Next Steps**

Create users and assign the required roles to them: [Managing Users](/users/managing-users/).







