import './App.css'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './modules/header/Header'
import Home from './pages/home/Home'
import Select from './pages/select/Select'
import Service from './pages/service/Service'
import Number from './pages/number/Number'
import Order from './pages/order/Order'
import Register from './pages/reg/Register'

document.title = 'Barbershop'

// const [masters, setMasters] = useState({error: null, isLoaded: false, items: []})

// fetch('http://localhost:8888/getMasters')
// .then(res => res.json())
// .then(result => {
//   setMasters({isLoaded: true, items: result.response})
// },
// (error) => {
//   setMasters({isLoaded: false, error})
// })

// const {error, isLoaded, items} = masters


function App() {
  return (
    <div>
      <Router>
        <Header/>
        <Switch>
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