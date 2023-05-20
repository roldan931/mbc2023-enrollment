import React from "react"
import { useCanister } from "@connect2ic/react"

export interface WoteWallProps {
    messageId: number;
}

const VoteWall = (props: WoteWallProps) => {
    const [studentWall] = useCanister("student_wall")

    const onUpVote = async () => {
        await studentWall.upVote(props.messageId)
    }

    const onDownVote = async () => {
        await studentWall.downVote(props.messageId)
    }

    return (
        <>
            <button className="connect-button" onClick={onUpVote}>Up Vote</button>
            <button className="connect-button" onClick={onDownVote}>Down Vote</button>
        </>
    )
}

export { VoteWall }
