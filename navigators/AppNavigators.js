import {NavigationContainer} from '@react-navigation/native';
// import {TouchableOpacity} from 'react-native-gesture-handler'
import {useSelector, useDispatch} from 'react-redux';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
// import database from '@react-native-firebase/database';
import {useEffect, useContext,useRef} from 'react';
import Home from '../screens/Home';
import {Detail1} from '../screens/Detail1';
import {Detail2} from '../screens/Detail2';
// import Detail4 from '../screens/Detail4';
import Detail5 from '../screens/Detail';
import {useNetInfo} from '@react-native-community/netinfo';
import {BoxInHomeScreen} from '../App';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createMaterialTopTabNavigator();

const AppNavigators = () => {
  const insets = useSafeAreaInsets(); // lất chiều cao để manu top iphone
  const BoxInHomeScreenStatus = useContext(BoxInHomeScreen);

  const animated = useRef(new Animated.Value(0)).current;

  let translateY = animated.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 100],
  });

  let Opacity = animated.interpolate({
    inputRange: [0, 100],
    outputRange: [.5, 0],
  });


useEffect(() => {
  Animated.timing(animated, {
    toValue: BoxInHomeScreenStatus.showBoxInHomeScreen ? 0 : 100,
    // toValue:100,
    duration: 200,
    useNativeDriver: false,
  }).start();
}, [BoxInHomeScreenStatus.showBoxInHomeScreen])


  return (
    <View style={{flex:1}}>
    <Tab.Navigator
    
      tabBarPosition="bottom"
      screenOptions={({route}) => ({
        tabBarPressColor: '#FFCC66',
        animationEnabled: false,
        animation: 'shift',
        lazy: false,
        tabBarIndicatorStyle: {
          backgroundColor: '#FF3366',
          top: -2,
          margin: 0,
          padding: 0,
        },
        tabBarStyle: {
          postion: 'absolute',
          height: 55 + (insets.bottom)/2 ,
          borderWidth: 0.5 ,
          borderColor: '#DDDDDD',
          bottom:-1,
          // backgroundColor:'red',
          // width:'100%'
        },
      })}>
                    <Tab.Screen
        name="Home"
        component={Home}
        options={{
          header: () => null,
          tabBarIcon: ({focused, color, size}) => {
            return (
              <View style={{alignItems: 'center', top: -5, minWidth: 100,}}>
                <Ionicons
                  name="home-outline"
                  style={
                    focused ? styles.IconActive : styles.IconInActive
                  }></Ionicons>
                <Text
                  style={{
                    ...(focused ? styles.IconActive : styles.IconInActive),
                    fontSize: 13,
                    fontWeight: 'bold',
                    
                  }}>
                  Đã tải xuống
                </Text>
              </View>
            );
          },

          tabBarLabel: () => {
            return null;
          },
        }}
        listeners={{
          tabPress: props => {},
        }}
      />

      <Tab.Screen
        name="SearchLaw"
        component={Detail2}
        options={{
          header: () => null,
          tabBarIcon: ({focused, color, size}) => {
            return (
              <View style={{alignItems: 'center', top: -5, minWidth: 100,}}>
                <Ionicons
                  name="albums-outline"
                  style={
                    focused ? styles.IconActive : styles.IconInActive
                  }></Ionicons>
                <Text
                  style={{
                    ...(focused ? styles.IconActive : styles.IconInActive),
                    fontSize: 13,
                    fontWeight: 'bold',
                  }}>
                  Tìm văn bản
                </Text>
              </View>
            );
          },
          tabBarLabel: () => {
            return null;
          },
        }}
        listeners={{
          tabPress: props => {
            // SearchScrollview.forSearch.current.scrollTo({y: 0});
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={Detail1}
        options={{
          header: () => null,
          tabBarIcon: ({focused, color, size}) => {
            return (
              <View
                // style={focused ? {...styles.tabItemActive,width:widthTab,height:(widthTab>heightTab?'108%':'104%')} : styles.tabItemInactive}
                style={{alignItems: 'center', top: -5, minWidth: 100}}>
                <Ionicons
                  name="search-outline"
                  style={
                    focused ? styles.IconActive : styles.IconInActive
                  }></Ionicons>
                <Text
                  style={{
                    ...(focused ? styles.IconActive : styles.IconInActive),
                    fontSize: 13,
                    fontWeight: 'bold',
                  }}>
                  Tìm nội dung
                </Text>
              </View>
            );
          },
          tabBarLabel: () => {
            return null;
          },
        }}
        listeners={{
          tabPress: props => {
            // SearchScrollview.forSearch.current.scrollTo({y: 0});
          },
        }}
      />
    </Tab.Navigator>
     <Animated.View 
    style={{
      backgroundColor:'black',
      bottom:0,
      left:0,
      right:0,
      height:55 + (insets.bottom)/2,
      position:'absolute',
      zIndex:1,
      opacity:Opacity,
      transform:[{translateY:translateY}]
    }}
    >

    </Animated.View>


    </View>
  );
};

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  // const ModalVisibleStatus = useContext(ModalStatus);

  const netInfo = useNetInfo();
  let internetConnected = netInfo.isConnected;
  
  const dispatch = useDispatch();

  useEffect(() => {
    if (internetConnected) {
      // dispatch({type: 'stackscreen'})
    }

    // callAllSearchLaw().then(res=>inf.updateInfo(res))
  }, [internetConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator
      
      screenOptions={{
        // headerShadowVisible:true,

        headerStyle:{
          backgroundColor:'green',

        },
        headerBlurEffect:'extraLight',
        headerShadowVisible:false
      }}
      >
        <Stack.Screen
          name="HomeStack"
          component={AppNavigators}
          options={{
            // animationEnabled: false,
            header: () => null,
            // headerStyle:{backgroundColor:'red'}
          }}
        />

        <Stack.Screen
          name={`accessLaw`}
          component={Detail5}
          options={({navigation}) => ({
          
            // header:()=>{      <View style={{height: (Platform.OS === 'ios') ? 10 : 0,backgroundColor:'yellow',position:'relative'}}>
            // </View>
            // },
            // headerStyle:{backgroundColor:'red',top:20},
            // headerLargeTitleShadowVisible:true,
            headerTitleAlign: 'center',
            animation: 'simple_push',
            animationTypeForReplace: 'push',
            header:()=>null

            // headerLeft: () => (
            //   <TouchableOpacity
            //     onPressIn={() => {
            //       navigation.goBack();
            //     }}
            //     >
            //     <Ionicons
            //       name="chevron-back-outline"
            //       style={styles.IconInfo}></Ionicons>
            //   </TouchableOpacity>
            // ), 
            // headerTitle:()=> (
            //   <TouchableOpacity
            //   style={{
            //     backgroundColor: 'red',
            //     height: 40,
            //     alignItems: 'center',
            //     justifyContent: 'center',
            //     overflow: 'hidden',
            //     borderRadius: 30,
            //   }}
            //   onPressIn={() => {
            //     navigation.popToTop();
            //     console.log(2);
            //   }}
            //   >
            //   <Image style={{alignItems:'center',justifyContent:'center',backgroundColor:'red'}} source={require('../assets/t.png')}></Image>
            // </TouchableOpacity>

            // ),
            // headerRight: () => (
            //   <View style={{alignItems: 'center'}}>
            //     <TouchableOpacity
            //       style={styles.iconInfoContainer}
            //       // onPress={() => {
            //       //   // navigation.navigate('Search')
            //       //   ModalVisibleStatus.updateModalStatus(true);
            //       // }}
            //       onPressIn={() => {
            //         ModalVisibleStatus.updateModalStatus(true);
            //       }}
            //       >
            //       <Ionicons
            //         name="document-text-outline"
            //         style={styles.IconInfo}></Ionicons>
            //     </TouchableOpacity>
            //   </View>
            // ),
          })}
        />
        {/* ))} */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  // tabItemActive: {
  //   // backgroundColor:'red',
  //   width: '100%',
  //   // right:0,
  //   // left:100,
  //   height: '104%',
  //   position: 'relative',
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   borderTopColor: 'red',
  //   borderTopWidth: 4,
  //   overflow: 'hidden',
  // },
  tabItemInactive: {
    position: 'relative',
    // width: '100%',
    height: '102%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  IconActive: {
    fontSize: 24,
    color: '#FF3030',
    // transform:animatedValue
  },
  IconInActive: {
    fontSize: 24,
    color: 'black',
  },
  IconInfo: {
    fontSize: 30,
    display: 'flex',
    color:'white',

  },
  iconInfoContainer: {
    // width: 50,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'black',
    borderRadius: 25,
  },
});
export default StackNavigator;
