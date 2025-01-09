import React from 'react';
import {UserProvider} from './contexts/UserContext';
import {SafeAreaView} from 'react-native';
import { safeAreaViewStyle } from './styles/customStyles';
import RootNavigator from './routes/navigator';

const App: React.FC = () => {
  return (
    <SafeAreaView style={safeAreaViewStyle.safeAreaView}>
      <UserProvider>
        <RootNavigator />
      </UserProvider>
    </SafeAreaView>
  );
};


export default App;
