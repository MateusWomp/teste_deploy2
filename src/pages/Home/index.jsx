import React, { useState, useEffect } from 'react'
import { useVideoContext } from '../../componentes/context/VideoContext'
import styles from './Home.module.css'
import Header from '../../componentes/Header'

function Home() {
  const { videoUrl, videoUrl2 } = useVideoContext();
  const [mostrarPrimeiroVideo, setMostrarPrimeiroVideo] = useState(true)

  const roleInformacoes = () => {
    setMostrarPrimeiroVideo(false)
  }

  const voltarAoTopo = () => {
    setMostrarPrimeiroVideo(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

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

  useEffect(() => {
    if (!mostrarPrimeiroVideo) {
      const segundoVideo = document.getElementById('segundo-video')
      if (segundoVideo) {
        segundoVideo.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [mostrarPrimeiroVideo]);

  useEffect(() => {
    document.body.style.overflow = mostrarPrimeiroVideo ? 'auto' : 'hidden'
    return () => {
      document.body.style.overflow = 'auto';
    }
  }, [mostrarPrimeiroVideo])

  return (
    <section
      style={!mostrarPrimeiroVideo ? { marginTop: 0 } : {}}
      className={styles.home}
    >
      <Header />
      {mostrarPrimeiroVideo ? (
        <div className={`${styles.ContainerVideo} ${styles.primeiroVideo}`}>
          {renderVideo(videoUrl)}
          <img
            src="/imagens/setaAnimada.png"
            alt="Seta Animada"
            className={styles.setaAnimada}
            onClick={roleInformacoes}
          />
        </div>
      ) : (
        <>
          <div id="segundo-video" className={styles.ContainerVideo}>
            {renderVideo(videoUrl2)}
            <img
              src="/imagens/seta_cima.png.svg"
              alt="Seta para Voltar"
              className={`${styles.setaAnimada} ${styles.setaVoltar}`}
              onClick={voltarAoTopo}
            />
          </div>
          <div id="tabela" className={styles.tabela}>
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
        </>
      )}
    </section>
  );
}
export default Home
