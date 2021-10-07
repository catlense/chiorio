import './admin.css'

import {useState} from 'react'

export default function CreateMaster() {
    const [name, setName] = useState("")
    const [photo, setPhoto] = useState("")
    const [result, setResult] = useState("")
    return (
        <div className="adminForm">
            <h1>Создание мастера</h1>
            <input placeholder="Имя мастера" value={name} onChange={(e) => setName(e.target.value)} />
            <input placeholder="Фото мастера" value={photo} onChange={(e) => setPhoto(e.target.value)} />
            <button onClick={() => {fetch(`http://localhost:8888/createMaster/${name}/${photo}`).then(res => res.json()).then(setResult('Успешно')) }}>Создать</button>

            <div className="result" style={{marginBottom: 40}}>{result}</div>

            <h1>Инструкция:</h1>
            <ul>
                <li>В поле имя мастера указывается имя, которое должно отображаться в имени мастера</li>
                <li>В поле фото мастера должно быть лишь название с расширением (img1.jpg как пример) и эта фотка должна быть в папке <code>chiorio-server/img/ИМЯ_ФОТКИ</code></li>
            </ul>
        </div>
    )
}