import * as React from 'react';
import * as ReactDOM from 'react-dom';
import GC from '@grapecity/spread-sheets';
import '@grapecity/spread-sheets-charts';
import '@grapecity/spread-sheets-shapes';
import { SpreadSheets, Worksheet } from '@grapecity/spread-sheets-react';
import './styles.css';

const Component = React.Component;

function _getElementById(id) {
    return document.getElementById(id);
}

class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div class="sample-tutorial">
            <div class="sample-spreadsheets">
                <SpreadSheets workbookInitialized={spread=>this.initSpread(spread)}>
                    <Worksheet>
                    </Worksheet>
                </SpreadSheets>
            </div>
            </div>;
    }
    initSpread(spread) {
        var sd = data;
        if (sd.length > 0) {
            if (!spread) {
                return;
            }

            spread.suspendPaint();
            spread.fromJSON(sd[0]);
            spread.resumePaint();
        }
    }
}

ReactDOM.render(<App />, _getElementById('app'));
