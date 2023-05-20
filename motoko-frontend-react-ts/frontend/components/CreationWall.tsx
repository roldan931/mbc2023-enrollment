import React from "react"
import { useWallet, useTransfer, useConnect, useCanister } from "@connect2ic/react"
import { ContentMessage } from "frontend/models/model"

const CreationWall = () => {

  const { isConnected } = useConnect()
  const [studentWall] = useCanister("student_wall")

  const onCreationWall = async () => {
    let content: ContentMessage = {}
    await studentWall.writeMessage(content)
  }

  return (
    <div className="example">
      {isConnected ? (
        <form>
          <div>
            <label htmlFor="inpText">Text</label>
            <input id="inpText" type="text" />
          </div>
          <div>
            <label htmlFor="inpImage">Image</label>
            <input id="inpImage" type="image" />
          </div>
          <div>
            <label htmlFor="inpVideo">Video</label>
            <input id="inpVideo" type="file" />
          </div>
          <button className="connect-button" onClick={onCreationWall}>Publish</button>
        </form>
      ) : (
        <p className="example-disabled">Connect with a wallet to access this example</p>
      )}
    </div>
  )
}

export { CreationWall }
