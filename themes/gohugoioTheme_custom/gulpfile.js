
var gulp = require('gulp');
var filenames = require("gulp-filenames");
var marked = require('marked');
var markdownToJSON = require('gulp-markdown-to-json');
var jsoncombinearray = require("gulp-jsoncombine-array");
var S = require("string");

var lunr = require('lunr');
var fs = require('fs')

var CONTENT_PATH_PREFIX = "../../content/en";

marked.setOptions({
    pedantic: true,
    smartypants: true
});

gulp.task('lunr-index', () => {
    return gulp.src(CONTENT_PATH_PREFIX + '/**/*.md')
    .pipe(filenames('markdownfiles'))
    .pipe(markdownToJSON(marked))
    .pipe(jsoncombinearray("PagesIndex.json",function(dataArray) {
        const hrefs = filenames.get('markdownfiles')
        const pageIndex = dataArray.map((data, index) => {
            return {
                title: data.title,
                tags: data.tags,
                href: S('/' + hrefs[index]).chompRight(".md").s,
                body: S(data.body).trim().stripTags().stripPunctuation().s
            }
        })
        return new Buffer.from(JSON.stringify(pageIndex));
    }))
    .pipe(gulp.dest('../../static/js/lunr/PagesIndex.json'))
});

gulp.task('lunr', () => {
  const documents = JSON.parse(fs.readFileSync('./assets/js/lunr/PagesIndex.json'));

  const lunrIndex = lunr(function() {
      this.field("title", {
          boost: 9
      });
      this.field("tags", {
          boost: 3
      });
      this.field("body", {
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

  fs.writeFileSync('../../static/js/lunr-index.json', JSON.stringify(object));
});
