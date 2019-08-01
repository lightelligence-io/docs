# docs

This is the source of the documentation website including related files.

This document documents how to install Hugo and how we customized the `gohugoioTheme` theme on which our layout is based upon.

# Generating the Documentation with Hugo

## Local Server

Dynamicylly generating the web site on a local server allows you to review layout changes while you perform them. The server listens to your changes.

1. To install Hugo, follow the instructions under https://gohugo.io/getting-started/installing.
2. Clone the repository and cd into the current directory (\lightelligence-io\docs).
3. Execute `hugo server`.
	
	Hugo builds the site running on a local server. 
	
	
	The web Server is available at http://localhost:1313/ (bind address 127.0.0.1)
	
	
4. To display the web site, enter `http://localhost:1313/` in the address field of your browser.


## Publishing HTML

Execute `hugo`.

A `\lightelligence-io\docs\public` directory is built, containing the HTML stuff including, for example the `index.json` search index file.

#Customizing the Layout

Our layout as of 20190710 is based on the original Hugo theme, but customized, as specified in the config.toml file: theme = ["hugo-search-fuse-js","gohugoioTheme_custom" ,  ] (git@github.com:gohugoio/gohugoioTheme.git)

The search engine we employ is `https://fusejs.io/`.

In general, the layout is based on http://tachyons.io/ classes.

To customize the layout, check the following items:

## Basic Configuration

Basic Configuration is done in `\config.toml` and `\config\_default\params.toml`.

Markdown rendering options can be configured in `\content\en\readfiles\bfconfig.md`. We use them as is.

## Stylesheet

### General

See `\themes\gohugoioTheme_custom\assets\output\css\app.css`.

In `\themes\gohugoioTheme_custom\layouts\_default\baseof.html`, the basic page template, find the stylesheet referenced:

    {{ $stylesheet := resources.Get "output/css/app.css" | minify | fingerprint }}
    {{ with $stylesheet }}
      <link rel="stylesheet" href="{{ .Permalink | relURL }}" integrity="{{ .Data.Integrity }}" crossorigin="anonymous"> 
      {{ $.Scratch.Set "stylesheet" . }}    
    {{end}}

`app.css` is identical with `main.css`. `main.css` has no impact.

### Customizations


#### Accent color

We have changed, for example accent-color orange-red #ff4500, affecting the sidebar menu.


#### Nested block quotes

In C:\Users\chalb\Desktop\Osram\hugo-master_ia_fuse-search\themes\gohugoioTheme_custom\assets\output\css\app.css, change margin to 0:

```
.nested-blockquote blockquote {
  border-left: 4px solid #0594CB;
  padding-left: 1em;
  margin: 0;
  /*margin: 0;*/
```

## Notes

To be done: 

* Find a way to indent notes properly. At the moment it isn't possible: see https://discourse.gohugo.io/t/put-a-blockquote-into-a-numbered-list/19339/9
* Create shortcodes for notes using font-awsome exclamation circles, for example

See our test topic with some attempts to find a appropriate layout for notes:  http://localhost:1313/getting-started/testing-shortcodes/#notes (https://mangogul.bitbucket.io/getting-started/testing-shortcodes/#notes-normal)


Our workaround for nested notes is to use an adapted `<hr>` element. 



In `app.css`, we have adapted the horizontal ruler as follows:

```
hr {
  -webkit-box-sizing: content-box;
          box-sizing: content-box; /* 1 */
  height: 0; /* 1 */
  overflow: visible; /* 2 */
  border: 2px solid; /* 2px to use <hr> for nested/indented notes */
  border-color: #ff6300; /* lightblue (#96ccff) to use <hr> for nested/indented notes;    Orange: #ff6300 */
}

```

So the horizonatl ruler

<hr>

appears as an orange line.


## Customize hugoioTheme

### Twitter 

Switch on/off Twitter/github: in sit-nav.html integrate partial `social-follow.html`.

```
<span class="absolute mt1 mt2-l pr3 right-0 top-0">
	{{- partialCached "social-follow.html" . -}}
</span>
```

### Switching on/off the "Improve Page" Button

We have switched off „Improve this page“ button for user feedback: {{ partial "page-edit.html" . }}. Might be useful later.

To switch off, outcomment {{ partial "page-edit.html" . }} in \gohugoioTheme_custom\layouts\_default\single.html 

### Inviting contributors

If desired, we can adjust and use the following partial as a template to invite contributors to Lightelligence:

`\themes\gohugoioTheme_custom\layouts\partials\home-page-sections\open-source-involvement.html`


### Customizing the Landing Page


* Layout of the introduction text with the get started button: `\themes\gohugoioTheme_custom\layouts\partials\hero.html`
* Layout of the overview flex boxes: partial `\themes\gohugoioTheme_custom\layouts\partials\pagelayout_landingpage.html`
* Main template, containing also the text below the hero: `\themes\gohugoioTheme_custom\layouts\index.html`
* Text content: `\content\en\_index.md`

To adjust the order how the flex boxes are arranged, in the `_index.md` corresponding to the section, adust the `weight` parameter.

### Controlling the vertical navigation

To include new topics (.md files) in nav: 

1. In config.toml, add [[menu.docs]] item.

2. In `\config\_default\menus\menus.en.toml`, add [[docs]] item.

3. In `_index.md` adjust the following.

menu:
  docs:
    parent: "applications"
    weight: 04   <!-- Control the relative position in vertical navigation -->
weight: 04 <!-- Control the relative position flex boxes in overview pages -->
sections_weight: 04




### Customizing the Release Notes Page

In `\themes\gohugoioTheme_custom\layouts\news\single.html`template, switch on/off the date, link to a download page, for example. See comments in the file.



### Adjusting the Horizontal Navigation

Partial `\themes\gohugoioTheme_custom\layouts\partials\navtop.html`

### Adjusting Product  name LIGHTELLIGENCE® 

* Partial `sitenav.html`
* `\config.toml` and `\config\_default\config.toml`


### Adjusting Copyright, Imprint

partial `\themes\gohugoioTheme_custom\layouts\partials\site-footer.html`

To be done, if required: 

* Include EU GDPR banner? 
* Clarified if, in `\themes\gohugoioTheme_custom\layouts\_default\baseof.html`, robots are to be switched off. See <META NAME="ROBOTS" CONTENT="INDEX, FOLLOW">



## Implementing and customizing Fuse Search

How we implemented it in Hugo:

### 1. Adjust Config

1.	In themes, add hugo-search-fuse-js
2.	In config.tomls add 
	a.	`theme =[ "hugo-search-fuse-js", "gohugoioTheme_custom"]`
	b.	`home = [ "HTML", "RSS", "REDIR", "HEADERS", "JSON" ]`
3.	In search.md, add `outputs = ["html", "json"], layout = "search"`
4.	`[[menu.docs]] identifier = "search"`


### 2. Config JSON

`\themes\hugo-search-fuse-js\layouts\_default\search.json`

### 3. Create Partial 

In `\lightelligence-io\docs\themes\gohugoioTheme_custom\layouts\partials`, create `{{ partial "site-search-fuse.html" }}`.

### 4. Config Search Template

In `\themes\hugo-search-fuse-js\layouts\_default`, adapt `search.json`.

### 5. Adjust Search Page Content

In `\content\en\search\_index.md`, add to frontmatter:

```
outputs: ["html", "json"]
layout: search
```

### 6. Edit Search Script

E.g. note on „no results found“

See `\themes\hugo-search-fuse-js\static\js\search.js`.

### 7. Adjust Search Result Layout

•	In `\themes\gohugoioTheme_custom\layouts\partials\page-layout-search`, define width of search result content: `<article class="w-50"`
•	`Search.js`: `const summaryInclude=100; (default = 60)` // How many characters to include on either side of match keyword




# Editing Content

## Using this style guide

This styleguide describes the Markdown syntax used in our documentation and how the syntax is associated with specific functional units.

## Functional Units

Technical writers decompose information into functional units. In linguistic terms: Each functional unit corresponds to a specific "speech act".

Each functional unit answers a specific user question. 

We assign each functional unit to a certain layout and formulation pattern. This ensures a documention composed of multiple documents is consistent. Consistency makes it easier for the users to digest the content.

The document type defines the sequence of fiunctional units, in what logocal order they are supposed to appear. 

### Document Type "Task"


We compose a task of the the following functional units. 

To be done: adjust the following tabular overview.

<!-- To left-align tables, make sure the dashed line is flush with the header text on the right side 
but extends beyond it on the left, the column is right-aligned. Requires Extension: simple_tables -->

|  Name |  Function |  Formulation Pattern |  Keyblock Heading |  Required
| ----- | --------- | -------------------- | ----------------- | ---------|
| Goal | What goal can I achieve? |  Gerund, in capital letters: e.g. "Installing X" | Heading 1 (`# Heading`) | Mandatory
| Advance Organizer (use case) | In what case do I have to perform the activity? Why is it required or useful? | Imperative sentence at the beginning, often with the conjunction "to" ("in order to), to express the purpose: "To create users automatically, use an API call instead of the OLT portal." Indicative sentences with more background info, as required. | - | Mandatory
| Prerequisites | To be able to perform the activity, what must I have done before? | Bulleted list (bullet format = `* [x]`, to appear as a checked checkbox), e.g. "You have created a tenant." | "Prerequisites" (`## Prerequisites {-}`) | Optional
| Procedure | What steps do I have to perform to achieve my goal? | Ordered list composed of imperative sentences (steps): "Click `Save`." | "Procedure" (`## Procedure {-}`) | Mandatory
| Result | How can I check whether I have performed the step or procedure correctly? | Declarative sentence: "A message appears." | "Result" (`## Result {-}`). Put a *step* result simply in a separate paragraph. |  Optional


---

**Note**

**Formatting the keyblock headings**

We don't want the keyblock heading to be numbered. So, the `{-}` (equalling `{.unnumbered}`) is to ensure the keyblock is not numbered if we decide to use numbered headings in the future.

The keyblock heading level depends on the context. If the topic heading is `#`, we use `##`, etc.

---



### Document Type "Concept"

Includes glossary, consisting of glossterm and glossdef

@tbd create glossary and links: issue: how to include definition list items in a text?

### Document Type "Reference"

@tbd

## Markup

### Paragraph Markup

### Code blocks


We currently use 2 code block languages: `` ```sh ...``` (Code Block Example SSH) `` and  `` ```javascript …``` `` (Code Block Example Javascript).

#### Code block without language specification, indented

      ```
      -----BEGIN CERTIFICATE-----
      MIICBzCCAaygAwIBAgIBADAKBggqhkjOPQQDAjBcMQswCQYDVQQGEwJERTEOMAwG
      ...
      NwryIKRR9fgCIQDKqKmKv1STjPEePu4NL2YEqsVauaVl4CVQIYVjEwN3cw==
      -----END CERTIFICATE-----
      ```

#### Code Block Example SSH

```sh
url -X PUT \
  https://api.lightelligence.io/v1/tenants/{tenantId}/users/{userId} \
  -H 'Authorization: Bearer {TOKEN}' \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json'
``` 

#### Code Block Example Javascript

```javascript
var token = '{TOKEN}';
var tenantId = '{tenantId}';
var userId = '{userId}';
```

# Using Hugo-specific code

We are experimenting with so-called shortcodes in: /getting-started/testing-shortcodes/ (see https://mangogul.bitbucket.io/getting-started/testing-shortcodes/)


## Reusing References

This can be useful to maintain links appearing multiple times on a page.

**Example**

The following 

```
If this is your first time using Hugo and you've [already installed Hugo on your machine][installed], we recommend the [quick start][].

At the bottom of the file insert the link definitions:

[installed]: /getting-started/installing/
[quick start]: /getting-started/quick-start/
```

renders: 

If this is your first time using Hugo and you've [already installed Hugo on your machine][installed], we recommend the [quick start][].

At the bottom of the file insert the link definitions:

[installed]: /getting-started/installing/
[quick start]: /getting-started/quick-start/


