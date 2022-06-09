function PaginationInput(props) {
    const { totalPage, currentPage } = props.config;

    let pages = [];
    if (totalPage > 0) {
        pages.push(
            <li key={0} value="1" onClick={props.onClickHandler}>
                First Page
            </li>
        );
        const [from, to] = getPageRange(currentPage, totalPage, props.maxSize);

        for (let i = from; i <= to; i++) {
            const boldText = <b>{i}</b>;
            pages.push(
                <li key={i} value={i} onClick={props.onClickHandler}>
                    {i === currentPage ? boldText : i}
                </li>
            );
        }
        pages.push(
            <li key={-1} value={totalPage} onClick={props.onClickHandler}>
                Last Page
            </li>
        );
    }

    return (
        <div id="pagination">
            <ul className="page">{pages}</ul>
        </div>
    );
}

function getPageRange(current, total, maxSize) {
    let from, to;
    // const mid = Math.round(maxSize/2);
    const mid = parseInt(maxSize/2);
    if (current > mid) {
        from = current - mid;
    } else {
        from = 1;
    }
    to = from + maxSize;
    to = to < total ? to : total;
    return [from, to];
}

export default PaginationInput;
