# NYT-Scraper-Node-Express-Mongoose

A web app utilizes mongoDB, Mongoose, cheerio, and express to let the user scrape articles from a website.

### Dependencies

- `express`
- `express-handlebars`
- `mongoose`
- `cheerio`
- `axios`

### What This Application Does

- Whenever a user visits the site, the user can use a scraping tool to scrape stories from a news outlet, which is **The New York TImes** in this app. The user can select which section of NYT that they want to review: `Business`, `technology`, `food`, `travel`, and `style`.
- Each scraped article will be saved to the application database.
- The app should scrape and display the following information for each article:
  - Headline - the title of the article
  - Summary - a short summary of the article
  - URL - the url to the original article
  - imagePath - the image url of the original article

* Users are able to leave comments on the articles displayed and revisit them later. The comments will be saved to the database as well and associated with their articles. Users will also be able to delete comments left on articles. All stored comments will be visible to every user.

### Deploy Your Project To Heroku

1. On your local machine, navigate to your project folder. As this point, we’ll assume you’ve been pushing/pulling your code with Github but have yet to deploy it to Heroku
2. Run `heroku create` to connect your repo with Heroku
   ![Run Heroku Create](./screenshots/screenshots-herokuCreate.png)

3. Run this command in your Terminal/Bash window:

   `heroku addons:create mongolab`

   This command will add the free mLab provision to your project.

4. When you go to connect your mongo database to mongoose, do so the following way:

   ```js
   // If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
   var MONGODB_URI =
     process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

   mongoose.connect(MONGODB_URI);
   ```

   - This code should connect mongoose to your remote mongolab database if deployed, but otherwise will connect to the local mongoHeadlines database on your computer.

3) Navigate to heroku.com and login with your credentials

4) Find your Heroku app’s name in the dashboard. Click on it.
   ![Free mLab is added to your project](./screenshots/screenshots-mLabonHeroku.png)

### Helpful Links

- [MongoDB Documentation](https://docs.mongodb.com/manual/)
- [Mongoose Documentation](http://mongoosejs.com/docs/api.html)
- [Cheerio Documentation](https://github.com/cheeriojs/cheerio)
