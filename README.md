Project brief: 

This project is an ecommerce site made using React, Nodejs, Express and MySQL.

Description:

In this project I built a website in which users can create an account and login to purchase products. There is an option to search through the products by name and after selecting a product, adding it to a cart. Users can add and delete items from their cart and when they're ready, can purchase the items using a credit card. The list of products comes from a SQL database. If logged in as admin, there is the option to add games to the database from the website.

Frontend design:

The front end was created using react. I used props to pass down the users authentication details down to each of the pages, these were saved in useState variables. UseEffect was also used for user authentication as each time the a page was mounted, the useEffect function would check the cookies sent by the server to see if the users details still match. There are also a few shared components which are reused by multiple different pages of the website

The design of the website is monotone black and white with dark red used for buttons - I wanted a minimalistic look which was easy simple to navigate.


User Authentication:

User account details were saved on the SQL database, the users had a name, password and ID number. When users signup, their passwords are passed through bcrpyt to be hashed and salted before being saved to the database. This provides security in the case of a database leak.

After signing up, the user can log in. Upon logging in, the users account name and ID are encoded into a JSON web token (JWT), which is then sent via cookie to the users browser. On the frontend, the JWT is decoded and the users name and ID is used to authenticate users requests. The JWT decoded for each request and expires when the user decides to logout.

Purchase and payment:

Payment is done using stripe API. Stripe provided a simple and secure way to handle credit card payments. When customers are ready to make a purchase, the details of their cart items will be sent to the backend and processed by stripe, which then creates a URL that the user is redirected to, with which they can make their payment.
![image](https://user-images.githubusercontent.com/80097858/151105649-6c238650-bb1b-44bd-af6b-59abc785262e.png)
