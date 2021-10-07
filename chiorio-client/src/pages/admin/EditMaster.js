import './admin.css'

import {useState, useEffect} from 'react'
import React from 'react'

export default function EditMaster() {

    class CustomOption extends React.Component {
        render() {
            return(
                <option value={this.props.value}>{this.props.name}</option>
            )
        }
    }

    const [masterState, setMasterState] = useState({error: null, isLoaded: false, master: []})
    const {masterError, masterLoaded, master} = masterState

    const getMaster = () => {
        fetch('http://localhost:8888/getMasters/')
        .then(res => res.json())
        .then(result => {
            setMasterState({masterLoaded: true, master: result.response})
            setName(result.response[0].name)
            setPhoto(result.response[0].photo.split('/')[result.response[0].photo.split('/').length - 1])
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

    
    const [name, setName] = useState('')
    const [photo, setPhoto] = useState('')
    const [uid, setUid] = useState(1)
    const [result, setResult] = useState('')

    useEffect(() => {
        if(masterLoaded) {
            setName(master[uid-1].name)
            setPhoto(master[uid-1].photo.split('/')[master[uid-1].photo.split('/').length - 1])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [uid])

    return(
        <div className="adminForm">
            <h1>Редактирование мастера</h1>
            <select uid={uid} onChange={(e) => setUid(e.target.value)}>
                {
                    master.map(m => {return (<CustomOption key={`1${m._id}`} value={m.uid} name={m.name}/>)})
                }
            </select>
            <input placeholder="Имя мастера" value={name} onChange={(e) => setName(e.target.value)} />
            <input placeholder="Фото мастера" value={photo} onChange={(e) => setPhoto(e.target.value)} />
            <button onClick={() => fetch(`http://localhost:8888/master/edit/${uid}/${name}/${photo}`).then(r => r.json()).then((r) => setResult(`${r.response.name}: успешно. /// ${r.response.photo}: успешно`))}>Редактировать</button>
            <div><br></br>{result}</div>
        </div>
    )
}