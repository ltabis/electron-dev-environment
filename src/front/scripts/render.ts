//* An example for a renderer process script.

interface Window {
    communication: any;
}

console.log("Renderer script launched, sending a message to the main process.");

window.communication.send('send-message', "Hello, I'm the renderer process!");

// Receiving a message from the main process.
window.communication.receive("receiving-channel", (message: string) => {

    console.log("The main process wrote to me: " + message);
});