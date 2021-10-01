import './service.style.css'
import {useCookies} from 'react-cookie'

// eslint-disable-next-line
import { BrowserRouter as Router, Link } from 'react-router-dom';

import ServiceBlock from '../../modules/ServiceBlock/ServiceBlock'

export default function Service() {
  // eslint-disable-next-line
  const [cookies, setCookie] = useCookies(['master']);
  return(
    <div className="services-container">
      <div className="services-blocks">
        <div className="services">
          <ServiceBlock name="Стрижка" price="250" bonus="1" id="1" />
          <ServiceBlock name="Стрижка" price="250" bonus="0" id="2" />
          <ServiceBlock name="Стрижка" price="250" bonus="0" id="3" />
          <ServiceBlock name="Стрижка" price="250" bonus="0" id="4" />
          <ServiceBlock name="Стрижка" price="250" bonus="0" id="5" />
        </div>
      </div>
      <Link to="/number"><button>Продолжить</button></Link>
    </div>
  )
}