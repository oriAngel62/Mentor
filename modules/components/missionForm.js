import Slider from '@mui/material/Slider';
import CheckSelect from './checkSelect';
import * as React from "react";
import { Field, Form, FormSpy } from "react-final-form";
import Box from "@mui/material/Box";
import Typography from "/modules/components/Typography";
import AppForm from "/modules/views/AppForm";
import RFTextField from "/modules/form/RFTextField";
import FormButton from "/modules/form/FormButton";
import FormFeedback from "/modules/form/FormFeedback";
import { required } from "/modules/form/validation";
import { FORM_ERROR } from "final-form";
import RFDateField from '../form/RFDateField';
import RatingField from '../form/RatingField';
import MenuItem from '@mui/material/MenuItem';
import SelectField from '../form/SelectField';
import TimeField from '../form/TimeField';
import ModalForm from '../views/ModalForm';


export default function MissionForm({day,onTitleChange,onRankChange=undefined, rank, onDescriptionChange, onDeadlineChange, onSliderChange, onSelectChange, appointmentData, interval, isAssigned=true}){
  console.log("appointmentData:", appointmentData);
  const [dayName, setDayName] = day;
  const [sent, setSent] = React.useState(false);

  const validate = (values) => {
    const errors = required(["title", "deadline", "startHour", "endHour", "priority"], values);
    return errors;
  };

  const handleSubmit = async (values) => {
    setSent(true);
    // let flag = false;
    // const res = await fetch("https://localhost:7204/api/Users/Login", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(values),
    // }).catch((err) => {
    //   flag = true;
    // });
    // if (flag) {
    //   setSent(false);
    //   return { [FORM_ERROR]: "Server error" };
    // } else if (res.status === 200) {
    //   const tokenJson = await res.json();
    //   dispatch(setAuthState("Bearer " + tokenJson.token));
    //   router.push("/");
    // } else {
    //   setSent(false);
    //   return { [FORM_ERROR]: "Wrong User name or Password" };
    // }
  };
  

  return (
    <React.Fragment>
        <ModalForm>
          <React.Fragment>
            <Typography variant="h3" gutterBottom marked="center" align="center">
              Appointment Form
            </Typography>
          </React.Fragment>
          <Form
            onSubmit={handleSubmit}
            subscription={{ submitting: true }}
            validate={validate}
          >
            {({ handleSubmit: handleSubmit2, submitting }) => (
              <Box
                component="form"
                onSubmit={handleSubmit2}
                noValidate
                sx={{ mt: 6 }}
              >
                <Field
                  autoComplete="Title"
                  autoFocus
                  component={RFTextField}
                  disabled={submitting || sent}
                  fullWidth
                  label="Title"
                  margin="normal"
                  name="title"
                  size="large"
                />
                <Field
                  autoComplete="Description"
                  autoFocus
                  multiline
                  component={RFTextField}
                  disabled={submitting || sent}
                  fullWidth
                  label="Description"
                  margin="normal"
                  name="description"
                  size="large"
                />
                <Typography variant="body1">
                  {"Rank "}
                </Typography>
                <Field
                  fullWidth
                  size="large"
                  component={RatingField}
                  max={10}
                  precision={0.1}
                  disabled={submitting || sent}
                  name="rank"
                  autoComplete="current-password"
                  label="Rank"
                  margin="normal"
                />
                <br />
                <br />
                <Field
                  fullWidth
                  size="large"
                  component={RFDateField}
                  disabled={submitting || sent}
                  required
                  name="deadline"
                  autoComplete="Deadline"
                  label="Deadline"
                  margin="normal"
                />
                <br />
                <br />
                <Typography variant="body1">
                  {"Optional hours"}
                </Typography>
                <Field
                  fullWidth
                  size="large"
                  component={TimeField}
                  disabled={submitting || sent}
                  required
                  name="startHour"
                  autoComplete="Start hour"
                  label="Start hour"
                  margin="normal"
                />
                <b> _ </b>
                <Field
                  fullWidth
                  size="large"
                  component={TimeField}
                  disabled={submitting || sent}
                  required
                  name="endHour"
                  autoComplete="End hour"
                  label="End hour"
                  margin="normal"
                />
                <br />
                <br />
                <Field
                  size="large"
                  component={SelectField}
                  disabled={submitting || sent}
                  required
                  name="priority"
                  autoComplete="Priority"
                  label="Priority"
                  margin="normal"
                >
                  <MenuItem value={0}>Low</MenuItem>
                  <MenuItem value={1}>Medium</MenuItem>
                  <MenuItem value={2}>High</MenuItem>
                </Field>
                <FormSpy subscription={{ submitError: true }}>
                  {({ submitError }) =>
                    submitError ? (
                      <FormFeedback error sx={{ mt: 2 }}>
                        {submitError}
                      </FormFeedback>
                    ) : null
                  }
                </FormSpy>
                <FormButton
                  sx={{ mt: 3, mb: 2 }}
                  disabled={submitting || sent}
                  size="large"
                  color="secondary"
                  fullWidth
                >
                  {submitting || sent ? "In progress…" : "Save"}
                </FormButton>
              </Box>
            )}
          </Form>
        </ModalForm>
      </React.Fragment>
  );
};