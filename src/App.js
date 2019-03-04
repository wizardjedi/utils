import React, { Component } from 'react';
import './App.css';
import {HexDump} from "./HexDump/HexDump";
import {CalcTextArea} from "./LengthTextArea/CalcTextArea";
import Utils from "./Utils";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Menu from "./components/Menu";
import * as ROUTES from './routes';
import HomePage from "./pages/HomePage";
import HexDumpPage from "./pages/HexDumpPage";
import SmppDecoderPage from "./pages/SmppDecoderPage";

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
            <Router>
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
                            </Switch>


                            <h1>Hex-to-code</h1>

                            <HexDump hexdump={this.state.text} />
                            <CalcTextArea rows="10" cols="50" text={this.state.text} onChange={this.onChange} />
                            Link to this page:<a href={"#"+this.state.text}>#{this.state.text.length > 20 ? this.state.text.substr(0,20) : this.state.text}</a>
                            
                        </main>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;