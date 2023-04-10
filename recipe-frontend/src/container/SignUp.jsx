import React from "react";
import {
	Grid,
	Paper,
	Avatar,
	TextField,
	RadioGroup,
	FormControl,
	FormLabel,
	FormControlLabel,
	Button,
	Typography,
	Link,
	Radio,
	FormGroup,
	Checkbox,
	FormHelperText,
} from "@mui/material";
import { LunchDiningRounded } from "@mui/icons-material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { register } from "../actions/auth"; 
import * as Yup from "yup";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

const SignUp = ({register, isRegistered}) => {
	const paperStyle = {
		padding: 20,
		width: 360,
		margin: "0 auto",
		marginTop: "80px",
		marginBottom: "20px"
	};
	const avatarStyle = {
		backgroundColor: "#ff922b",
	};
	const btnStyle = {
		marginBottom: 15,
		marginTop: 15,
	};
	const linkStyle = {
		fontSize: 12,
	};
	const initialValues = {
		username: "",
		email: "",
		gender: "",
		contact: "",
		password: "",
		confirmPassword: "",
		termsAndConditions: false,
	};
	const handleSubmit = (values, props) => {
		console.log(values);
		console.log(props);
		register(values.email, values.password, values.username)
		setTimeout(() => {
			// props.resetForm();
			props.setSubmitting(false);
		}, 1000);
	};

	if (isRegistered) {
		return <Navigate to='/login'></Navigate>
	}

	const validationSchema = Yup.object().shape({
		username: Yup.string().required("Field is required"),
		email: Yup.string().email("Enter valid email").required(),
		gender: Yup.string()
			.oneOf(["male", "female", "other"], "One value must be selected")
			.required(),
		password: Yup.string()
			.min(8, "Password minimum length should be 8")
			.required(),
		confirmPassword: Yup.string().oneOf(
			[Yup.ref("password")],
			"Passwords not matching"
		),
		contact: Yup.number().required(),
		termsAndConditions: Yup.string().oneOf(
			["true"],
			"Accept terms & conditions to register."
		),
	});
	return (
		<Grid>
			<Paper style={paperStyle}>
				<Grid align="center">
					<Avatar style={avatarStyle}>
						<LunchDiningRounded sx={{ fill: "#ffe9d5" }} />
					</Avatar>
					<p>Sign Up</p>
				</Grid>
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
								label="Username"
								placeholder="Enter username"
								name="username"
								helperText={<ErrorMessage name="username" />}
								fullWidth
								required
							></Field>
							<Field
								as={TextField}
								sx={{ paddingBottom: 2 }}
								id="standard-basic"
								variant="standard"
								label="Email"
								placeholder="Enter Email Id"
								name="email"
								helperText={<ErrorMessage name="email" />}
								fullWidth
								required
							></Field>
							<FormControl>
								<FormLabel id="demo-radio-buttons-group-label">
									Gender
								</FormLabel>
								<Field
									as={RadioGroup}
									row
									aria-labelledby="demo-radio-buttons-group-label"
									defaultValue="female"
									name="gender"
								>
									<FormControlLabel
										value="female"
										control={<Radio />}
										label="Female"
									/>
									<FormControlLabel
										value="male"
										control={<Radio />}
										label="Male"
									/>
									<FormControlLabel
										value="other"
										control={<Radio />}
										label="Other"
									/>
								</Field>
							</FormControl>
							<FormHelperText>
								<ErrorMessage name="gender" />
							</FormHelperText>
							<Field
								as={TextField}
								sx={{ paddingBottom: 2 }}
								id="standard-basic"
								variant="standard"
								label="Contact"
								placeholder="Enter Phone Number"
								name="contact"
								helperText={<ErrorMessage name="contact" />}
								fullWidth
								required
							></Field>
							<Field
								as={TextField}
								sx={{ paddingBottom: 2 }}
								id="standard-basic"
								variant="standard"
								label="Password"
								placeholder="Enter Password"
								name="password"
								helperText={<ErrorMessage name="password" />}
								fullWidth
								type="password"
								required
							></Field>
							<Field
								as={TextField}
								id="standard-basic"
								variant="standard"
								label="Confirm Password"
								placeholder="Enter Password"
								name="confirmPassword"
								helperText={
									<ErrorMessage name="confirmPassword" />
								}
								fullWidth
								type="password"
								required
							></Field>
							<FormControlLabel
								control={
									<Field
										as={Checkbox}
										checked={
											props.values.termsAndConditions
										}
										name="termsAndConditions"
									/>
								}
								name="termsAndConditions"
								label="I accept the terms and conditions."
							/>
							<FormHelperText>
								<ErrorMessage name="termsAndConditions"></ErrorMessage>
							</FormHelperText>
							<Typography>
								<Link href="#" style={linkStyle}>
									Terms and conditions
								</Link>
							</Typography>
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
								{props.isSubmitting ? "Submitting" : "Sign Up"}
							</Button>
						</Form>
					)}
				</Formik>
			</Paper>
		</Grid>
	);
}

const mapStateToProps = state => ({
	isRegistered: state.auth.isRegistered
})


export default connect(mapStateToProps, { register })(SignUp)