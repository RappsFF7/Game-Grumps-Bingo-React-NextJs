'use client'

import { PropsWithChildren, createContext, useContext, useState } from "react";
import Gameboard from "@/app/_models/gameboard";

// Value / State
export type GameboardContextData = {
    boards: Gameboard[],
    currentBoard?: Gameboard,
}
export type GameboardContextUpdateData = {
    boards?: Gameboard[],
    currentBoard?: Gameboard,
}

export type GameboardContextState = {
    state: GameboardContextData,
    setState: (state: GameboardContextData) => void,
    /** Merges the supplied state with the existing state. If partialstate is not supplied, setState(state) is still called. */
    updateState: (partialState?: GameboardContextUpdateData) => void,
}

// Context
const gameboardConextDataDefault: GameboardContextData = {
    boards: []
}
export const GameboardContext = createContext<GameboardContextState>({
    state: gameboardConextDataDefault,
    setState: (state: GameboardContextData) => { console.log('not initialized') },
    updateState: (partialState?: GameboardContextUpdateData) => { console.log('not initialized') }
})

// UseContext for clients
export function useGameboardContext() {
    return useContext(GameboardContext)
}

// Context Provider
export default function GameboardContextProvider({ children }: PropsWithChildren) {
    const [state, setState] = useState<GameboardContextData>(gameboardConextDataDefault)
    const updateState = (partialState?: GameboardContextUpdateData) => { setState({...state, ...partialState}) }

    return (
        <GameboardContext.Provider value={{state, setState, updateState}}>{children}</GameboardContext.Provider>
    )
}