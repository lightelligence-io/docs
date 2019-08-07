---
title: Testing Shortcodes 2
description: Test page for Hugo functions
date: 2019-06-14
categories: [getting-started]
keywords: [installation,Raspberry]
menu:
  docs:
    parent: "getting-started"
    weight: 5
weight: 5
sections_weight: 5
draft: false
toc: true
tags: [shortcodes]
---

## Todo

{{% todo %}}Text in the todo shortcode is not rendered in HTML! {{% /todo %}}

## Syntax Highlighting

### As markdown

```js
grunt.initConfig({
  assemble: {
    options: {
      assets: 'docs/assets',
      data: 'src/data/*.{json,yml}',
      helpers: 'src/custom-helpers.js',
      partials: ['src/partials/**/*.{hbs,md}']
    },
    pages: {
      options: {
        layout: 'default.hbs'
      },
      files: {
        './': ['src/templates/pages/index.hbs']
      }
    }
  }
};
```

```php
<!DOCTYPE html>
<html>
<body>

<?php
$color = "red";
echo "My car is " . $color . "<br>";
echo "My house is " . $COLOR . "<br>";
echo "My boat is " . $coLOR . "<br>";
?>

</body>
</html>
```


### Code Toggle

1. 1

	{{< code-toggle file="config" >}}
	googleAnalytics = "UA-123-45"
	{{</ code-toggle >}}

2. 2

	{{< _div-shortcode file="config" >}}
	test
	{{</ _div-shortcode >}}
	
3. 3.

### With shortcode code, to display copy to clipboard button

Requires file name to show copy-to-clipboard button

{{< code file="layouts/partials/related.html" >}}

< code file="layouts/partials/related.html" >

{{% /code %}}

### With shortcode highlight

{{< note   >}} The shortcode highlight requires a language to be specified.{{< / note >}}

{{< note   >}} The shortcode highlight requires e.g. "curl" as language attribute toallow  `\` to indicate line breaks in a command. {{< / note >}}

{{< highlight curl  >}}
mosquitto_pub -h mqtt.lightelligence.io \  
  -p 8883 --cert device_cert.pem --key device_key.pem \
  -d -t data-ingest  \
{{< / highlight >}}

{{< highlight sh  >}}
highlight sh, for example
{{< / highlight >}}

{{< highlight json  >}}
{JSON, for example}
{{< / highlight >}}

#### JSON

{{< highlight json  >}}
	{
		"data": [
			{
				"id": "72fac0d5-fe32-4599-8f9c-a033e42faaa9",
				"email": "John.Doe@example.com",
				"firstName": "John",
				"lastName": "Doe",
				"userRoles": [
					{
						"id": "3100bdf8-90d9-471d-86ae-f7ba9eff0a86",
						"name": "owner",
						"displayName": "Owner",
						"description": "Default owner role with full access to all resources.",
						"locked": true
					}
				]
			}
		],
		...
		}
	}
{{< / highlight >}}

#### JAVA

{{< highlight java  >}}

var token = '{TOKEN}';
var tenantId = '{tenantId}';
var userId = '{userId}';

var apiUrl = 'https://api.lightelligence.io/v1/tenants/' + tenantId + '/users/' + userId;

var headers = {
  'Authorization': 'Bearer ' + token,
  'Cache-Control': 'no-cache',
  'Content-Type': 'application/json'
};
{{< /highlight >}}

#### With numbered lines

Note: the border disappears and the block doen't expand on hovering over it

{{< highlight java "linenos=table,linenostart=1" >}}
var token = '{TOKEN}';
var tenantId = '{tenantId}';
var userId = '{userId}';

var apiUrl = 'https://api.lightelligence.io/v1/tenants/' + tenantId + '/users/' + userId;

var headers = {
  'Authorization': 'Bearer ' + token,
  'Cache-Control': 'no-cache',
  'Content-Type': 'application/json'
};
{{< / highlight >}}


#### cURL

{{< highlight cURL  >}}
curl -X GET \
  https://api.lightelligence.io/v1/users/{userId}/tenants \
  -H 'Authorization: Bearer {TOKEN}' \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json'
{{< / highlight >}}

## Notes

### Note with `<hr>`

1. List item 1.

	---
	
	**Note**
	
	Note text.
	
	---

2. List item m

### Notes normal

{{% note "Lazy Blogger"%}}
If all you want is a simple menu for your sections, see the ["Section Menu for Lazy Bloggers" in Menu Templates](/templates/menu-templates/#section-menu-for-lazy-bloggers).
{{% /note %}}


### Note in list, as table

1. List item `1.`

	{{% note-in-list Tip %}}
	If all you **want** is a simple link, see [Link](/getting-started/testing-shortcodes/).
	But with `{{ .Inner | markdownify }}` it won't work.
	The note text is highlighted as code. 
	With `{{ .Inner  }}` the layout is OK but the link and the **bold** characters are not rendered/markdownified.
	{{% /note-in-list %}}

2. List item `2.`

### Note in list, with horizontal rule

1. List item `1.`

	{{% note-in-list-hr Tip %}}
	If all you **want** is a simple link, see [Link](/getting-started/testing-shortcodes/).
	But with `{{ .Inner | markdownify }}` it won't work.
	The note text is highlighted as code. 
	With `{{ .Inner  }}` the layout is OK but the link and the **bold** characters are not rendered/markdownified.
	{{% /note-in-list-hr %}}

2. List item `2.`

## Note as table, not indented

{{% note-in-list Tip %}}
If not indented, the note layout and markdown is fine:
 
If all you **want** is a simple link, see [Link](/getting-started/testing-shortcodes/).
{{% /note-in-list %}}

## Built-in note shortcode

{{% note  %}}
The built-in note shortcode.
{{% /note %}}

## Code

### Code in Normal Text

{{< code file="https://api.lightelligence.io/v1/api-collection/#tag/users/paths/~1users~1{userId}/get" >}}
some sample code
{{< /code >}}

### Code in List

1. Lorem.

	{{< code file="layouts/partials/related.html" >}}
	some sample code
	{{< /code >}}

2. Ipsum.


## Setting Up Your Raspberry Pi 

**Prerequisites**

You have

* a Raspberry Pi with an SD card
* an SD card reader

   {{% _myshortcode color="blue" %}}
   This quick start uses `macOS` in the examples. For instructions about how to install Hugo on other operating systems, see [install](/getting-started/installing).

   It is recommended to have [Git installed](https://git-scm.com/downloads) to run this tutorial.
   {{% /_myshortcode %}}

**Procedure**

1.  List item 1

    Text before quote block.

    > Quote block in list item 1

    Text after quote block.
2.  List item 2

    Text before quote block.

    > Quote block in list item 2

    Text after quote block.
3.  List item 3

    Text before quote block.

    > Quote block in list item 3

    Text after quote block.

4. Lorem ipsum dolor sit amet, consetetur sadipscing elitr.

{{% tip %}}Test{{% /tip %}}
  
5. Lorem ipsum dolor sit amet, consetetur sadipscing elitr.

	> Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.

	> At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.

6. Lorem ipsum dolor sit amet, consetetur sadipscing elitr.

	> Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.

	> At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.    

2. Treas em wankeing ont sime ploked peish rof phen sumbloat syug si phat phey gavet peish ta paat ein pheeir sumbloats.

	{{% note %}}
	Standard Hugo Note

	{{% /note %}}

3. Lorem ipsum dolor sit amet, consetetur sadipscing elitr.

	{{< highlight javascript >}} Some code {{< /highlight >}}
	
4. Lorem ipsum dolor sit amet, consetetur sadipscing elitr.

	Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
	
5. Lorem ipsum dolor sit amet, consetetur sadipscing elitr.

6. Choose **Register** and enter data as required.

7. In the e-mail you receive, activate your account.

	You go to the Welcome page.
	
	{{< figure src="/images/getting-started-welcome.png" caption="Welcome to the LIGHTELLIGENCE® Portal!" alt="Welcome to the LIGHTELLIGENCE® Portal!" >}}

8. Choose **Create Tenant**.


9. Choose the **Free / Starter** plan and enter data as required.

	---

	**Note**

	You need a tenant name or ID in the subsequent process.<br>

	To *test* the OLT platform within the free plan, for the sake of our example, enter some random data.<br>
   
	To create an *actual account*, familiarize yourself with the multi-tenancy concept and create multiple tenants if required.
   
	For more information, see [Creating Tenants](/users/creating-tenants/).

	---


	The tenant is created.
	
	{{< figure src="/images/users-create-tenant-result.png" caption="Creating a Tenant: Result" alt="Creating a Tenant: Result" >}}	

10. Choose **Login with new tenant**.

{{< code file="layouts/partials/related.html" >}}
{{ $related := .Site.RegularPages.Related . | first 5 }}
{{ with $related }}
<h3>See Also</h3>
<ul>
	{{ range . }}
	<li><a href="{{ .RelPermalink }}">{{ .Title }}</a></li>
	{{ end }}
</ul>
{{ end }}
{{< /code >}}


**Result**
	
Your physical device is running and ready to get connected to the OLT platform.



{{% note-in-list %}}
   This quick start uses `macOS` in the examples. For instructions about how to install Hugo on other operating systems, see [install](/getting-started/installing).

   It is recommended to have [Git installed](https://git-scm.com/downloads) to run this tutorial.
   
   {{< figure src="/images/getting-started-welcome.png" caption="Welcome to the LIGHTELLIGENCE® Portal!" alt="Welcome to the LIGHTELLIGENCE® Portal!" >}}
   {{% /note-in-list %}}



## Step 1: Install Hugo

{{% note %}}
`Homebrew`, a package manager for `macOS`,  can be installed from [brew.sh](https://brew.sh/). See [install](/getting-started/installing) if you are running Windows etc.
{{% /note %}}



To verify your new install:

```bash
hugo version
```
