import './admin.css'

import {useState, useEffect} from 'react'
import React from 'react'

class CustomOption extends React.Component {
    render() {
        return(
            <option value={this.props.value}>{this.props.name}</option>
        )
    }
}

export default function DeleteMaster() {

    const [masterState, setMasterState] = useState({error: null, isLoaded: false, master: []})
    const {masterError, masterLoaded, master} = masterState

    const getMaster = () => {
        fetch('http://localhost:8888/getMasters/')
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

    useEffect(() => {
        getMaster()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [uid, setUid] = useState(1)
    const [result, setResult] = useState('')

    return(
        <div className="adminForm">
            <h1>Удаление мастера</h1>
            <select uid={uid} onChange={(e) => setUid(e.target.value)}>
                {
                    master.map(m => {return (<CustomOption key={`1${m._id}`} value={m.uid} name={m.name}/>)})
                }
            </select>
            <button onClick={() => fetch(`http://localhost:8888/master/delete/${uid}`).then(r => r.json()).then(res => setResult('Успешно!'))}>Удалить</button>
            <br/>
            <div>{result}</div>
        </div>
    )
}