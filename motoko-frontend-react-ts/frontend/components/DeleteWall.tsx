import React from "react"
import { useCanister } from "@connect2ic/react"

export interface DeleteWallProps {
  messageId: number;
}

const DeleteWall = (props: DeleteWallProps) => {
  const [studentWall] = useCanister("student_wall")

  const onDeleteWall = async () => {
    await studentWall.deleteMessage(props.messageId)
  }

  return (
    <button className="connect-button" onClick={onDeleteWall}>Delete Wall</button>
  )
}

export { DeleteWall }
