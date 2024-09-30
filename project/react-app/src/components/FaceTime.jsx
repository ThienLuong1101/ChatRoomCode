import React, { useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { initAgora, leaveCall } from "../utils/agoraService";

const FaceTime = () => {
  const uniqueChannel = uuidv4(); // Generate a unique ID for the room

  useEffect(() => {
    initAgora(uniqueChannel);

    return () => {
      leaveCall();
    };
  }, [uniqueChannel]);

  return (
    <div>
      <h1>Agora FaceTime</h1>
      <div id="local-stream" style={{ width: "100%", height: "100vh" }}></div>
    </div>
  );
};

export default FaceTime;
