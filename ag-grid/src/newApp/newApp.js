import "./newApp.css";
import { useState, useEffect } from "react";
import SocketIo from "./socketIO";
import FilterInput from "./filterInput";
import RecordList from "./recordList";
import PaginationInput from "./paginationInput";
import AsideBar from "./asideBar";
const defaultProps = {
    pageSize: 10,
    currentPage: 1,
    dataCount: 0,
    forbidJump: false,
    hidePreAndNext: false,
    maxSize: 11,
    previousLabel: "<",
    nextLabel: ">",
    onChange: null,
};
function NewApp() {
    const [allRecords, setAllRecords] = useState([]);
    const [tabs, setTabs] = useState(["All"]);
    const [foundTabs, setFoundTabs] = useState([]);
    const [socketStatus, setSocketStatus] = useState("disconnected");
    const [numOfUpdated, setNumOfUpdated] = useState(["", ""]);
    const url = "ws://localhost:4000";
    useEffect(() => {
        SocketIo(url, (allRecords, allTabs, socketStatus, dataR, dataA) => {
            setAllRecords(allRecords);
            setFoundTabs(allTabs);
            //如果解除此行注释，则这里的setTabs方法不会起作用，tabs仍然是初始值["All"]，不知道为什么，只能在引入一个foundTabs的useState
            // setTabs(updateTabs(tabs, allTabs));
            setSocketStatus(socketStatus);
            setNumOfUpdated([dataR, dataA]);
        });
    });
    const [pageInfo, setPageInfo] = useState({ totalPage: 0, currentPage: 0 });
    const [recordStatus, setRecordStatus] = useState(["", ""]);
    const [selectedTab, setSelectedTab] = useState("");
    const [searchKey, setSearchKey] = useState("");
    const [pageRecords, setPageRecords] = useState([]);
    useEffect(() => { //for search text and tab filter
        setTabs(updateTabs(tabs, foundTabs));
        const [
            filteredPageRecords,
            totalRecords,
            currentPageNum,
            totalNumOfPages,
        ] = doFilter(allRecords, selectedTab, searchKey, pageInfo.currentPage);
        setPageRecords(filteredPageRecords);
        setRecordStatus([totalRecords, allRecords.length]);
        setPageInfo({
            totalPage: totalNumOfPages,
            currentPage: currentPageNum,
        });
    }, [searchKey, selectedTab, foundTabs]);

    useEffect(() => { //for page filter
        const [
            filteredPageRecords,
            totalRecords,
        ] = doFilter(allRecords, selectedTab, searchKey, pageInfo.currentPage);
        setPageRecords(filteredPageRecords);
        setRecordStatus([totalRecords, allRecords.length]);
    }, [pageInfo]);
    return (
        <div id="app">
            <AsideBar
                tabs={tabs}
                currentTab={selectedTab}
                checkAmountFun={(val) => {
                    return calculateRecords(allRecords, val);
                }}
                onClickHandler={(selectedValue) => {
                    setSelectedTab(selectedValue);
                }}
            />
            <div className="main">
                <FilterInput
                    searchText={searchKey}
                    socketStatus={socketStatus}
                    recordStatus={recordStatus.concat(numOfUpdated)}
                    onChangeHanler={(e) => {
                        setSearchKey(e.target.value);
                    }}
                />
                <RecordList orders={pageRecords} />
                <PaginationInput
                    config={pageInfo}
                    maxSize={defaultProps.maxSize}
                    onClickHandler={(e) => {
                        // debugger;
                        setPageInfo({
                            totalPage: pageInfo.totalPage,
                            currentPage: e.target.value,
                        });
                    }}
                />
            </div>
        </div>
    );
}

function updateTabs(oldTab, newTabs) {
    let result = [];
    newTabs.forEach((item) => oldTab.indexOf(item) === -1 && result.push(item));
    return oldTab.concat(result);
}

function includeKeyWords(key, source) {
    return source.toString().indexOf(key.toString()) !== -1;
}

function calculateRecords(all, tabVal) {
    const tabValue = tabVal === "All" ? "" : tabVal;
    const rs = all.filter((item) => includeKeyWords(tabValue, item.event_name));
    return rs.length;
}

const doFilter = (allRecords, selectedTab, searchedText, pageNum) => {
    const numOfRowPerPage = defaultProps.pageSize;
    const tabValue = selectedTab === "All" ? "" : selectedTab;
    let result = allRecords.filter(
        (item) =>
            includeKeyWords(tabValue, item.event_name) &&
            includeKeyWords(searchedText, item.price)
    );
    // result = result.filter(item=> item.)
    const totalPages = Math.ceil(result.length / numOfRowPerPage); // get total number of Pages by usiong Math.ceil.
    if (isNaN(pageNum)) {
        pageNum = 1;
    } else {
        pageNum = Math.ceil(pageNum);
        if (pageNum < 1 || pageNum >= totalPages) {
            pageNum = 1;
        }
    }
    //get current page results
    const pageResult = result.slice(
        numOfRowPerPage * (pageNum - 1),
        numOfRowPerPage * pageNum
    );
    return [pageResult, result.length, pageNum, totalPages];
};

export default NewApp;
