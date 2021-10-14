import './register.style.css'
import {useState} from 'react'
import {useCookies} from 'react-cookie'
// eslint-disable-next-line
import { BrowserRouter as Router, Link } from 'react-router-dom';

export default function Register() {
    const [name, setName] = useState("")
    // eslint-disable-next-line
    const [cookies, setCookie] = useCookies(['master', 'phone', 'username']);
    const Button = (props) => {
        return (
            <div className="reg-btn" onClick={() => setName(name + props.value)}>{props.value}</div>
        )
    }

    return(
        <div className="register-container">
            <input className="userName" value={name} onChange={(e) => setName(e.target.value)} />
            <div className="keyboard-container">
                <Button value="Й" />
                <Button value="Ц" />
                <Button value="У" />
                <Button value="К" />
                <Button value="Е" />
                <Button value="Н" />
                <Button value="Г" />
                <Button value="Ш" />
                <Button value="Щ" />
                <Button value="З" />
                <Button value="Х" />
                <Button value="Ъ" /><br/>
                <Button value="Ф" />
                <Button value="Ы" />
                <Button value="В" />
                <Button value="А" />
                <Button value="П" />
                <Button value="Р" />
                <Button value="О" />
                <Button value="Л" />
                <Button value="Д" />
                <Button value="Ж" />
                <Button value="Э" /><br/>
                <Button value="Я" />
                <Button value="Ч" />
                <Button value="С" />
                <Button value="М" />
                <Button value="И" />
                <Button value="Т" />
                <Button value="Ь" />
                <Button value="Б" />
                <Button value="Ю" />
            </div>
            <a href="/order"><button onClick={() => {setCookie('username', name); fetch(`http://localhost:8888/createClient/${cookies.phone}/${name}`)}}>Продолжить</button></a>
            <div style={{textAlign: 'center', marginTop: 50, cursor: 'pointer'}} onClick={() => window.history.go(-1)}>Назад</div>
        </div>
    )
}