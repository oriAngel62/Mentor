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

export default function MissionForm({day,onTitleChange,onRankChange=undefined, rank, onDescriptionChange, onDeadlineChange, onSliderChange, onSelectChange, appointmentData, interval, isAssigned=true}){
  console.log("appointmentData:", appointmentData);
  const [dayName, setDayName] = day;
  

  // return (
  //     <>
  //         <AppointmentForm.TextEditor
  //         value={appointmentData.title}
  //         onValueChange={onTitleChange}
  //         placeholder="Title"
  //         />
  //         <AppointmentForm.TextEditor
  //         value={appointmentData.description}
  //         onValueChange={onDescriptionChange}
  //         placeholder="Description"
  //         type='multilineTextEditor'
  //         />
  //         {isAssigned ?
  //         <>
  //         <AppointmentForm.Label
  //           text="Rank:"
  //           type="regular"
  //           />
  //         <Slider
  //             marks
  //             onChange={onRankChange}
  //             valueLabelDisplay="auto"
  //             step={0.1}
  //             min={1}
  //             max={10}
  //             value={rank}
  //         />
  //         </> :
  //         <>
  //         <AppointmentForm.Label
  //         text="Deadline:"
  //         type="regular"
  //         />
  //         <AppointmentForm.DateEditor
  //         value={appointmentData.deadline}
  //         onValueChange={onDeadlineChange}
  //         readOnly={isAssigned}
  //         />
  //         <CheckSelect useNset={[dayName, setDayName]}/>
  //         <Box sx={{ width: 400 }}>
  //           <AppointmentForm.Label
  //           text="Optional hours:"
  //           type="regular"
  //           />
  //           <Slider
  //               marks
  //               value={interval}
  //               onChange={onSliderChange}
  //               valueLabelDisplay="auto"
  //               step={0.25}
  //               min={9.00}
  //               max={20.00}
  //           />
  //         </Box>
  //         <AppointmentForm.Label
  //         text="Priority:"
  //         type="regular"
  //         />
  //         <AppointmentForm.Select
  //         sx={{ width: 400 }}
  //         onValueChange={onSelectChange}
  //         value={appointmentData.priority ? appointmentData.priority : 0}
  //         availableOptions={[{id: 0, text: "Low"}, {id: 1, text: "Medium"}, {id: 2, text: "High"}]}
  //         />
  //         </>}
          
  //     </>
  // );

  return (
    <React.Fragment>
        <AppForm>
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
                  autoComplete="user-name"
                  autoFocus
                  multiline
                  component={RFTextField}
                  disabled={submitting || sent}
                  fullWidth
                  label="Description"
                  margin="normal"
                  name="id"
                  required
                  size="large"
                />
                <Field
                  fullWidth
                  size="large"
                  component={RFTextField}
                  disabled={submitting || sent}
                  required
                  name="password"
                  autoComplete="current-password"
                  label="Rank"
                  type="password"
                  margin="normal"
                />
                <Field
                  fullWidth
                  size="large"
                  component={RFTextField}
                  disabled={submitting || sent}
                  required
                  name="password"
                  autoComplete="current-password"
                  label="Deadline"
                  type="password"
                  margin="normal"
                />
                <Field
                  fullWidth
                  size="large"
                  component={RFTextField}
                  disabled={submitting || sent}
                  required
                  name="password"
                  autoComplete="current-password"
                  label="Optional hours"
                  type="password"
                  margin="normal"
                />
                <Field
                  fullWidth
                  size="large"
                  component={RFTextField}
                  disabled={submitting || sent}
                  required
                  name="password"
                  autoComplete="current-password"
                  label="Priority"
                  type="password"
                  margin="normal"
                />
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
        </AppForm>
      </React.Fragment>
  );
};