import React from "react"
import styles from './footer.module.css'

const Footer = () =>{
     return(
        <footer className={styles.footer}>
            <img
              src="/imagens/Conjunto_de_logo_do_projeto_rodape.png"
              alt="Logo do projeto no rodape"
              className={styles.footerImage}
              />
        </footer>
     )
}
export default Footer;