import React from "react"
import { useCanister } from "@connect2ic/react"
import { ContentMessage } from "@model/model";

export interface UpdateWallProps extends ContentMessage {
  messageId: number;
}

const UpdateWall = (props: UpdateWallProps) => {
  const [studentWall] = useCanister("student_wall")

  const onUpdateWall = async () => {
    await studentWall.updateMessage(props.messageId)
  }

  return (
    <button className="connect-button" onClick={onUpdateWall}>Update Wall</button>
  )
}

export { UpdateWall }
