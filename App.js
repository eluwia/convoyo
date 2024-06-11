import React from 'react';
import './config/firebase'
import { Provider } from 'react-redux';
import { store } from './store'
import RootNavigation from './navigation';

export default function App() {
  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
};