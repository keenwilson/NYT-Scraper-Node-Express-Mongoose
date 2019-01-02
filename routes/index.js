var express = require("express");
var router = express.Router();
var Article = require("../models/article");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

/* GET home page. */
router.get("/", function(req, res, next) {
  Article.find({})
    .sort("-date")
    .exec(function(err, docs) {
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
  Article.find({ isSaved: true })
    .sort("-date")
    .exec(function(err, docs) {
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
        { isSaved: false, buttonStatus: "Save" },
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
        { isSaved: true, buttonStatus: "Remove" },
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

router.get("/tech", function(req, res) {
  axios
    .get("https://www.nytimes.com/section/technology")
    .then(function(response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(response.data);
      var result = {};
      $("div.css-4jyr1y").each(function(i, element) {
        var link = $(element)
          .find("a")
          .attr("href");
        var title = $(element)
          .find("h2.e1xfvim30")
          .text()
          .trim();
        var description = $(element)
          .find("p.e1xfvim31")
          .text()
          .trim();
        var imagePath = $(element)
          .parent()
          .find("figure.css-196wev6")
          .find("img")
          .attr("src");
        var baseURL = "https://www.nytimes.com";
        result.link = baseURL + link;
        result.title = title;
        if (description) {
          result.description = description;
        }
        if (imagePath) {
          result.imagePath = imagePath;
        } else {
          result.imagePath =
            "https://via.placeholder.com/205x137.png?text=No%20Image%20from%20NYTimes";
        }
        result.section = "technology";

        // Create a new Article using the `result` object built from scraping
        Article.create(result)
          .then(function(dbArticle) {
            // View the added result in the console
            console.log("---------------------------");
            console.log("View the added result in the console", dbArticle);
          })
          .catch(function(err) {
            // If an error occurred, log it
            console.log(err);
          });
      });
      console.log("Scrape Complete");
      res.redirect("/");
    });
});

router.get("/business", function(req, res) {
  axios
    .get("https://www.nytimes.com/section/business")
    .then(function(response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(response.data);
      var result = {};
      $("div.css-4jyr1y").each(function(i, element) {
        var link = $(element)
          .find("a")
          .attr("href");
        var title = $(element)
          .find("h2.e1xfvim30")
          .text()
          .trim();
        var description = $(element)
          .find("p.e1xfvim31")
          .text()
          .trim();
        var imagePath = $(element)
          .parent()
          .find("figure.css-196wev6")
          .find("img")
          .attr("src");
        var baseURL = "https://www.nytimes.com";
        result.link = baseURL + link;
        result.title = title;
        if (description) {
          result.description = description;
        }
        if (imagePath) {
          result.imagePath = imagePath;
        } else {
          result.imagePath =
            "https://via.placeholder.com/205x137.png?text=No%20Image%20from%20NYTimes";
        }
        result.section = "business";
        // Create a new Article using the `result` object built from scraping
        Article.create(result)
          .then(function(dbArticle) {
            // View the added result in the console
            console.log("---------------------------");
            console.log("View the added result in the console", dbArticle);
          })
          .catch(function(err) {
            // If an error occurred, log it
            console.log(err);
          });
      });
      console.log("Scrape Complete");
      res.redirect("/");
    });
});

router.get("/entrepreneuship", function(req, res) {
  axios
    .get("https://www.nytimes.com/section/business/smallbusiness")
    .then(function(response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(response.data);
      var result = {};
      $("div.css-4jyr1y").each(function(i, element) {
        var link = $(element)
          .find("a")
          .attr("href");
        var title = $(element)
          .find("h2.e1xfvim30")
          .text()
          .trim();
        var description = $(element)
          .find("p.e1xfvim31")
          .text()
          .trim();
        var imagePath = $(element)
          .parent()
          .find("figure.css-196wev6")
          .find("img")
          .attr("src");
        var baseURL = "https://www.nytimes.com";
        result.link = baseURL + link;
        result.title = title;
        if (description) {
          result.description = description;
        }
        if (imagePath) {
          result.imagePath = imagePath;
        } else {
          result.imagePath =
            "https://via.placeholder.com/205x137.png?text=No%20Image%20from%20NYTimes";
        }
        result.section = "entrepreneuship";

        // Create a new Article using the `result` object built from scraping
        Article.create(result)
          .then(function(dbArticle) {
            // View the added result in the console
            console.log("---------------------------");
            console.log("View the added result in the console", dbArticle);
          })
          .catch(function(err) {
            // If an error occurred, log it
            console.log(err);
          });
      });
      console.log("Scrape Complete");
      res.redirect("/");
    });
});
module.exports = router;
