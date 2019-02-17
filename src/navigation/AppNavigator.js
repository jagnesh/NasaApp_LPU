import { createStackNavigator, createAppContainer } from "react-navigation"
import DashboardGrid from "../components/DashboardGrid";
import DetailView from "../components/DetailView";

const AppNavigator = createStackNavigator({
    DashboardGrid: {
        screen: DashboardGrid,
        navigationOptions: {
            title: 'Dashboard',
        }
    },
    DetailView: {
        screen: DetailView,
        navigationOptions: {
            title: 'Detail',
        }
    }
}, {
        initialRouteName: 'DashboardGrid',
        /* The header config from HomeScreen is now here */
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#f2f2f2',
            },
            headerTintColor: '#000000',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }
    });

export default createAppContainer(AppNavigator)