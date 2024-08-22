'use client'

import { useState } from "react"
import Link from "next/link"
import useGameboard from "@/app/_hooks/useGameboard"
import './header.css'

export default function Header() {
    const [isShowNavDropdown, setIsShowNavDropdown] = useState<boolean>(false)
    const gameboardService = useGameboard()

    const onToggleNav = () => {
        setIsShowNavDropdown(!isShowNavDropdown)
    }
    const onReset = () => {
        if (confirm("Reset will delete all saved gameboards and reload the page resetting the current config. Continue?")) {
            localStorage.clear();
            gameboardService.doLoad();
        }
    }

    return (
        <div id="header-bar">
            <Link href="/">
                <img id="gg-logo" src="/assets/images/gg_logo.png" />
                <img id="bingo-logo" src="/assets/images/bingo_logo.png" />
            </Link>
            <span id="config-name" className="hidden"></span>
            <span id="header-menu" onClick={onToggleNav}>
                <img id="btn-menu" className="clickable" src="/assets/images/icons8-menu-vertical-50.png" />
            </span>
            {!isShowNavDropdown ? <></> : 
                <div id="header-menu-popup">
                    <ul className="ul-nostyle">
                        <li id="btn-menu-back" onClick={onToggleNav}><img src="/assets/images/icons8-menu-vertical-50.png" /></li>
                        <li id="btn-config"><Link href="/config" onClick={onToggleNav}><img src="/assets/images/icons8-settings-50.svg" />Config</Link></li>
                        <li id="btn-saved"><Link href="/saved-boards" onClick={onToggleNav}><img src="/assets/images/icons8-playlist-50.png" />Saved</Link></li>
                        <li id="btn-share"><Link href="/share" onClick={onToggleNav}><img src="/assets/images/icons8-share-30.svg" />Share</Link></li>
                        <li id="btn-reset"><Link href="#" onClick={() => {onReset(); onToggleNav()}}><img src="/assets/images/icons8-reset-50.png" />Reset</Link></li>
                        <li id="btn-about"><Link href="/about" onClick={onToggleNav}><img src="/assets/images/icons8-info-50.svg" />About</Link></li>
                    </ul>
                </div>
            }
        </div>
    )
}