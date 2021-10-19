import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import Header from "./Component/Header/Header";
import Infected from "./Component/Card/Infected/Infected";
import Admin from "./Component/Admin/Admin";
import AdminDetails from "./Component/Admin/AdminDetails";
import Login from "./Component/Authentication/Login";

function App() {

  return (
    <div>
      <Router>
        <div className="row" style={{display:"flex", flexDirection:"column"}}>
            <div style={{marginBottom:"40px"}}>
                <Header/>
            </div>
            <div style={{justifyContent:"center", textAlign:"center", marginBottom:"40px"}}>
                <h2>Số liệu covid-19 tại Việt Nam</h2>
                <hr color='lightcoral' size='5px' align='center' width='60%'/>
            </div>
            <div>
                <Switch>
                    <Route exact path='/' component={Infected}></Route>
                    <Route exact path='/admin' render={()=>{
                        return sessionStorage.getItem('isLogin') === 'true' ? <Admin/> : <Infected/>
                    }}></Route>
                    <Route exact path='/details' render={()=>{
                        return sessionStorage.getItem('isLogin') === 'true' ? <AdminDetails/> : <Infected/>
                    }}></Route>
                    <Route exact path='/login' component={Login}></Route>
                </Switch>
            </div>
        </div>

      </Router>
    </div>
  );
}

export default App;
