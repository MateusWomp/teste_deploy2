import React, { useState } from "react"
import { useVideoContext } from "../../componentes/context/VideoContext"
import { contexto_usuario } from "../../componentes/context/UsuarioContext"
import { useNavigate } from "react-router-dom"
import styles from "./admin.module.css"

function Admin() {
    const { videoUrl, videoUrl2, atualizarVideos } = useVideoContext()
    const { nomeusuario } = contexto_usuario()
    const [novoId1, setNovoId1] = useState("")
    const [novoId2, setNovoId2] = useState("")

    const navigate = useNavigate()

    if (!nomeusuario) {
        navigate('/login')
    }

    const identificadorUrlChange = (e) => {
        e.preventDefault();
        if (novoId1.trim() !== "" || novoId2.trim() !== "") {
            const id1 = novoId1.trim() !== "" ? novoId1.trim() : (videoUrl.split('/').pop() || "")
            const id2 = novoId2.trim() !== "" ? novoId2.trim() : (videoUrl2.split('/').pop() || "")
            atualizarVideos(id1, id2)
            alert("IDs dos vídeos atualizados")
        }
        setNovoId1("")
        setNovoId2("")
    };

    return (
        <div className={styles.container}>
            <h2>Painel Administrador</h2>
            <p>Bem-vindo, {nomeusuario}!</p>
            <form onSubmit={identificadorUrlChange} className={styles.form}>
                <input
                    type="text"
                    value={novoId1}
                    onChange={(e) => setNovoId1(e.target.value)}
                    placeholder="Digite o ID do primeiro vídeo"
                />
                <input
                    type="text"
                    value={novoId2}
                    onChange={(e) => setNovoId2(e.target.value)}
                    placeholder="Digite o ID do segundo vídeo"
                />
                <button type="submit">Atualizar Vídeo</button>
            </form>
            <p>URL atual do vídeo: <strong>{videoUrl}</strong></p>
            <p>URL atual do segundo vídeo: <strong>{videoUrl2}</strong></p>
        </div>
    );
}
export default Admin;
