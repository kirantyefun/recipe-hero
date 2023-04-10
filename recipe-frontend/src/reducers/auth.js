import {
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	USER_LOADED_SUCCESS,
	USER_LOADED_FAIL,
    AUTHENTICATED_FAIL,
    AUTHENTICATED_SUCCUESS,
    LOGOUT,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	CLOSE_SNACKBAR,
	RESET_RECIPE_STATE
} from "../actions/types";


const initialState = {
	access: localStorage.getItem("access"),
	refresh: localStorage.getItem("refresh"),
	isAuthenticated: null,
	user: null,
	isRegistered: null,
	toastOpen: false,
	toastMessage: null,
	severity: null,
};

export default function auth(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
        case AUTHENTICATED_SUCCUESS:
			return {
				...state,
				isAuthenticated: true,
			};
		case LOGIN_SUCCESS:
			localStorage.setItem("access", payload.token);
			return {
				...state,
				isAuthenticated: true,
				access: payload.token,
				toastOpen: true,
				toastMessage: "Logged In",
				severity: "success",
			};

		case USER_LOADED_SUCCESS:
			return {
				...state,
				user: payload,
			};
        
        case AUTHENTICATED_FAIL:
            return {
                ...state,
                isAuthenticated: false,
				toastOpen: false,
				toastMessage: null
            };

		case USER_LOADED_FAIL:
			return {
				...state,
				user: null,
			};

		case LOGIN_FAIL:
        case LOGOUT:
			localStorage.removeItem("access");
			return {
				...initialState
			};
		case REGISTER_SUCCESS:
			return {
				...state,
				isRegistered: true,
				toastOpen: true,
				toastMessage: "User Registered Successfully!",
				severity: "success",

			}
		case REGISTER_FAIL:
			return {
				...state,
				isRegistered: false,
				toastOpen: true,
				toastMessage: "User Could Not Be Registered! Please try again or contact our support team.",
				severity: "error",
			}

		case CLOSE_SNACKBAR:
			return {
				...state,
				toastOpen: false,
				toastMessage: null
			}
		case RESET_RECIPE_STATE:
			return {
				...state,
			}

		default:
			return state;
	}
}
