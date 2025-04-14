import React from "react";
import { useVideoContext } from "../../componentes/context/VideoContext";
import styles from "./Home.module.css";
import Header from "../../componentes/Header";
import Footer from "../../componentes/Footer";

function Home() {
  const { videoUrl, videoUrl2 } = useVideoContext();

  const renderVideo = (url) => {
    if (!url || url.trim() === "") {
      return <div className={styles.placeholder}>Nenhum vídeo disponível</div>
    }
    return (
      <iframe
        width="100%"
        height="100%"
        src={url}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    )
  }
  return (
    <div className={styles.pageContainer}>
      <Header />

      <section className={styles.homeContent}>
        <div className={styles.title}>
        <h1 className={styles.titleText}>conheça o projeto</h1>
        <div className={styles.logosContainer}>
          <img
          src="/imagens/logo_Escolas_Conectadas_colorida.png"
          alt= "Logo Escolas Conectadas"
          className={styles.logoEscolas}
          />
          <img
          src="/imagens/Conjunto_de_logo_do_projeto.png"
          alt="Conjunto de logos do projeto"
          className={styles.conjuntoLogos}
          />
        </div>
        </div>
        <div className={styles.ContainerVideo}>
          {renderVideo(videoUrl)}
        </div>

        {/* FAIXA DE ARCO-ÍRIS entre os vídeos*/}
        <div className={styles.rainbowBar}></div>
        <div className={styles.helpTitle}>
          <h2>Está com problemas de conexão?</h2>
          <p>Acesse o vídeo e solucione de forma rápida e eficaz</p>
        </div>
        <div className={styles.ContainerVideo}>
          {renderVideo(videoUrl2)}
        </div>
        <div className={styles.tabela}>
          <table className={styles.infoTable}>
            <thead>
              <tr>
                <th>EDITAL</th>
                <th>INFORMAR SINISTRO</th>
                <th>SUPORTE TÉCNICO</th>
                <th>EMAIL</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td data-label="EDITAL">01/2024-FUST/BNDES-LOTE 02</td>
                <td data-label="INFORMAR SINISTRO">(92) 98436-0003</td>
                <td data-label="SUPORTE TÉCNICO">(92) 4020-9933</td>
                <td data-label="EMAIL">suporte@nbntelecom.com.br</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <Footer />
    </div>
  )
}
export default Home

