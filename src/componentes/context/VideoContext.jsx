import React, { createContext, useState, useContext, useEffect } from 'react'
import { YOUTUBE_BASE, buscarVideos, atualizarAmbosOsVideos } from '../../api/videoApi'

const VideoContext = createContext()

export const ProvedorVideo = ({ children }) => {
  const [videoUrl, setVideoUrl] = useState("")
  const [videoUrl2, setVideoUrl2] = useState("")

  const buscarVideosDaApi = () => {
    buscarVideos()
      .then((data) => {
        if (data.length >= 2) {
          setVideoUrl(YOUTUBE_BASE + (data[0].videId || ""))
          setVideoUrl2(YOUTUBE_BASE + (data[1].videId || ""))
        }
      })
      .catch((err) => console.error("Erro ao buscar vídeos:", err))
  }
  useEffect(() => {
    buscarVideosDaApi();
  }, []);
  const atualizarVideos = (novoId1, novoId2) => {
    atualizarAmbosOsVideos(novoId1, novoId2)
      .then(() => buscarVideosDaApi())
      .catch((err) => console.error("Erro ao atualizar vídeos:", err))
  };

  return (
    <VideoContext.Provider value={{ videoUrl, videoUrl2, atualizarVideos }}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideoContext = () => {
  return useContext(VideoContext);
};
