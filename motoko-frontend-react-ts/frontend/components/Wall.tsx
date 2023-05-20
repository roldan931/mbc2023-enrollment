import React, { useEffect, useState } from "react"
import { useCanister, useConnect } from "@connect2ic/react"
import { Message } from "@model/model"
import { VoteWall } from "@component/VoteWall"
import { ShowImageWall } from "@component/ShowImageWall"
import { ShowVideoWall } from "@component/ShowVideoWall"
import { DeleteWall } from "@component/DeleteWall"

export interface WallProps {
  sendMessageId: (id: number) => void;
}

const Wall = (props: WallProps) => {

  const { isConnected, principal } = useConnect()
  const [studentWall] = useCanister("student_wall")
  const [messages, setMessages] = useState<Array<Message>>()

  const getAllMessages = async () => {
    const allMessages = await studentWall.getAllMessages() as Array<Message>
    setMessages(allMessages)
  }

  useEffect(() => {
    if (!studentWall) {
      return
    }
    getAllMessages()
  }, [studentWall])

  return (
    <div>
      <p>Wallet address: <span style={{ fontSize: "0.7em" }}>{isConnected ? principal : "-"}</span></p>
      <table>
        <tbody>
          {messages && messages.map(message => (
            <tr key={message.messageId}>
              {
                message.content.image ? (
                  <td>
                    <ShowImageWall file={message.content.image} />
                  </td>
                ) : (
                  <></>
                )
              }
              {
                message.content.video ? (
                  <td>
                    <ShowVideoWall file={message.content.video} />
                  </td>
                ) : (
                  <></>
                )
              }
              <td>
                {message.content.text}
              </td>
              <td>
                {message.vote}
              </td>
              {
                isConnected ? (
                  <td>
                    <VoteWall messageId={message.messageId} />
                  </td>
                ) : (
                  <></>
                )
              }
              {
                message.creator == principal ? (
                  <td>
                    <DeleteWall messageId={message.messageId} />
                    <button className="connect-button" onClick={() => props.sendMessageId(message.messageId)}>Update</button>
                  </td>
                ) : (
                  <></>
                )
              }
            </tr>
          ))}
        </tbody>
      </table >
    </div >
  )
}

export { Wall }
