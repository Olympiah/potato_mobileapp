import { StyleSheet, View, Dimensions, TouchableOpacity, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
// import Background from '../images/9'
import { ImageBackground } from 'react-native';


const image = {uri: '../images/back1.png'};

const Landing = ({ navigation }) => {
    return (

        <View style={styles.container}>
            <ImageBackground source={image} resizeMode="cover" 
            style= {[styles.container, {justifyContent:'center'}]} >
            <View
                style={styles.header}
            >
                <Animatable.Image
                    animation='bounceIn'
                    duration={1500}
                    source={require('../images/logo2.png')}
                    style={styles.logo}
                    resizeMode = "center">

                </Animatable.Image>

            </View>
            </ImageBackground>

            <Animatable.View
                style={styles.footer}
                animation={'fadeInUpBig'}
            >
                <Text style={styles.title}>iFarm</Text>

                <Text style={styles.text}> We farm you eat 🥔</Text>
                <View style={styles.button}>
                    <TouchableOpacity
                        onPress={() => navigation.push('Login')}
                    >
                        <LinearGradient
                            colors={['#ffaa00', '#e85d04']}
                            style={styles.signIn}
                        >
                            <Text style={styles.textSign}>Get Started</Text>
                            <MaterialIcons
                                name='navigate-next'
                                color='#fff'
                                size={20}
                            />
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    );
};

export default Landing;

const { height } = Dimensions.get('screen');
const height_logo = height * 0.25;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fca311',
        height: '100%',
        backgroundRepeat: 'no-repeat',
        // backgroundImage: `url(${Background})`
        
    },
    // image: {
    //     flex: 1,
    //     justifyContent: 'center',
    //   },

    text: {
        color: '#ca6702',
        fontSize: 18,
        // fontFamily: 'Poppins'
    },

    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 300,
    },
    title: {
        color: '#000',
        fontSize: 28,
        fontWeight: 'bold',
        // fontFamily: 'Poppins'
    },
    button: {
        alignItems: 'flex-end',
        marginTop: 30,
    },
    signIn: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        flexDirection: 'row'
    },
    textSign: {
        color: '#000',
        fontWeight: 'bold',
    },
    logo: {
        width: height_logo,
        height: height_logo,
        borderRadius: 100,
    },
    footer: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 25,


    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
