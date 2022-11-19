# The Lore Store (Frontend)
The Lore Store is an online bookstore, this repository holds the code for the frontend of the same. I have taken a minimal approach towards the User Interface, built using **React.js** and styled with **TailwindCSS** This is the repository for the [backend](https://github.com/dhirajksharma/thelorestore-backend) for the project of the application.

## Features Available Now

Some of the prominent features of the site include:

a) General features available to all users
- Search a book in the store.
- Filter the results based on price, reviews, date of arrival, etc.
- Explore different genres available.
- Edit their profile information like name, email, address, etc.
- Edit their passwords, reset forgotten passwords with email.
- Compare different sellers and choose which one to buy from.
- Add, remove and/or update reviews for books.
- Add books to cart for later purchase.
- Check out with payment at Stripe's payment gateway.
- Check order details, cancel undelivered orders.

b) Seller exclusive features

- Add new to their catalogue.
- Update existing books in their catalogue.
- Check orders received from various buyers.

## Future Prospects

I have a couple of updates in mind for the site, which all of you are welcome to contribute to, or maybe even add new ones . . .

- Wish list for Users to add or remove books from.
- Social page for Users to share their reads with others.
- Sales statistics for Sellers at their dashboard.
- Dedicated pages for Sellers to host sales or launch events.
- A new section of users: delivery partners, and various functionalities associated with them, for instance, receiving orders for delivery, order tracking functionality for the user.
- Feel free to add more 😁😁

## Environment Variables

Below is the list of environment variables required for the frontend:

- REACT_APP_BACKEND_URL

> **Note:** Using React we do not need to install the dotenv module as in case of our backend. Simply putting the variables in a ".env" file in the root directory does the job. This however, comes with the condition that our variable names must start with `REACR_APP_` prefix.