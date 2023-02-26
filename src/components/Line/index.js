import Case from "../Case";
import "./style.css";

const Line = ({line, lineID}) => {

    
    return(
        <>
        <div className="line" id={lineID}>
            {line.map((item, index) => {
                return <Case gridCase={item} caseID={lineID +"" + index}/>
            })}
        </div>
        </>
    )
}

export default Line;