var gulp = require('gulp');
var fs  = require('fs');

var lunr = require('lunr');

gulp.task('lunr', () => {
    const documents = JSON.parse(fs.readFileSync('./assets/js/lunr/PagesIndex.json'));
    var store = {}
    console.log(store)

    let lunrIndex = lunr(function() {
        this.field("title", {
            boost: 9
        });
        this.field("tags", {
            boost: 3
        });
        this.field("content", {
            boost: 10
        });
        this.ref("href");

        // This is required to provide the position of terms in
        // in the index. Currently position data is opt-in due
        // to the increase in index size required to store all
        // the positions. This is currently not well documented
        // and a better interface may be required to expose this
        // to consumers.
        this.metadataWhitelist = ['position'];

        documents.forEach(function(doc) {
            if(doc) this.add(doc);
        }, this);
    });
    var object = {
        index: lunrIndex
    }

    fs.writeFileSync('static/js/lunr-index.json', JSON.stringify(object));
});