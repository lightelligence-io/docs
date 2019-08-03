var lunrIndex,
    $results,
    pagesIndex;

// Initialize lunrjs using our generated index file
function initLunr() {
    var request = new XMLHttpRequest();
    request.open('GET', '../js/lunr/PagesIndex.json', true);

    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            pagesIndex = JSON.parse(request.responseText);
            console.log("pagesIndex.length", pagesIndex.length);
            // Set up lunrjs by declaring the fields we use
            // Also provide their boost level for the ranking
            lunrIndex = lunr(function () {
                this.field("title", {
                    boost: 10
                });
                this.field("tags", {
                    boost: 5
                });
                this.field("content");

                // ref is the result item identifier (I chose the page URL)
                // this.ref("href");
                this.add({ field: "test", text: 'hello' });
                for (var i = 0; i < pagesIndex.length; ++i) {
                    this.add(pagesIndex);
                }

            });
            /*            pagesIndex.forEach(function(page) {
                            lunrIndex.add(page);
                        });*/


        } else {
            var err = textStatus + ", " + error;
            console.error("Error getting Hugo index flie:", err);
        }
    };

    request.send();
}

// Nothing crazy here, just hook up a event handler on the input field
function initUI() {

    $results = document.getElementById("results");
    $search = document.getElementById("search-input");
    /*    $search.onkeyup = function () {
            while ($results.firstChild) {
                $results.removeChild($results.firstChild);
            }
        };*/

    // Only trigger a search when 2 chars. at least have been provided
    var query = $search.value;
    if (query.length < 2) {
        return;
    }

    //add some fuzzyness to the string matching to help with spelling mistakes.
    /*        var fuzzLength = Math.round(Math.min(Math.max(query.length / 4, 1), 3));
            var fuzzyQuery = query + '~' + fuzzLength;*/
    var results = search(query);
    console.log(results);
    renderResults(results);
}

/**
 * Trigger a search in lunr and transform the result
 *
 * @param  {String} query
 * @return {Array}  results
 */
function search(query) {
    alert(query);
    // Find the item in our index corresponding to the lunr one to have more info
    // Lunr result:
    //  {ref: "/section/page1", score: 0.2725657778206127}
    // Our result:
    //  {title:"Page1", href:"/section/page1", ...}
    return lunrIndex.search(query).map(function (result) {
        return pagesIndex.filter(function (page) {
            console.log(page);
            console.log(query);
            return page.href === result.ref;
        })[0];
    });
}

/**
 * Display the 10 first results
 *
 * @param  {Array} results to display
 */
function renderResults(results) {
    if (!results.length) {
        return;
    }
    console.log(results);
    // Only show the ten first results
    /*    $results = document.getElementById("results");
        results.slice(0, 10).forEach(function (result) {
            var li = document.createElement('li');
            var ahref = document.createElement('a');
            ahref.href = result.href;
            ahref.text = "» " + result.title;
            li.append(ahref);
            $results.appendChild(li);
        });*/
}

// var's get started
initLunr();

document.addEventListener("DOMContentLoaded", function () {
    initUI();
    console.log(lunrIndex);
})
