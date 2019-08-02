var indexedJson = require('../../../../static/js/lunr/lunr-index.json'),
    pagesJson = require('../../../../static/js/lunr/PagesIndex.json'),
    lunr = require('lunr'),
    wrapper = require('./wrapper.js')

var documents = pagesJson.reduce(function (memo, doc) {
    if(doc) memo[doc.href] = doc;
    return memo;
}, {})
/*

$(document).ready(function () {
    'use strict';
    // Set up search
    $.getJSON(indexedJson, function (response) {
        var idx = lunr.Index.load(response.index);
        console.log(idx);

window.pagesJson = pagesJson
window.idx = idx
window.lunr = lunr

window.search = function (q) {
    console.time('search: ' + q)
    var results = idx.search(q)
    console.timeEnd('search: ' + q)
    return results
}
*/



$(document).ready(function () {
    'use strict';
    // Set up search
    $.getJSON('/js/lunr/lunr-index.json', function (response) {
        // Create index
        var index;
        index = lunr.Index.load(response.index);
        console.log(index)

        // Handle search
        $('#search-input').on('keyup', function () {
            // Get query
            var query = $(this).val();
            // Search for it
            //  var result = index.search(`${query}*`);
            var results = index.search(query);
            console.log('result', results);
            // Output it
            var resultdiv = $('#search_result');
            if (results.length === 0 || query == '' ) {
                // Hide results
                resultdiv.hide();
            } else {
                // Show results
                resultdiv.empty();
                results.forEach(function (result) {
                    var ref = result.ref;
                    var doc = documents[result.ref];
                        console.log('result', result);
                    console.log('result', result);
                    // console.log('documents[result.ref]', documents[result.ref]);
                    var searchitem = '<li><a href="' + ref + '"> here store</a></li>';
                    resultdiv.append(searchitem);
                    //    var li = buildSearchResult(result);

                    Object.keys(result.matchData.metadata).forEach(function (term) {
                        Object.keys(result.matchData.metadata[term]).forEach(function (fieldName) {
                            console.log(result.matchData.metadata[term][fieldName].position);
                            // console.log(wrapper(field, positions));
                            console.log(result.matchData.metadata[term]);
                            console.log("fieldName",fieldName);

                            var field =  buildSearchResult(doc),
                                positions = result.matchData.metadata[term][fieldName].position;

                            wrapper(field, positions);
                        });
                    });
                });
                resultdiv.show();
            }
        });
    });

    var buildSearchResult = function (doc) {
        var li = document.createElement('li'),
            article = document.createElement('article'),
            header = document.createElement('header'),
            section = document.createElement('section'),
            h2 = document.createElement('h2'),
            p = document.createElement('p')

        h2.dataset.field = 'name'
        h2.textContent = doc.name

        p.dataset.field = 'body'
        p.textContent = doc.body

        li.appendChild(article)
        article.appendChild(header)
        article.appendChild(section)
        header.appendChild(h2)
        section.appendChild(p)

        return li
    }
});