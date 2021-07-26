import "date-fns";
import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker,
} from "material-ui-pickers";
import { CirclePicker } from "react-color";

import {
  WithStyles,
  withStyles,
  createStyles,
  Theme,
} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const styles = (theme: Theme) =>
  createStyles({
    addReminderFormContainer: {
      minHeight: "250px",
      marginTop: "10px",
      display: "flex",
      flexDirection: "column",
    },
    closeButton: {
      position: "absolute",
      right: "10px",
      top: "10px",
    },
    grid: {
      width: "100%",
    },
    margin: {
      margin: "5% 8%",
    },
    button: {
      margin: theme.spacing.unit,
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: "60%",
    },
  });

interface Props extends WithStyles<typeof styles> {
  isOpen: boolean;
  onClose: () => void;
  selectedDate;
  onDateChange;
  onTextChange;
  onReminderSave;
  reminderList;
  reminderText;
  color;
  updateColor;
}

const AddReminder = (props: Props) => {
  const {
    classes,
    isOpen,
    onClose,
    selectedDate,
    onDateChange,
    onTextChange,
    onReminderSave,
    reminderText,
    color,
    updateColor,
  } = props;
  console.log(props);

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      fullWidth={true}
      maxWidth="md"
    >
      <DialogTitle id="form-dialog-title">
        Add Reminder
        <IconButton
          aria-label="Close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider light />
      <DialogContent className={classes.addReminderFormContainer}>
        <Typography></Typography>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container className={classes.grid} justify="space-around">
            <DatePicker
              margin="normal"
              label="Date picker"
              value={selectedDate}
              onChange={onDateChange}
            />
            <TimePicker
              margin="normal"
              label="Time picker"
              value={selectedDate}
              onChange={onDateChange}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Enter Reminder in 30 characters or less"
              multiline
              rowsMax="4"
              value={reminderText}
              variant="outlined"
			  inputProps={{ maxLength: 30 }}
              fullWidth
              onChange={onTextChange}
			  style={{marginTop:'10px', marginBottom: '10px'}}
            />
            <Grid>
              <Typography style={{marginTop:'10px', marginBottom: '10px'}}>
				
                  {color.hex
                    ? `Pick Text Color ${color.hex}`
                    : "Pick Text Color"}
                
              </Typography>
              <CirclePicker color={color} onChange={updateColor} />
            </Grid>
          </Grid>
        </MuiPickersUtilsProvider>
      </DialogContent>
      <Button
        variant="contained"
        size="medium"
        color="primary"
        className={classes.margin}
        onClick={onReminderSave}
      >
        Save Reminder
      </Button>
    </Dialog>
  );
};

export default withStyles(styles)(AddReminder);
