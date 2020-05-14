# electron-dev-environnement

Develop, test, and build you app with this development environnement sample for Electron.

## Introduction

This repository has been created following the fact that creating an Electron app with TypeScript was really difficult for me. Using github actions with spectron isn't specified anywhere, the Electron typescript template is out of date ... But I still managed to do it, so I'm sharing what I've leanrned so far to help you built secured Electron based apps that have a healty code base and a great development environment !

In this app repository, you will find:

> **Electron**

To create apps with web technologies.

> **Typescript**

This app is built using typescript, with it's excellent tooling.

> **Electron-forge**

To build your project on any plateform with simple commands.
Enables hot-reloading on your app.

> **Jest & Spectron**

To automate your tests and simulate user input.

> **Github Action**

To check you code and launch your tests.

> **documentation js**

To provide documentation to your code base.

## Security

This app is based on the [secure-electron-template](https://github.com/reZach/secure-electron-template) repository, with security in mind.

Wich means that no renderer process has access to node's API. You'll need to use the preload script's IPC encapsulation to pass data to your main process. (Examples are available at the end of this README)

## Setup

## Examples

> Plug back and front code
> Change the preload script
> Typescript configuration
> Github Action configuration

## Notes

This app has only been tested on an ubuntu 19.04 and 20.04 LTS, I will notify you when it will be tested on all plateforms.
The github actions pipeline is only testing the app on an ubuntu machine at the moment.