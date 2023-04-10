import { Card, Grid, CardMedia, CardContent, Typography } from "@mui/material";
import React from "react";
import { connect } from "react-redux";

const Profile = ({ user }) => {
	return (
		<Grid container spacing={2}>
			<Grid item xs={4}>
				<Card sx={{ maxWidth: 345, marginLeft: 5 }}>
					<CardMedia
						sx={{ height: 340 }}
						image="/static/images/people/p1.jpeg"
						title="Asis Sayami"
					/>
					<CardContent>
						<Typography gutterBottom variant="h5" component="div">
							{user.username}
						</Typography>
						<Typography variant="body2" color="text.secondary">
							Lorem ipsum, dolor sit amet consectetur adipisicing elit.
							Excepturi maxime ullam praesentium sed doloribus! Nobis, nemo
							porro dolor voluptatem blanditiis doloribus odit magnam eveniet
							perspiciatis ipsam sunt obcaecati maiores recusandae?
						</Typography>
					</CardContent>
				</Card>
			</Grid>
		</Grid>
	);
};

const mapStateToProps = (state) => ({
	user: state.auth.user,
});

export default connect(mapStateToProps, {})(Profile);
