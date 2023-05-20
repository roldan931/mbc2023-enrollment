import React, { useEffect, useState } from "react"
import { useCanister, useConnect } from "@connect2ic/react"
import { Message } from "frontend/models/model"
import { VoteWall } from "./VoteWall"
import { ShowImageWall } from "./ShowImageWall"
import { ShowVideoWall } from "./ShowVideoWall"

const Wall = () => {

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
                    <button className="connect-button">Delete</button>
                    <button className="connect-button">Update</button>
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
