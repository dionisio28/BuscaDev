import React from 'react';
import {UserProvider} from './contexts/UserContext';
import GithubFinder from './screens/GithubFinder';
import {SafeAreaView} from 'react-native';
import { safeAreaViewStyle } from './styles/customStyles';

const App: React.FC = () => {
  return (
    <SafeAreaView style={safeAreaViewStyle.safeAreaView}>
      <UserProvider>
        <GithubFinder />
      </UserProvider>
    </SafeAreaView>
  );
};


export default App;
