import './admin.css'

import {useState, useEffect} from 'react'
import React from 'react'

export default function EditService() {

    class CustomOption extends React.Component {
        render() {
            return(
                <option value={this.props.value}>{this.props.name}</option>
            )
        }
    }
    
    class CustomCheckbox extends React.Component {
        render() {
            if(this.props.bonus) {
                return (<input type="checkbox" onChange={this.props.onChange} value={this.props.bonus} checked id="bonus" />)
            } else {
                return (<input type="checkbox" onChange={this.props.onChange} value={this.props.bonus} id="bonus" />)
            }
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
            setPrice(result.response[0].price)
            setBonus(result.response[0].bonus)
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
    const [price, setPrice] = useState('')
    const [uid, setUid] = useState(1)
    const [result, setResult] = useState('')
    const [bonus, setBonus] = useState(false)

    useEffect(() => {
        if(serviceLoaded) {
            setName(service[uid-1].name)
            setPrice(service[uid-1].price)
            setBonus(service[uid-1].bonus)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [uid])

    return(
        <div className="adminForm">
            <h1>Редактирование услуги</h1>
            <select uid={uid} onChange={(e) => setUid(e.target.value)}>
                {
                    service.map(m => {return (<CustomOption key={`1${m._id}`} value={m.uid} name={m.name}/>)})
                }
            </select>
            <input placeholder="Имя мастера" value={name} onChange={(e) => setName(e.target.value)} />
            <input placeholder="Стоимость услуги" value={price} onChange={(e) => setPrice(e.target.value)} />
            <div style={{display: 'flex', alignItems: 'center'}}>
                <CustomCheckbox bonus={bonus} onChange={() => { setBonus(!bonus); console.log('bonus') } } />
                <label htmlFor="bonus">По акции</label>
            </div>
            <button onClick={() => fetch(`http://localhost:8888/service/edit/${uid}/${name}/${price}/${bonus}`).then(r => r.json()).then((r) => setResult(`${r.response.name}: успешно. /// ${r.response.price}: успешно /// ${r.response.bonus}: успешно`))}>Редактировать</button>
            <div><br></br>{result}</div>
        </div>
    )
}