import React, { Component } from 'react'; 
import PropTypes from 'prop-types'; 
import { 
    Text, 
    View,
    DatePickerAndroid,
    TimePickerAndroid,
    TouchableOpacity,
    Button,
    Switch, 
    TextInput, 
} from 'react-native'; 
 
import styles from './styles'
import ExpandableCell from '../ExpandableCell';
import moment from 'moment'; 

export default class EditTask extends Component {
    constructor(props) {
        super(props);
        let task = this.props.navigation.state.params.task;

        this.state = Object.assign({
            date: new Date(),
            expanded: false,
            dirty: false
        }, task);
    }

    static navigationOptions = {
        title: 'Edit'
    };

    _onDateChange (date) {
        this.setState({
            date,
            dateSelected: true,
            formattedDate: this._prettyDate(date),
            dirty: true
        });
    } 

    async _openDatePicker () {
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
                date: this.state.date
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                let currentDate = this.state.date;
                currentDate.setDate(day);
                currentDate.setMonth(month);
                currentDate.setYear(year);

                this._onDateChange(currentDate);
            }
        } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
        }
    }

    async _openTimePicker () {
        try {
            const {action, hour, minute} = await TimePickerAndroid.open({
                hour: 14,
                minute: 0,
                is24Hour: false, // Will display '2 PM'
            });
            if (action !== TimePickerAndroid.dismissedAction) {
                let currentDate = this.state.date;
                currentDate.setHours(hour);
                currentDate.setMinutes(minute)

                this._onDateChange(currentDate);
            }
            } catch ({code, message}) {
            console.warn('Cannot open time picker', message);
        }
    }

    _formatDate (date) { 
        return moment(date).format('L'); 
    }  

    _formatTime (date) { 
        return moment(date).format('LT'); 
    }  

    _prettyDate (date) {
        return moment(date).format('lll');
    }

    _clearDate () {
        this.setState({
            dateSelected: false,
            dirty: true
        });
    }

    _onExpand () { 
        this.setState({ 
            expanded: !this.state.expanded 
        }); 
    }

    _changeTextInputValue (text) {
        this.setState({
            text,
            dirty: true
        });
    }

    _onSwitchToggle (completed) {
        this.setState({
            completed,
            dirty: true
        });
    }

    render () { 
        const noDueDateTitle = 'Set Reminder';
        const dueDateSetTitle = 'Due On ' + this.state.formattedDate;
        const updateTaskCallback = this.props.navigation.state.params.updateTaskCallback;

        return ( 
            <View style={ styles.editTaskContainer}>
                <View style={ styles.actionContainer }>
                    <View>
                        <TextInput 
                            style={ styles.textInput} 
                            value={ this.state.text }
                            returnKeyType={ 'done' }
                            onChangeText={ (text) => this._changeTextInputValue(text) }
                        />
                    </View>
                    <View style={ styles.switchContainer } > 
                        <Text style={ styles.switchText } > 
                            Completed 
                        </Text>
                        <Switch 
                            onValueChange={ (value) => this._onSwitchToggle(value) } 
                            value={ this.state.completed } 
                        /> 
                    </View>
                    <TouchableOpacity 
                        onPress={ () => { this._openDatePicker() }}>
                            <Text>Due Date: { this._formatDate(this.state.date) }</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={ () => { this._openTimePicker() }}>
                            <Text>Due Time: { this._formatTime(this.state.date) }</Text>
                    </TouchableOpacity>
                    <View style={ styles.clearDateButtonContainer }>
                        <Button onPress={ () => { this._clearDate(); } } disabled={ this.state.dateSelected ? false : true } title={'Clear Date'} />
                    </View>
                </View>
                <View style={ styles.saveContainer }>
                    <Button onPress={ () => { updateTaskCallback(this.state); } } disabled={ !this.state.dirty } title={'Save'} />
                </View>
            </View> 
        ) 
    }
}