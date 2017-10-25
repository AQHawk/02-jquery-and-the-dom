'use strict';

let articles = [];

// COMMENT: What is the purpose of the following function? Why is its name capitalized? Explain the context of "this" within the function. What does "rawDataObj" represent?
// The name of the function below 'Article' is capitalized because it is a constructor function. The contextual 'this' within the object represents the object itself. The rawData is a constructor function that allows the article.js file to pull in the data from the blogArticles.js file.

function Article (rawData) {
  // DONE: Use the JS object that is passed in to complete this constructor function:
  // Save ALL the properties of `rawDataObj` into `this`
  this.title = rawData.title;
  this.category = rawData.category;
  this.author = rawData.author;
  this.authorUrl = rawData.authorUrl;
  this.publishedOn = rawData.publishedOn;
  this.body = rawData.body;
}

Article.prototype.toHtml = function() {
  // COMMENT: What is the benefit of cloning the article? (see the jQuery docs)
  // The benefit of cloning the article is that it allows us to recreate a multitude of different articles without hardcoding each one in our file. When using the .clone() method, we can modify the elements we cloned or their contents before inserting them back into the document.

  let $newArticle = $('article.template').clone();
  /* DONE: This cloned article still has a class of template. In our modules.css stylesheet, we should give all elements with a class of template a display of none so that our template does not display in the browser. But, we also need to make sure we're not accidentally hiding our cloned article. */
  $newArticle.removeClass('template');

  if (!this.publishedOn) $newArticle.addClass('draft');
  $newArticle.data('category', this.category);

  /* DONE: Now use jQuery traversal and setter methods to fill in the rest of the current template clone with values of the properties of this particular Article instance.
    We need to fill in:
      1. author name,
      2. author url,
      3. article title,
      4. article body, and
      5. publication date. */

  $newArticle.find('address a').text(this.author);
  $newArticle.find('address a href').text(this.authorUrl);
  $newArticle.find('h1').text(this.title);
  $newArticle.find('.article-body').html(this.body);
  $newArticle.find('time').text(this.publishedOn);

  // REVIEW: Display the date as a relative number of 'days ago'
  $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');
  $newArticle.append('<hr>');
  return $newArticle;
};

rawData.sort(function(a,b) {
  // REVIEW: Take a look at this sort method; This may be the first time we've seen it. Look at the docs and think about how the dates would be sorted if the callback were not included in this method.
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

// DONE: Refactor these for loops using the .forEach() array method.


rawData.forEach(function(allRawData){
  articles.push(new Article(allRawData));
});

articles.forEach(function(allRawData) {
  $('#articles').append(allRawData.toHtml());
});
