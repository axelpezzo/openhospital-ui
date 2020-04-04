import { Divider, Grid, Link, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import React, { FunctionComponent } from "react";
import OHlogo from "../../assets/images/open-hospital.png";
import styles from "./login.style";
import { useFormik } from "formik";
import { loginValidationSchema as validationSchema } from "./loginValidationSchema";
import get from "lodash.get";
import has from "lodash.has";
import TextField from "../sharedComponents/TextField/TextField";
import { TLoginProps as Props } from "./types";
import { initialValues } from "./consts";
import SummaryBoard from "./SummaryBoard";
import "./login.scss";

const Login: FunctionComponent<Props> = ({ classes, successRoute }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: values => {
      window.localStorage.setItem("user", "true");
      window.location.href = successRoute;
    },
  });

  const isValid = (fieldName: string): boolean => {
    return has(formik.touched, fieldName) && has(formik.errors, fieldName);
  };

  const getErrorText = (fieldName: string): string => {
    return has(formik.touched, fieldName) ? get(formik.errors, fieldName) : "";
  };

  return (
    <div className={classes.root}>
      <div className={classes.gridContainer}>
        <div className={classes.loginPanel}>
          <Paper className={classNames(classes.paperFlat, classes.paper)}>
            <div className={classes.gridContainer}>
              <img src={OHlogo} alt="Open Hospital" className={classes.logo} />
            </div>
            &emsp;
            <Grid className={classes.loginForm} justify="center" spacing={24}>
              <form onSubmit={formik.handleSubmit}>
                <TextField
                  field={formik.getFieldProps("email")}
                  label="Email"
                  isValid={isValid("email")}
                  errorText={getErrorText("email")}
                  onBlur={formik.handleBlur}
                />
                <TextField
                  field={formik.getFieldProps("password")}
                  label="Password"
                  type="Password"
                  isValid={isValid("password")}
                  errorText={getErrorText("password")}
                  onBlur={formik.handleBlur}
                />
                <div className={classes.gridButtonContainer}>
                  <Button
                    type="submit"
                    variant="outlined"
                    color="inherit"
                    classes={{ root: classes.button, label: classes.buttonLabel }}
                  >
                    ENTER
                  </Button>
                </div>
                <div className={classes.forgotContainer}>
                  <Link component="button" className={classes.forgotLink}>
                    FORGOT PASSWORD?
                  </Link>
                </div>
              </form>
              <Grid container className={classes.notRegisterContainer} spacing={24}>
                &emsp;
                <Divider className={classes.divider} />
              </Grid>
              <Grid container className={classes.notRegisterContainer} spacing={24}>
                <Typography variant="inherit" className={classes.notRegisterLink}>
                  If you have not registered yet,&nbsp;
                </Typography>
                <Link component="button" className={classes.notRegisterLink}>
                  CLICK HERE
                </Link>
              </Grid>
            </Grid>
          </Paper>
        </div>
        <SummaryBoard />
      </div>
    </div>
  );
};

const styledComponent = withStyles(styles, { withTheme: true })(Login);
export default styledComponent;
