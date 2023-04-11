This project provides an API for managing user accounts, recipes and ingredients, built with Django and Django Rest Framework. Users can register, login, and logout using Django token authentication. The API allows users to view, create, update, and delete their own recipes and ingredients, as well as view recipes uploaded by other users. Users can also leave reviews for recipes, which include a rating and a comment.

# Installation

1.  Clone this repository:


- `git clone https://github.com/kirantyefun/recipe-hero.git`
- `cd recipe-hero/recipe-apis` 

## Backend

2.  Create a virtual environment and activate it:


`python -m venv env
source env/bin/activate` 

3.  Install dependencies:

`pip install -r requirements.txt` 

4.  Migrate the database:


`python manage.py migrate` 

5.  Create a superuser account:


`python manage.py createsuperuser` 

6.  Start the development server:


`python manage.py runserver` 

## Usage

### Authentication

To authenticate with the API, send a POST request to `/api/v1/users/login/` with the user's username and password in the request body:

`{
  "username": "johndoe@example.com",
  "password": "password123"
}` 

The API will respond with a token:

jsonCopy code

`{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}` 

Include the access token in subsequent requests by including an `Authorization` header with the value `Token <access_token>`:

`Authorization: Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` 

### User API

#### Register

To register a new user, send a POST request to `/api/v1/users/register/` with the user's username, email, and password in the request body:

`{
  "username": "johndoe",
  "email": "johndoe@example.com",
  "password": "password123"
}` 

The API will respond with the new user's username and email:

`{
  "username": "johndoe",
  "email": "johndoe@example.com"
}` 

#### Login

To login, send a POST request to `/api/token/` with the user's username and password in the request body (see Authentication):

jsonCopy code

`{
  "username": "johndoe",
  "password": "password123"
}` 

The API will respond with a token (see Authentication).

#### Logout

To logout, send a POST request to `/api/v1/users/logout/` with the user's access token in authorization Header

The API will respond with a status of 204 No Content.

### Recipe API

#### List

To view a list of recipes, send a GET request to `/api/v1/cook-book/recipes/`:

`[
  {
			"id": 1,
			"average_rating": 3.0,
			"chef": "sayamiasis@gmail.com",
			"name": "butter chicken masala",
			"about": "This is a very easy to make recipe, that you can try whenever you are short on time and you need to cook something delicious for your loved ones",
			"slug": "butter-chicken-masala",
			"process": "go to youtube and search butter chicken masala",
			"created": "2023-04-06T11:10:42.637643Z",
			"updated": "2023-04-06T11:10:42.637668Z"
		},
		{
			"id": 2,
			"average_rating": 3.0,
			"chef": "sayamiasis@gmail.com",
			"name": "samosa",
			"about": "This is a very easy to make recipe, that you can try whenever you are short on time and you need to cook something delicious for your loved ones",
			"slug": "samosa",
			"process": "mix all of them and fry in cooking oil",
			"created": "2023-04-06T11:12:11.014881Z",
			"updated": "2023-04-06T11:12:11.014903Z"
		},
		]`

Similarly, create, retrieve and update endpoints are also present.

# Frontend
The frontend of the application is built using React JS and Material UI. React JS is a popular JavaScript library for building user interfaces, and Material UI is a set of React components that implement Google's Material Design guidelines.

The frontend communicates with the backend using the API endpoints described above. When a user logs in, they can see a list of recipes uploaded by other users, along with the average rating of each recipe. Clicking on a recipe will show more details about that recipe, including the reviews left by other users.

Users can also leave a review for a recipe by filling out a form on the recipe details page.

The frontend is organized into several components, including:

-   `LoginForm`: Displays a login form where users can enter their username and password to log in.
-   `RegistrationForm`: Displays a registration form where users can create a new account by entering their username and password.
-   `RecipeList`: Displays a list of recipes, along with their average rating.
-   `RecipeDetail`: Displays details about a specific recipe, including its ingredients and reviews.
-   `ReviewForm`: Displays a form where users can leave a review for a recipe.

The frontend is designed to be responsive and work well on both desktop and mobile devices. Material UI provides a set of responsive design components that make it easy to create a mobile-friendly UI.
](https://github.com/kirantyefun/recipe-hero.git)
## Running the application

Repo is assumed to already have been cloned.
- `cd recipe-hero/recipe-frontend`
- `npm install`
- `npm start`

This starts your react server.
Navigate to http://localhost:3000 in your web browser to view the application. 
Once both the Django server and React server are running, you should be able to use the application in your web browser.

