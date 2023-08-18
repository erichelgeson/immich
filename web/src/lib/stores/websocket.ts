import  { io, Socket, } from 'socket.io-client';
import type { AssetResponseDto } from '../../api/open-api';
import { writable } from 'svelte/store';

let websocket: Socket;


function initWebsocketStore()  {
  const onUploadSuccess = writable<AssetResponseDto>();

  return {
    onUploadSuccess,
  }
}

export const websocketStore = initWebsocketStore();



export const openWebsocketConnection = () => {
  try {
    websocket = io('', {
      path: '/api/socket.io',
      transports: ['polling'],
      reconnection: true,
      forceNew: true,
      autoConnect: true,
    });

    listenToEvent(websocket);
  } catch (e) {
    console.log('Cannot connect to websocket ', e);
  }
};

const listenToEvent = async (socket: Socket)  => {

  socket.on('on_upload_success', (payload) => {

    const asset: AssetResponseDto = JSON.parse(payload);
    
    websocketStore.onUploadSuccess.set(asset);
  });

  socket.on('error', (e) => {
    console.log('Websocket Error', e);
  });
};

export const closeWebsocketConnection = () => {
  websocket?.close();
};


