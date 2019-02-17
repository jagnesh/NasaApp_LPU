import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { PRIMARY_COLOR, PRIMARY_DARK_COLOR, FOCUS_COLOR, PRIMARY_TEXT_COLOR, ACCENT_COLOR} from '../util/Colors'; 

const Button = (props) => (
	<TouchableOpacity style={styles.viewStyle} onPress={props.onPress}>
		<Text style={styles.textStyle}>{props.children}</Text>
	</TouchableOpacity>

);

const styles = {
	viewStyle: {
		alignSelf: 'stretch',  
		flex: 1,
		backgroundColor: ACCENT_COLOR,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: PRIMARY_DARK_COLOR,
		marginLeft: 5,
		marginRight: 5,
		position: 'relative' 
	},
	textStyle: {
		fontSize: 16,
		alignSelf: 'center',
		color: PRIMARY_TEXT_COLOR,
		paddingTop: 10,
		paddingBottom: 10,
		fontWeight: '600'
	}

};

export { Button };
