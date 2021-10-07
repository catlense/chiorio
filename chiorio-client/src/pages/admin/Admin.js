// eslint-disable-next-line
import { BrowserRouter as Router, Link } from 'react-router-dom';

const style = {
    main: {
        fontSize: 18, textAlign: 'center', display: 'flex', flexDirection: 'column', height: 50, justifyContent: 'space-between'
    },
    link: {
        color: 'black'
    },
    hr: {
        width: 100
    }
}

export default function Admin() {
    return(
        <div style={style.main}>
            <Link to="/admin/createMaster" style={style.link}>Создать мастера</Link><br/>
            <Link to="/admin/editMaster" style={style.link}>Изменить мастера</Link><br/>
            <Link to="/admin/deleteMaster" style={style.link}>Удалить мастера</Link><br/>
            <hr style={style.hr} />
            <Link to="/admin/createService" style={style.link}>Создать услугу</Link><br/>
            <Link to="/admin/editService" style={style.link}>Изменить услугу</Link><br/>
            <Link to="/admin/deleteService" style={style.link}>Удалить услугу</Link><br/>
            <hr style={style.hr} />
            <Link to="/admin/export" style={style.link}>Выгрузка базы</Link>
        </div>
    )
}