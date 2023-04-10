import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import {
	closeRecipeModal,
	load_recipes,
	loadMyRecipes,
	openRecipeModal,
} from "../actions/recipe";
import RecipeCard from "../components/Card";
import {
	Grid,
	Typography
} from "@mui/material";

const Recipes = ({
	isAuthenticated,
	load_recipes,
	loadMyRecipes,
	recipes,
	myRecipes,
	type,
}) => {
	useEffect(() => {
		if (isAuthenticated && type === "all" && !recipes.length) {
			load_recipes();
		} else if (isAuthenticated && type === "mine" && !myRecipes.length) {
			loadMyRecipes();
		}
	}, [type]);

	const data = type === "all" ? recipes : myRecipes;

	if (!isAuthenticated) {
		return <Navigate to="/login" />;
	}

	if (!data.length) {
		return (
			<Typography variant="h4" sx={{ color: "#444" }}>
				{" "}
				Wow, such empty!!
			</Typography>
		);
	}

	return (
		<Grid container spacing={2}>
			{data.map((recipe) => (
				<Grid key={recipe.id} item sm={6} xs={12} md={4}>
					<RecipeCard key={recipe.id} recipe={recipe} />
				</Grid>
			))}
		</Grid>
	);
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	recipes: state.recipe.allRecipes,
	myRecipes: state.recipe.myRecipes,
	recipeModal: state.recipe.openRecipeModal,
});

export default connect(mapStateToProps, {
	load_recipes,
	loadMyRecipes,
	closeRecipeModal,
	openRecipeModal,
})(Recipes);
