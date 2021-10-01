import './style.css'

import { BrowserRouter as Router, Link } from 'react-router-dom';

export default function Home() {
  return(
    <div className="main-container">
      <Router/>
      <h1>Добро пожаловать в Чио-чио</h1>
      <p>экспресс парикмахерская</p>
      <Link to="/select"><button>Выбрать мастера</button></Link>
    </div>
  )
}