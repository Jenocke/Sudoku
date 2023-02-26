import Line from "../Line";
import "./style.css";

const Grid = ({grid}) => {


    return(
        <>
            <div className="mainGrid">
                {grid.map((item, lineID) => {
                    return <Line line={item} lineID={lineID}/>
                })}
            </div>
        </>
    )
}

export default Grid;