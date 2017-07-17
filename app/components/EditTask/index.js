import React, { Component } from 'react'; 
 
import { 
  Text, 
  View,
  DatePickerAndroid,
  TouchableOpacity
} from 'react-native'; 
 
import styles from './styles'
export default class EditTask extends Component {
    constructor(props) {
        super(props);
        let task = this.props.navigation.state.params.task;
        
        this.state = Object.assign(task, {
            date: new Date()
        });
    }

    static navigationOptions = {
        title: 'Edit',
    };

    _onDateChange (date) { 
        this.setState({ 
            date 
        });
    } 

    async _openDatePicker () {
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
                date: this.state.date
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                let newDate = new Date(year, month, day);
                this._onDateChange(newDate);
            }
        } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
        }
    }

    render () { 
        return ( 
            <View style={ styles.editTaskContainer}>  
                <Text style={ styles.editTaskText}>{ this.state.text }</Text>
                <Text>Date: { this.state.date.toDateString() }</Text>
                <TouchableOpacity onPress={ () => { this._openDatePicker() }}><Text>Change Date</Text></TouchableOpacity>
            </View> 
        ) 
    }
}