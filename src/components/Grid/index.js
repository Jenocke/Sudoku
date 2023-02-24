import Line from "../Line";
import "./style.css";

const Grid = ({grid}) => {
    return(
        <>
            <div className="mainGrid">
                {grid.map(item => {
                    return <Line line={item}/>
                })}
            </div>
        </>
    )
}

export default Grid;