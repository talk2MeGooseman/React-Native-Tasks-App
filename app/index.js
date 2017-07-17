/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import styles from './styles.js'; 
import TaskList from './components/TasksList';
import EditTask from './components/EditTask';

export default class Tasks extends Component { 
  static navigationOptions = {
    title: 'Your Tasks',
  };

  render(){ 
    return ( 
      <View style = { styles.container }> 
        <TaskList navigation={this.props.navigation} />
      </View> 
    ) 
  } 
} 

const TasksNavigator = StackNavigator({
  Home: { screen: Tasks },
  Edit: { screen: EditTask },
});

AppRegistry.registerComponent('Tasks', () => TasksNavigator);
