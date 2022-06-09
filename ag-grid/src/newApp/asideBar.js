function AsideBar(props) {
    const elements = props.tabs.map((element) => {
        const amount = props.checkAmountFun(element);
        return (
            <li
                key={element}
                value={element}
                onClick={() => {
                    props.onClickHandler(element);
                }}
                className={
                    element +
                    (props.currentTab === element ? " tabSelected" : "")
                }
            >
                {element}
                {amount === 0 ? "" : " (" + amount + ")"}
            </li>
        );
    });
    return (
        <aside>
            <ul id="menuUl">{elements}</ul>
        </aside>
    );
}

export default AsideBar;
