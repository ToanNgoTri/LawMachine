import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
// import {handle2, searchLaw} from '../redux/fetchData';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
import { useScrollToTop } from '@react-navigation/native';
import React, {useEffect, useState, useRef, useContext} from 'react';
import {useNetInfo} from '@react-native-community/netinfo';
// import {RefForSearch} from '../App';
// import {RefLoading} from '../App';

export function Detail2({navigation}) {
  const [input, setInput] = useState(undefined);

  const [warning, setWanring] = useState(false);

  const list = useRef(null);
  const textInput = useRef(null);

  const dispatch = useDispatch();

  const {loading2, info, input2} = useSelector(
    state => state['searchLaw'],
  );

  useScrollToTop(list);
  // const SearchScrollview = useContext(RefForSearch);

  // SearchScrollview.updateSearch(list);

  const netInfo = useNetInfo();
  let internetConnected = netInfo.isConnected;


  useEffect(() => {
    setWanring(false);
  }, [input]);

  const NoneOfResutl = () => {
    return (
      <View
        style={{height: 250, alignItems: 'center', justifyContent: 'flex-end'}}>
        <Text style={{fontSize: 40, textAlign: 'center', color: 'black'}}>
          {' '}
          Không có kết quả nào{' '}
        </Text>
      </View>
    );
  };

  return (
    <>
      {(loading2 || !internetConnected) && (
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            opacity: 0.7,
            backgroundColor: 'black',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10,
          }}>
          <Text
            style={{
              color: 'white',
              marginBottom: 15,
              fontWeight: 'bold',
            }}>
            {internetConnected ? "Xin vui lòng đợi trong giây lát ..." :"Vui lòng kiểm tra kết nối mạng ..."}
          </Text>
          <ActivityIndicator size="large" color="white"></ActivityIndicator>
        </View>
      )}

      <ScrollView
        keyboardShouldPersistTaps="handled"
        ref={list}
        style={{backgroundColor: '#EEEFE4'}}>
        <View style={{backgroundColor: 'green'}}>
          <Text style={styles.titleText}>{`Tìm kiếm văn bản`}</Text>

          <View style={styles.inputContainer}>
            <View
              style={{
                flexDirection: 'column',
                width: '75%',
                // backgroundColor:'red'
              }}>
              <View
                style={{
                  position: 'relative',
                  flexDirection: 'row',
                  backgroundColor: 'white',
                  // height: 50,
                  borderRadius: 15,
                }}>
                <TextInput
                        ref={textInput}
                  style={styles.inputArea}
                  onChangeText={text => {
                    setInput(text);
                  }}
                  value={input}
                  selectTextOnFocus={true}
                  placeholder="Nhập từ tên luật, trích dẫn, ..."
                  onSubmitEditing={()=>dispatch({type: 'searchLaw', input: input})
                  }></TextInput>
                <TouchableOpacity
                  onPress={() => {setInput('');textInput.current.focus()}}
                  style={{
                    width: '15%',
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    left: -3,
                  }}>
                  {input && (
                    <Ionicons
                      name="close-circle-outline"
                      style={{
                        color: 'black',
                        fontSize: 20,
                        paddingRight: 8,
                      }}></Ionicons>
                  )}
                </TouchableOpacity>
              </View>
              <Text
                style={{
                  color: 'orange',
                  fontSize: 14,
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                {warning ? 'Vui lòng nhập từ khóa hợp lệ' : ' '}
              </Text>
            </View>
            <View style={styles.containerBtb}>
              <TouchableOpacity
                style={{
                  ...styles.inputBtb,
                  borderRadius: 100,
                  height: 40,
                  top: 5,
                }}
                onPress={async () => {
                  Keyboard.dismiss();
                  let inputSearchLawReg = input;
                  // if (input) {
                  //   inputSearchLawReg = input.replace(/\(/gim, '\\(');

                  //   inputSearchLawReg = inputSearchLawReg.replace(
                  //     /\)/gim,
                  //     '\\)',
                  //   );

                  //   inputSearchLawReg = inputSearchLawReg.replace(
                  //     /\./gim,
                  //     '\\.',
                  //   );

                  //   inputSearchLawReg = inputSearchLawReg.replace(
                  //     /\+/gim,
                  //     '\\+',
                  //   );

                  //   inputSearchLawReg = inputSearchLawReg.replace(
                  //     /\?/gim,
                  //     '\\?',
                  //   );

                  //   if (input.match(/\//gim)) {
                  //     inputSearchLawReg = inputSearchLawReg.replace(
                  //       /\//gim,
                  //       '.',
                  //     );
                  //   }

                  //   inputSearchLawReg = inputSearchLawReg.replace(/\\/gim, '.');
                  // }
                  Keyboard.dismiss();

                  dispatch({type: 'searchLaw', input: input});
                }}
                >
                <Ionicons
                  name="search-outline"
                  style={styles.inputBtbText}></Ionicons>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{marginTop: 1}}>
          {info == null ? (
            <></>
          ) : Object.keys(info).length ? (
            Object.keys(info).map((key, i) => {
              
              // let nameLaw = info[key]['lawNumber'];
              // if (nameLaw) {
              //   if (nameLaw.match(/(?<=\w)\/(?=\w)/gim)) {
              //     nameLaw = nameLaw.replace(/(?<=\w)\/(?=\w)/gim, '\\');
              //   }
              // }

              return (
                <TouchableOpacity
                  style={{
                    paddingBottom: 10,
                    paddingTop: 10,
                    justifyContent: 'center',
                    backgroundColor: '#F9CC76',
                    marginBottom: 6,
                  }}
                  onPress={() =>
                    navigation.navigate(`${key}`)
                  }>
                  <View style={styles.item}>
                    <Text style={styles.chapterText} key={`${i}a`}>
                      {info[key]['lawNameDisplay']}
                    </Text>
                    {!info[key]['lawNameDisplay'].match(/^(luật|bộ luật|Hiến)/gim) && (
                      <Text style={styles.descriptionText}>
                        {key && info[key]['lawDescription']}
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>
              );
            })
          ) : (
            <NoneOfResutl />
          )}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-evenly',
    // backgroundColor:'red'
  },
  inputArea: {
    width: '85%',
    backgroundColor: 'white',
    color: 'black',
    paddingLeft: 12,
    borderRadius: 15,
  },
  containerBtb: {
    width: '15%',
    // backgroundColor:'yellow',
    alignItems: 'center',
  },
  inputBtb: {
    width: '80%',
    height: 30,
    backgroundColor: 'black',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    // right: 5,
    top: 10,
  },
  inputBtbText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  content: {
    height: 0,
    display: 'flex',
    position: 'relative',
    // paddingRight: 10,
    // paddingLeft: 10,
    margin: 0,
    overflow: 'hidden',
  },
  chapter: {
    minHeight: 50,
    justifyContent: 'space-around',
    backgroundColor: '#F9CC76',
    color: 'black',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  item: {
    minHeight: 80,
    // height: 120,
    // backgroundColor: 'green',
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'column',
    alignItems: 'center',
  },

  chapterText: {
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 17,
  },
  descriptionText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 14,
  },
  chapterArrow: {
    backgroundColor: 'black',
    borderRadius: 25,
    // alignItems:'flex-end',
    display: 'flex',
    right: 10,
    position: 'absolute',
    width: 30,
    height: 30,
    textAlign: 'center',
    justifyContent: 'center',
  },
  articleContainer: {
    fontWeight: 'bold',
    paddingBottom: 6,
    paddingTop: 6,
    color: 'white',
    backgroundColor: '#66CCFF',
    justifyContent: 'center',
    // alignItems:'center',
    display: 'flex',
    textAlign: 'center',
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
  article: {
    color: 'white',
    overflow: 'hidden',
    paddingRight: 10,
    paddingLeft: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  blackBackground: {
    backgroundColor: 'white',
    color: 'black',
    flexWrap: 'wrap',
    // width:200,
    overflow: 'hidden',
    flex: 1,
    display: 'flex',
    paddingRight: 10,
    paddingLeft: 10,
    textAlign: 'justify',
    paddingTop: 5,
    paddingBottom: 10,
  },
  highlight: {
    color: 'red',
    backgroundColor: 'yellow',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
