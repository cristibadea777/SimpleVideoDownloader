import Player from "./Player"
import TitluVideo from "./TitluVideo"

const PlayerVideo = ( {styles, fileName} ) => {
    return (
        <>
        
        <TitluVideo 
            styles      =   {styles}
            fileName    =   {fileName}
        />

        <Player 
            styles      =   {styles}
        sa/>

        </>
    )
}
export default PlayerVideo