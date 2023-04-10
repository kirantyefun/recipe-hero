import {
	RECIPE_LOAD_FAILURE,
	RECIPE_LOAD_SUCCESS,
	CHANGE_TAB_VALUE,
	MY_RECIPE_LOAD_FAILURE,
	MY_RECIPE_LOAD_SUCCESS,
	REVIEW_POST_SUCCESS,
	REVIEW_POST_FAILURE,
	OPEN_RECIPE_MODAL,
	CLOSE_RECIPE_MODAL, RESET_RECIPE_STATE
} from "../actions/types";

const initialState = {
	allRecipes: [],
	myRecipes: [],
	recipeLoadError: null,
	tabValue: 0,
	recipeModal: false,
};

export default function recipe(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case RECIPE_LOAD_FAILURE:
			return {
				...state,
				recipeLoadError: payload,
			};

		case RECIPE_LOAD_SUCCESS:
			return {
				...state,
				allRecipes: payload,
			};
		case MY_RECIPE_LOAD_FAILURE:
			return {
				...state,
				recipeLoadError: payload,
			};

		case MY_RECIPE_LOAD_SUCCESS:
			return {
				...state,
				myRecipes: payload,
			};
		case CHANGE_TAB_VALUE:
			return {
				...state,
				tabValue: payload,
			};
		case REVIEW_POST_SUCCESS:
			return {
				...state,
			};
		case REVIEW_POST_FAILURE:
			return {
				...state,
			};
		case OPEN_RECIPE_MODAL:
			return {
				...state,
				openRecipeModal: true,
			};
		case CLOSE_RECIPE_MODAL:
			return {
				...state,
				openRecipeModal: false,
			};

		case RESET_RECIPE_STATE:
			return {
				...initialState
			}
		default:
			return state;
	}
}
