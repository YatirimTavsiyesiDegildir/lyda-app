import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native';
import {
  Divider,
  Layout,
  TopNavigation,
  List,
  Icon,
  TopNavigationAction,
  Text,
} from '@ui-kitten/components';
import CouponCard from '../../../Components/Card';
import {FetchGet} from '../../../Utils/Fetch';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import {
  SubscriptionWarningCard,
  FriendWarningCard,
} from '../../../Components/Card';

export default class CouponsScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  renderItem = ({item, index}) => (
    <CouponCard
      cardProps={item}
      openQRScreen={() => this.openQRScreen(item.code)}
    />
  );

  openQRScreen(code) {
    this.props.navigation.navigate('ShowQRScreen', {code: code});
  }

  PlusIcon = props => <Icon {...props} name="plus-outline" />;

  renderRightActions = () => (
    <React.Fragment>
      <TopNavigationAction
        icon={this.PlusIcon}
        onPress={() => {
          this.props.navigation.navigate('AddBankAPI');
        }}
      />
    </React.Fragment>
  );

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <TopNavigation
          title="Finans Durumum"
          alignment="center"
          accessoryRight={this.renderRightActions}
        />
        <Divider />
        <Layout
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ScrollView style={CouponsStyles.listContainer}>
            <SubscriptionWarningCard />
            <Text category="h4" style={CouponsStyles.sectionTitle}>
              Aylik Varlik Degisimi
            </Text>
            <LineChart
              data={{
                labels: ['Eylul', 'Ekim', 'Kasim', 'Aralik', 'Ocak'],
                datasets: [
                  {
                    data: [1, 5, 5, 6.75, 45],
                  },
                ],
              }}
              width={Dimensions.get('window').width - 40} // from react-native
              height={220}
              yAxisLabel="TL"
              yAxisSuffix="b"
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: '#e26a00',
                backgroundGradientFrom: '#fb8c00',
                backgroundGradientTo: '#ffa726',
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: '#ffa726',
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />

            <View style={{height: 40}} />
            <Text category="h4" style={CouponsStyles.sectionTitle}>
              Bu Ayin Harcamalari
            </Text>
            <FriendWarningCard />

            <PieChart
              data={[
                {
                  name: 'Market',
                  amount: 600,
                  color: 'rgba(131, 167, 234, 1)',
                  legendFontColor: '#7F7F7F',
                  legendFontSize: 15,
                },
                {
                  name: 'Restoran / Bar',
                  amount: 1000,
                  color: '#F00',
                  legendFontColor: '#7F7F7F',
                  legendFontSize: 15,
                },
                {
                  name: 'Ulasim',
                  amount: 300,
                  color: 'red',
                  legendFontColor: '#7F7F7F',
                  legendFontSize: 15,
                },
                {
                  name: 'Faturalar',
                  amount: 550,
                  color: '#ffffff',
                  legendFontColor: '#7F7F7F',
                  legendFontSize: 15,
                },
              ]}
              width={Dimensions.get('window').width - 40}
              height={300}
              chartConfig={{
                backgroundColor: '#e26a00',
                backgroundGradientFrom: '#fb8c00',
                backgroundGradientTo: '#ffa726',
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              accessor={'amount'}
              paddingLeft={40}
              paddingRight={40}
            />

            <View style={{height: 40}} />
            <Text category="h4" style={CouponsStyles.sectionTitle}>
              Birikim Hedefleri
            </Text>
            <ProgressChart
              data={{
                labels: ['Araba', 'Bilgisayar', 'Tatil'], // optional
                data: [40000 / 300000, 0.6, 0.8],
              }}
              width={Dimensions.get('window').width - 40}
              height={220}
              strokeWidth={16}
              radius={32}
              chartConfig={{
                backgroundColor: '#106A30',
                backgroundGradientFrom: '#A4F1A2',
                backgroundGradientTo: '#43B055',
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              hideLegend={false}
              paddingRight={30}
              borderRadius={16}
            />

            <View style={{height: 40}} />
            <View style={{flexDirection: 'row', width: '100%'}}>
              <Text
                category="h4"
                style={[CouponsStyles.sectionTitle, {flex: 1}]}>
                Harcama Aliskanliklari
              </Text>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('PastPurchasesScreen')
                }>
                <Icon
                  style={{height: 30, width: 30}}
                  fill="#000"
                  name="arrow-forward-outline"
                />
              </TouchableOpacity>
            </View>

            <ContributionGraph
              values={[
                {date: '2017-01-02', count: 1},
                {date: '2017-01-03', count: 2},
                {date: '2017-01-04', count: 3},
                {date: '2017-01-05', count: 4},
                {date: '2017-01-06', count: 5},
                {date: '2017-01-30', count: 2},
                {date: '2017-01-31', count: 3},
                {date: '2017-03-01', count: 2},
                {date: '2017-04-02', count: 4},
                {date: '2017-03-05', count: 2},
                {date: '2017-02-30', count: 4},
              ]}
              endDate={new Date('2017-04-01')}
              numDays={105}
              width={Dimensions.get('window').width - 40}
              height={220}
              chartConfig={{
                backgroundColor: '#e26a00',
                backgroundGradientFrom: '#fb8c00',
                backgroundGradientTo: '#ffa726',
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: '#ffa726',
                },
              }}
            />
            <View style={{height: 75}} />
          </ScrollView>
        </Layout>
      </SafeAreaView>
    );
  }
}

const CouponsStyles = StyleSheet.create({
  listContainer: {
    flex: 1,
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
  },
  sectionTitle: {
    textAlign: 'center',
  },
});
