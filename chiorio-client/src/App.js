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

import CreateMaster from './pages/admin/CreateMaster'
import EditMaster from './pages/admin/EditMaster'
import DeleteMaster from './pages/admin/DeleteMaster'

import CreateService from './pages/admin/CreateService'
import EditService from './pages/admin/EditService'
import DeleteService from './pages/admin/DeleteService'

import Export from './pages/admin/Export'

document.title = 'Barbershop'

function App() {
  return (
    <div>
      <Router>
        <Header/>
        <Switch>
          <Route path="/admin/createMaster" component={() => <CreateMaster/> } />
          <Route path="/admin/editMaster" component={() => <EditMaster/> } />
          <Route path="/admin/deleteMaster" component={() => <DeleteMaster/> } />

          <Route path="/admin/createService" component={() => <CreateService/> } />
          <Route path="/admin/editService" component={() => <EditService/> } />
          <Route path="/admin/deleteService" component={() => <DeleteService/> } />

          <Route path="/admin/export" component={() => <Export/> } />
          
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