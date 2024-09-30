import AgoraRTC from "agora-rtc-sdk-ng";

const appId = '601c1c1c2d07463b8e5ed2cc55c70988'; // Replace with your Agora App ID
const token = '007eJxTYJD/d7n97gbf1//8NRf6P0ksPrWhL/1s34ZDJ64FTl704OpbBQYzA8NkEDRKMTA3MTNOskg1TU0xSk42NU02N7C0sNjOuiytIZCRoWWlGSsjAwSC+CwMuYmZeQwMALYOI6w='; // Replace with your Agora temporary token or use a token server
const channel = 'main'; // Replace with your channel name

const rtc = {
  client: null,
  localAudioTrack: null,
  localVideoTrack: null,
};

const initAgora = async (channel) => {
  rtc.client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

  await rtc.client.join(appId, channel, token, null);

  rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
  rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();

  rtc.localVideoTrack.play("local-stream");

  await rtc.client.publish([rtc.localAudioTrack, rtc.localVideoTrack]);
  console.log("publish success!");
};

const leaveCall = async () => {
  rtc.localAudioTrack && rtc.localAudioTrack.close();
  rtc.localVideoTrack && rtc.localVideoTrack.close();
  await rtc.client && rtc.client.leave();
};

export { initAgora, leaveCall };