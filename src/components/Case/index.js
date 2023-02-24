import "./style.css"
const Case = ({gridCase}) => {


    return (
        <>
        <div className="case">
            <input value={gridCase.value? gridCase.value : ""}></input>
            
        </div>
        </>
    )
}


export default Case;