var express = require("express");
var router = express.Router();
var Article = require("../models/article");
var Cart = require("../models/cart");

/* GET home page. */
router.get("/", function(req, res, next) {
  Article.find(function(err, docs) {
    var articleChunks = [];
    var chunkSize = 3;
    for (var i = 0; i < docs.length; i += chunkSize) {
      articleChunks.push(docs.slice(i, i + chunkSize));
    }

    res.render("shop/index", {
      title: "NYT Article Scraper",
      articles: articleChunks
    });
  });
});

router.get("/saved", function(req, res, next) {
  Article.find({ isSaved: true }, function(err, docs) {
    var articleChunks = [];
    var chunkSize = 3;
    for (var i = 0; i < docs.length; i += chunkSize) {
      articleChunks.push(docs.slice(i, i + chunkSize));
    }

    res.render("shop/index", {
      title: "NYT Article Scraper",
      articles: articleChunks
    });
  });
});

router.get("/save-article/:id", function(req, res) {
  var articleId = req.params.id;
  Article.findById(articleId, function(err, article) {
    console.log("Working with this article", article);
    console.log("Is this article saved?", article.isSaved);
    if (article.isSaved) {
      Article.findByIdAndUpdate(
        // id
        req.params.id,
        // update
        { isSaved: false },
        // options:  set 'new' to 'true' to return the modified document rather than the original
        { new: true },
        // callback
        function(err, data) {
          console.log("-------------------------");
          console.log("This article is already saved", data);
          res.redirect("/");
        }
      );
    } else {
      Article.findByIdAndUpdate(
        // id
        req.params.id,
        // update
        { isSaved: true },
        // option
        { new: true },
        // callback
        function(err, data) {
          console.log("-------------------------");
          console.log("Add articles to saved folder", data);
          res.redirect("/saved");
        }
      );
    }
  });
});

module.exports = router;
