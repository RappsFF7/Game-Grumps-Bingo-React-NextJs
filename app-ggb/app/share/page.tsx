'use client'

import Link from "next/link"
import useGameboard from "@/app/_hooks/useGameboard"
import "./page.css"

export default function Share() {
    const gameboardService = useGameboard()
    const shareUrl = "/?customboard=" + gameboardService.context.state.currentBoard?.toSerialized()

    return (
        <div id="share-wrapper" className="content-body">
            <div>Copy this link and send it to your friends!</div>
            <div><Link id="lnkShare" href={shareUrl}>Custom Bingo</Link></div>
        </div>
    )
}