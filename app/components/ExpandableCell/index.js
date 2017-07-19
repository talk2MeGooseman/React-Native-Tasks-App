import React, { Component } from 'react'; 
import { PropTypes, any, bool, func, string } from 'prop-types';
import { 
    View,
    UIManager,
    Platform,
    Text, 
    TouchableHighlight, 
    LayoutAnimation
} from 'react-native'; 
 
import styles from './styles';

function emptyFn() {}

export default class ExpandableCell extends Component {
    static propTypes = { 
        children: any, 
        title: string, 
        expanded: bool, 
        onCollapse: func, 
        onExpand: func, 
        style: any
    };

    static defaultProps = { 
        expanded: false, 
        onCollapse: emptyFn, 
        onExpand: emptyFn
    }; 

    constructor(props) {
        super(props);
        
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true)
        }

        this.state = {
            expanded: this.props.expanded
        };
    }

    _expandCell () {
        LayoutAnimation.spring();
        this.setState({
            expanded: !this.state.expanded
        });
    }

    render () { 
        const { children, style, title } = this.props; 

        return ( 
            <View style={ [styles.expandableCellContainer, style] }>
                <TouchableHighlight
                    onPress={ ()=> this._expandCell() }
                    underlayColor={ '#d3d3d3' }
                >
                    <Text style={ styles.visibleContent }>{title}</Text>
                </TouchableHighlight>
                <View style={ [styles.hiddenContent, this.state.expanded ? {} : { height: 0}] }>
                    {children}
                </View>
            </View> 
        ) 
    }
}