
import * as React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Image, ScrollView, Modal, Text, View, StyleSheet, Button, TouchableHighlight } from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

//Global
var result = {};

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={text_styles.titleText}>Welcome to True Colors!    </Text>
        <Button
          title="Scann"
          onPress={() => this.props.navigation.navigate('Scanner')}
        />
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Button
          title="Go to Home "
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Button
          title="show  "
          onPress={() => alert("Company: " + result[0] + ", ESG Score: " + result[2] + ", Country: " + result[3])}
        />
      </View>
    );
  }
}

class RedBullPage extends React.Component {
  render() {
    return (
      <View style = { red_styles.container }>
        <Text style={text_styles.titleText}>Red Bull GmbH    </Text>
        <Text style={text_styles.titleText}>Environmental Score: 1/5    </Text>
        <Text style={text_styles.titleText}>Country of Origin: Austria   </Text>

        <Button
          title="Scan Again!  "
          onPress={() => this.props.navigation.navigate('Scanner')}
        />
      </View>
    );
  }
}

class FishPage extends React.Component {
  render() {
    return (
      <View style={ yellow_styles.container }>
        <Text style={text_styles.titleText}>Nabisco  </Text>
        <Text style={text_styles.titleText}>Environmental Score: 3/5    </Text>
        <Text style={text_styles.titleText}>Country of Origin: USA   </Text>

        <Button
          title="Scan Again!  "
          onPress={() => this.props.navigation.navigate('Scanner')}
        />
      </View>
    );
  }
}

class OreoPage extends React.Component {
  render() {
    return (
      <View style={ green_styles.container }>
        <Text style={text_styles.titleText}>Campbell Soup Company      </Text>
        <Text style={text_styles.titleText}>Environmental Score: 5/5     </Text>
        <Text style={text_styles.titleText}>Country of Origin: USA      </Text>

        <Button
          title="Scan Again!  "
          onPress={() => this.props.navigation.navigate('Scanner')}
        />
      </View>
    );
  }
}

class BarcodeScannerExample extends React.Component {
  state = {
    hasCameraPermission: null,
    scanned: false,
  };

  async componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  };

  render() {
    const { hasCameraPermission, scanned } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />

        {scanned && (
          <Button title={'Tap to Scan Again'} onPress={() => this.setState({ scanned: false })} />
        )}
      </View>
    );
  }

  handleBarCodeScanned = ({ type, data }) => {
      this.setState({ scanned: true });
      result = getData(data);
      if (result[2] == 1) {
        this.props.navigation.navigate('RedBull')
      }
      else if (result[2] == 3) {
        this.props.navigation.navigate('Oreos')
      }
      else if (result[2] == 5) {
        this.props.navigation.navigate("Fish")
      }
      else {
        this.props.navigation.navigate('Details')
      }
       this.setState({ scanned: true });
    };
  }


const RootStack = createStackNavigator({
  Home: HomeScreen,
  Details: DetailsScreen,
  Scanner: BarcodeScannerExample,
  RedBull: RedBullPage,
  Fish: FishPage,
  Oreos: OreoPage
});

export default createAppContainer(RootStack);

function getData(n){
    var data = [['Nabisco', 44000020170, 3, 'USA'],
                ['Red Bull GmbH', 611269991000, 1, 'AUT'],
                ['Campbell Soup Company', 14100075233, 5, 'USA']];
                for(var i = 0; i < data.length; i++){
                  if (data[i][1] == n) {
                    return data[i];
                  }

                }
                return -1;
  }

const red_styles = StyleSheet.create(
{
    container:
    {
        flex: 1,
        backgroundColor: '#ff0000',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white'
    }
});

const yellow_styles = StyleSheet.create(
{
    container:
    {
        flex: 1,
        backgroundColor: '#ffff00',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white'
    }
});

const green_styles = StyleSheet.create(
{
    container:
    {
        flex: 1,
        backgroundColor: '#00ff00',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white'
    }
});

const text_styles = StyleSheet.create({
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black'
  },
});
