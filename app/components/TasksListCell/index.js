import React, { Component, PropTypes } from 'react'; 
 
import { 
  Text, 
  TouchableHighlight, 
  View 
} from 'react-native'; 
 
export default class TasksListCell extends Component { 
    render () { 
        const isCompleted = this.props.completed ? 'line-through' : 'none'; 
        const textStyle = { 
            fontSize: 20, 
            textDecorationLine: isCompleted 
        };
        return ( 
            <View> 
                <TouchableHighlight 
                    onPress={ () => this.props.onPress(this.props.id) }
                    onLongPress={ () => this.props.onLongPress(this.props.id)}
                    underlayColor={ '#D5DBDE' } > 
                    <Text style={ textStyle }>{ this.props.text }</Text> 
                </TouchableHighlight> 
            </View> 
        ) 
    }
}