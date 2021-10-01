import './style.css'
export default function ServiceBlock(props) {
    if(props.bonus === "0") {
        return(
            <div className="serviceBlock">
                <input type="checkbox" id={`s${props.id}`} />
                <label className="serviceTitle" htmlFor={`s${props.id}`}>
                    {props.name}<br/>
                    Цена:{props.price}
                </label>
            </div>
        )
    } else {
        return(
            <div className="serviceBlock">
                <input type="checkbox" id={`s${props.id}`} />
                <label className="serviceTitle" htmlFor={`s${props.id}`}>
                    {props.name}<br/>
                    Цена:{props.price}
                </label>
                <div className="sale">Акция!</div>
            </div>
        )
    }
}