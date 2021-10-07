import './admin.css'

import {useState, useEffect} from 'react'
import React from 'react'

export default function DeleteService() {

    class CustomOption extends React.Component {
        render() {
            return(
                <option value={this.props.value}>{this.props.name}</option>
            )
        }
    }

    const [serviceState, setServiceState] = useState({error: null, isLoaded: false, service: []})
    const {serviceError, serviceLoaded, service} = serviceState

    const getService = () => {
        fetch('http://localhost:8888/getServices/')
        .then(res => res.json())
        .then(result => {
            setServiceState({serviceLoaded: true, service: result.response})
            setName(result.response[0].name)
        },
        (error) => {
            setServiceState({serviceLoaded: false, serviceError: error})
        })
        
        
        if(serviceError) { return (<div>Ошибка: {serviceError.message}</div>) }
        else if(!serviceLoaded) {return(<div>Загрузка...</div>)}

    }

    useEffect(() => {
        getService()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    
    const [name, setName] = useState('')
    const [uid, setUid] = useState(1)
    const [result, setResult] = useState('')
    
    useEffect(() => {
        if(serviceLoaded) {
            setName(service[uid-1].name)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [uid])

    return(
        <div className="adminForm">
            <h1>Удаление услуги</h1>
            <select uid={uid} onChange={(e) => setUid(e.target.value)}>
                {
                    service.map(m => {return (<CustomOption key={`1${m._id}`} value={m.uid} name={m.name}/>)})
                }
            </select>
            <button onClick={() =>
                {
                    fetch(`http://localhost:8888/service/delete/${uid}`).then(r => r.json()).then(res => setResult('Успешно!'));
                    fetch('http://localhost:8888/fixdb')
                }}>Удалить</button>

            <br/>
            <div>{name + ' ' + result}</div>
        </div>
    )
}