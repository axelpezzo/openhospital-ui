import React, { FunctionComponent } from "react";
import { TProps } from "./types";
import { useFormik } from "formik";
import has from "lodash.has";
import get from "lodash.get";
import profilePicturePlaceholder from "../../../assets/profilePicturePlaceholder.png";
import TextField from "../textField/TextField";
import { object, string } from "yup";
import SmallButton from "../smallButton/SmallButton";
import "./styles.scss";
import TextButton from "../textButton/TextButton";
import { PatientDTO } from "../../../generated";

const PatientDataForm: FunctionComponent<TProps> = ({
  initialValues,
  profilePicture,
  onSubmit,
  submitButtonLabel,
}) => {
  const validationSchema = object({
    firstName: string().required("This field is required"),
    //TODO: write schema
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const isValid = (fieldName: string): boolean => {
    return has(formik.touched, fieldName) && has(formik.errors, fieldName);
  };

  const getErrorText = (fieldName: string): string => {
    return has(formik.touched, fieldName) ? get(formik.errors, fieldName) : "";
  };

  return (
    <div className="patientDataForm">
      <div className="patientDataForm__profilePictureContainer">
        <img
          src={profilePicture ? profilePicture : profilePicturePlaceholder}
          alt="profilePicture"
        />
        <div className="patientDataForm__profilePictureContainer__label">
          Click to add a photo
        </div>
      </div>
      <form className="patientDataForm__form" onSubmit={formik.handleSubmit}>
        <div className="row start-sm center-xs">
          <div className="patientDataForm__item">
            <TextField
              field={formik.getFieldProps("firstName")}
              theme="regular"
              label="Name"
              isValid={isValid("firstName")}
              errorText={getErrorText("firstName")}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="patientDataForm__item">
            <TextField
              field={formik.getFieldProps("secondName")}
              theme="regular"
              label="Surname"
              isValid={isValid("secondName")}
              errorText={getErrorText("secondName")}
              onBlur={formik.handleBlur}
            />
          </div>

          <div className="patientDataForm__item">
            <TextField
              field={formik.getFieldProps("taxCode")}
              theme="regular"
              label="Tax Code"
              isValid={isValid("taxCode")}
              errorText={getErrorText("taxCode")}
              onBlur={formik.handleBlur}
            />
          </div>
        </div>

        <div className="row start-sm center-xs">
          <div className="patientDataForm__item">
            <TextField
              field={formik.getFieldProps("sex")}
              theme="regular"
              label="Gender"
              isValid={isValid("sex")}
              errorText={getErrorText("sex")}
              onBlur={formik.handleBlur}
            />
          </div>

          <div className="patientDataForm__item">
            <TextField
              field={formik.getFieldProps("birthDate")}
              theme="regular"
              label="Data of Birth"
              isValid={isValid("birthDate")}
              errorText={getErrorText("birthDate")}
              onBlur={formik.handleBlur}
            />
          </div>
        </div>

        <div className="row start-sm center-xs">
          <div className="patientDataForm__item">
            <TextField
              field={formik.getFieldProps("address")}
              theme="regular"
              label="Address"
              isValid={isValid("address")}
              errorText={getErrorText("address")}
              onBlur={formik.handleBlur}
            />
          </div>

          <div className="patientDataForm__item">
            <TextField
              field={formik.getFieldProps("city")}
              theme="regular"
              label="City"
              isValid={isValid("city")}
              errorText={getErrorText("city")}
              onBlur={formik.handleBlur}
            />
          </div>

          <div className="patientDataForm__item">
            <TextField
              field={formik.getFieldProps("zipCode")}
              theme="regular"
              label="ZIP Code"
              isValid={isValid("zipCode")}
              errorText={getErrorText("zipCode")}
              onBlur={formik.handleBlur}
            />
          </div>
        </div>

        <div className="row start-sm center-xs">
          <div className="patientDataForm__item">
            <TextField
              field={formik.getFieldProps("bloodType")}
              theme="regular"
              label="Blood Type"
              isValid={isValid("bloodType")}
              errorText={getErrorText("bloodType")}
              onBlur={formik.handleBlur}
            />
          </div>
        </div>

        <div className="row start-sm center-xs">
          <div className="patientDataForm__item">
            <TextField
              field={formik.getFieldProps("telephone")}
              theme="regular"
              label="Telephone"
              isValid={isValid("telephone")}
              errorText={getErrorText("telephone")}
              onBlur={formik.handleBlur}
            />
          </div>

          <div className="patientDataForm__item">
            <TextField
              field={formik.getFieldProps("email")}
              theme="regular"
              label="Email"
              isValid={isValid("email")}
              errorText={getErrorText("email")}
              onBlur={formik.handleBlur}
            />
          </div>
        </div>
        <div className="row start-sm center-xs">
          <div className="patientDataForm__item">
            <TextField
              field={formik.getFieldProps("insurance")}
              theme="regular"
              label="Insurance"
              isValid={isValid("insurance")}
              errorText={getErrorText("insurance")}
              onBlur={formik.handleBlur}
            />
          </div>
        </div>

        <div className="patientDataForm__buttonSet">
          <div>
            <SmallButton type="submit">{submitButtonLabel}</SmallButton>
          </div>
          <div>
            <TextButton>Clear All</TextButton>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PatientDataForm;
