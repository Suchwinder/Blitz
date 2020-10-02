import React from 'react';
import MainPage from './components/pages/main_page/MainPage';
import CreateGroup from './components/pages/create_group/CreateGroup'
import { Route, Switch } from 'react-router-dom';

function App() {
  const MainPageComponent = () => <MainPage/>
  //const CreateGroupComponent = () => <CreateGroup/>
  //const JoinGroupComponent = () => <JoinGroup/>
  //const SplitBillComponent = () => <SplitBill/>
  return (
    <div className="App">
      <Switch> 
        <Route exact path="/" render={MainPageComponent}/>
        {
        /*
        <Route path="/createGroup" component={CreateGroupComponent} />
        <Route path="/joinGroup" component={JoinGroupComponent} />
        <Route path="/splitBill" component={SplitBillComponent} /> */
        }
      </Switch>
    </div>
  );
}

export default App;
