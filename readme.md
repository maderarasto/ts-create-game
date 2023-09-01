# Typescript Create Game
The project is a template for simple game using [TypeScript](https://www.typescriptlang.org/) language. The application is handled in main game loop that is responsible for handling events, updating game logic and real-time rendering of visual content for each processed frame.

**Tags**: [TypeScript](https://www.typescriptlang.org/), Game, Game development

## Table of Content
1. [Motivation](#motivation)
2. [State of project](#state-of-project)
3. [Configuration](#configuraiton)
4. [Getting started](#gettings-started)

## Motivation
This project was created for purpose to easily create game playable in browser for future projects and to apply [Typescript](https://www.typescriptlang.org/) and game design skills.

## State of project
#### Done
✅ Main game loop (handling events, updating game logic, rendering visuals)<br />
✅ Asset manager (loading assets from local files and accessing them on request)<br />
✅ Entities for representation of static and movable objects<br />
✅ Commands a command queue for simple execution of entity actions<br />
✅ Input controller for simple registration input keys for player<br />
✅ Application states and state stack<br />
✅ UI library for simple rendering elements such as texts, static images, ...<br />

#### In development
⌛ Collision systemm<br />
⌛ Animation using spritesheet<br />

## Configuration
This project is created with build tools [Vite](https://vitejs.dev/) so you have to install all dependeciens using NPM package system. If you do not have NPM you can install [Node.js](https://nodejs.org/en) which also includes NPM. After installation you can install project dependencies with command:
```bash
npm install
```
After setup you can start game application with comand:
```bash
npm run start
```
or alternitavely in development environment you can run applicaiton with watching changes in project using command:
```bash
npm run dev
```

## Getting started