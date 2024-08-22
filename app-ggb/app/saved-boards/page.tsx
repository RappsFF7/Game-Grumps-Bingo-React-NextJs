'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import useGameboard from '@/app/_hooks/useGameboard';
import Gameboard from '@/app/_models/gameboard';
import './page.css'

export default function Saved() {
    const router = useRouter()
    const gameboardService = useGameboard()
    const gameboard = gameboardService.context.state.currentBoard

    const [newBoardName, setNewBoardName] = useState<string>('')

    function doUpdate() {
        gameboardService.context.updateState()
    }
    
    function doCreate() {
        if (newBoardName.length > 0) {
            const newBoard = Gameboard.new(gameboard!)
            newBoard.name = newBoardName
            gameboardService.context.state.boards.push(newBoard)
            gameboardService.doSave();
            setNewBoardName('')
            gameboardService.context.updateState()
        }
    }
    
    function doRemoveGameboard(i: number) {
        if (confirm("Are you sure you want to delete the '" + gameboard!.name + "' board?")) {
            gameboardService.context.state.boards.splice(i,1)
            gameboardService.doSave();
            gameboardService.context.updateState()
        }
    }
    
    function setCurrentGameboard(i: number) {
        const currentBoard = gameboardService.context.state.boards[i]
        gameboardService.context.state.currentBoard = currentBoard
        gameboardService.context.updateState()
        router.push('/')
    }

    return (
        <div id="saved-boards-wrapper" className="content-body">
            <div id="saved-boards-area">
                {!gameboard ? 
                    <div>Loading...</div> 
                    :
                    <table id="saved-boards" className="edit-list">
                        <thead>
                            <tr>
                                <th colSpan={100}>Saved Gameboards</th>
                            </tr>
                        </thead>
                        <tbody>
                            {gameboardService.context.state.boards.map((b,i) => (
                                <tr key={i}>
                                    <td className="clickable" title="Delete"><div className="icon icon-delete remove" onClick={() => doRemoveGameboard(i)}></div></td>
                                    <td className="hidden"><input id={'lock'+i} name="lock" type="checkbox" className="icon icon-checkbox icon-lock" /><label htmlFor={'lock'+i}></label></td>
                                    <td className="hidden">
                                        <input id={'default'+i} name="default" type="radio" className="icon icon-checkbox icon-dot" onChange={doUpdate} />
                                        <label htmlFor={'default'+i}></label>
                                    </td>
                                    <td className="clickable" title="Load Board"><div className="icon icon-load load" onClick={() => setCurrentGameboard(i)}></div></td>
                                    <td className="name"><input name="name" defaultValue={b.name} onBlur={(e) => { b.name = e.target.value; doUpdate() }} /></td>
                                </tr>
                            ))}
                            <tr>
                                <td className="name" colSpan={100}><input name="name" value={newBoardName} onChange={(e) => setNewBoardName(e.target.value)} onBlur={doCreate} /></td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr><td colSpan={100}><div className="hr"></div></td></tr>
                            <tr>
                                <td colSpan={100}><Link href="/"><button id="btn-back" className="button click clickable">Back</button></Link></td>
                            </tr>
                        </tfoot>
                    </table>
                }
            </div>
        </div>
    )
}