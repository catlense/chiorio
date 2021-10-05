import './style.css'
import {useCookies} from 'react-cookie'

export default function ServiceBlock(props) {
    const [cookies, setCookie] = useCookies(['service', 'price']);
    const changeInput = (e, p) => {
        let total = String(cookies.service)
        total = total === "undefined" ? '' : total
        if(e.target.checked) {
            total += total.length > 0 ? ',' + p.id.toString() : p.id.toString()      
        } else {
            total = total.length > 1 ? total.replace(',' + p.id.toString(), '') : total.replace(p.id.toString(), '')
        }
        setCookie('service', total)
        console.log(total)
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