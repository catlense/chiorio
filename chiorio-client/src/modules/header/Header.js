import './style.css'
import logo from './logo.png'

import {useCookies} from 'react-cookie'
// eslint-disable-next-line
import { BrowserRouter as Router, Link} from 'react-router-dom';

export default function Header() {
  // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies();


    return(
      <div>       
        <div className="header-container">
          <div className="logotype" onClick={() => {removeCookie('master'); }}>
            <Link to="/home"><img src={logo} alt="Chiorio logotype" /></Link>
          </div>
        </div>
      </div>
    )
}