# project_3 - Fit Kids
WDIr Hopper Project 3 - Hanna, Geraldine, Dylan

## Live Site
[fitkids @ Heroku](https://fitkids.herokuapp.com/)

## Technologies Used
- HTML
- CSS
- JavaScript (Node.js and jQuery)
- MongoDB (Mongoose)
- Express.js
- Bcrypt
- Express-session
- Body-parser
- Chart.js

## Approach Taken
Three-model CRUD application for creating and sharing activities for children that encourage an active lifestyle. Parents can track and update their children's activity levels, taking advantage of chart.js for data visualization. The activities page primarily utilizes flexbox and AngularJS's filtering capabilities, while the track page leverages the power of jQuery and Chart.js.

## Unsolved Problems
- jQuery appears to be very finicky when operating in a Heroku-deployed environment. A number of changes in the code have been implemented in an attempt to circumvent these issues; while we cannot guarantee 100% consistency with the Heroku platform, the app should function without any significant technical errors while hosted locally.

## Notes/Planned Features
- Potential integration with a third-party weather API for filtering activities based on local area weather
- Various UI improvements
