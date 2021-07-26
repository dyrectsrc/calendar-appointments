import React, { Component } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import green from "@material-ui/core/colors/green";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import {
  WithStyles,
  withStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import * as dateFns from "date-fns";
import CalendarGrid from "../CalendarGrid";
import AgendaDayContainer from "../AgendaDay/AgendaDayContainer";
import AddReminderContainer from "../AddReminder/AddReminderContainer";
import "./App.css";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
    },
    calendar: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "10px",
      margin: "25px",
      width: "100%",
      height: "90%",
    },
    calendarHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: "100px",
      width: "100%",
    },
    fabAdd: {
      position: "absolute",
      bottom: "60px",
      right: "50px",
      color: "#FFF",
      backgroundColor: green[600],
      "&:hover": {
        backgroundColor: green[800],
      },
    },
  });

interface Props extends WithStyles<typeof styles> {
  onFabAddClick: () => void;
}

interface State {
  date: Date;
  reminderList: any[];
  selectedDate: Date;
  reminderText: any;
  color: any;
}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      date: new Date(),
      reminderList: [],//Create reminderList array of objects to hold all reminders and to be used by AgendaDay, AddReminder, and CalendarDay components.
      selectedDate: new Date(),//Used to update Date field in addReminder component and reminderList date property
      reminderText: "", //Used to update text field in addReminder component and reminderList text property
      color: "#ffeeff",//Used to update color field in addReminder component and reminderList color property
    };
  }

  compnentDidMount() {}

  updateColor = (color) => {
    this.setState({ color: color });
  };

  handleDateChange = (date) => {
    this.setState({ selectedDate: date });
  };

  handleTextChange = (e) => {
    this.setState({ reminderText: e.target.value });
  };
  
  //Adds new reminder to reminderList array state when save button is clicked
  handleReminderSave = () => {
    this.setState((prevState) => ({
      reminderList: [
        ...prevState.reminderList,
        {
          date: this.state.selectedDate,
          reminder: this.state.reminderText,
          color: this.state.color.hex,
        },
      ],
    }));
    this.setState({ selectedDate: new Date(), reminderText: "", color: "" });
  };
  // arrow functions to skip binding in constructor
  prevMonth = () => {
    this.setState({ date: dateFns.subMonths(this.state.date, 1) });
  };

  nextMonth = () => {
    this.setState({ date: dateFns.addMonths(this.state.date, 1) });
  };

  render() {
    const { classes, onFabAddClick } = this.props;
    const { date } = this.state;

    const month = date.toLocaleString("en-us", { month: "long" });
    const year = dateFns.getYear(date);

    return (
      <div className={classes.root}>
        <Paper className={classes.calendar}>
          <header className={classes.calendarHeader}>
            <IconButton aria-label="Last Month" onClick={this.prevMonth}>
              <KeyboardArrowLeftIcon fontSize="large" />
            </IconButton>
            <Typography variant="h3">
              {month} {year}
            </Typography>
            <IconButton aria-label="Next Month" onClick={this.nextMonth}>
              <KeyboardArrowRightIcon fontSize="large" />
            </IconButton>
          </header>
          <CalendarGrid date={date} reminderList={this.state.reminderList} />
          <Fab
            aria-label="Add"
            className={classes.fabAdd}
            onClick={onFabAddClick}
          >
            <AddIcon />
          </Fab>
        </Paper>
        <AgendaDayContainer reminderList={this.state.reminderList} />
        <AddReminderContainer
          selectedDate={this.state.selectedDate}
          reminderText={this.state.reminderText}
          reminderList={this.state.reminderList}
          onDateChange={this.handleDateChange}
          onTextChange={this.handleTextChange}
          updateColor={this.updateColor}
          onReminderSave={this.handleReminderSave}
          color={this.state.color}
        />
      </div>
    );
  }
}

export default withStyles(styles)(App);
