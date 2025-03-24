import React, { createContext, useState, useContext, useEffect } from 'react';

const VideoContext = createContext();

export const ProvedorVideo = ({children}) => {
    const [videoUrl, setVideoUrl] = useState("")
    const [videoUrl2, setVideoUrl2] = useState("")
    const [baseUrl, setBaseUrl] = useState("")

    useEffect(() => {
        fetch('/api/baseUrl')
        .then((res) => res.json())
        .then((data) => {
            {setBaseUrl(data.baseUrl || "")}
        })
    }, [])
    useEffect(() => {
        fetch('/api/videos')
        .then((res) => res.json())
        .then((data) => {
            if(baseUrl) {
                setVideoUrl(baseUrl+(data.videoId1 || ""))
                setVideoUrl2(baseUrl+(data.videoId2 || ""))
            }
        })
    }, [baseUrl])
    const updateVideos = (newId1, newId2) => {
        fetch('/api/videos', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({videoId1: newId1, videoId2: newId2})
        })
        .then((res) => res.json())
        .then((data) => {
            if (baseUrl){
                setVideoUrl(baseUrl+(data.videoId1 || ""))
                setVideoUrl2(baseUrl+(data.videoId2 || ""))
            }
            fetch('api/videos')
                .then((res) => res.json())
                .then((updatedData) => {
                    if(baseUrl){
                        setVideoUrl(baseUrl+(updatedData.videoId1 || ""))
                        setVideoUrl2(baseUrl+(updatedData.videoUrl2 || ""))
                    }
                })
        })
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