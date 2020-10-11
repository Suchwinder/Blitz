import React from 'react';
import MainPage from './components/main_page/MainPage';
import CreateGroup from './components/create_group/CreateGroup'
import JoinGroup from './components/join_group/JoinGroup'
import SplitBill from './components/split_bill/SplitBill'
import { Route, Switch } from 'react-router-dom';

function App() {
  const MainPageComponent = () => <MainPage/>
  const CreateGroupComponent = () => <CreateGroup/>
  const JoinGroupComponent = () => <JoinGroup/>
  const SplitBillComponent = () => <SplitBill/>
  return (
    <div className="App">
      <Switch> 
        <Route exact path="/" render={MainPageComponent}/>
        <Route exact path="/create_group" component={CreateGroupComponent} />
        <Route exact path="/join_group" component={JoinGroupComponent} />
        <Route exact path="/split_bill" component={SplitBillComponent} />
      </Switch>
    </div>
  );
}

export default App;
