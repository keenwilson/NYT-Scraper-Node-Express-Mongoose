var Article = require("../models/article");
var mongoose = require("mongoose");

// Connect to Mongoose inside of this file for development stage
mongoose.connect(
  "mongodb://localhost:27017/nytbusinessscraper",
  { useNewUrlParser: true }
);

var articles = [
  new Article({
    imagePath:
      "https://static01.nyt.com/images/2019/01/02/business/02TIMBER-01/merlin_148337145_35a16718-b1b5-4806-8963-5a587c843952-mediumThreeByTwo440.jpg?quality=100&auto=webp",
    title: "Log Cabins? No, These Wooden Buildings Are High-Rises",
    description:
      "Developers have not used wood for much other than houses since the horse-and-buggy days. But the knotty building material is making a comeback.",
    link:
      "https://www.nytimes.com/2019/01/01/business/timber-wood-construction-real-estate.html",
    isSaved: false
  }),
  new Article({
    imagePath:
      "https://static01.nyt.com/images/2018/12/27/business/00bigtech01/merlin_148372275_bad88144-35fb-49f7-9828-0c6c5e0d8810-videoLarge.jpg",
    title: "Big Tech May Look Troubled, but It’s Just Getting Started",
    description:
      "Even as Facebook, Google and others confronted challenges in 2018, their ambitions were undimmed. After all, so much of life remains undisrupted.",
    link:
      "https://www.nytimes.com/2019/01/01/technology/big-tech-troubled-just-getting-started.html",
    isSaved: false
  }),
  new Article({
    imagePath:
      "https://static01.nyt.com/images/2019/01/02/science/02SPACEPREVIEW3/02SPACEPREVIEW3-mediumThreeByTwo440.jpg?quality=100&auto=webp",
    title: "Log Cabins? No, These Wooden Buildings Are High-Rises",
    description:
      "A busy year in space just ended, and this one will be full of new highlights in orbit and beyond.",
    link: "https://www.nytimes.com/2019/01/01/science/2019-launches-moon.html",
    isSaved: false
  }),
  new Article({
    imagePath:
      "https://static01.nyt.com/images/2018/12/21/business/00ChinaProperty-01/00ChinaProperty-01-mediumThreeByTwo440.jpg?quality=100&auto=webp",
    title: "In the Race for Content, Hollywood Is Buying Up Hit Podcasts",
    description:
      "A glut of unwanted apartments gets part of the blame for a slowdown in the world’s second-largest economy. In some places, homeowners are taking to the streets.",
    link:
      "https://www.nytimes.com/2018/12/30/business/china-economy-property.html",
    isSaved: false
  }),
  new Article({
    imagePath:
      "https://static01.nyt.com/images/2018/12/28/fashion/00lolsurprise-1/00lolsurprise-1-mediumThreeByTwo440.jpg?quality=100&auto=webp",
    title: "Why Do You Love a L.O.L. Surprise?",
    description:
      "The hottest toy of the year was a glittering, baby-pink plastic suitcase that we buy without knowing what’s inside.",
    link:
      "https://www.nytimes.com/2018/12/31/style/lol-surprise-hottest-toy-2018.html",
    isSaved: false
  }),
  new Article({
    imagePath:
      "https://static01.nyt.com/images/2019/01/01/business/01EUROPEDRONES-01/merlin_148637418_05d248c1-05ad-4931-88ff-c3f8608857c7-mediumThreeByTwo440.jpg?quality=100&auto=webp",
    title:
      "With Drone Deliveries on the Horizon, Europe Moves to Set Ground Rules",
    description:
      "A former military airfield in Belgium will be used to test technology and help regulators set rules for delivery by unmanned flying devices.",
    link:
      "https://www.nytimes.com/2018/12/31/business/europe-commercial-drone-delivery.html",
    isSaved: false
  }),
  new Article({
    imagePath:
      "https://static01.nyt.com/images/2018/12/31/business/stocks01-1/stocks01-1-mediumThreeByTwo440.png?quality=100&auto=webp",
    title: "Stocks Rise as Wall St.’s Terrible December Comes to a Close",
    description:
      "December will be the market’s worst month since the financial crisis, with the S&P 500 down more than 9 percent.",
    link: "https://www.nytimes.com//2018/12/31/business/stock-market-2018.html",
    isSaved: false
  }),
  new Article({
    imagePath:
      "https://static01.nyt.com/images/2019/01/02/world/02qatar/merlin_138527910_7014c5e1-582a-4cf4-821e-bcf69e33bea1-mediumThreeByTwo440.jpg?quality=100&auto=webp",
    title: "A 6-Pack of Beer for $26? Qatar Doubles the Price of Alcohol",
    description:
      "Many countries have tried to regulate alcohol consumption by making drinking expensive. But the country added a 100 percent tax on Tuesday.",
    link:
      "https://www.nytimes.com/2019/01/01/world/middleeast/qatar-tax-alcohol.html",
    isSaved: false
  })
];

var done = 0;

for (var i = 0; i < articles.length; i++) {
  // Mongoose saves the collection to the model
  articles[i].save(function(err, result) {
    done++;
    if (done === articles.length) {
      exit();
    }
  });
}

function exit() {
  mongoose.disconnect();
}
