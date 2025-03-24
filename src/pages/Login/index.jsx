import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {contexto_usuario as useUserContext} from '../../componentes/context/UsuarioContext';
import styles from './login.module.css';
import mockUsers from '../../data/usuarios.json';

function Login(){
    const [nomeusuario, setNomeusuario] = useState('');
    const [senha, setSenha] = useState('');
    const {setNomeusuario: setUsuarioContext} = useUserContext();
    const navegar = useNavigate();

    const Enviado = (e) => {
        e.preventDefault();

        const usuario = mockUsers.find(usuario => usuario.nomeusuario === nomeusuario && usuario.senha === senha);

    if (usuario){
        setUsuarioContext(nomeusuario)
        navegar('/admin')
    } else {
        alert('Usuário ou senha incorretos')
    }
    }

    return(
        <div className={styles.container}>
            <form onSubmit={Enviado} className={styles.form}>
                <h2>Login</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={nomeusuario}
                    onChange={(e) => setNomeusuario(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                    minLength={8}
                />
                <button type="submit">Entrar</button>
            </form>
        </div>
    )
}
export default Login
