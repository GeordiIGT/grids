import io from "socket.io-client";
let socket = null;

const SocketIo = (url, ordersUpdatedCallback) => {
    let socketStatus = "";
    let tempRecords = {};
    const socketIOURL = url;
    socket === null && initSocket();

    /**
     * Initialize socket.io, and regist event handlers.
     */
    function initSocket() {
        console.log("Connecting to server"+socketIOURL);
        socket = io.connect(socketIOURL);
        socket.on("connect", () => onConnect());
        socket.on("connecting", () => onConnecting());
        socket.on("disconnect", () => onDisconnect());
        socket.on("connect_failed", () => onConnectionFailed());
        socket.on("order_event", (data) => onOrderEvent(data));
    };
    const onConnect = () => {
        // setSocketStatus("connected");
        socketStatus = "connected";
        console.log(
            "-------------socket.io is " + socketStatus + "-------------"
        );
    };
    function onConnecting() {
        // setSocketStatus("connecting");
        socketStatus = "connecting";
        console.log(
            "-------------socket.io is " + socketStatus + "-------------"
        );
    }
    function onConnectionFailed() {
        // setSocketStatus("connect_failed");
        socketStatus = "connect_failed";
        console.log(
            "-------------socket.io is " + socketStatus + "-------------"
        );
    }
    function onDisconnect() {
        // setSocketStatus("disconnect");
        socketStatus = "disconnect";
        console.log(
            "-------------socket.io is " + socketStatus + "-------------"
        );
    }
    function onOrderEvent(data) {
        moveToWarehouse(data);
        // console.log("Received " + data.length + " data from server, achieved " + Object.values(tempRecords).length + " records in total. -------------" );
    }

    /***
     * Temporary store all new distinct data in a local property this.tempList to be applied every so often.
     */
    const moveToWarehouse = (data)=> {
        const eventNames = [];
        data.forEach((item) => {
            tempRecords[item.id] = item
            if(eventNames.indexOf(item.event_name)===-1){
                eventNames.push(item.event_name);
            }
        });
        // setTempRecords(temp);
        ordersUpdatedCallback(Object.values(tempRecords), eventNames, socketStatus, data.length, data.length);
    }
};

export default SocketIo;