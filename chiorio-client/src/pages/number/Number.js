import './number.style.css'

import {useState, useEffect} from 'react'

import {useCookies} from 'react-cookie'

// eslint-disable-next-line
import { BrowserRouter as Router, Link } from 'react-router-dom';


export default function Number() {
    const [phone, setPhone] = useState("8")
    const [isReg, setReg] = useState(false)

    function getInfo(tel) {
        let request = 'http://localhost:8888/getClient/' + (tel.length > 0 ? tel:0);
        fetch(request)
        .then(res => res.json())
        .then(result => {
            if(result.response !== null) setReg(true)
            else setReg(false)
        })
    }
    useEffect(() => {
        getInfo(phone)
    }, [phone])
        
    // eslint-disable-next-line
    const [cookies, setCookie] = useCookies(['phone']);
    
        return(
            <div className="number-container">
                <h1>Введите номер телефона</h1>
                <input type="text" placeholder="8 (999) 999-99-99" value={phone} onChange={(e)=>{ setPhone(e.target.value)}} className="input-phone" />
                <div className="numbers">
                    <div className="number" value="1" onClick={()=>{ setPhone(phone); setPhone(phone + '1'); }}>1</div>
                    <div className="number" value="2" onClick={()=>{ setPhone(phone + '2'); }}>2</div>
                    <div className="number" value="3" onClick={()=>{ setPhone(phone + '3'); }}>3</div>
                    <div className="number" value="4" onClick={()=>{ setPhone(phone + '4'); }}>4</div>
                    <div className="number" value="5" onClick={()=>{ setPhone(phone + '5'); }}>5</div>
                    <div className="number" value="6" onClick={()=>{ setPhone(phone + '6'); }}>6</div>
                    <div className="number" value="7" onClick={()=>{ setPhone(phone + '7'); }}>7</div>
                    <div className="number" value="8" onClick={()=>{ setPhone(phone + '8'); }}>8</div>
                    <div className="number" value="9" onClick={()=>{ setPhone(phone + '9'); }}>9</div>
                    <div className="number" value="c" onClick={()=>{ setPhone(""); }}>C</div>
                    <div className="number" value="0" onClick={()=>{ setPhone(phone + '0'); }}>0</div>
                    <div className="number" value="<" onClick={()=>{ setPhone(phone.substring(0, phone.length - 1));} }>&lt;</div>
                </div>
                <a href={isReg ? '/order' : '/reg'}><button onClick={() => setCookie('phone', phone)}>{isReg ? 'Продолжить' : 'Зарегистрироваться'}</button></a>
                <div style={{textAlign: 'center', marginTop: 50, cursor: 'pointer'}} onClick={() => window.history.go(-1)}>Назад</div>
            </div>
        )

}