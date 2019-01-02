var express = require("express");
var router = express.Router();
var Article = require("../models/article");
var Comment = require("../models/comment");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

/* GET home page. */
router.get("/", function(req, res, next) {
  Article.find({})
    .sort([["scrapedAt", -1]])
    .exec(function(err, docs) {
      var totalArticles = docs.length;
      var articleChunks = [];
      var chunkSize = 3;
      for (var i = 0; i < docs.length; i += chunkSize) {
        articleChunks.push(docs.slice(i, i + chunkSize));
      }

      res.render("shop/index", {
        title: "NYT Article Scraper",
        articles: articleChunks,
        qty: totalArticles
      });
    });
});

router.get("/saved", function(req, res, next) {
  Article.find({ isSaved: true })
    .sort([["scrapedAt", -1]])
    .exec(function(err, docs) {
      var totalSavedArticles = docs.length;
      var articleChunks = [];
      var chunkSize = 3;
      for (var i = 0; i < docs.length; i += chunkSize) {
        articleChunks.push(docs.slice(i, i + chunkSize));
      }

      res.render("saved/index", {
        title: "Saved",
        articles: articleChunks,
        qty: totalSavedArticles
      });
    });
});

// Clean up databased by removing unsaved articles
router.get("/delete", function(req, res, next) {
  Article.deleteMany({ isSaved: false }, function(err, data) {
    if (err) return handleError(err);
    res.redirect("/");
  });
});

router.get("/save-article/:id", function(req, res) {
  var articleId = req.params.id;
  Article.findById(articleId, function(err, article) {
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
          res.redirect("/saved");
        }
      );
    }
  });
});

router.get("/scrape/:section", function(req, res) {
  var section = req.params.section;
  var sectionUrl = "";
  console.log("-----------------");
  console.log(section, req.params.section);

  switch (section) {
    case "business":
      sectionUrl = "https://www.nytimes.com/section/business/";
      break;
    case "food":
      sectionUrl = "https://www.nytimes.com/section/food";
      break;
    case "tech":
      sectionUrl = "https://www.nytimes.com/section/technology";
      break;
    case "travel":
      sectionUrl = "https://www.nytimes.com/section/travel";
      break;
    case "style":
      sectionUrl = " https://www.nytimes.com/section/style";
      break;
    default:
    // code block
  }
  axios.get(sectionUrl).then(function(response) {
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
      result.section = section;

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

// Route for grabbing a specific Article by id, populate it with it's note
router.get("/articles/:id", function(req, res) {
  // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
  Article.findOne({ _id: req.params.id })
    // ..and populate all of the comments associated with it
    .populate("comments")
    .then(function(dbArticle) {
      // If we were able to successfully find an Article with the given id, send it back to the client
      console.log(
        "Successfully find and associate an Article with the given id",
        dbArticle
      );

      // If there are comments in the article
      var commentsToDisplay = [];

      if (dbArticle.comments === undefined || dbArticle.comments.length == 0) {
        commentsToDisplay = [
          {
            commentBody: "Your are the first person to comment.",
            username: "N/A"
          }
        ];
      } else {
        commentsToDisplay = dbArticle.comments;
      }
      console.log(
        "-------------------------------------commentsToDisplay",
        commentsToDisplay
      );
      res.render("article/index", {
        articleId: dbArticle._id,
        imagePath: dbArticle.imagePath,
        title: dbArticle.title,
        description: dbArticle.description,
        section: dbArticle.section,
        link: dbArticle.link,
        comments: commentsToDisplay,
        date: dbArticle.date,
        isSaved: dbArticle.isSaved,
        buttonStatus: dbArticle.buttonStatus
      });
    })
    .catch(function(err) {
      res.json(err);
    });
});

// Route for saving/updating an Article's associated Comment
router.post("/articles/:id", function(req, res) {
  var redirectBackToArticle = `/articles/${req.params.id}`;
  console.log("Submit comment is clicked", req.params);

  // Grab the request body
  var body = req.body;
  // Each property on the body all represent our text boxes in article/index.hbs as specified by the name attribute on each of those input fields
  var res_body = {
    commentBody: body.new_comment_body,
    username: body.new_comment_username
  };

  // Create a new note and pass the req.body to the entry
  Comment.create(res_body)
    .then(function(dbComment) {
      console.log("---------------------------");
      console.log("find one Article with an `_id` equal to ", req.params.id);
      // If a Comment was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
      // { new: true } tells the query that we want it to return the updated Article -- it returns the original by default
      // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
      return Article.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { comments: dbComment._id } },
        { new: true }
      );
    })
    .then(function(dbArticle) {
      // If we were able to successfully update an Article, send it back to the client
      console.log("Successfully update an Article", dbArticle);
      res.redirect(redirectBackToArticle);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

module.exports = router;
