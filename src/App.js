import React, {useState, useEffect, useCallback} from 'react';
import {GlobalStyle, Main} from "./globalstyle";
import {Header} from "./components/header/";
import {UseSingUp} from "./components/Cards SingUp/modal";
import Web3 from "web3";
import safeTraffic from "./abis/safeTraffic.json";
import {DataContext} from "./components/contexts/DataContext";
import {CardregDPSofficerProfile} from "./components/Cards regDPSofficerProfile/cards";
import {UseRegDriverProfile} from "./components/Cards regDPSofficerProfile/modal";
import {CardSingUp} from "./components/Cards SingUp/cards";
import {UseGetDriverInfo} from "./components/Modal UseGetDriverInfo";
import {CardRegDriversLicense} from "./components/Cards regDriversLicense/cards";
import {UesCardRegDriversLicense} from "./components/Cards regDriversLicense/modal";
import {CardVerifyDriversLicense} from "./components/Cards verifyDriversLicense/cards";
import {UseVerifyDriversLicense} from "./components/Cards verifyDriversLicense/modal";
import {CardDriversLicenseExtend} from "./components/Cards driversLicenseExtend/cards";
import {CardDeactivateDriversLicense} from "./components/Cards deactivateDriversLicense/cards";
import {UseDeactivateDriversLicense} from "./components/Cards deactivateDriversLicense/modal";



const App = () => {
    const [account, setAccount] = useState();
    const [contract, setContract] = useState();

    const [openSingUp, setOpenSingUp] = useState(false);
    const [openCardRegDPSofficerProfile, setOpenCardRegDPSofficerProfile] = useState(false);
    const [openCardUseGetDriverInfo, setOpenCardUseGetDriverInfo] = useState(false);
    const [openCardRegDriversLicense, setOpenCardRegDriversLicense] = useState(false);
    const [openCardVerifyDriversLicense, setOpenCardVerifyDriversLicense] = useState(false);
    const [openCardDeactivateDriversLicense, setOpenCardDeactivateDriversLicense] = useState(false);

    const metaMask = useCallback(async () => {
        if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
    } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
    } else {
        window.alert();
    }
    }, [] );


    const loadData = useCallback(async () => {
        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);

        const networkId = await web3.eth.net.getId();
        const networkData = safeTraffic.networks[networkId];
        const contract = new web3.eth.Contract(safeTraffic.abi, networkData.address);
        setContract(contract);
    }, []);

    const toggleSingUp = () =>{
        setOpenSingUp(!openSingUp)
    }

    const toggleCardregDPSofficerProfile = () =>{
        setOpenCardRegDPSofficerProfile(!openCardRegDPSofficerProfile)
    }

    const toggleGetDriverInfo = () =>{
        setOpenCardUseGetDriverInfo(!openCardUseGetDriverInfo)
    }

    const toggleCardRegDriversLicense = () =>{
        setOpenCardRegDriversLicense(!openCardRegDriversLicense)
    }

    const toggleCardVerifyDriversLicense = () =>{
        setOpenCardVerifyDriversLicense(!openCardVerifyDriversLicense)
    }

    const toggleCardDeactivateDriversLicense = () =>{
        setOpenCardDeactivateDriversLicense(!openCardDeactivateDriversLicense)
    }


    useEffect(() => {
        metaMask().then((r) => r);
        loadData().then((r) => r);
    }, [metaMask, loadData]);

                return (
            <DataContext.Provider value={{toggleCardDeactivateDriversLicense, toggleCardregDPSofficerProfile,toggleSingUp, contract, account, toggleGetDriverInfo, toggleCardRegDriversLicense, toggleCardVerifyDriversLicense}}>
                <GlobalStyle/>
                <Header/>
                {openSingUp && <UseSingUp/>}
                {openCardRegDPSofficerProfile && <UseRegDriverProfile/>}
                {openCardUseGetDriverInfo && <UseGetDriverInfo/>}
                {openCardRegDriversLicense && <UesCardRegDriversLicense/>}
                {openCardVerifyDriversLicense && <UseVerifyDriversLicense/>}
                {openCardDeactivateDriversLicense && <UseDeactivateDriversLicense/>}
                <Main>
                <CardSingUp/>
                <CardregDPSofficerProfile/>
                <CardRegDriversLicense/>
                <CardVerifyDriversLicense/>
                <CardDriversLicenseExtend/>
                <CardDeactivateDriversLicense/>
                </Main>
            </DataContext.Provider>
        );
}

export default App;