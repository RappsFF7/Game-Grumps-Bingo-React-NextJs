# Game Grumps Bingo

A fun weekend project I started when the streamer Bingo card trend took off. This is a conversion of my [original GGB project](https://github.com/RappsFF7/Game-Grumps-Bingo) in plain HTML/CSS/JS to Angular.

![Website Screenshot](https://raw.githubusercontent.com/RappsFF7/Game-Grumps-Bingo-Angular/master/app-ggb/src/assets/images/gg_website_screenshot.png)

## Features

* Bingo game
    * Themed for the [Game Grumps](https://www.youtube.com/@GameGrumps) youtube channel
    * The default board is configured for their [Power Hour](https://www.youtube.com/@thegrumps) show
* Editable cells
* Can save cell configuration to different, "Game Boards"
    * Boards are saved locally on the device using browser storage
* Exportable board via HTML link or share device feature to send to friends or online (couch co-op compatible 😉)
* Randomize button

# Project Setup

## IDE

I used VS Code for this project.

But feel free to use your IDE of choice. All you need is a terminal and a text editor.

## Windows
Run start.ps1

(after the first run, you can run again globally with, "run")

(you may need to allow running PowerShell scripts from command line, if so see ./build-scripts/1_config_vs_code.txt)

## Linux
Install npm and dependencies manually
* Install npm
* Install angular-cli globally `npm i -g @angular/cli@9.0.3`
* Change to the app-ggb directory `cd app-ggb`
* Install all dependencies `npm i`
* Run `ng serve --open --host 0.0.0.0`
