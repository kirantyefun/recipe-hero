import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./hocs/Layout";
import Login from "./container/Login";
import SignUp from "./container/SignUp";
import Profile from "./container/Profile";
import CreateRecipe from "./container/CreateRecipe";


import { Provider } from "react-redux";
import store from "./store";
import Recipes from "./components/Recipes";
import RecipeDetails from "./container/RecipeDetails";



const App = () => {
	return(
	<Provider store={store}>
		<Router>
			<Layout>
				<Routes>
					<Route exact path="/" element={<Recipes type="all" />}></Route>
					<Route exact path="/my-recipes" element={<Recipes type="mine" />}></Route>
					<Route exact path="/recipe/:id" element={<RecipeDetails type="all" />}></Route>
					<Route exact path="/new-recipe" element={<CreateRecipe />}></Route>
					<Route
						exact
						path="/login"
						element={<Login />}
					></Route>
					<Route
						exact
						path="/signUp"
						element={<SignUp />}
					></Route>
					<Route
						exact
						path="/profile"
						element={<Profile />}
					></Route>
				</Routes>
			</Layout>
		</Router>
	</Provider>
)};

export default App;
