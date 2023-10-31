import React, { useState } from "react";
import { useContract, useWallet, useSigner, ConnectWallet } from "@thirdweb-dev/react";
import "./styles/Home.css";
import UpdateMessage from './UpdateMessage'; 
import Chat from './Chat'; // Import the Chat component

export default function Home() {
  const contractAddress = "0x161358e26F398e1bC77d9d3aec4a022927D94b4F";
  const { contract } = useContract(contractAddress);
  const wallet = useWallet();
  const signer = useSigner();
  const [activeComponent, setActiveComponent] = useState("updateMessage"); 

  return (
    <main className="main">
      <div className="container" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <div className="header">
          <h1 className="title">Push Demo</h1>
          {!wallet && <ConnectWallet />}
          {wallet && (
            <>
              <div className="connectWalletContainer">
                <ConnectWallet style={{ margin: '40px' }} />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <button className="roundedButton" onClick={() => setActiveComponent("updateMessage")}>Contract Interaction</button>
                <button className="roundedButton" onClick={() => setActiveComponent("chat")}>Chat</button>
              </div>
              {activeComponent === "updateMessage" ? (
                <UpdateMessage contract={contract} signer={signer} />
              ) : (
                <Chat />
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
