import React from "react"

export interface ShowVideoWallProps {
    file: Blob;
}

const ShowVideoWall = (props: ShowVideoWallProps) => {
    const onLoad = (): string => {
        const objectURL = URL.createObjectURL(props.file);
        return objectURL;
    }

    return (
        <>
            <video src={onLoad()} />
        </>
    )
}

export { ShowVideoWall }
