import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useDrag } from "react-dnd";
import { Video } from "../interfaces/VideoInterface";

function VideoComponent({
    name,
    description,
    genre,
    recommended,
    isReported,
    thumbnail,
    wantRecommended,
    likes,
    updateCentralList,
    updateModeratorList,
    updateWatchList,
    deleteCentralVid,
    deleteCreatorVid,
    deleteReviewVid,
    deleteWatchVid,
    role
}: {
    name: string;
    description: string;
    genre: string;
    recommended: string[];
    isReported: boolean;
    thumbnail: string;
    wantRecommended: boolean;
    likes: number;
    updateCentralList: (vid: Video) => void;
    updateModeratorList: (vid: Video) => void;
    updateWatchList: (vid: Video) => void;
    deleteCentralVid: (vid: Video) => void;
    deleteCreatorVid: (vid: Video) => void;
    deleteReviewVid: (vid: Video) => void;
    deleteWatchVid: (vid: Video) => void;
    role: string;
}) {
    const [video, setVideo] = useState<Video>({
        name,
        description,
        genre,
        recommended,
        wantRecommended,
        isReported,
        thumbnail,
        likes
    });

    function updateLikes() {
        const newVideo = { ...video, likes: video.likes + 1 };
        setVideo(newVideo);
        updateCentralList(newVideo);
        updateModeratorList(newVideo);
        updateWatchList(newVideo);
    }
    function update() {
        const newVideo = { ...video, wantRecommended: !video.wantRecommended };
        setVideo(newVideo);
        updateCentralList(newVideo);
        updateModeratorList(newVideo);
        updateWatchList(newVideo);
    }
    function updateReported() {
        const newVideo = { ...video, isReported: !video.isReported };
        setVideo(newVideo);
        updateCentralList(newVideo);
        updateModeratorList(newVideo);
        updateWatchList(newVideo);
    }

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "VIDEO",
        item: { name: video.name },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }));

    return (
        <div
            ref={drag}
            style={{
                border: isDragging ? "20px solid black" : "0px",
                marginTop: "10px",
                paddingTop: 10,
                paddingBottom: 10,
                paddingLeft: 20,
                paddingRight: 20,
                backgroundColor: "lightgray",
                borderRadius: "15px"
            }}
        >
            <h5>{video.name}</h5>
            <div>
                <span style={{ fontWeight: "bold" }}>Description: </span>
                <span>{video.description}</span>
            </div>
            <div>
                <span style={{ fontWeight: "bold" }}>Genre: </span>
                <span>{video.genre}</span>
            </div>
            <img width={"170px"} src={video.thumbnail} alt={video.name}></img>
            <div style={{ marginTop: "10px" }}>
                <span style={{ marginRight: "5px" }}>
                    <Button
                        onClick={() => {
                            updateReported();
                        }}
                        style={{
                            backgroundColor: "#2a52be",
                            color: "white",
                            border: "2px solid black"
                        }}
                    >
                        Report {video.isReported === true ? "🚩" : " "}
                    </Button>
                </span>
                <span>
                    <Button
                        onClick={() => {
                            updateLikes();
                        }}
                        style={{
                            backgroundColor: "#2a52be",
                            color: "white",
                            border: "2px solid black"
                        }}
                    >
                        👍
                    </Button>
                    {video.likes}
                </span>
                <span style={{ marginLeft: "10px" }}>
                    <Button
                        onClick={() => {
                            update();
                        }}
                        style={{
                            backgroundColor: "#2a52be",
                            color: "white",
                            border: "2px solid black"
                        }}
                    >
                        Recommended
                    </Button>
                    {video.wantRecommended === true ? (
                        <span>
                            <li>{video.recommended[0]}</li>
                            <li>{video.recommended[1]}</li>
                            <li>{video.recommended[2]}</li>
                            <li>{video.recommended[3]}</li>
                        </span>
                    ) : (
                        <span />
                    )}
                </span>
                <span hidden={role !== "moderator"}>
                    <Button
                        onClick={() => {
                            deleteCentralVid(video);
                            deleteCreatorVid(video);
                            deleteReviewVid(video);
                            deleteWatchVid(video);
                        }}
                    >
                        Delete❌
                    </Button>
                </span>
                <span hidden={role !== "moderator"}>
                    <Button
                        onClick={() => {
                            updateReported();
                            deleteReviewVid(video);
                        }}
                    >
                        Reviewed✔️
                    </Button>
                </span>
            </div>
        </div>
    );
}
export default VideoComponent;
