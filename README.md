Project - 
Ecommerce site made using React, Nodejs, Express and MySQL.

Brief - 
In this project I built a website in which users can create an account and login to purchase downloadable games. There is an option to search through the games by name and after selecting a game, adding it to a cart. Users can add and delete items from their cart and when they're ready, can purchase the items using a credit card. The list of games comes from a data base. If logged in as admin, there is the option to add games to the database from the website.

Frontend design -
The front end was created using react. I used props to pass down the users authentication details down to each of the pages, these were saved in useState variables. UseEffect was also used for user authentication as each time the a page was mounted, the useEffect function would check the cookies sent by the server to see if the users details still match.

The design of the website is monotone black and white with dark red used for buttons - I wanted a minimalistic look which was easy simple to navigate.

User Authentication - 
User account details were saved on the MySql database, the users had a name and password. When users signup, the passwords are passed through bcrpyt to be hashed and salted before being saved to the database. This provides security in the case of a database leak.

After signing up, the user can login in. Upon logging in, the users account name and ID are encoded into a JSON web token (JWT), which is then sent in a cookie to the users browser. On the frontend, the JWT is decoded and the users name and ID is used to authenticate users requests. The JWT is encoded and decoded on each request and response.

Purchase and payment -
Payment is done using stripe API.
