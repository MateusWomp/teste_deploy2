import React from 'react'

export const YOUTUBE_BASE = "https://www.youtube.com/embed/"
export const MOCKAPI_ENDPOINT = "https://67e40b6b2ae442db76d2ca7b.mockapi.io/escolas-conectadas/v1/videoId"

export const buscarVideos = () => {
  return fetch(MOCKAPI_ENDPOINT)
    .then((res) => res.json())
};

export const atualizarVideo = (id, novoVideId) => {
  return fetch(`${MOCKAPI_ENDPOINT}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ videId: novoVideId })
  })
  .then((res) => res.json())
};

export const atualizarAmbosOsVideos = (novoId1, novoId2) => {
  return Promise.all([
    atualizarVideo(1, novoId1),
    atualizarVideo(2, novoId2)
  ]);
};
