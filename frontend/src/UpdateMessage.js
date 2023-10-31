import React, { useState } from 'react';
import { useContractWrite } from '@thirdweb-dev/react';
import { PushAPI } from '@pushprotocol/restapi';
import './styles/UpdateMessage.css'

function UpdateMessage({ contract, signer }) {
  const setMessageHook = useContractWrite(contract, "setMessage");
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
      const user = await PushAPI.initialize(signer, { env: 'staging' });
      const channelAddress = "0x55Ae5e87C8be13EcA8db6dcD54EbCCd491A857F8"; // push demo channel
      const response = await user.notification.subscribe(`eip155:5:${channelAddress}`, {
        settings: [
          {enabled: true, value: '1'} // broadcast type
        ]
      });
      console.log(response);
      setStatus('You are now subscribed to contract updates');
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    }
  };

  return (
    <div className="action">
      <input 
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Set message..."
      />
      <div className="buttonContainer" style={{textAlign: 'center'}}>
        <button className="roundedButton" onClick={handleSubscription} style={{ fontSize: '12px', width: '140px' }}>Receive Updates</button>
        <button className="roundedButton" onClick={updateMessage} disabled={loadingAction === 'updateMessage'} style={{ fontSize: '12px', width: '140px' }}>Update Message</button>
      </div>

      <div className="status">
        <p>{status}</p>
      </div>
    </div>
  );
}

export default UpdateMessage;
