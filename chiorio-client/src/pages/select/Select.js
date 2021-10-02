import './style.css'

import Master from '../../modules/master/Master'
import {useState, useEffect} from 'react'

export default function Select() {
  const [state, setState] = useState({error: null, isLoaded: false, items: []})
  const {error, isLoaded, items} = state

  const getInfo = () => {
    fetch('http://localhost:8888/getMasters')
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

  return(
    <div className="select">
      {
        items.map(master => {return (<Master key={master.uid} id={master.uid} name={master.name} photo={master.photo} />)})
      }
    </div>
  )
}