import React, { Component } from 'react'; 
 
import { 
  Text, 
  TouchableHighlight, 
  View 
} from 'react-native';

import styles from './styles';
 
export default class TasksListCell extends Component { 
    render () { 
        const isCompleted = this.props.completed ? 'line-through' : 'none'; 
        const textStyle = { 
            fontSize: 20, 
            textDecorationLine: isCompleted 
        };
        return ( 
            <View style={styles.rowCell}> 
                <TouchableHighlight 
                    onPress={ () => this.props.onPress(this.props.id) }
                    onLongPress={ () => this.props.onLongPress(this.props.id)}
                    underlayColor={ '#D5DBDE' } 
                    style={styles.rowCell}
                > 
                    <Text style={ textStyle }>{ this.props.text }</Text> 
                </TouchableHighlight> 
            </View> 
        ) 
    }
}