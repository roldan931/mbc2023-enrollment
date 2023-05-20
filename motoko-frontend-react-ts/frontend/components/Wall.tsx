import React, { useEffect, useState } from "react"
import { useBalance, useCanister, useConnect } from "@connect2ic/react"
import { Message } from "frontend/models/model"

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
      <p>Wallet address: <span style={{ fontSize: "0.7em" }}>{principal ? principal : "-"}</span></p>
      <table>
        <tbody>
          {messages && messages.map(message => (
            <tr key={message.creator}>
              <td>
                {message.content.text}
              </td>
              <td>
                {message.vote}
              </td>
              {isConnected ? (
                <td>
                  <button>Votar</button>
                </td>
              ) : (
                <></>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export { Wall }
