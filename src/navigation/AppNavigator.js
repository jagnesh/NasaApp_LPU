import { createStackNavigator, createAppContainer } from "react-navigation"
import DashboardGrid from "../components/DashboardGrid";
import DetailView from "../components/DetailView";
import React from 'react'
import { Button, NativeModules } from 'react-native'

const AppNavigator = createStackNavigator({
    DashboardGrid: {
        screen: DashboardGrid,
        navigationOptions: {
            title: 'Dashboard',
            headerRight: (
                <Button
                    onPress={() => NativeModules.NavigateTo.OpenNewView()}
                    title="Open"
                    color="#000"
                />
            ),
            headerStyle: {
                backgroundColor: '#f2f2f2',
            }

        }
    },
    DetailView: {
        screen: DetailView,
        navigationOptions: {
            title: 'Detail',
            header: null
        }
    }
}, {
        initialRouteName: 'DashboardGrid',
        /* The header config from HomeScreen is now here */
        defaultNavigationOptions: {

            headerTintColor: '#000000',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }
    });

export default createAppContainer(AppNavigator)