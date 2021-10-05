import './style.css'
import logo from './logo.png'

import {useCookies} from 'react-cookie'
// eslint-disable-next-line
import { BrowserRouter as Router, Link} from 'react-router-dom';

export default function Header() {
  // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies(['master', 'phone', 'username', 'service']);


    return(
      <div>       
        <div className="header-container">
          <div className="logotype" onClick={() => {
                removeCookie('master');
                removeCookie('phone');
                removeCookie('username');
                removeCookie('service'); }}>
            <Link to="/home"><img src={logo} alt="Chiorio logotype" /></Link>
          </div>
        </div>
      </div>
    )
}