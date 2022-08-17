import { FunctionComponent, useEffect, useState } from "react";
import "../assets/players.scss"
import { useAuth } from "../components/AuthProvider";
import { CS_REWARD_MAPPING, Player } from "../data";


const PlayersRoute: FunctionComponent = () => {
    const {request} = useAuth()

    const [offset, setOffset] = useState(0)
    const [count, setCount] = useState(10)

    const [players, setPlayers] = useState<Player[]>([])

    useEffect(() => {
        async function loadPlayers() {
            const list = await request<Player[]>({
                method: "GET",
                path: `players?offset=${offset}&count=${count}`
            })
            setPlayers(list)
        }

        loadPlayers()
            .then()
            .catch()
    }, [offset, count, request])

    return (
        <div>
            <h1>Players</h1>
            <div className="players">
                {players.map((player, index) => {
                    const bannerData = CS_REWARD_MAPPING[player.csReward]

                    return (

                        <div key={index} className="player">
                            {bannerData && (<img src={`/assets/banners/${bannerData.imageName}.png`} alt="Banner" className="player__banner"/>)}
                            <p className="player__id">{player.playerId}</p>
                            <p className="player__name">{player.displayName} <span className="player__email">({player.email})</span></p>
                            {bannerData && (<p>{bannerData.text}</p>)}
                            <div>
                                <button>
                                    View Player
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default PlayersRoute