# Phase 5 Final Project
# The Traveler's Club
## Description
Welcome to the Traveler's Club! As someone who highly values traveling, I designed this app especially, for those who love to travel. This app allows you to browse over 100 destinations all around the world and share which ones you've traveled to on your profile. You can also add destinations to your wish list! From your wishlist you can use the 'I Went There' function to add it to your trips along with your rating and comments. Along with your own profile, you can also see other users' profiles and their trips, and even search for your friends! But what travel app would be complete without the ultimate packing list and travel tips? Head on over to the 'Travel 101' page to explore the universal packing list and travel tips. 

I've worked very hard to make this app a pleasant experience so I hope all of the travel lovers out there and enjoy!

## Instructions
To experience this app, first fork and clone this repo. Once that's done, you'll need to cd into the client folder and run ```npm install```. Once that's done, cd over to the server folder and run ```pipenv install``` followed by ```pipenv install flask``` and finally ```pipenv shell```.

Now that you have all of the dependencies installed, in the server folder, run ```python app.py``` to start the back-end server, then cd on over to the client folder and run ```npm start``` to start up the front-end server.

Once both servers are up and running, you're all set to jump right in! You'll need to sign up with a username, password, and photo to access the content. After that, go wild!

## Accomplishments
* Setting up an additional table with relationships to implement the 'wish list' feature under the 'My Trips' page.
* Clicking on someone's name or profile image and being brought to their page to see all of their trips along with their ratings and comments

## Challenges
* Setting up the back-end database with all of the tables including one for the destinations, the users, the trips, and the wish list items, along with establishing relationships between them to be able to display content conditionally based on which user is currently logged in.
* Implementing the conditionally rendered 'Add to Wish list' button on the destination cards in which a user can press the button to add a destination to their wish list, and then the button will change to 'Added!'.

## Author
* Alexis Boucouvalas
