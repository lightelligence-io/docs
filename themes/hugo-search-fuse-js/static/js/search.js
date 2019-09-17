// How many characters to include on either side of match keyword
const summaryInclude = 60;

// Options for fuse.js
let fuseOptions = {
  shouldSort: true,
  includeMatches: true,
  tokenize: true,
  matchAllTokens: true,
  threshold: 0.0,
  location: 0,
  distance: 100,
  maxPatternLength: 64,
  minMatchCharLength: 3,
  keys: [
    { name: "title", weight: 0.8 },
    { name: "tags", weight: 0.5 },
    { name: "categories", weight: 0.5 },
    { name: "contents", weight: 0.4 }
  ]
};

function getUrlParameter(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  let regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  let results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

let searchQuery = getUrlParameter("q");

if (searchQuery) {
  document.getElementById("search-query").value = searchQuery;
  executeSearch(searchQuery);
} else {
  document.getElementById("search-results").innerHTML =
    '<p class="no-results">Please enter a word or phrase above</p>';
}

function executeSearch(searchQuery) {
  // Look for "index.json" in the same directory where this script is called.
  fetch("index.json")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      let fuse = new Fuse(data, fuseOptions);
      let result = fuse.search(searchQuery);
      if (result.length > 0) {
        populateResults(result);
      } else {
        document.getElementById("search-results").innerHTML =
          '<p class="no-results">No matches found</p>';
      }
    });
}

function populateResults(result) {
  result.forEach(function(value, key) {
    let contents = value.item.contents;
    let snippet = "";
    let snippetHighlights = [];
    snippetHighlights.push(searchQuery);
    if (snippet.length < 1) {
      snippet += contents.substring(0, summaryInclude * 2);
    }
    snippet += "…";

    // Lifted from https://stackoverflow.com/posts/3700369/revisions
    var elem = document.createElement("textarea");
    elem.innerHTML = snippet;
    var decoded = elem.value;

    // Pull template from hugo template definition
    let frag = document
      .getElementById("search-result-template")
      .content.cloneNode(true);

    // Replace values
    console.log(value.item.permalink);
    frag.querySelector(".search_summary").setAttribute("id", "summary-" + key);
    frag
      .querySelector(".search_link")
      .setAttribute("href", value.item.permalink);
    frag.querySelector(".search_title").textContent = value.item.title;
    frag.querySelector(".search_snippet").textContent = decoded;
    let tags = value.item.tags;
    if (tags) {
      var tr = document.createElement("tr");
      tags.forEach(function(tag) {
        var td = document.createElement("td");
        var node = document.createTextNode(tag);
        td.setAttribute(
          "class",
          "f6 mb0 link mid-gray mr1 bg-color-dark ph2 pv1 tags mb2 search_tags"
        );
        td.appendChild(node);
        tr.appendChild(td);
      });
      frag.querySelector(".search_tags").replaceWith(tr);
    } else {
      frag.querySelector(".search_iftags").remove();
    }
    let categories = value.item.categories;
    if (categories) {
      var tr = document.createElement("tr");
      categories.forEach(function(category) {
        var td = document.createElement("td");
        var node = document.createTextNode(category);
        td.setAttribute(
          "class",
          "f6 mb0 link mr1 bg-light-blue ph2 pv1 tags mb2 search_tags--blue"
        );
        td.appendChild(node);
        tr.appendChild(td);
      });
      frag.querySelector(".search_categories").replaceWith(tr);
    } else {
      frag.querySelector(".search_ifcategories").remove();
    }
    snippetHighlights.forEach(function(snipvalue, snipkey) {
      let markjs = new Mark(frag);
      console.log(snipvalue);
      markjs.mark(snipvalue);
    });
    console.log(frag);
    document.getElementById("search-results").appendChild(frag);
  });
}
