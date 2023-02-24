import Case from "../Case";
import "./style.css";

const Line = ({line}) => {

    
    return(
        <>
        <div className="line">
            {line.map(item => {
                return <Case gridCase={item}/>
            })}
        </div>
        </>
    )
}

export default Line;