import React, { createContext, useState, useContext, useEffect } from 'react';

const VideoContext = createContext();

const YOUTUBE_BASE = "https://www.youtube.com/embed/"
const MOCKAPI_ENDPOINT = "https://67e40b6b2ae442db76d2ca7b.mockapi.io/escolas-conectadas/v1/videoId"

export const ProvedorVideo = ({ children }) => {
    const [videoUrl, setVideoUrl] = useState("")
    const [videoUrl2, setVideoUrl2] = useState("")

    const fetchVideos = () => {
        fetch(MOCKAPI_ENDPOINT)
        .then((res) => res.json())
        .then((data) => {
            if (data.length >= 2) {
                setVideoUrl(YOUTUBE_BASE+(data[0].videId || ""))
                setVideoUrl2(YOUTUBE_BASE+(data[1].videId || ""))
            }
        })
    }
    useEffect(() => {
        fetchVideos()
    }, [])

    const updateVideos = (newId1, newId2) => {
        const putVideo1 = fetch(`${MOCKAPI_ENDPOINT}/1`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({videId: newId1})
        })
        const putVideo2 = fetch(`${MOCKAPI_ENDPOINT}/2`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({videId: newId2})
        })
        Promise.all([putVideo1, putVideo2])
        .then(() => fetchVideos())
    }
    return(
        <VideoContext.Provider value={{videoUrl, videoUrl2, updateVideos}}>
            {children}
        </VideoContext.Provider>
    )
}
export const useVideoContext = () => {
    return useContext(VideoContext)
}