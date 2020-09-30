import React from 'react';
import MainPage from './components/main_page/MainPage';
import { Route, Switch } from 'react-router-dom';

function App() {
  const MainPageComponent = () => <MainPage/>
  
  return (
    <div className="App">
      <Switch> 
        <Route exact path="/" render={MainPageComponent}/>
      </Switch>
    </div>
  );
}

export default App;
