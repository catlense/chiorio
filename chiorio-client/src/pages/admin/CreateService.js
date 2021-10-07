import './admin.css'

import {useState} from 'react'

export default function CreateService() {
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [bonus, setBonus] = useState(false)
    const [result, setResult] = useState('')
    return (
        <div className="adminForm">
            <h1>Создание услуги</h1>
            <input placeholder="Имя услуги" value={name} onChange={(e) => setName(e.target.value)} />
            <input placeholder="Цена услуги" value={price} onChange={(e) => setPrice(e.target.value)} />
            <div style={{display: 'flex', alignItems: 'center'}}>
                <input type="checkbox" defaultChecked={bonus} onChange={() => setBonus(!!!bonus)} value={bonus} id="bonus" />
                <label htmlFor="bonus">По акции</label>
            </div>
            <button onClick={
                () => fetch(`http://localhost:8888/createService/${name}/${price}/${bonus}`)
                .then(r => r.json())
                .then(res => setResult(`Услуга "${res.response.name}" за ${res.response.price}р создана!`))
                }>Создать</button>
            <br/>
            <div>{result}</div>
        </div>
        )
}