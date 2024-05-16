# Mango-Website
A mango website which has basic functionalities like login, signup and more features

Features:
1. Users can login --> Their details are added in mongodb database
2. New user can signup to the website
3. Variety of mangoes are available with price and hovering effect is given
4. It is compatible even to mobile phones and tablets as we have usd @media queries
5. If we click any product, a detailed view of that mango will be there
6. User can add or remove the products he have selected
7. all the cart item data stored for the user in mongodb database
8. Have used form validation in signup page
9. Admin can add a new product or remove product in the website
10. A detailed view of what and all product availabe in the website can be seen by the admin -> can verify the availability of the stock

Frontend

Before running make sure that you have installed nod.e js and this front end part runs in localhost portno: 4000

For each functionalities we have separate react jsx file and for each jsx file we have its own css.
The assets folder has the images for the website and if at all any image is missing, add it to the assets folder
The data for the products are stored in assets folder as a javascript file.

Backend

Make sure that you have installed necessary packages like mongoose, nodejs and multer 
multer stores the image data in upload folder. So please Create Upload folder in the backend folder
the index.js has all the express and mongodb connection
I have connected Mongodb database to atlas. Make sure that you give your key or url in the mongoose present in index.js.
It runs in localhost portno:3000


Admin

Here in the admin we have used the react file and it runs in 5173 local host

use this commands to run the following folder --> (It may change or any other alternatives will be there)
1. frontend --> npm start
2. backend --> node ./index.js
3. admin --> npm run dev

