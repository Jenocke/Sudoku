import "./style.css"
const Case = ({gridCase, caseID}) => {


    return (
        <>
        <div className="case" key={caseID} id={caseID}>
            <input value={gridCase.value? gridCase.value : ""}></input>
        </div>
        </>
    )
}


export default Case;