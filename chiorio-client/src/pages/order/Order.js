import {useCookies} from 'react-cookie'
// eslint-disable-next-line
import { BrowserRouter as Router, Link} from 'react-router-dom';

export default function Order() {
// eslint-disable-next-line
    const [cookies, setCookie, removeCookie] = useCookies(['master', 'phone', 'username']);
    return(
        <div>
            <h1>Спасибо, что посетили наш салон!</h1>
            <p>
                Мастер: {cookies.master}
                <br/>
                <br/>
                Клиент: {cookies.username}
                <br/>
                Количество посещений: 1
                <br/>
                <br/>
                Сумма услуг: 250
            </p>
            <Link to="/home"><button onClick={() => {removeCookie('master'); removeCookie('phone'); removeCookie('username') }}>Оплачено</button></Link>
        </div>
    )
}