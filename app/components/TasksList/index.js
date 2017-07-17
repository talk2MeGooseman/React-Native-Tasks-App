import React, { Component } from 'react';
import {
  View,
  FlatList,
  TextInput,
  AsyncStorage
} from 'react-native';

import styles from '../../styles'; 
import TasksListCell from '../TasksListCell'; 

export default class TaskList extends Component {
    constructor (props) {
        super(props);

        this.state = {
            text: '',
            listOfTasks: []
        }
    }

    componentDidMount () {
        this._updateList();
    }

    _getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    async _addTask () {
        let newTask = {
            key: this._getRandomInt(1,100000000),
            text: this.state.text, 
            completed: false
        };

        const listOfTasks = [...this.state.listOfTasks, newTask ]; 

        await AsyncStorage.setItem('listOfTasks', 
            JSON.stringify(listOfTasks));

        this._updateList();
    }

    async _updateTasks () {
        await AsyncStorage.setItem('listOfTasks', 
            JSON.stringify(this.state.listOfTasks));
    }
    
    async _updateList () { 
        let response = await AsyncStorage.getItem('listOfTasks'); 
        let listOfTasks = await JSON.parse(response) || []; 
    
        this.setState({ 
            listOfTasks 
        }); 
    
        this._changeTextInputValue(''); 
     } 

    _changeTextInputValue (text) {
        this.setState({ 
            text 
        }); 
    }

    _completeTask (id) {
        let listOfTasks = Object.assign([], this.state.listOfTasks);
        listOfTasks.forEach((task) => {
            if(task.key === id) task.completed = !task.completed;
        });

        this.setState({ 
            listOfTasks
        });

        this._updateTasks();
    }

    _editTask (id) {
        let task = this.state.listOfTasks.find((task) => {
            return task.key === id;
        });

        this.props.navigation.navigate('Edit', { task });
    }

    _renderRowData (rowData) { 
        return ( 
            <TasksListCell
                completed={ rowData.completed}
                id={rowData.key}
                onPress={ (id) => this._completeTask(id) }
                text={ rowData.text }
                onLongPress={ (id) => this._editTask(id) }
            />
        ) 
    }

    render () {        
        return (
            <View>
                <TextInput
                    autoCorrect={false}
                    onChangeText={ (text) => this._changeTextInputValue(text) }
                    onSubmitEditing={ () => this._addTask() }
                    returnKeyType={ 'done' }
                    style={ styles.textInput }
                    value={ this.state.value }
                />
                <FlatList 
                    data={this.state.listOfTasks}
                    renderItem={ ({item}) => this._renderRowData(item) }
                />
            </View>
        );
    }
};