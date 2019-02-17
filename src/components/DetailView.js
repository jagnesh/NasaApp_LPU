import React, { Component } from 'react'
import { View, ImageBackground, Text, Image, ScrollView, TouchableOpacity, Platform } from 'react-native'
import styles from '../helpers/styles'


class DetailView extends Component {
    item = {}
    componentWillMount() {
        this.item = this.props.navigation.getParam('singleItem', {})
    }
    render() {
        return (
            <ImageBackground style={styles.container2} resizeMode='cover' source={{ uri: this.item.url }} >

                <View style={styles.layer2}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ marginTop: Platform.OS == 'ios' ? 44 : 0 }}>
                        <Image style={{ width: 24, height: 24 }} tintColor='#ffffff' source={require('../images/back.png')} />
                    </TouchableOpacity>
                    <View style={styles.layerH}>
                        <Text style={styles.whiteTextBigTitle}>{this.item.title}</Text>
                        <Text style={styles.whiteTextDate}>{this.item.date}</Text>
                    </View>
                    <ScrollView style={{ flex: 1, marginBottom: 20 }}>
                        <Text style={styles.whiteTextTitle}>{this.item.explanation}</Text>
                    </ScrollView>
                </View>
            </ImageBackground>

        )
    }
}

export default DetailView