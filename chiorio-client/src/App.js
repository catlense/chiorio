import './App.css'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './modules/header/Header'
import Home from './pages/home/Home'
import Select from './pages/select/Select'
import Service from './pages/service/Service'
import Number from './pages/number/Number'
import Order from './pages/order/Order'
import Register from './pages/reg/Register'

import Admin from './pages/admin/Admin'

document.title = 'Barbershop'

function App() {
  return (
    <div>
      <Router>
        <Header/>
        <Switch>
          <Route path="/admin/createMaster" component={() => <Admin/> } />
          <Route path="/admin/editMaster" component={() => <Admin/> } />
          <Route path="/admin/deleteMaster" component={() => <Admin/> } />

          <Route path="/admin/createService" component={() => <Admin/> } />
          <Route path="/admin/changeService" component={() => <Admin/> } />
          <Route path="/admin/deleteService" component={() => <Admin/> } />

          <Route path="/admin/export" component={() => <Admin/> } />
          
          <Route path="/admin" component={() => <Admin/> } />

          <Route path="/reg" component={() => <Register/> } />
          <Route path="/order" component={() => <Order/>} />
          <Route path="/number" component={() => <Number/>} />
          <Route path="/select" component={() => <Select/>} />
          <Route path="/service" component={() => <Service/>} />
          <Route path="/home" component={() => <Home/>} />
          <Route path="/" component={() => <Home/>} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;