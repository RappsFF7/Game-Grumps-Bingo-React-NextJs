'use client'

import { ChangeEvent } from "react"
import useGameboard from "@/app/hooks/useGameboard"
import Tile from "@/app/models/tile"
import {default as GameboardType} from "@/app/models/gameboard"
import './gameboard.css'

export default function Gameboard() {
    const gameboardService = useGameboard()
    const gameboardState = gameboardService.gameboardContext.state
    const gameboard = gameboardState.currentBoard

    function doSelectBoardChange(e: ChangeEvent<HTMLSelectElement>) {
        const selectedBoardIndex = Number.parseInt(e.target.value)
        const selectedGameboard = gameboardState.boards[selectedBoardIndex]
        doSelectBoard(selectedGameboard)
    }

    function doSelectBoard(board: GameboardType) {
        board.doRandomizeRows(true)
        gameboardService.gameboardContext.updateState({currentBoard: board})
    }

    function doHideBingo() {
        if (gameboard) {
            gameboard.isBingo = false
            gameboardService.gameboardContext.updateState()
        }
    }

    function doToggleSquare(c: Tile) {
        c.isSelected = !c.isSelected
        gameboard?.doCheckForBingo()
        gameboardService.gameboardContext.updateState()
    }

    function doClear() {
        if (confirm("Clear Board will uncheck all checked board tiles. Do you want to continue?")) {
            gameboard?.doClearSelected()
            gameboardService.gameboardContext.updateState()
        }
    }

    function doRandomize() {
        if (confirm("Clear board and randomize available tiles and placement?")) {
            gameboard?.doClearSelected()
            gameboard?.doRandomizeRows()
            gameboardService.gameboardContext.updateState()
        }
    }

    return (
        <div id="gameboard-wrapper" className="content-body">
            <div id="win-wrapper" className={"clickable" + (gameboard?.isBingo ? "" : " hidden")} onClick={doHideBingo}>
                <img id="bingo-text" src="/assets/images/gg_icon_bingo.png" />
            </div>
            {!gameboard ? 
                <table id="gameboard">
                    <tbody>
                        <tr>
                            <td>Loading...</td>
                        </tr>
                    </tbody>
                </table>
                : 
                <table id="gameboard">
                    <thead>
                        <tr>
                            <th colSpan={100}>
                                <select id="gameboard-name" className="select-button" defaultValue={0} onChange={doSelectBoardChange}>
                                    {gameboardState.boards.map((g,i) => 
                                        <option key={g.name} value={i}>{g.name}</option>
                                    )}
                                </select>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {gameboard?.rows.map((r,ri) => 
                            <tr key={ri}>
                                {r.map((c,ci) => 
                                    <td key={ri + '_' + ci} className={"clickable" + (c.isSelected ? ' checked': '')} onClick={() => doToggleSquare(c)}>{c.title}</td>
                                )}
                            </tr>
                        )}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th colSpan={100}>
                                <div id="gameboard-actions">
                                    <span className="clickable" onClick={doClear}>Clear Board</span>
                                    <span className="clickable" onClick={doRandomize}>Randomize Board</span>
                                </div>
                            </th>
                        </tr>
                    </tfoot>
                </table>
            }
        </div>
    )
}