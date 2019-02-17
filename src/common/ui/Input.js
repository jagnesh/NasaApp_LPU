import React, {Component} from 'react';
import { TextInput, View, Text } from 'react-native';
import { PRIMARY_COLOR, PRIMARY_DARK_COLOR, FOCUS_COLOR, DEFAULT_COLOR} from '../util/Colors'; 


class Input extends Component{
state = {borderColor: DEFAULT_COLOR };
onFocus() {
        this.setState({
        borderColor: FOCUS_COLOR
    })
  }

  onBlur(e) {
    this.setState({
      borderColor: DEFAULT_COLOR
    })
  }

 	//const { value, label, placeholder, onChangeText, secureTextEntry } = props;
 	render(){
 		return(
		<View style={[styles.viewStyle,{borderColor: this.state.borderColor}]}>
			
			<TextInput
			onBlur={(e)=> this.onBlur()}
    		onFocus={(e)=> this.onFocus()}
			autoCapitalize = 'none'
			secureTextEntry={this.props.secureTextEntry} 
			autoCorrect={false}
			style={styles.textInputStyle}
			placeholder={this.props.placeholder}
			onChangeText={this.props.onChangeText}
			keyboardType={this.props.keyboardType}
			value={this.props.value}
			/>
		</View>

 			);
 	}

}


const styles = {
	viewStyle: {
		flexDirection: 'row',
		width:'100%',
		height: 45,
		alignItems: 'center',
		borderRadius: 8,
		borderWidth: 1,
		borderColor: DEFAULT_COLOR,
		paddingLeft: 5
	},
	textStyle: {
		flex: 1,
		color: '#000000',
		paddingLeft: 20,
		fontSize: 18

	},
	textInputStyle: {
		flex: 2,
		fontSize: 18,
		paddingRight: 5,
		paddingLeft: 5,
		lineHeight: 23
	},
};
export { Input };

