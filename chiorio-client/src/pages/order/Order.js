import {useCookies} from 'react-cookie'
import {useState, useEffect} from 'react'
// eslint-disable-next-line
import { BrowserRouter as Router, Link} from 'react-router-dom';

export default function Order() {

    const [state, setState] = useState({error: null, isLoaded: false, items: []})
    const {error, isLoaded, items} = state

    const getInfo = () => {
        fetch('http://localhost:8888/getMaster/' + cookies.master)
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
    const [cookies, setCookie, removeCookie] = useCookies(['master', 'phone', 'username']);
    return(
        <div>
            <h1>Спасибо, что посетили наш салон!</h1>
            <p>
                Мастер: {items.name}
                <br/>
                <br/>
                Клиент: {cookies.username}
                <br/>
                Количество посещений: 1
                <br/>
                <br/>
                Сумма услуг: 250
            </p>
            <Link to="/home"><button onClick={() => {removeCookie('master'); removeCookie('phone'); removeCookie('username') }}>Оплачено</button></Link>
        </div>
    )
}