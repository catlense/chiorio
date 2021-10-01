import './style.css'

import Master from '../../modules/master/Master'

export default function Select() {
  return(
    <div className="select">
      <Master photo="http://localhost:8888/img/img1.jpg" id="1" name="Максим" />
      <Master photo="http://localhost:8888/img/img1.jpg" id="2" name="Максим" />
      <Master photo="http://localhost:8888/img/img1.jpg" id="3" name="Максим" />
      <Master photo="http://localhost:8888/img/img1.jpg" id="4" name="Максим" />
    </div>
  )
}