import React from 'react';
import MainPage from './components/main_page/MainPage';
import CreateGroup from './components/create_group/CreateGroup'
import JoinGroup from './components/join_group/JoinGroup'
// import SplitBill from './components/split_bill/SplitBill'
import { Route, Switch } from 'react-router-dom';
import SplitBillPage from './components/split_bill_page/SplitBillPage'

function App() {
  const MainPageComponent = () => <MainPage/>
  const CreateGroupComponent = () => <CreateGroup/>
  const JoinGroupComponent = () => <JoinGroup/>
  // const SplitBillComponent = () => <SplitBill/>
  // in react router to access the url we need to pass in a prop which will automatically contain the URL
  // other approach is use vanilla js in component and use "window.location.href"
  const SplitBillPageComponent = (group_url) => <SplitBillPage groupURL={group_url}/>

  return (
    <div className="App">
      <Switch> 
        <Route exact path="/" render={MainPageComponent}/>
        <Route exact path="/create_group" component={CreateGroupComponent} />
        <Route exact path="/join_group" component={JoinGroupComponent} />
        <Route exact path="/split_bill" component={MainPageComponent} />
        <Route path = '/split_bill/:groupURL' component={SplitBillPageComponent}/>
      </Switch>
    </div>
  );
}

export default App;
