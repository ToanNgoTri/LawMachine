import {
    Text,StyleSheet,TouchableOpacity,View,ScrollView,TextInput,FlatList,ActivityIndicator,Image,Keyboard
  } from 'react-native';
import database from '@react-native-firebase/database';
import { useState, useEffect } from 'react';
import data from '../data/project2-197c0-default-rtdb-export.json';
import Ionicons from 'react-native-vector-icons/Ionicons';


  export default function Home({ navigation }) {  
      const [Content,setContent] = useState('');
      // sử dụng để đọc realtime database, data được xuất ra ở dưới dạng object rồi không cần JSON.parse
      // console.log('API',API);
      const [showContent,setShowContent] = useState([]);

      const [inputSearchLaw,setInputSearchLaw] = useState('');
      const [searchLawResult,setSearchLawResult] = useState([]);
      const [currentPaper,setCurrentPaper] = useState(0);
      const [totalPaper,setTotalPaper] = useState(2);

      const reference = database().ref('/Law1');
    const Render = ({item})=>{
        return(
            <TouchableOpacity onPress={() => navigation.navigate(`${item}`)}>
            <View style={styles.item}>
                <Text style={styles.text}>
                {item}
                </Text>
            </View>
        </TouchableOpacity>
        )
    }

    const renderLoader = ()=>{
        return(
            <View>
                <ActivityIndicator size='large' color='#aaa'/>
            </View>
        )
    }
    

      useEffect( ()=>{
        setSearchLawResult(Content && Content.filter( (item)=>{
            return item.match(new RegExp(inputSearchLaw, 'igm'));
        }))
    }
    ,[inputSearchLaw])
    

    //   let totalPaper
    useEffect( ()=>{
        reference.on('value', snapshot => {
            // console.log(snapshot.val());
          setContent(Object.keys(snapshot.val()))
          setShowContent(Object.keys(snapshot.val()).slice(0,7))
        //   console.log(Object.keys(snapshot.val()).length)
        //   totalPaper= Object.keys(snapshot.val()).length
        setTotalPaper(Math.floor(Object.keys(snapshot.val()).length/7)+1)

        });

    }
    ,[])
    // totalPaper =Math.floor(Content.length/7)+1
    // console.log(totalPaper);
    
    const loadMoreItem = ()=>{
        // console.log('totalPaper',totalPaper);
        if(currentPaper<totalPaper){            // bị lỗi: tuy totalPaper đã dc thêm mới nhưng trong if() vẫn false
            setCurrentPaper(currentPaper+1)
        }
        setShowContent(Content.slice(0,7*currentPaper));
        // console.log('currentPaper',currentPaper);
    }


    return(
        <>

            <View
              style={{
                flexDirection: 'row',
                // backgroundColor: 'black',
                height: 50,
                paddingLeft:10,
                paddingRight:10,
                display:'flex',
                // justifyContent:'center',
                alignItems:'center',

            }}>
                {/* <Text 
                style={{
                    display:'flex',
                color:'black',
                fontWeight:'bold',
                alignItems:'center',
                textAlign:'center',
                fontSize:20,
                justifyContent:'center'
                // paddingLeft:30,
                // paddingRight:30

              }}>
                    Search
                </Text> */}
                <Image source={require('../assets/abc.png')}
                style= {{
                        width:30, height:10,color:'red',position: 'absolute',
                marginLeft:8,
                // paddingRight:30
            }}>
              </Image>
              <TextInput
                onChangeText={text => setInputSearchLaw(text)}
                value={inputSearchLaw}
                style={inputSearchLaw ?styles.inputSearchArea :styles.placeholder }
                placeholder="Search Law ..."
                placeholderTextColor={'gray'}
                keyboardAppearance=''
                >
                </TextInput>
              <TouchableOpacity
                onPress={() => {setInputSearchLaw('');Keyboard.dismiss()}}
                style={{width: '10%', display: 'flex',alignItems: 'center',justifyContent: 'center',
                }}>
                {inputSearchLaw && (
             <Ionicons name="close-circle-outline" style={{color: 'black', fontSize: 25, textAlign: 'center'
         }}></Ionicons>
           )}
              </TouchableOpacity>
            </View>

      
{/* <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <View style={styles.item}>
                <Text style={styles.text}>
                Tìm kiếm
                </Text>
            </View>
        </TouchableOpacity> */}

{/* { Content && (searchLawResult || Content).map( (key,i) => (

<TouchableOpacity key={i} onPress={() => navigation.navigate(`${key}`)}>
            <View style={styles.item}>
                <Text style={styles.text}>
                {key}
                </Text>
            </View>
        </TouchableOpacity>
)
)
  } */}

  <FlatList
  data={showContent && (searchLawResult || showContent)}
  renderItem={Render}
  ListFooterComponent={(totalPaper > currentPaper) && renderLoader} //(totalPaper > currentPaper) && 
  onEndReached={ loadMoreItem}
  >

    
  </FlatList>






        {/* <TouchableOpacity onPress={() => navigation.navigate('Luật Cư Trú 2020')}>
            <View style={styles.item}>
                <Text style={styles.text}>
                    Luật Cư trú 2020
                </Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Luật Tín ngưỡng, tôn giáo 2016')}>
            <View style={styles.item}>
                <Text style={styles.text}>
                    Luật Tín ngưỡng, tôn giáo 2016
                </Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Luật Viễn Thông 2023')}>
            <View style={styles.item}>
                <Text style={styles.text}>
                Luật Viễn thông 2023
                </Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('FireBase')}>
            <View style={styles.item}>
                <Text style={styles.text}>
                FireBase Test
                </Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('addFirebase')}>
            <View style={styles.item}>
                <Text style={styles.text}>
                addFirebase
                </Text>
            </View>
        </TouchableOpacity> */}
      
      </>
    )
  }
  
  const styles = StyleSheet.create({
    item: {
        height:100,
        backgroundColor:'green',
        display:'flex',
        justifyContent: 'center',
        marginBottom:6
    },
    text:{
        fontWeight:'bold',
        color:'white',
        textAlign:'center',
    },
    inputSearchArea:{
        paddingLeft: 40,
        paddingRight: 40,
        fontSize:18,
        color: 'black',
        width: '90%',
        alignItems: 'center',
        height:50
    },
    placeholder:{
        fontSize:15,
        paddingLeft: 40,
        paddingRight: 40,
        color: 'black',
        width: '90%',
        alignItems: 'center',
        height:50

    },
    inputXIcon:{
        height: 20,
        width: 20,
        color: 'white',
        textAlign: 'center',
        verticalAlign: 'middle',
        backgroundColor: 'gray',
        borderRadius: 25,
    }
  });
  