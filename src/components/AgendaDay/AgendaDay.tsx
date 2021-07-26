import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import {
  WithStyles,
  withStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";

import * as dateFns from "date-fns";

const styles = (theme: Theme) =>
  createStyles({
    remindersContainer: {
      minHeight: "250px",
      marginTop: "10px",
    },
    closeButton: {
      position: "absolute",
      right: "10px",
      top: "10px",
    },
    toolbarButtonHidden: {
      visibility: "hidden",
    },
    toolbarButtonVisible: {
      visibility: "visible",
    },
  });

interface Props extends WithStyles<typeof styles> {
  reminderList;
  agendaStatus: {
    isOpen: boolean;
    date: Date;
  };
  onClose: () => void;
}

const AgendaDay = (props: Props) => {
  const { classes, agendaStatus, onClose, reminderList } = props;
  const dateTitle = agendaStatus.date
    ? dateFns.format(agendaStatus.date, "LLLL do, yyyy")
    : "Closing";
  const reminderTexts = reminderList.map((reminder, i) => {
    if (
      dateFns.format(new Date(reminder.date), "yyyy-MM-dd") ==
      dateFns.format(new Date(agendaStatus.date), "yyyy-MM-dd")
    ) {
      return (
        <li key={i} style={{ color: reminder.color, fontWeight: "bold" }}>
          {reminder.reminder}:
          {dateFns.format(new Date(reminder.date), " MM-dd-yyyy' at 'HH:mm")}
        </li>
      );
    }
  });

  return (
    <Dialog
      open={agendaStatus.isOpen}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      fullWidth={true}
      maxWidth="md"
    >
      <DialogTitle id="form-dialog-title">
        {dateTitle}
        <IconButton
          aria-label="Close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider light />
      <DialogContent className={classes.remindersContainer}>
        <Typography>{reminderTexts}</Typography>
      </DialogContent>
    </Dialog>
  );
};

export default withStyles(styles)(AgendaDay);
