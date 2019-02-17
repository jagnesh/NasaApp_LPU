import React from 'react';
import { View } from 'react-native';

const Card = (props) => (
	<View style={[styles.viewStyle,props.style ]}>{props.children}</View>
	);

const styles = {
	viewStyle: {
		borderColor: '#DDDDDD',
		borderRadius: 2,
		borderWidth: 1,
		shadowColor: '#000000',
		shadowOpacity: 0.1,
		shadowRadius: 2,
		elevation: 1,
		shadowOffset: {
			width: 0,
			height: 2
		},
		marginLeft: 5,
		marginRight: 5,
		marginTop: 10,
		borderBottomWidth: 0
	}

};

export { Card };

