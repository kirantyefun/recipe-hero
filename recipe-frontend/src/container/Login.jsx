import React from "react";
import {
	Grid,
	Paper,
	Avatar,
	TextField,
	Checkbox,
	FormGroup,
	FormControlLabel,
	Button,
	Typography,
	Link,
} from "@mui/material";
import { LunchDiningRounded } from "@mui/icons-material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link as RouterLink, Navigate } from "react-router-dom";
import { login } from '../actions/auth';
import { connect } from 'react-redux';

const Login = ({login, isAuthenticated}) => {
	const paperStyle = {
		padding: 20,
		width: 360,
		margin: "0 auto",
		marginTop: "80px",
	};
	const avatarStyle = {
		backgroundColor: "#ff922b",
	};
	const btnStyle = {
		marginBottom: 15,
		marginTop: 15,
	};
	const initialValues = {
		username: "",
		password: "",
		rememberMe: false,
	};
	const onSubmit = (values, props) => {
		console.log(values);
		login(values.username, values.password);
		setTimeout(() => {
			props.resetForm()
			props.setSubmitting(false)
		}, 2000)
	};

	if (isAuthenticated) {
		return <Navigate to='/' />
	}
	const validationSchema = Yup.object().shape({
		username: Yup.string().email("Please enter valid email").required("Please enter valid email"),
		password: Yup.string().required("Required field")
	})
	return (
		<Grid>
			<Paper style={paperStyle}>
				<Grid align="center">
					<Avatar style={avatarStyle}>
						<LunchDiningRounded sx={{ fill: "#ffe9d5"}} />
					</Avatar>
					<p>Sign In</p>
				</Grid>
				<Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
					{(props) => (
						<Form noValidate>
							<Field
								as={TextField}
								name="username"
								sx={{ paddingBottom: 2 }}
								id="standard-basic"
								variant="standard"
								label="Username"
								placeholder="Enter Username"
								helperText={<ErrorMessage name="username" />}
								fullWidth
								required
							></Field>
							<Field
								as={TextField}
								id="standard-basic"
								variant="standard"
								label="Password"
								placeholder="Enter Password"
								name="password"
								type="password"
								helperText={<ErrorMessage name="password" />}
								fullWidth
								required
							></Field>
							<FormGroup>
								<FormControlLabel
									control={<Field as={Checkbox} name="rememberMe" />}
									label="Remember me"
								/>
							</FormGroup>
							<Button
								type="submit"
								sx={{
									backgroundColor: "#ff922b",
									"&:hover": {
										backgroundColor: "#ff9d40",
									},
								}}
								variant="contained"
								style={btnStyle}
								fullWidth
								disabled={props.isSubmitting}
							>
								{props.isSubmitting ? "Logging In" : "Log In"}
							</Button>
						</Form>
					)}
				</Formik>
				<Typography>
					<Link href="#">Forgot Password?</Link>
				</Typography>
				<Typography>
					Don't have an account yet?
					<RouterLink to='/signUp'></RouterLink>
				</Typography>
			</Paper>
		</Grid>
	);
}

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login);