import {useCookies} from 'react-cookie'
import {useState, useEffect} from 'react'
// eslint-disable-next-line
import { BrowserRouter as Router, Link} from 'react-router-dom';

export default function Order() {

    const [masterState, setMasterState] = useState({error: null, isLoaded: false, master: []})
    const {masterError, masterLoaded, master} = masterState

    const [clientState, setClientState] = useState({error: null, isLoaded: false, client: []})
    const {clientError, clientLoaded, client} = clientState

    const [serviceState, setServiceState] = useState({error: null, isLoaded: false, service: []})
    const {serviceError, serviceLoaded, service} = serviceState

    const getMaster = () => {
        fetch('http://localhost:8888/getMaster/' + cookies.master)
        .then(res => res.json())
        .then(result => {
            setMasterState({masterLoaded: true, master: result.response})
        },
        (error) => {
            setMasterState({masterLoaded: false, masterError: error})
        })
        
        
        if(masterError) { return (<div>Ошибка: {masterError.message}</div>) }
        else if(!masterLoaded) {return(<div>Загрузка...</div>)}
    }

    const getClient = () => {
        fetch('http://localhost:8888/getClient/' + cookies.phone)
        .then(res => res.json())
        .then(result => {
            setClientState({clientLoaded: true, client: result.response})
        },
        (error) => {
            setClientState({clientLoaded: false, clientError: error})
        })
        
        
        if(clientError) { return (<div>Ошибка: {clientError.message}</div>) }
        else if(!clientLoaded) {return(<div>Загрузка...</div>)}
    }

    const getSummary = () => {
        fetch('http://localhost:8888/getSummary/' + cookies.service)
        .then(res => res.json())
        .then(result => {
            setServiceState({serviceLoaded: true, service: result.response})
        },
        (error) => {
            setServiceState({serviceLoaded: false, serviceError: error})
        })

        if(serviceError) { return (<div>Ошибка: {serviceError.message}</div>) }
        else if(!serviceLoaded) {return(<div>Загрузка...</div>)}
    }
        
    // eslint-disable-next-line
    useEffect(() => {
        getMaster()
        getClient()
        getSummary()
    }, [])

    // eslint-disable-next-line
    const [cookies, setCookie, removeCookie] = useCookies(['master', 'phone', 'username']);
    return(
        <div>
            <h1>Спасибо, что посетили наш салон!</h1>
            <p>
                Мастер: {master.name}
                <br/>
                <br/>
                Клиент: {client.name}
                <br/>
                Количество посещений: {client.count + 1}
                <br/>
                <br/>
                Сумма услуг: {service}
            </p>
            <Link to="/home"><button onClick={() => {
                removeCookie('master');
                removeCookie('phone');
                removeCookie('username');
                removeCookie('service');
                fetch(`http://localhost:8888/addJoin/${client.phone}`) }}>Оплачено</button></Link>
        </div>
    )
}