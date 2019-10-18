import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Button,
} from 'react-native';
import {
  List,
  ListItem,
  Left,
  Thumbnail,
  Body,
  Right,
} from 'native-base';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import SlidingUpPanel from 'rn-sliding-up-panel';
import { MaterialIcons } from '@expo/vector-icons';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  swipeUpContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

class FullScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {
        coords: {
          latitude: -6.880327,
          longitude: 107.5900023,
        },
      },
      errorMessage: '',
    };
  }

  componentWillMount() {
    this.getLocationAsync();
  }

  getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    const location = await Location.getCurrentPositionAsync({});
    this.setState({ location });

    /**
     *
        Object {
        "coords": Object {
            "accuracy": 16,
            "altitude": 0,
            "heading": 0,
            "latitude": -6.880327,
            "longitude": 107.5900023,
            "speed": 0,
        },
        "mocked": false,
        "timestamp": 1571322126908,
        }
      */
  };


    static navigationOptions = {
      header: null,
    };

    render() {
      const { errorMessage, location } = this.state;
      console.log(errorMessage);
      return (
        <View style={styles.container}>
          <MapView
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            style={styles.mapStyle}
          >
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title="Juara"
              description="mantap"
            />
          </MapView>
          <SlidingUpPanel
            ref={(c) => { this.panel = c; }}
            draggableRange={{ top: 350, bottom: 100 }}
          >
            <View style={styles.swipeUpContainer}>
              <View style={{ alignSelf: 'center' }}>
                <MaterialIcons name="drag-handle" size={24} />
              </View>
              <View>
                <List>
                  <ListItem thumbnail>
                    <Left>
                      <Thumbnail square source={{ uri: 'https://picsum.photos/200/300' }} />
                    </Left>
                    <Body>
                      <Text>Sankhadeep</Text>
                      <Text note numberOfLines={1}>Its time to build a difference . .</Text>
                    </Body>
                    <Right>
                      <Button transparent>
                        <Text>View</Text>
                      </Button>
                    </Right>
                  </ListItem>
                </List>
              </View>
            </View>
          </SlidingUpPanel>
        </View>
      );
    }
}


export default FullScreen;
