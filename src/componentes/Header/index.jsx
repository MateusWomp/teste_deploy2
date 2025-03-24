import styles from './header.module.css'

function Header(){
    return(
        <header className={styles.header}>
            <nav className={styles.nav}>
                <ul className={styles.ListIcones}>
                    <li className={styles.ItemIcone}>Icone1</li>
                </ul>
                <img className={styles.logo} src="/imagens/imagem_escolas_conectadas.webp" alt="Logo"/>
            </nav>
        </header>
    )
}
export default Header