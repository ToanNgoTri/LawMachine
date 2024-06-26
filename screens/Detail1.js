import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';

import database from '@react-native-firebase/database';
import Ionicons from 'react-native-vector-icons/Ionicons';

import data from '../data/project2-197c0-default-rtdb-export.json';

import React, {useEffect, useState} from 'react';

export default function Detail({navigation}) {
  const [Content, setContent] = useState({});
  const [SearchResult, setSearchResult] = useState([]); // đây Object là các luật, điểm, khoản có kết quả tìm kiếm 
  const [input, setInput] = useState(undefined);

  const [name, setName] = useState();   // dùng để collapse (thu thập key của các law)
  const [nameArray, setNameArray] = useState([]);   // arrray của các law đã expand
  
  const [article, setArticle] = useState();    // dùng để collapse (thu thập key của các 'điều')
  const [articleArray, setArticleArray] = useState([]);   // arrray của các 'điều' đã expand

  
  
  const reference = database().ref('/Law1');
  
  useEffect(() => {
    reference.on('value', snapshot => {
      setContent(snapshot.val());
  
    });

  },[]);



  function Search(input) {
      let searchArray = {};

      function a(key,key1){
        // Object.keys(key2).map((key3, i3) => {
        // thama nhap chuowng (array dieu)

        Object.values(key1)[0].map((key2, i1) => {
          // chọn từng điều

          // Object.keys(key2).map((key5, i5) => {

            let replace = `(.*)${input}(.*)`;
            let re = new RegExp(replace, 'gmi');
            if(Object.keys(key2)[0].match(re)){
              searchArray[key].push({[Object.keys(key2)[0]]: Object.values(key2)[0]});
            }else if (Object.values(key2)[0].match(re)) {
              searchArray[key].push({[Object.keys(key2)[0]]: Object.values(key2)[0]});
            }
          // }
        })
    
        

}


      Object.keys(Content).map((key, i) => {   //key là tên của luật
        // tham nhap luat (array chuong) 

        searchArray[key] = [];




        Content[key].map((key1, i1) => {         
          // ra Object Chuong hoặc (array phần thứ...)
          if(Object.keys(key1)[0].match(/phần thứ .*/gim)){    // nếu có 'phần thứ

            if(Object.keys(Object.values(key1)[0][0])[0].match(/^Chương .*/gim)){    //nếu có chương
              
              Object.values(key1)[0].map( (key2,i)=>{

                a(key,key2)

                // Object.values(key2)[0].map((key3, i3) => {
                //   // chọn từng điều

                //     let replace = `(.*)${input}(.*)`;
                //     let re = new RegExp(replace, 'gmi');
                //     if(Object.keys(key3)[0].match(re)){
                //       searchArray[key].push({[Object.keys(key3)[0]]: Object.values(key3)[0]});
                //     }else if (Object.values(key3)[0].match(re)) {
                //       searchArray[key].push({[Object.keys(key3)[0]]: Object.values(key3)[0]});
                //     }
                //   // }
                // })



            });
                
              ;




          
        



// console.log('searchArray',searchArray);


            }else{     //nếu không có chương




              // Object.keys(key1).map((key2, i2) => {
              //   // thama nhap chuowng (array dieu)
    
              //   key1[key2].map((key3, i3) => {
              //     // chọn từng điều
    
              //     Object.keys(key3).map((key4, i4) => {
              //       let replace = `(.*)${input}(.*)`;
              //       let re = new RegExp(replace, 'gmi');
              //       if(key4.match(re)){
              //         searchArray[key].push({[key4]: key3[key4]});
              //       }else if (key3[key4].match(re)) {
              //         searchArray[key].push({[key4]: key3[key4]});
              //       }
              //     });
              //   });
              // });

              a(key,key1)





              
            }





          }else{ // nếu không có phần thứ...
            
                    

            a(key,key1)


          }











        });



      });

      let searchResult = {};

      Object.keys(searchArray).map((key, i) => {
        searchArray[key].map((key1, i) => {
          searchResult[key] = searchArray[key];
        });
      });

      setSearchResult(searchResult);
      // console.log('searchResult',searchResult);
    
    setArticleArray([]);
    setNameArray([]);
  }

  function collapse(a) {
    if (a == undefined) {
    } else if (nameArray.includes(a)) {
      setNameArray(nameArray.filter(a1 => a1 !== a));
    } else {
      setNameArray([...nameArray, a]);
    }
    setName(null);
  }

  function collapseArticle(a) {
    if (a == undefined) {
    } else if (articleArray.includes(a)) {
      setArticleArray(articleArray.filter(a1 => a1 !== a));
    } else {
      setArticleArray([...articleArray, a]);
    }
    setArticle(null);
  }

  function highlight(para, word) {
    if (typeof para == 'string') {
      // let replace1 = `((.*\n)*.*)(${word})((.*\n)*.*)`
      // let re1 = new RegExp(replace1, "gm");
      // let s2 = para.replace(re1, "$2");  // khúc đầu
      // let s4 = para.replace(re1, "$4"); //khúc cần
      // let s5 = para.replace(re1, "$5");    // khúc sau

      // return <Text>{s2}<Text style={styles.highlight}>{s4}</Text>{s5}</Text>
      let inputRexgex = para.match(new RegExp(word,'igm'));
      return (
        <Text >
          {para.split(new RegExp(word,'igm')).reduce((prev, current, i) => {
            if (!i) {
              return [current];
            }
           // bị lỗi khi viết hoa và thường khi input
            return (prev.concat(<Text style={styles.highlight}>{inputRexgex[i-1]}</Text>,current))
          }, [])}
        </Text>
      );
    }
  }

  useEffect(() => {
    collapse(name);
  }, [name]);

  useEffect(() => {
    collapseArticle(article);
  }, [article]);

  return (
    <ScrollView style={{backgroundColor: 'green'}}>
      <Text style={styles.titleText}>{`Tìm kiếm văn bản`}</Text>
      <View style={styles.inputContainer}>
      <Ionicons name="text-outline" style={styles.inputText}></Ionicons>

        {/* <Text style={styles.inputText}>Tìm kiếm</Text> */}
        <View
              style={{
                position:'relative',
                flexDirection: 'row',
                backgroundColor: 'white',
                // height: 50,
                width:'60%',
                borderRadius:15
              }}>

        <TextInput
          style={styles.inputArea}
          onChangeText={text => setInput(text)}
            value={input}
            >
          </TextInput>
          <TouchableOpacity
                onPress={() => setInput('')}
                style={{width: '15%', display: 'flex',alignItems: 'center',justifyContent: 'center',left:-3
                }}>
                {/* {input && (
                  <Text
                    style={styles.inputXIcon}>
                    X
                  </Text>
                )} */}
             { input &&   (<Ionicons name="close-circle-outline" style={{color: 'black', fontSize: 20, textAlign: 'center',    width:20,
                  height:20,
              }}></Ionicons>)}

              </TouchableOpacity>

          </View>
        <TouchableOpacity
          style={styles.inputBtb}
          onPress={() => {
            Search(input);
          }}>
          {/* <Text style={styles.inputBtbText}>Go!</Text> */}
          <Ionicons name="caret-forward-outline" style={styles.inputBtbText}></Ionicons>

        </TouchableOpacity>
      </View>
      <View style={{marginTop: 8}}>
        {SearchResult &&
          Object.keys(SearchResult).map((key, i) => (
            <>
              <TouchableOpacity
                key={i}
                style={styles.chapter}
                onPress={() => {
                  setName(i)
                }}
            
                  >
                <Text style={styles.chapterText} key={`${i}a`}>
                  {key} có {0 || SearchResult[key].length} kết quả
                </Text>
                <TouchableOpacity
              onPress={() => navigation.navigate(`${key}`,{input:input})}
              style={styles.chapterArrow}
              >
                      <Ionicons 
                      name="return-down-forward-outline" 
                      style={{fontWeight:'bold',color:'white', textAlign:'center',fontSize:17}}></Ionicons>

              {/* <Text
              style={{fontWeight:'bold',color:'white', textAlign:'center',fontSize:17}}
              
              
              >
                  {'->'}
                  </Text> */}
                </TouchableOpacity>
              </TouchableOpacity>
              {SearchResult[key].map((key1, i1) => (
                <View
                  key={`${i1}b`}
                  style={nameArray.includes(i) || styles.content}>
                  {Object.keys(key1).map((key2, i2) => (
                    <>
                      <TouchableOpacity
                        style={styles.articleContainer}
                        onPress={() => {
                          setArticle(`${i}${i1}a${i2}c`);
                        }}>
                        <Text style={styles.article} key={`${i2}c`}>
                          { highlight(key2, input)}
                        </Text>
                      </TouchableOpacity>
                      <Text
                        style={
                          articleArray.includes(`${i}${i1}a${i2}c`)
                            ? styles.blackBackground
                            : styles.content
                        }
                        key={`${i2}d`}>
                        {
                          highlight(key1[key2], input)
                        }
                      </Text>
                    </>
                  ))}
                </View>
              ))}
            </>
          ))}
      </View>
    </ScrollView>
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
    fontWeight:'bold',
    color:'white'
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    // backgroundColor:'red'
  },
  inputText: {
    width: '8%',
    fontSize: 30,
    color: 'white',
    fontWeight:'bold',
// backgroundColor:'red',
alignItems:'center',
justifyContent:'center',
display:'flex',
right:-5
  },
  inputArea: {
    width: '85%',
    backgroundColor: 'white',
    color:'black',
    paddingLeft:8,
    borderRadius:15
  },
  inputBtb: {
    width: '15%',
    height: 30,
    backgroundColor: 'blue',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    right:5
  },
  inputBtbText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize:20
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
    height: 60,
    justifyContent: 'center',
    backgroundColor: 'orange',
    color: 'black',
    alignItems: 'center',
    marginBottom: 1,
    display:'flex',
    flexDirection:'row',
    paddingLeft:50,
    paddingRight:50

  },
  chapterText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    // backgroundColor:'red'
  },
  chapterArrow:{
    backgroundColor:'black',
    borderRadius:25,
    // alignItems:'flex-end',
    display:'flex',
    right:10,
    position:'absolute',
    width:30,
    height:30,
    textAlign:'center',
    justifyContent:'center'
  },
  articleContainer: {
    fontWeight: 'bold',
    paddingBottom: 10,
    paddingTop: 10,
    color: 'white',
    backgroundColor: 'black',
    justifyContent: 'center',
    // alignItems:'center',
    display: 'flex',
    textAlign: 'center',
    borderBottomColor:'white',
    borderBottomWidth:1,

  },
  article: {
    color: 'white',
    overflow: 'hidden',
    paddingRight: 10,
    paddingLeft: 10,
    textAlign:'center',
  },
  lines: {
    color: 'white',
    
  },
  category: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  checkContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: 'blue',
    borderRadius: 20,
    marginRight: 10,
    marginLeft: 10,
  },
  ContainerChecked: {
    backgroundColor: 'red',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 20,
    marginRight: 10,
    marginLeft: 10,
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
    paddingTop:5,
    paddingBottom:10

  },
  checkConent: {
    fontWeight: 'bold',
    color: 'yellow',
  },
  highlight: {
    color: 'red',
    backgroundColor: 'yellow',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    
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
