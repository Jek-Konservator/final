import React, {useState, Component} from 'react';
import {GlobalStyle} from "./globalstyle";
import {Header} from "./components/header/";
import {CurrentCard} from "./components/Cards";
import {SingUp} from "./components/sign up";
import Web3 from "web3";
import safeTraffic from "./abis/safeTraffic.json";



class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            account: "",
        };
        this.firstFunc = this.firstFunc.bind(this);
    }

    async componentWillMount() {
        await this.loadWeb3();
        await this.loadBlockchainData();
    }

    async loadWeb3() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        } else {
            window.alert();
        }
    }

    async loadBlockchainData() {
        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts();
        this.setState({ account: accounts[0] });

        const networkId = await web3.eth.net.getId();
        const networkData = safeTraffic.networks[networkId];
        const contract = new web3.eth.Contract(safeTraffic.abi, networkData.address);
        this.setState({ contract });
    }

    firstFunc() {
        const { contract } = this.state;
        contract.methods.regUser().send({ from: this.state.account });
    }

    render() {
                return (
            <>
                <GlobalStyle/>
                <Header />
                <CurrentCard />
            </>
        );
    }
}

export default App;