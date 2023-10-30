import React, { useState, useEffect, useCallback } from "react";
import { useContract, useWallet, useContractWrite, ConnectWallet } from "@thirdweb-dev/react";
import "./styles/Home.css";
import { PushAPI } from '@pushprotocol/restapi';
import { ethers } from 'ethers';

export default function Home() {
  const contractAddress = "0x161358e26F398e1bC77d9d3aec4a022927D94b4F";
  const { contract } = useContract(contractAddress);
  const setMessageHook = useContractWrite(contract, "setMessage");
  const wallet = useWallet();
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState('');
  const [loadingAction, setLoadingAction] = useState(null);

  const updateMessage = async () => {
    if (!message) {
      setStatus('Must enter a message');
      return;
    }
    try {
      setLoadingAction('updateMessage');
      setStatus('Processing...');
      await setMessageHook.mutateAsync({ args: [message] });
      setStatus('Transaction successful');
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    } finally {
      setLoadingAction(null);
    }
  };

  const handleSubscription = async () => {
    try {
      const signer = ethers.Wallet.createRandom();
      const userAlice = await PushAPI.initialize(signer, { env: 'staging' });
      const channelAddress = "0x55Ae5e87C8be13EcA8db6dcD54EbCCd491A857F8"; // replace with your channel address
      const response = await userAlice.notification.subscribe(`eip155:5:${channelAddress}`);
      console.log(response);
      setStatus('You are now subscribed to contract updates');
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    }
  };

  return (
    <main className="main">
      <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <div className="header">
          <h1 className="title">
            Push Demo </h1>
          {!wallet && <ConnectWallet />}
          {wallet && (
            <>
              <div className="connectWalletContainer">
                <ConnectWallet style={{ margin: '40px' }} />
              </div>
              <div className="action">
                <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
                <button onClick={handleSubscription}>Subscribe</button>
                <button onClick={updateMessage} disabled={loadingAction === 'updateMessage'}>Update Message</button>
              </div>
              <div>
                <p>{status}</p>

              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
