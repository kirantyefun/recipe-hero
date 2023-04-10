import axios from "axios";

import {
	RECIPE_LOAD_SUCCESS,
	RECIPE_LOAD_FAILURE,
	MY_RECIPE_LOAD_SUCCESS,
	MY_RECIPE_LOAD_FAILURE,
	CHANGE_TAB_VALUE,
	RECIPE_DETAIL_LOAD_SUCCESS,
	RECIPE_DETAIL_LOAD_FAILURE,
	REVIEW_POST_SUCCESS,
	REVIEW_POST_FAILURE,
	OPEN_RECIPE_MODAL,
	CLOSE_RECIPE_MODAL,
	RECIPE_CREATION_FAILURE,
} from "./types";


export const load_recipes = () => async (dispatch) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Token ${localStorage.getItem("access")}`,
			Accept: "application/json",
		},
	};

	try {
		const res = await axios.get(
			`${process.env.REACT_APP_API_URL}/cook-book/recipes/`,
			config
		);
		dispatch({
			type: RECIPE_LOAD_SUCCESS,
			payload: res.data.results,
		});
	} catch (err) {
		console.log(err);
		dispatch({
			type: RECIPE_LOAD_FAILURE,
			payload: err,
		});
	}
};

export const loadMyRecipes = () => async (dispatch) => {
	console.log("loadmyrecipes called");
	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Token ${localStorage.getItem("access")}`,
			Accept: "application/json",
		},
	};

	try {
		const res = await axios.get(
			`${process.env.REACT_APP_API_URL}/cook-book/recipes/my-recipes/`,
			config
		);
		dispatch({
			type: MY_RECIPE_LOAD_SUCCESS,
			payload: res.data,
		});
	} catch (err) {
		console.log(err);
		dispatch({
			type: MY_RECIPE_LOAD_FAILURE,
			payload: err,
		});
	}
};

export const fetchRecipe = (id) => async (dispatch) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Token ${localStorage.getItem("access")}`,
			Accept: "application/json",
		},
	};
	try {
		const res = await axios.get(
			`${process.env.REACT_APP_API_URL}/cook-book/recipes/${id}/`,
			config
		);
		dispatch({
			type: RECIPE_DETAIL_LOAD_SUCCESS,
			payload: res.data,
		});
	} catch (err) {
		console.log(err);
		dispatch({
			type: RECIPE_DETAIL_LOAD_FAILURE,
			payload: err,
		});
	}
};

export const changeTabValue = (value) => (dispatch) => {
	dispatch({
		type: CHANGE_TAB_VALUE,
		payload: value,
	});
};

export const openRecipeModal = () => (dispatch) => {
	dispatch({
		type: OPEN_RECIPE_MODAL,
	});
};
export const closeRecipeModal = () => (dispatch) => {
	dispatch({
		type: CLOSE_RECIPE_MODAL,
	});
};

export const postReview = (rating, comment, id) => async (dispatch) => {
	console.log("post review called");
	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Token ${localStorage.getItem("access")}`,
			Accept: "application/json",
		},
	};
	const body = JSON.stringify({ rating, comment });
	try {
		const res = await axios.post(
			`${process.env.REACT_APP_API_URL}/cook-book/recipes/${id}/reviews/`,
			body,
			config
		);
		dispatch({
			type: REVIEW_POST_SUCCESS,
			payload: res.data,
		});
		return res.data;
	} catch (err) {
		console.log(err);
		dispatch({
			type: REVIEW_POST_FAILURE,
			payload: err,
		});
	}
};

export const createRecipe =
	(name, slug, about, recipeProcess, ingredients) => async (dispatch) => {
        console.log("create recipe called");
		const config = {
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Token ${localStorage.getItem("access")}`,
				"Accept": "application/json",
			},
		};
		const body = JSON.stringify({ name, slug, about, process: recipeProcess, ingredients });
		try {
			const res = await axios.post(
				`${process.env.REACT_APP_API_URL}/cook-book/recipes/`,
				body,
				config
			);
			dispatch({
				type: CHANGE_TAB_VALUE,
				payload: 1,
			});
            
		} catch (err) {
			console.log(err);
			dispatch({
				type: RECIPE_CREATION_FAILURE,
				payload: err,
			});
		}
	};
