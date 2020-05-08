//* This file is used to expose node features  and create your personnal
//* API to communicate with all processes.
//* Customize it as you like.

import { contextBridge, ipcRenderer } from "electron";

//* Can be used to expose Node js features to the renderer process
//* without exposing the entire library.
contextBridge.exposeInMainWorld(
    "communication", {
        send: (channel: string, ...args: any) => {

            // whitelist channels
            const validChannels = ["send-message"];

            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, ...args);
            }
        },
        receive: (channel: string, func: any) => {

            // whitelist channels
            const validChannels = ["receiving-channel"];

            if (validChannels.includes(channel)) {
                ipcRenderer.on(channel, (event, ...args) => func(...args));
            }
        }
    }
);