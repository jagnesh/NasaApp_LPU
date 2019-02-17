import React, { Component } from 'react'
import { View, ImageBackground, Text, SafeAreaView, ScrollView } from 'react-native'
import styles from '../helpers/styles'

class DetailView extends Component {
    item = {}
    componentWillMount() {
        this.item = this.props.navigation.getParam('singleItem', {})
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>

                <ImageBackground style={styles.container} resizeMode='cover' source={{ uri: this.item.url }} >

                    <View style={styles.layer2}>
                        <View style={styles.layerH}>
                            <Text style={styles.whiteTextBigTitle}>{this.item.title}</Text>
                            <Text style={styles.whiteTextDate}>{this.item.date}</Text>
                        </View>
                        <ScrollView style={{flex:1}}>
                            <Text style={styles.whiteTextTitle}>{this.item.explanation}</Text>
                        </ScrollView>
                    </View>
                </ImageBackground>
            </SafeAreaView>
        )
    }
}

export default DetailView