# LifeVerse v0.1

A small playable prototype of the requested 4-player online city game.

## Included
- 3D browser city
- Maximum 4 simultaneous players
- Male/female character selection
- Real-time multiplayer movement
- Global chat
- Four jobs with virtual salaries
- Money and job HUD
- Basic city landmarks: Hospital, Police Station, TechCorp, Homes
- Server-authoritative player count, movement bounds, jobs and money

## Run locally
1. Install Node.js 18+.
2. In this folder run:
   npm install
   npm start
3. Open http://localhost:3000
4. Open the same address in up to four browser tabs/devices on the same network.

## Put it online
Deploy the project to a Node-compatible host that supports WebSockets (for example, a VPS or a Node hosting service). The server listens on the PORT environment variable.

## Controls
WASD or arrow keys = move
Chat box = talk to other players
Job buttons = choose a job
Work 1 shift = earn one virtual paycheck

## Next versions
Authentication/save data, better animated models, mobile controls, interiors, vehicles, inventory/shop, relationships/marriage, police/thief gameplay, NPCs, combat, and a persistent economy.
