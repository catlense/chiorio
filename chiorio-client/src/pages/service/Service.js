import './service.style.css'
import {useCookies} from 'react-cookie'
import {useState, useEffect} from 'react'

// eslint-disable-next-line
import { BrowserRouter as Router, Link } from 'react-router-dom';

import ServiceBlock from '../../modules/ServiceBlock/ServiceBlock'

export default function Service() {
  const [state, setState] = useState({error: null, isLoaded: false, items: []})
  const {error, isLoaded, items} = state

  const getInfo = () => {
    fetch('http://localhost:8888/getServices')
    .then(res => res.json())
    .then(result => {
      setState({isLoaded: true, items: result.response})
    },
    (error) => {
      setState({isLoaded: false, error})
    })


    if(error) { return (<div>Ошибка: {error.message}</div>) }
    else if(!isLoaded) {return(<div>Загрузка...</div>)}
  }
  
  // eslint-disable-next-line
  useEffect(() => getInfo(), [])

  // eslint-disable-next-line
  const [cookies, setCookie] = useCookies(['master']);
  return(
    <div className="services-container">
      <div className="services-blocks">
        <div className="services">
          {items.map(res => {return <ServiceBlock name={res.name} price={res.price} bonus={res.bonus.toString()} key={res.uid} id={res.uid} />})}
        </div>
      </div>
      <Link to="/number"><button>Продолжить</button></Link>
      <div style={{textAlign: 'center', marginTop: 50, cursor: 'pointer'}} onClick={() => window.history.go(-1)}>Назад</div>
    </div>
  )
}