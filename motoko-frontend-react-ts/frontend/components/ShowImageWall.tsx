import React from "react"

export interface ShowImageWallProps {
    file: Blob;
}

const ShowImageWall = (props: ShowImageWallProps) => {
    const onLoad = (): string => {
        const objectURL = URL.createObjectURL(props.file);
        return objectURL;
    }

    return (
        <>
            <img src={onLoad()} />
        </>
    )
}

export { ShowImageWall }
