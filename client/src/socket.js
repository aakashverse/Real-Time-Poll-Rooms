import { io } from "socket.io-client";
const baseURL = import.meta.env.VITE_API_BASE_URL;

const socket = io(baseURL);

export default socket;
