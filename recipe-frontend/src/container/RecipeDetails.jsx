import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
	Grid,
	Card,
	CardMedia,
	CardContent,
	Typography,
	Rating,
	styled,
	TextField,
	Button,
	Paper
} from "@mui/material";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { LunchDiningRounded } from "@mui/icons-material";
import { postReview } from "../actions/recipe";
import { connect } from "react-redux";

const StyledRating = styled(Rating)({
	"& .MuiRating-iconFilled": {
		color: "#ff922b",
	},
});

const RecipeDetails = ({postReview}) => {
	const { id } = useParams();
	const [recipe, setRecipe] = useState(null);

    const [ratingValue, setRatingValue] = useState(0);

	useEffect(() => {
		const fetchRecipe = async () => {
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
				const data = res.data;
				setRecipe(data);
			} catch (err) {
				console.log(err);
			}
		};
		fetchRecipe();
	}, [id]);

	if (!recipe) {
		return <div>Loading...</div>;
	}

	const paperStyle = {
		padding: "2rem",
		marginLeft: "2.5rem",
		marginRight: "1rem",
		marginBottom: "2rem",
		maxWidth: 280,
	};
	const avatarStyle = {
		backgroundColor: "lightblue",
	};
	const btnStyle = {
		marginBottom: 15,
		marginTop: 15,
		backgroundColor: "#ff922b",
	};
	const linkStyle = {
		fontSize: 12,
	};
	const initialValues = {
		comment: "",
	};

	const handleSubmit = async (values, props) => {
		console.log(values);
		console.log(props);
        
        try{
            const data = await postReview(ratingValue, values.comment, id)
            setRecipe(data)
        } catch (err) {
            console.log(err)
        }
		setTimeout(() => {
			props.resetForm();
            setRatingValue(0);
			props.setSubmitting(false);
		}, 1000);
	};


	const validationSchema = Yup.object().shape({
		comment: Yup.string().required("Field is required"),
	});

	return (
		<Grid container spacing={2}>
			<Grid item xs={4}>
				<Grid container direction="column" spacing={4}>
					<Grid item>
						<Card sx={{ maxWidth: 345, marginLeft: 5 }}>
							<CardMedia
								sx={{ height: 340 }}
								image="/static/images/recipe/burger.jpeg"
								title={recipe.name}
							/>
							<CardContent>
								<Typography gutterBottom variant="h5" component="div">
									{recipe.name}
								</Typography>
								<Typography variant="body2" color="text.secondary">
									{recipe.about}
								</Typography>
							</CardContent>
						</Card>
					</Grid>
					<Grid item>
						<Paper style={paperStyle} elevation={2}>
							<strong>Add your review</strong>
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
											label="Comment"
											placeholder="Please enter your comment here"
											name="comment"
											helperText={<ErrorMessage name="comment" />}
											fullWidth
                                            multiline
                                            maxRows={4}
											required
										></Field>
										{/* <Field
											as={TextField}
											sx={{ paddingBottom: 2 }}
											id="standard-basic"
											variant="standard"
											label="Rating"
											placeholder="Enter your rating"
											name="rating"
											helperText={<ErrorMessage name="rating" />}
											fullWidth
											required
										></Field> */}
										{/* <Field
											as={Rating}
											sx={{ paddingBottom: 2 }}
											id="standard-basic"
											name="rating"
											helperText={<ErrorMessage name="rating" />}
											// fullWidth
											required
										></Field> */}
										<Rating
											name="rating"
											value={ratingValue}
											onChange={(event, newValue) => {
												setRatingValue(newValue);
											}}
										/>

										<Button
											type="submit"
											color="primary"
											variant="contained"
											style={btnStyle}
											fullWidth
											disabled={props.isSubmitting}
										>
											{props.isSubmitting ? "Posting" : "Post review"}
										</Button>
									</Form>
								)}
							</Formik>
						</Paper>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={8}>
				<p>Posted By:</p>
				<strong style={{ color: "#444" }}>{recipe.chef}</strong>
				<hr />
				<Typography variant="h2" gutterBottom>
					Ingredients Used
				</Typography>
				<ul style={{ marginBottom: "5rem" }}>
					{recipe.ingredients.map((ingredient, index) => (
						<li key={index}>{ingredient}</li>
					))}
				</ul>
				<Typography variant="h3">Instructions</Typography>
				<hr />
				<Typography variant="body1" gutterBottom sx={{ marginBottom: "4rem" }}>
					{recipe.process}
				</Typography>
				<Typography variant="h5" gutterBottom>
					Reviews and Ratings
				</Typography>
				<hr />
				<span>Total Reviews: </span> {recipe.reviews.length}
				{recipe.reviews.map((review) => {
					return (
						<Grid
							container
							spacing={1}
							alignItems={"center"}
							sx={{ backgroundColor: "", padding: "10px" }}
						>
							<Grid item xs={6}>
								<p>- {review.comment}</p>
							</Grid>
							<Grid item xs={3}>
								<StyledRating
									sx={{ marginLeft: " auto" }}
									name="rating"
									value={review.rating}
									precision={0.5}
									readOnly
									icon={<LunchDiningRounded fontSize="inherit" />}
									emptyIcon={<LunchDiningRounded fontSize="inherit" />}
								></StyledRating>
							</Grid>
							<Grid item xs={3}>
								<p style={{ fontSize: "10px" }}>{review.user}</p>
							</Grid>
						</Grid>
					);
				})}
			</Grid>
		</Grid>
	);
};


export default connect(null, {postReview})(RecipeDetails)