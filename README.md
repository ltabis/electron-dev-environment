# electron-dev-environnement

Develop, test, and build you app with this development environment sample for Electron.

## Introduction

This repository has been made following the fact that creating an Electron app with TypeScript was really difficult for me. Using github actions with spectron isn't specified anywhere, the Electron typescript template is out of date ... But I still managed to do it, so I'm sharing what I've learnt so far to help you built secured Electron based apps that have a healty code base and a great development environment !

In this app repository, you will find:

> **Electron**

To create apps with web technologies.

> **TypeScript**

This app is built using typescript, with it's excellent tooling.

> **Electron-forge**

To build your project on any plateform with simple commands.
Enables hot-reloading on your app.

> **Jest & Spectron**

To automate your tests and simulate user input.

> **ESLint for TypeScript**

To check your code base healthiness.

> **Github Action**

To check you code and launch your tests on a pull request or push.

> **documentation js**

To provide documentation to your code base.

## Security

This app is based on the [secure-electron-template](https://github.com/reZach/secure-electron-template) repository, with security in mind.

Wich means that no renderer process has access to node's API. You'll need to use the preload script's IPC encapsulation to pass data to your main process. (Examples are available at the end of this README)

## Setup

// <span style="color:orange">Todo</span>: Add npm examples.

```shell
git clone https://github.com/ltabis/electron-dev-environnement.git
yarn install
```

Will clone the repo and install all dependencies.
___
**In a terminal**:
```shell
yarn watch
```
This command will transpile all of your TypeScript into JS on file change. They will all be transpiled into the *dist/* directory.

**In an other terminal**:
```shell
yarn start
```
or
```shell
yarn startd
```
```yarn start``` will launch your app, ```yarn startd``` will open the dev tools along your app.
___

In the terminal where you typed ```yarn start``` or ```yarn startd```:
type ```rs``` every time you want to reload your app.

## Examples

### Plug backend and frontend code

Their is an example using the IPC in this repository.
Check out the preload, app and renderer files to see how they communicate.

### Change the preload script

In the preload file, you have complete access to Node's and Electron's APIs.
It is usefull when you want to use expose a little part of both API's to the renderer processes. Watch out, has it can lead to vulnerabilities and open your app to XSS and RES attacks.

I recommend you to only expose the ```send()``` and ```on()``` methods of the ipcRenderer. You will then be abble to send data to the main process that has access to Electron's and Node's API to do the backend work.

Of course, you need to check if the data passed in the channels are correct, because anyone can use them in the renderer process to send anything to the main process.

**preload.ts**
```ts
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
```

You can add valid channels to the validChannels arrays:

```ts
    send: (channel: string, ...args: any) => {
    
        // whitelist channels
        const validChannels = [
            "send-message",
            "new-valid-channel"
            "another-valid-channel"
        ];
    
        if (validChannels.includes(channel)) {
            ipcRenderer.send(channel, ...args);
        }
    },
```

The ```send()``` method will then be able to send data through the "new-valid-channel" and "another-valid-channel".

To call those methods from the renderer processes, use:

```
// This will send 'data' over the 'new-valid-channel' to the main process.
window.communication.send('new-valid-channel', data);
```
Check the app code for further examples.

### Typescript configuration

You can change your typescript configuration in the tsconfig.json file.
See this [link](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) for examples.

### Lint configuration

You can configure your own 'rules' to check your code base healthiness.
See this [link](https://github.com/eslint/eslint#configuration) for examples.

### Github Action configuration

The action will only be trigered when you push or accept a pull request on the 'test' branch.

The action is separated in multiple steps:
- Checkout the code to the VM.
- Setup node using the [setup-node](https://github.com/marketplace/actions/setup-node-js-environment) action.
- Install dependencies using yarn.
- Transpiling TS files.
- Using ESLint on your TS files.
- Setup a chromedriver using the [setup-chromedriver](https://github.com/marketplace/actions/setup-chromedriver) action (to launch spectron)
- Run all your tests.
- Build you app. (Only on an ubuntu machine for now)

You can add or remove any step you want.
Whatch out for the chromedriver though, without it you cant launch your spectron tests has the VM isn't setup to support spectron's environment by default.

## Notes

- This app has only been tested on an **ubuntu 19.04** and **20.04 LTS**, it will be tested on OSX and Windows in the future.

- The github actions pipeline is only testing the app on an ubuntu machine at the moment.