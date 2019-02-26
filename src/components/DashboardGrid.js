import React from 'react'
import { ImageBackground, Text, FlatList, SafeAreaView, View, ActivityIndicator, TouchableOpacity } from 'react-native'
import style from '../helpers/styles'
import { connect } from 'react-redux'
import { getListData, loadDataFromDb, getPrependListData } from '../acitons'
import moment from "moment";
import OfflineNotice from '../common/OfflineNotice';
import { ReadItem } from '../helpers';

class DashboardGrid extends React.Component {
    state = {
        itemsList: [],
        startDate: moment(new Date()).add(-9, 'day').format("YYYY-MM-DD"),
        endDate: moment(new Date()).format("YYYY-MM-DD")
    }

    componentDidMount() {
        let sDate = this.state.startDate
        let eDate = this.state.endDate
        // check data in database 
        ReadItem('NasaListData').then((result) => {
            // if found then get first date and last date 
            //after that get latest data from api and prepend in list and display saved data
            if (result != null) {
                let lastIndex = JSON.parse(result).length
                console.log(`Last element: ${JSON.parse(result)[0].date} => First: ${JSON.parse(result)[lastIndex - 1].date}`)
                // set offline data on flat list 
                this.props.loadDataFromDb(result)
                // setting state to perform next api hit which data is not available at this time 
                this.setState({
                    startDate: moment(new Date(JSON.parse(result)[0].date)).add(-10, 'day').format("YYYY-MM-DD"),
                    endDate: moment(new Date(JSON.parse(result)[0].date)).add(-1, 'day').format("YYYY-MM-DD")
                })
                // check if date is not same (today and last saved data date)
                if (JSON.parse(result)[lastIndex - 1].date != eDate) {
                    this.props.getPrependListData(moment(new Date(JSON.parse(result)[lastIndex - 1].date)).add(1, 'day').format("YYYY-MM-DD"), moment(new Date()).format("YYYY-MM-DD"))
                }
            } else {
                // normal api hit if data is not avilable in AsyncStorage
                this.setState({
                    startDate: moment(new Date(sDate)).add(-10, 'day').format("YYYY-MM-DD"),
                    endDate: moment(new Date(sDate)).add(-1, 'day').format("YYYY-MM-DD")
                })
                this.props.getListData(sDate, eDate)
            }
        }).catch((error) => {
            console.log(`ReadError : ${error}`)
        })

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
                    onEndReachedThreshold={1}
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

export default connect(mapStateToProps, { getListData, loadDataFromDb, getPrependListData })(DashboardGrid)