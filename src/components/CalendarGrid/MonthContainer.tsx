import React from 'react';
import { WithStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';
import CalendarDayContainer from '../CalendarDay/CalendarDayContainer';

const styles = (theme: Theme) => createStyles({
	monthContainer: {
		display: 'flex',
		width: '100%',
		flexGrow: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		border: '1px solid lightgray'
	}
});

interface Props extends WithStyles<typeof styles>{
	calendarCells: {
		date: Date
	}[],
	date: Date,
	reminderList
}

const MonthContainer = ( props: Props ) =>
	<div className={ props.classes.monthContainer }>
		{console.log(props)}
		{ props.calendarCells.map( ( dateObj, i ) =>
		
			<CalendarDayContainer key={ i } calendarDate={ props.date } dateObj={ dateObj } remindersList={props.reminderList}/>
			
		) }
	</div>

export default withStyles( styles )( MonthContainer );
