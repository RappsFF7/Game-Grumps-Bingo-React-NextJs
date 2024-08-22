'use client'

import { useState } from "react"
import Link from "next/link"
import useGameboard from "@/app/_hooks/useGameboard"
import Tile from "@/app/_models/tile"
import "./page.css"

export default function Config() {
    const gameboardService = useGameboard()
    const gameboard = gameboardService.context.state.currentBoard

    const [newTileTitle, setNewTileTitle] = useState<string>('')

    function doUpdate() {
        gameboardService.context.updateState()
    }
    
    function doCreate() {
        if (newTileTitle.length > 0) {
            gameboard?.tiles.push(new Tile(newTileTitle))
            setNewTileTitle('')
            doUpdate()
        }
    }
    
    function doRemoveTile(i: number) {
        if (confirm("Are you sure you want to delete '" + gameboard?.tiles[i].title + "'")) {
            gameboard?.tiles.splice(i, 1)
            doUpdate()
        }
    }

    return (
        <div id="config-wrapper" className="content-body">
            <div id="config-area">
                {!gameboard ? 
                    <div>Loading...</div> 
                    : 
                    <table id="config-tiles" className="edit-list">
                        <thead>
                            <tr>
                                <th colSpan={100}>Configure Gameboard</th>
                            </tr>
                            <tr>
                                <th colSpan={100}><input name="name" value={gameboard?.name || ''} onChange={(e) => { gameboard!.name = e.target.value; doUpdate() }} /></th>
                            </tr>
                        </thead>
                        <tbody>
                            {gameboard?.tiles.map((tile, i) => (
                                <tr key={i}>
                                    <td className="controls" title="Delete"><div className="icon icon-delete remove clickable" onClick={() => doRemoveTile(i)}></div></td>
                                    <td className="free">
                                        <input id={'free'+i} name="free" type="checkbox" className="icon icon-checkbox icon-grid" {...{defaultChecked: tile.free}} onClick={() => { tile.free = !tile.free; doUpdate() }} />
                                        <label htmlFor={'free'+i} title="Free or Surrounding Tile" className="clickable"></label>
                                    </td>
                                    <td className="title"><input name="title" value={tile.title} onChange={(e) => { tile.title = e.target.value; doUpdate() }} /></td>
                                </tr> 
                            ))}
                            <tr>
                                <td className="title" colSpan={100}><input name="title" value={newTileTitle} onChange={e => setNewTileTitle(e.target.value)} onBlur={doCreate} /></td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr><td colSpan={100}><div className="hr"></div></td></tr>
                            <tr>
                                <td colSpan={100}><Link href="/"><button id="btn-config-back" className="button clickable">Back</button></Link></td>
                            </tr>
                        </tfoot>
                    </table>
                }
            </div>
        </div>
    )
}