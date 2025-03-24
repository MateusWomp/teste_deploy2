import React, { useState, useEffect } from 'react';
import { useVideoContext } from '../../componentes/context/VideoContext';
import styles from './Home.module.css';
import Header from '../../componentes/Header';

function Home() {
  const { videoUrl, videoUrl2 } = useVideoContext(); 
  const [mostrarPrimeiroVideo, setMostrarPrimeiroVideo] = useState(true);
  // Ao clicar na seta do primeiro vídeo, exibe o segundo vídeo e as informações extras.
  const roleInformacoes = () => {
    setMostrarPrimeiroVideo(false);
  };
  // Ao clicar na seta do segundo vídeo, a página sobe até o topo e o primeiro vídeo reaparece.
  const voltarAoTopo = () => {
    setMostrarPrimeiroVideo(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderVideo = (url) => {
    if(!url || url.trim() === ""){
      return <div className={styles.placeholder}>Nenhum vídeo disponivel</div>
    }
    if (url.includes("youtube.com")) {
      const videoId = new URLSearchParams(new URL(url).search).get("v");
      return (
        <iframe 
          width="100%" 
          height="100%" 
          src={`https://www.youtube.com/embed/${videoId}`} 
          title="YouTube video player" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
        />
      );
    } else {
      return (
        <video controls>
          <source src={url} type="video/mp4" />
          O navegador não suporta o vídeo.
        </video>
      );
    }
  };
  // Se o primeiro vídeo está oculto, rola automaticamente para o segundo vídeo.
  useEffect(() => {
    if (!mostrarPrimeiroVideo) {
      const segundoVideo = document.getElementById('segundo-video');
      if (segundoVideo) {
        segundoVideo.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [mostrarPrimeiroVideo]);

  // Quando o segundo vídeo é exibido, desabilita o scroll manual definindo o overflow do body como 'hidden'
  // E também força o container principal a ter 100% (sem margem superior) para não haver espaço vazio.
  useEffect(() => {
    if (!mostrarPrimeiroVideo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mostrarPrimeiroVideo]);

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

export default Home;