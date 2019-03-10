import React, { Component } from 'react';
import './App.css';
import Utils from "./Utils";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Menu from "./components/Menu";
import SmppDecoderPage from "./pages/SmppDecoderPage";
import * as ROUTES from "./routes";
import HomePage from "./pages/HomePage";
import HexDumpPage from "./pages/HexDumpPage";
import {encodingParameterizedPage} from "./pages/EncodingsPage";
import TestHexDumpPage from "./pages/test/TestHexDumpPage";

class App extends Component {
    constructor(props) {
        super(props);

        var hash = window.location.hash;

        var oldText="";

        if (hash != null && hash.length>1) {
            oldText = Utils.Text.Hex.cleanup(hash.substr(1));
        }

        this.state = {
            text:oldText,
        };

        this.onChange = this.onChange.bind(this);
    }
    onChange(text) {
        this.setState({text: text});

        if (text.length <= 2000) {
            window.location.hash = '#' + text;
        }
    }
    render() {
        return (
            <Router basename={`${process.env.PUBLIC_URL}`}>
                <div className="container-fluid h-100">
                    <div className="row h-100">
                        <nav className="col-md-2 d-none d-md-block bg-light sidebar">
                            <Menu />
                        </nav>

                        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4 h-100">
                            <Switch>
                                <Route exact path={ROUTES.PATH_HOME} component={HomePage} />
                                <Route path={ROUTES.PATH_HEX_DUMP} component={HexDumpPage} />
                                <Route path={ROUTES.PATH_SMPP_DECODE} component={SmppDecoderPage} />

                                <Route
                                    path={ROUTES.PATH_ENCODING + "/:encodingName"}
                                    component={encodingParameterizedPage}
                                />

                                <Route
                                    path="/test/hexdump"
                                    component={TestHexDumpPage}
                                />
                            </Switch>
                        </main>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;