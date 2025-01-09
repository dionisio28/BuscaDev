import React from 'react';
import {UserProvider} from './contexts/UserContext';
import UserScreens from './screens/UserScreen';

const App: React.FC = () => {
  return (
    <UserProvider>
      <UserScreens />
    </UserProvider>
  );
};

export default App;
