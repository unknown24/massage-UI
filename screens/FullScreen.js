import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image, StatusBar, Button } from "react-native";
import MapView , {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import SlidingUpPanel from 'rn-sliding-up-panel';
import { MaterialIcons } from '@expo/vector-icons';

class FullScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    state = {
        location: {
            coords : {
                latitude : -6.880327,
                longitude: 107.5900023
            }
        }
    } 

    componentWillMount(){
        this._getLocationAsync();
    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
          this.setState({
            errorMessage: 'Permission to access location was denied',
          });
        }
    
        let location = await Location.getCurrentPositionAsync({});
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

    render(){
        return (
            <View style={styles.container}>
                <MapView
                    initialRegion={{
                        latitude      : this.state.location.coords.latitude,
                        longitude     : this.state.location.coords.longitude,
                        latitudeDelta : 0.0922,
                        longitudeDelta: 0.0421,
                    }} 
                    style={styles.mapStyle} >
                        <Marker
                            coordinate={{
                                latitude : this.state.location.coords.latitude,
                                longitude: this.state.location.coords.longitude
                              }}
                            title={'Juara'}
                            description={'mantap'} />
                </MapView>
                <SlidingUpPanel ref={c => this._panel = c} draggableRange={{top:350, bottom:100}}>
                    <View style={styles.swipeUpContainer}>
                        <View style={{alignSelf:'center'}}>
                            <MaterialIcons name="drag-handle" size={24} />
                        </View>
                        <View>
                            <Image
                                style={{ width: 50, height: 50 , borderRadius:50}}
                                source={{ uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }} />
                            <View>
                                <Text>Nama</Text>
                            </View>
                        </View>
                    </View>
                </SlidingUpPanel>
            </View>
        )
    }
}

class ItemMini extends React.Component {
    render(){
        return(
            <View>
                <Text>satu</Text>
                
            </View>    
        )
    }
}

class ItemFull extends React.Component {
    render(){
        return(
            <View><Text>Dua</Text></View>    
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex           : 1,
      backgroundColor: '#fff',
      alignItems     : 'center',
      justifyContent : 'center',
    },
    swipeUpContainer:{
        flex           : 1,
        backgroundColor: '#fff',
    },
    mapStyle: {
      width : Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  });

export default FullScreen;