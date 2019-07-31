var gulp = require('gulp');
var markdownToJSON = require('gulp-markdown-to-json');
var lunr = require('lunr');
var fs  = require('fs');
//var yaml = require("yamljs");
var S = require("string");
var CONTENT_PATH_PREFIX = "../../content/en";

var marked = require('marked');

marked.setOptions({
    pedantic: true,
    smartypants: true
});

exports.default = function() {
    gulp.src(CONTENT_PATH_PREFIX)
        .pipe(markdownToJSON(marked, 'blog.json'))
        .pipe(gulp.dest('.'));
};
/*



gulp.task('markdown', () => {
  gulp.src(CONTENT_PATH_PREFIX + '/!*.md')
    .pipe(markdownToJSON(marked))
    .pipe(gulp.dest('.'))
});



gulp.task('lunr', function(){

gulp.console.log("Build Index");


  var documents = JSON.parse(fs.readFileSync('docs/index.json'));
  var store = {};
  documents.forEach(function(doc) {
    store[doc.uri] = {
        'title': doc.title
    };
  });
  console.log(store);

  let lunrIndex = lunr(function() {
        this.field('title', {
            boost: 9
        });
        this.field('tags', {
            boost: 3
        });
        this.field('content', {
          boost: 10
        });
        this.ref('uri');

        documents.forEach(function(doc) {
            this.add(doc);
        }, this);
    });
  var object = {
    index: lunrIndex
  };

  fs.writeFileSync('static/js/gulp-lunr-index.json', JSON.stringify(object));
});
*/
