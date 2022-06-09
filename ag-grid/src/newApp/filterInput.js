function FilterInput(props) {
    const [numOfFilteredRecords, numOfTotalRecords, dataR, dataA] = props.recordStatus;
    return (
        <div id="topBar">
            <div id="searchBar">
                <input
                    name="searchText"
                    type="text"
                    value={props.searchText}
                    placeholder="search by order amount"
                    onChange={props.onChangeHanler}
                ></input>
                <span className="flowR">
                    Socket status: {props.socketStatus}
                </span>
            </div>
            <div>
                <p>
                    <i>
                        Received data <b>{dataR}</b> times, while applied{" "}
                        <b>{dataA}</b> times.
                    </i>
                    <i>{` ${numOfFilteredRecords} / ${numOfTotalRecords} `} </i>
                </p>
            </div>
        </div>
    );
}
export default FilterInput;
