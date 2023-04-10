import React from "react";
import {
	Card,
	CardHeader,
	Avatar,
	IconButton,
	CardMedia,
	CardContent,
	Typography,
	CardActions,
	Collapse,
	Rating,
	styled,
} from "@mui/material";

import { red } from "@mui/material/colors";
import {
	Share,
	ExpandMore,
	MoreVert,
	Favorite,
	LunchDiningRounded,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const StyledRating = styled(Rating)({
	"& .MuiRating-iconFilled": {
		color: "#ff922b",
	},
});

export default function RecipeCard(props) {
	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};
	const datetime = new Date(props.recipe.updated || props.recipe.created);
	const options = {
		month: "long",
		day: "numeric",
		year: "numeric",
	};
	const formattedDatetime = datetime.toLocaleString("en-US", options);

	return (
		<Card sx={{ maxWidth: 345, margin: "20px auto" }}>
			<CardHeader
				avatar={
					<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
						{props.recipe.chef && props.recipe.chef.slice(0, 1)}
					</Avatar>
				}
				action={
					<IconButton>
						<MoreVert />
					</IconButton>
				}
				title={props.recipe.name}
				subheader={formattedDatetime}
			/>
			<CardMedia
				component="img"
				height="194"
				image="/static/images/recipe/burger.jpeg"
			/>
			<CardContent>
				<Typography variant="body2" color="text.secondary">
					{props.recipe.about}
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				<IconButton aria-label="add to favorites">
					<Favorite />
				</IconButton>
				<IconButton aria-label="share">
					<Share />
				</IconButton>
				<StyledRating
					sx={{ marginLeft: " auto" }}
					name="rating"
					value={props.recipe.average_rating}
					precision={0.5}
					readOnly
					icon={<LunchDiningRounded fontSize="inherit" />}
					emptyIcon={<LunchDiningRounded fontSize="inherit" />}
				></StyledRating>
			</CardActions>
			<Link
				to={`/recipe/${props.recipe.id}`}
				style={{
					textDecoration: "none",
					color: "#99581a",
					margin: "5px 8px",
					display: "inline-block",
				}}
			>
				Learn More
			</Link>
		</Card>
	);
}
