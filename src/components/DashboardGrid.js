import React from 'react'
import { ImageBackground, Text, FlatList, SafeAreaView, View, ActivityIndicator, TouchableOpacity } from 'react-native'
import style from '../helpers/styles'
import { connect } from 'react-redux'
import { getListData } from '../acitons'
import moment from "moment";
import OfflineNotice from '../common/OfflineNotice';

class DashboardGrid extends React.Component {
    state = {
        itemsList: [],
        startDate: moment(new Date()).add(-9, 'day').format("YYYY-MM-DD"),
        endDate: moment(new Date()).format("YYYY-MM-DD")
    }

    componentDidMount() {
        let sDate = this.state.startDate
        let eDate = this.state.endDate

        this.setState({
            startDate: moment(new Date(sDate)).add(-10, 'day').format("YYYY-MM-DD"),
            endDate: moment(new Date(sDate)).add(-1, 'day').format("YYYY-MM-DD")
        })
        this.props.getListData(sDate, eDate)
    }

    renderItemView = (item) => {
        return (
            <ImageBackground style={style.GridStyle} resizeMode='cover' source={{ uri: item.url }} >
                <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailView', { singleItem: item, title: item.titles })} style={style.layer}>

                    <Text style={[style.whiteTextDate, { alignSelf: 'flex-end' }]}>{item.date}</Text>
                    <Text style={[style.whiteTextTitle, { alignSelf: 'center' }]}>{item.title}</Text>

                </TouchableOpacity>
            </ImageBackground>

        )
    }

    handleLoadMore = () => {
        if (!this.props.loading) {
            let sDate = this.state.startDate
            let eDate = this.state.endDate
            this.setState({
                startDate: moment(new Date(sDate)).add(-10, 'day').format("YYYY-MM-DD"),
                endDate: moment(new Date(sDate)).add(-1, 'day').format("YYYY-MM-DD")
            })
            this.props.getListData(sDate, eDate)
        }
    }

    renderFooter = () => {
        if (!this.props.loading) return null
        return (
            <View
                style={{
                    paddingVertical: 20,
                    borderTopWidth: 1,
                    borderColor: "#CED0CE"
                }}
            >
                <ActivityIndicator animating size="large" />
            </View>
        )
    }

    render() {
        return (
            <SafeAreaView style={style.container}>
                {this.props.error ? <Text style={style.errorStyle}>{this.props.error}</Text> : null}
                
                <FlatList
                    numColumns='2'
                    data={this.props.listData}
                    renderItem={({ item }) => this.renderItemView(item)}
                    keyExtractor={(_, index) => index.toString()}
                    ListFooterComponent={this.renderFooter}
                    refreshing={this.props.loading}
                    onEndReached={this.handleLoadMore}
                    onEndReachedThreshold={4}
                />
                <OfflineNotice />
            </SafeAreaView>

        )
    }
}
const mapStateToProps = (state) => {
    return {
        loading: state.dashboardReducer.loading,
        listData: state.dashboardReducer.listData,
        error: state.dashboardReducer.error
    }
}

export default connect(mapStateToProps, { getListData })(DashboardGrid)