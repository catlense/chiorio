import './style.css'

import {useCookies} from 'react-cookie'
// eslint-disable-next-line
import { BrowserRouter as Router, Link } from 'react-router-dom';

export default function Master(props) {
  // eslint-disable-next-line
  const [cookies, setCookie] = useCookies();

  return(
    <div className="master" onClick={() => setCookie('master', props.id)}>
      <Link to={`/service`}>
        <img src={props.photo} alt={props.name} />
        <p>{props.name}</p>
      </Link>
    </div>
  )
}