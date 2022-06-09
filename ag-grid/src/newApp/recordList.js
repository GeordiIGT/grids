function RecordList(props) {
    const orders = props.orders;
    let elements;
    if (orders.length !== 0) {
        elements = orders.map((item) => (
            <div className={"order-item " + item.event_name} key={item.id}>
                <p>
                    <b>{item.item}</b> -
                    <span> Bill: <b>${Math.round(item.price * 100) / 100}</b></span><span className="flowR">Status: <b>{item.event_name}</b></span>
                </p>
                <p>
                    <span>Address: {item.customer}</span>, {item.destination}
                </p>
            </div>
        ));
    } else {
        elements = <div></div>;
    }

    return <div id="orders">{elements}</div>;
}
export default RecordList;
