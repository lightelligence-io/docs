var     wrapper = require('./wrapper.js');

$(document).ready(function () {
    'use strict';
    // Set up search
    $.getJSON('../js/lunr-index.json', function (response) {
        // Create index
        var index;
        console.log(response.index);
        console.log(response);
        index = lunr.Index.load(response.index);

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
                    var doc = documents[result.ref],
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
                            var field = '<h1></h1>';
                            var positions = result.matchData.metadata[term][fieldName].position;
                            wrapper(field, positions);
                        })
                    });
                });
                resultdiv.show();
            }
        });
    });
});
// var lunrIndex,
//     $results,
//     pagesIndex;
//
// // Initialize lunrjs using our generated index file
// function initLunr() {
//     // First retrieve the index file
//     $.getJSON("../js/lunr/PagesIndex.json")
//         .done(function(index) {
//             pagesIndex = index;
//
//             // Set up lunrjs by declaring the fields we use
//             // Also provide their boost level for the ranking
//             lunrIndex = lunr(function() {
//                 this.field("title", {
//                     boost: 10
//                 });
//                 this.field("tags", {
//                     boost: 5
//                 });
//                 this.field("content");
//
//                 // ref is the result item identifier (I chose the page URL)
//              //   this.ref("href");
//
//                 // Feed lunr with each file and let lunr actually index them
//                 // var self = this;
//                 // pagesIndex.forEach(function(page) {
//                 //     if(page) {
//                 //         self.add(page);
//                 //         console.log(page);
//                 //     }
//                 // });
//
//                 pagesIndex.forEach(function(doc) {
//                     if(doc) this.add(doc);
//                 }, this);
//             });
//             console.log(lunrIndex);
//         })
//         .fail(function(jqxhr, textStatus, error) {
//             var err = textStatus + ", " + error;
//             console.error("Error getting Hugo index flie:", err);
//         });
// }
//
// // Nothing crazy here, just hook up a listener on the input field
// function initUI() {
//     $results = $("#results");
//     $("#search-input").keyup(function() {
//         $results.empty();
//
//         // Only trigger a search when 2 chars. at least have been provided
//         var query = $(this).val();
//         if (query.length < 2) {
//             return;
//         }
//
//         var results = search(query);
// console.log(results);
// console.log(query);
//       //  renderResults(results);
//     });
// }
//
// /**
//  * Trigger a search in lunr and transform the result
//  *
//  * @param  {String} query
//  * @return {Array}  results
//  */
// function search(query) {
//     // Find the item in our index corresponding to the lunr one to have more info
//     // Lunr result:
//     //  {ref: "/section/page1", score: 0.2725657778206127}
//     // Our result:
//     //  {title:"Page1", href:"/section/page1", ...}
//     return lunrIndex.search(query).map(function(result) {
//         return pagesIndex.filter(function(page) {
//             //return page.href === result.ref;
//            // return page.href === result.ref;
//            return page;
//         })[0];
//     });
// }
//
// /**
//  * Display the 10 first results
//  *
//  * @param  {Array} results to display
//  */
// function renderResults(results) {
//     if (!results.length) {
//         return;
//     }
//
//     // Only show the ten first results
//     results.slice(0, 10).forEach(function(result) {
//         var $result = $("<li>");
//         $result.append($("<a>", {
//             href: result.href,
//             text: "» " + result.title
//         }));
//         $results.append($result);
//     });
// }
//
// // Let's get started
// initLunr();
//
// $(document).ready(function() {
//     initUI();
// });