import { connect } from 'react-redux';
import AddReminder from './AddReminder';
import { closeAddReminder } from '../../redux/actions';


interface Props {
	onDateChange,
	selectedDate,
	onTextChange,
	reminderList,
	reminderText
}
interface State {
	addReminderStatus: {
		isOpen: boolean
	}
}

const mapStateToProps = (state:State, ownProps: Props ) => {
	const {selectedDate, onDateChange, onTextChange, reminderList, reminderText} = ownProps;
	return { 
		isOpen: state.addReminderStatus.isOpen
	};
}

const mapDispatchToProps = (dispatch: any) => {
	return {
		onClose: () => {
			dispatch( closeAddReminder() );
		}
	}
}

const AddReminderContainer = connect( mapStateToProps, mapDispatchToProps )( AddReminder );

export default AddReminderContainer;
