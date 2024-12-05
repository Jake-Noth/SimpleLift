
interface headerProps{
    day: string;
    showSettings: () => void
}


export default function Header({day, showSettings}:headerProps){
    return(
        <>
            <div id="header-container">
                <div id= 'day-label-container'>
                    <label id="day-label">{day}</label>
                </div>
                
                <div id="settings-button-container">
                    <button 
                        className = "cogButton" 
                        onClick={showSettings}
                        onContextMenu={(e) => e.preventDefault()}
                    ></button>
                </div>
                
            </div>
        </>
    )
}