import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { connect } from "react-redux";
import { checkAuthenticated, load_user, closeSnackbar } from "../actions/auth";
import { Alert, Snackbar, Button , IconButton } from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";

const Layout = (props) => {
	useEffect(() => {
		props.checkAuthenticated();
		props.load_user();
	}, []);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    props.closeSnackbar();
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseOutlined fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  

	return (
		<div>
			<Navbar />
			<Snackbar
				open={props.toastOpen}
				autoHideDuration={6000}
				onClose={handleClose}
			>
        <Alert onClose={handleClose} severity={props.severity} sx={{ width: '100%' }}>
          {props.toastMessage}
        </Alert>
      </Snackbar>
			{props.children}
		</div>
	);
};

const mapStateToProps = state => ({
  toastOpen: state.auth.toastOpen,
  toastMessage: state.auth.toastMessage,
  severity: state.auth.severity,
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { checkAuthenticated, load_user, closeSnackbar })(Layout);
