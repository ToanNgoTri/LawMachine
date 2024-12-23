/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './navigators/AppNavigators';
import {createContext, useState} from 'react';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import dataOrg from './data/project2-197c0-default-rtdb-export.json';
const ModalStatus = createContext(); // lấy modalVisible status
const InfoDownloaded = createContext(); //
// const ContentDownloaded = createContext(); //

function App() {


  const [modalStatus, setModalStatus] = useState(false);
  const updateModalStatus = data => {
    setModalStatus(data);
  };



  
  const [info, setInfo] = useState(dataOrg['LawInfo']);
  const updateInfo = data => {
    setInfo(data);
  };
  // const [content, setContent] = useState(dataOrg['LawContent']);
  // const updateContent = data => {
  //   setContent(data);
  // };

  return (
    <Provider store={store}>
      <ModalStatus.Provider value={{modalStatus, updateModalStatus}}>
            <InfoDownloaded.Provider value={{info,updateInfo}}>
            <StackNavigator />
            </InfoDownloaded.Provider>
      </ModalStatus.Provider>
    </Provider>
  );
}

// export default App;
export { ModalStatus,InfoDownloaded, App};
