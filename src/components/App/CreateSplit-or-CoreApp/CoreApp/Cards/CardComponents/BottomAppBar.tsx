



interface BottomBarProps {
    showAddLiftScreen: () => void;
    hideAddLiftScreen: () => void;
    addLiftScreenBackButton: boolean;
    nextDay: () => void;
    prevDay: () => void;
}


export default function BottomAppBar({showAddLiftScreen, hideAddLiftScreen, addLiftScreenBackButton, nextDay, prevDay}: BottomBarProps){
    return(
        <div id="bottom-bar-container">
            <div id="left-button-container">
                <button 
                    id="left-arrow-button" 
                    onClick={prevDay}
                    onContextMenu={(e) => e.preventDefault()}
                ></button>
            </div>
            
            <div id="add-button-container">
                {addLiftScreenBackButton ? 
                    <button 
                        id="down-arrow-button" 
                        onClick={hideAddLiftScreen}
                        onContextMenu={(e) => e.preventDefault()}
                    ></button>
                :
                <button 
                    id="add-button" 
                    onClick={showAddLiftScreen}
                    onContextMenu={(e) => e.preventDefault()}
                ></button>
                }
                
            </div>

            <div id="right-button-container">
                <button 
                    id="right-arrow-button" 
                    onClick={nextDay}
                    onContextMenu={(e) => e.preventDefault()}
                ></button>
            </div>
        </div>
    )
}