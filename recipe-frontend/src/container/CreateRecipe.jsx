import React, { useState, useEffect } from "react";
import {
	Paper,
	TextField,
	FormControl,
	FormLabel,
	FormControlLabel,
	Button,
	FormGroup,
	Checkbox,
	FormHelperText,
} from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { createRecipe, loadMyRecipes } from "../actions/recipe";
import * as Yup from "yup";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import axios from "axios";
import slugify from "slugify";

export const CreateRecipe = ({ createRecipe, loadMyRecipes }) => {
	const [recipeCreated, setRecipeCreated] = useState(false);
	const [selectedIngredients, setSelectedIngredients] = useState([]);
	const [ingredients, setIngredients] = useState([]);
	useEffect(() => {
		const fetchIngredients = async () => {
			const response = await axios.get(
				`${process.env.REACT_APP_API_URL}/cook-book/ingredients/`
			);
			setIngredients(response.data.results);
		};
		fetchIngredients();
	}, []);

	if (recipeCreated) {
		return <Navigate to="/my-recipes" />;
	}

	const paperStyle = {
		padding: 20,
		width: 360,
		margin: "0 auto",
		marginTop: "80px",
		marginBottom: "20px",
	};
	const initialValues = {
		name: "",
		slug: "",
		about: "",
		process: "",
		ingredients: [],
	};
	const handleSubmit = async (values, props) => {
		createRecipe(
			values.name,
			slugify(values.name, { lower: true }),
			values.about,
			values.process,
			selectedIngredients
		);
		await loadMyRecipes();
		setRecipeCreated(true);
		setTimeout(() => {
			// props.resetForm();
			props.setSubmitting(false);
		}, 1000);
	};

	const validationSchema = Yup.object().shape({
		name: Yup.string().required("Field is required"),
		about: Yup.string()
			.required("Enter short description about the recipe")
			.required(),
		process: Yup.string().required("Enter recipe instructions"),
	});
	return (
		<Paper style={paperStyle} elevation={2}>
			<strong>Add your recipe</strong>
			<Formik
				initialValues={initialValues}
				onSubmit={handleSubmit}
				validationSchema={validationSchema}
			>
				{(props) => (
					<Form noValidate>
						<Field
							as={TextField}
							sx={{ paddingBottom: 2 }}
							id="standard-basic"
							variant="standard"
							label="Recipe name"
							placeholder="Please enter recipe name"
							name="name"
							helperText={<ErrorMessage name="name" />}
							fullWidth
							required
						></Field>
						<Field
							as={TextField}
							sx={{ paddingBottom: 2 }}
							id="standard-basic"
							variant="standard"
							label="Short Description"
							placeholder="Please enter short description here"
							name="about"
							helperText={<ErrorMessage name="about" />}
							fullWidth
							multiline
							maxRows={4}
							required
						></Field>
						<Field
							as={TextField}
							sx={{ paddingBottom: 2 }}
							id="standard-basic"
							variant="standard"
							label="Process"
							placeholder="Please enter recipe instructions here"
							name="process"
							helperText={<ErrorMessage name="process" />}
							fullWidth
							multiline
							maxRows={4}
							required
						></Field>
						<FormControl component="fieldset">
							<FormLabel component="legend">Ingredients</FormLabel>
							<FormGroup>
								{ingredients.map((ingredient) => (
									<FormControlLabel
										key={ingredient.id}
										control={
											<Checkbox
												checked={selectedIngredients.includes(ingredient.id)}
												onChange={(e) => {
													const isChecked = e.target.checked;
													setSelectedIngredients((prevSelectedIngredients) => {
														if (isChecked) {
															return [
																...prevSelectedIngredients,
																ingredient.id,
															];
														} else {
															return prevSelectedIngredients.filter(
																(id) => id !== ingredient.id
															);
														}
													});
												}}
												name={ingredient.name}
											/>
										}
										label={ingredient.name}
									/>
								))}
							</FormGroup>
							{selectedIngredients.length === 0 && (
								<FormHelperText error>
									Please select at least one ingredient.
								</FormHelperText>
							)}
						</FormControl>

						<Button
							type="submit"
							color="primary"
							variant="contained"
							sx={{
								backgroundColor: "#ff922b",
								"&:hover": {
									backgroundColor: "#ff9d40",
								},
								marginTop: "10px",
							}}
							fullWidth
							disabled={props.isSubmitting}
						>
							{props.isSubmitting ? "Posting" : "Create & Post Recipe"}
						</Button>
					</Form>
				)}
			</Formik>
		</Paper>
	);
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { createRecipe, loadMyRecipes })(
	CreateRecipe
);
