'use client'

import { useEffect, useState } from 'react'
import Gameboard from "@/app/_models/gameboard"
import { useGameboardContext } from '@/app/_contexts/gameboardContext'
import { Dosis } from 'next/font/google'

export default function useGameboard() {
    const gameboardContext = useGameboardContext()

    const hook = {
        gameboardContext,

        doSave: function() {
            // Save gameboards in local storage
            if (localStorage) {
                var dataStr = btoa(JSON.stringify(gameboardContext.state.boards))
                localStorage.boards = dataStr;
            }
        },

        doLoad: function() {
            let boards: Gameboard[] = []
            let currentBoard: Gameboard | undefined

            // Load saved gameboards from local storage
            if (localStorage) {
                var dataStr = (localStorage.boards ? atob(localStorage.boards) : undefined);
                var dataObj = (dataStr ? (<Gameboard[]>JSON.parse(dataStr)).map(g => Object.assign(new Gameboard(), g)) : undefined);
                boards = (dataObj ? dataObj : [])
            }

            // Generate some default gameboards if none are in local storage (or local storage is unavailable)
            if (boards.length == 0) {
                var firstBoard = Gameboard.generateDefaultBoard();
                var secondBoard = Gameboard.generateDefaultBoard();
                secondBoard.name = "Power Hour 2!";
                boards = [firstBoard, secondBoard]
            }

            // Set the current board
            if (boards.length > 0) {
                currentBoard = boards[0]
                currentBoard.doRandomizeRows(true)
            }

            gameboardContext.setState({boards: boards, currentBoard: currentBoard})
        }
    }

    useEffect(() => {
        if (gameboardContext.state.boards.length == 0) {
            hook.doLoad()
        }
    }, [])

    useEffect(() => {
        if (gameboardContext.state.boards.length > 0) {
            hook.doSave()
        }
    }, [gameboardContext.state])

    return hook;
}