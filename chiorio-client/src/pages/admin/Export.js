import { useState } from 'react'

export default function Export() {
    const [file, setFile] = useState('http://localhost:8888/exports/')
    return(
        <div style={{textAlign: 'center'}}>
            <button onClick={() => {
                fetch('http://localhost:8888/export')
                .then(r => r.json())
                .then(res => setFile(res.filePath))
            }}>Экспортировать</button>
            <br/>
            <a href={file} target="_blank">{file}</a>
        </div>
    )
}