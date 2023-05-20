import React, { useEffect, useState } from "react"
import { useConnect, useCanister } from "@connect2ic/react"
import { ContentMessage, Message } from "@model/model"
import { UpdateWall } from "@component/UpdateWall"

export interface CreationWallProps {
  messageId?: number;
}

const CreationWall = (props: CreationWallProps) => {

  const { isConnected } = useConnect()
  const [studentWall] = useCanister("student_wall")
  const [text, setText] = useState<string>()
  const [image, setImage] = useState<Blob>()
  const [video, setVideo] = useState<Blob>()
  const [messageId, setMessageId] = useState<number>()

  const getMessage = async () => {
    const message = await studentWall.getMessage(props.messageId) as Message
    setText(message.content.text)
    setImage(message.content.image)
    setVideo(message.content.video)
    setMessageId(message.messageId)
  }

  const onCreationWall = async () => {
    let content: ContentMessage = {
      text: text,
      image: image,
      video: video
    }
    await studentWall.writeMessage(content)
  }

  const changeImageFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileToBlob = async (file) => new Blob([new Uint8Array(await file.arrayBuffer())], { type: file.type });
    const imageBlob = await fileToBlob(event.target.value);
    setImage(imageBlob)
  }

  const changeVideoFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileToBlob = async (file) => new Blob([new Uint8Array(await file.arrayBuffer())], { type: file.type });
    const videoBlob = await fileToBlob(event.target.value);
    setVideo(videoBlob)
  }

  useEffect(() => {
    if (!props.messageId) {
      return
    }
    getMessage()
  }, [props.messageId])

  return (
    <div className="example">
      {isConnected ? (
        <>
          {
            messageId ? (
              <h3>Message Id: {messageId}</h3>
            ) : (
              <></>
            )
          }
          <form>
            <div>
              <label htmlFor="inpText">Text</label>
              <input id="inpText" type="text" value={text} onChange={(event) => setText(event.target.value)} placeholder="Your name here!" />
            </div>
            <div>
              <label htmlFor="inpImage">Image</label>
              <input id="inpImage" type="file" accept="image/*" onChange={changeImageFile} />
            </div>
            <div>
              <label htmlFor="inpVideo">Video</label>
              <input id="inpVideo" type="file" accept="video/mp4,video/x-m4v,video/*" onChange={changeVideoFile} />
            </div>
            {
              messageId ? (
                <UpdateWall messageId={messageId} image={image} video={video} text={text} />
              ) : (
                <button className="connect-button" onClick={onCreationWall}>Creation Wall</button>
              )
            }

          </form>
        </>
      ) : (
        <p className="example-disabled">Connect with a wallet to access this creation wall</p>
      )}
    </div>
  )
}

export { CreationWall }
