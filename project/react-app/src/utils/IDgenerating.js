// utils/generateRoomId.js
import { v4 as uuidv4 } from 'uuid';

export const generateRoomId = () => {
  const uuid = uuidv4();
  const roomId = Math.abs(parseInt(uuid.replace(/-/g, '').substring(0, 6), 16)) % 1000000;
  return roomId.toString().padStart(6, '0'); // Ensure it's 6 digits
};
