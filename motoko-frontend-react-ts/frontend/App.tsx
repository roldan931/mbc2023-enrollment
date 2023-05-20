import React, { useState } from "react"
import logo from "./assets/dfinity.svg"
/*
 * Connect2ic provides essential utilities for IC app development
 */
import { createClient } from "@connect2ic/core"
import { defaultProviders } from "@connect2ic/core/providers"
import { ConnectButton, ConnectDialog, Connect2ICProvider } from "@connect2ic/react"
import "@connect2ic/core/style.css"
/*
 * Import canister definitions like this:
 */
import * as counter from "../.dfx/local/canisters/counter"
import * as studentWall from "../.dfx/local/canisters/student_wall"
/*
 * Some examples to get you started
 */
import { Wall } from "@component/Wall"
import { CreationWall } from "@component/CreationWall"

function App() {
  const [messageId, setMessageId] = useState<number>()

  const sendMessageId = (id: number) => {
    setMessageId(id)
  }

  return (
    <div className="App">
      <div className="auth-section">
        <ConnectButton />
      </div>
      <ConnectDialog />

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="slogan">
          React+TypeScript Template
        </p>
        <p className="twitter">by <a href="https://twitter.com/miamaruq">@miamaruq</a></p>
      </header>

      <p className="examples-title">
        Examples
      </p>
      <div className="examples">
        <CreationWall messageId={messageId} />
        <Wall sendMessageId={sendMessageId} />
      </div>
    </div>
  )
}

const client = createClient({
  canisters: {
    counter,
    student_Wall: studentWall
  },
  providers: defaultProviders,
  globalProviderConfig: {
    dev: import.meta.env.DEV,
  },
})

export default () => (
  <Connect2ICProvider client={client}>
    <App />
  </Connect2ICProvider>
)
