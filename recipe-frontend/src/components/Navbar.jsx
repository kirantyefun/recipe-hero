import React, { Fragment } from "react";
import {
	AppBar,
	Toolbar, Button,
	Tabs,
	Tab
} from "@mui/material";
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import { Link } from "react-router-dom";
import { changeTabValue, openRecipeModal } from "../actions/recipe";

import { LunchDiningRounded } from "@mui/icons-material";

const Navbar = ({
	logout,
	isAuthenticated,
	tabValue,
	changeTabValue,
	openRecipeModal,
}) => {
	const guestLinks = () => (
		<Fragment>
			<Button
				sx={{
					marginLeft: "auto",
					backgroundColor: "#ffdebf",
					"&:hover": {
						backgroundColor: "#ffe9d5",
					},
				}}
				variant="contained"
			>
				<Link
					style={{
						textDecoration: "none",
						color: "#99581a",
					}}
					to="/login"
				>
					LogIn
				</Link>
			</Button>
			<Button
				sx={{
					marginLeft: 2,
					backgroundColor: "#ffdebf",
					"&:hover": {
						backgroundColor: "#ffe9d5",
					},
				}}
				variant="contained"
			>
				<Link style={{ textDecoration: "none", color: "#99581a" }} to="/signup">
					SignUp
				</Link>
			</Button>
		</Fragment>
	);
	const authenticatedLinks = () => (
		<Fragment>
			<Tabs
				textColor="inherit"
				value={tabValue}
				onChange={(e, value) => {
					console.log(value);
					changeTabValue(value);
				}}
				TabIndicatorProps={{
					style: {
						backgroundColor: "#f4f4f4",
					},
				}}
			>
				<Tab label="Recipes" component={Link} to="/"></Tab>
				<Tab label="My Recipes" component={Link} to="/my-recipes"></Tab>
				<Tab label="Profile" component={Link} to="/profile"></Tab>
			</Tabs>
			<Button
				sx={{
					marginLeft: "auto",
					backgroundColor: "#ffdebf",
					"&:hover": {
						backgroundColor: "#ffe9d5",
					},
					color: "#99581a",
				}}
				onClick={openRecipeModal}
				variant="contained"
			>
				<Link
					style={{ textDecoration: "none", color: "#99581a" }}
					to="/new-recipe"
				>
					Add new recipe
				</Link>
			</Button>
			<Button
				sx={{
					marginLeft: "5px",
					backgroundColor: "#ffdebf",
					"&:hover": {
						backgroundColor: "#ffe9d5",
					},
					color: "#99581a",
				}}
				onClick={logout}
				variant="contained"
			>
				Logout
			</Button>
		</Fragment>
	);
	return (
		<Fragment>
			<AppBar style={{ background: "#ff922b" }}>
				<Toolbar>
					<LunchDiningRounded />
					{isAuthenticated ? authenticatedLinks() : guestLinks()}
				</Toolbar>
			</AppBar>
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	tabValue: state.recipe.tabValue,
});

export default connect(mapStateToProps, {
	logout,
	changeTabValue,
	openRecipeModal,
})(Navbar);
