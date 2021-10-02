import './style.css'
import {useCookies} from 'react-cookie'

export default function ServiceBlock(props) {
    const [cookies, setCookie, removeCookie] = useCookies(['service', 'price']);
    const changeInput = (e, p) => {
        if(e.target.checked) {
            setCookie('service', p.name)
            setCookie('price', +cookies.price + +p.price)
        } else {
            removeCookie('service')
            setCookie('price', +cookies.price - +p.price)
        }
    }

    if(props.bonus === "false") {
        return(
            <div className="serviceBlock">
                <input type="checkbox" id={`s${props.id}`} onChange={(e) => changeInput(e, props)} />
                <label className="serviceTitle" htmlFor={`s${props.id}`}>
                    {props.name}<br/>
                    Цена: <b>{props.price}</b>р
                </label>
            </div>
        )
    } else {
        return(
            <div className="serviceBlock">
                <input type="checkbox" id={`s${props.id}`} onChange={(e) => changeInput(e, props)} />
                <label className="serviceTitle" htmlFor={`s${props.id}`}>
                    {props.name}<br/>
                    Цена: <b>{props.price}</b>р
                </label>
                <div className="sale">Акция!</div>
            </div>
        )
    }
}