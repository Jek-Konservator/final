import React, {useState, useEffect, useCallback} from 'react';
import {GlobalStyle, Main1, Main2, Main3, Main4} from "./globalstyle";
import {Header} from "./components/header/";
import {UseSingUp} from "./components/Functions/Cards SingUp/modal";
import Web3 from "web3";
import safeTraffic from "./abis/safeTraffic.json";
import {DataContext} from "./components/contexts/DataContext";
import {CardregDPSofficerProfile} from "./components/Functions/Cards regDPSofficerProfile/cards";
import {UseRegDriverProfile} from "./components/Functions/Cards regDPSofficerProfile/modal";
import {CardSingUp} from "./components/Functions/Cards SingUp/cards";
import {UseGetDriverInfo} from "./components/Functions/Modal UseGetDriverInfo";
import {CardRegDriversLicense} from "./components/Functions/Cards regDriversLicense/cards";
import {UesCardRegDriversLicense} from "./components/Functions/Cards regDriversLicense/modal";
import {CardVerifyDriversLicense} from "./components/Functions/Cards verifyDriversLicense/cards";
import {UseVerifyDriversLicense} from "./components/Functions/Cards verifyDriversLicense/modal";
import {CardDriversLicenseExtend} from "./components/Functions/Cards driversLicenseExtend/cards";
import {CardDeactivateDriversLicense} from "./components/Functions/Cards deactivateDriversLicense/cards";
import {UseDeactivateDriversLicense} from "./components/Functions/Cards deactivateDriversLicense/modal";
import {CardRegisterVehicle} from "./components/Functions/Cards registerVehicle/cards";
import {UseCardRegisterVehicle} from "./components/Functions/Cards registerVehicle/modal";
import {CardVerifyVehicle} from "./components/Functions/Cards verifyVehicle/cards";
import {UseCardVerifyVehicle} from "./components/Functions/Cards verifyVehicle/modal";
import {CardRequestInsurance} from "./components/Functions/Cards requestInsurance/cards";
import {UseRequestInsurance} from "./components/Functions/Cards requestInsurance/modal";
import {CardVerifyInsuranceRequest} from "./components/Functions/Cards VerifyInsuranceRequest/cards";
import {UseVerifyInsuranceRequest} from "./components/Functions/Cards VerifyInsuranceRequest/modal";
import {CardPayInsuranceFee} from "./components/Functions/Cards PayInsuranceFee/cards";
import {UsePayInsuranceFee} from "./components/Functions/Cards PayInsuranceFee/modal";
import {CardRegisterDTP} from "./components/Functions/Cards registerDTP/cards";
import {UseRegisterDTP} from "./components/Functions/Cards registerDTP/modal";
import {CardConfirmDTP} from "./components/Functions/Cards confirmDTP/cards";
import {UseConfirmDTP} from "./components/Functions/Cards confirmDTP/modal";
import {CardInsuranceCasePayback} from "./components/Functions/Cards insuranceCasePayback/cards";
import {UseInsuranceCasePayback} from "./components/Functions/Cards insuranceCasePayback/modal";
import {CardRegisterFine} from "./components/Functions/Cards registerFine/cards";
import {UseRegisterFine} from "./components/Functions/Cards registerFine/modal";
import {CardPayFine} from "./components/Functions/Cards payFine/cards";
import {UsePayFine} from "./components/Functions/Cards payFine/modal";
import {CardGetDriversForDPS} from "./components/Functions/Cards getDriversForDPS/cards";
import {UseGetDriversForDPS} from "./components/Functions/Cards getDriversForDPS/modal";
import {CardGetDriversLicensesForDPS} from "./components/Functions/Cards getDriversLicensesForDPS/cards";
import {UseGetDriversLicensesForDPS} from "./components/Functions/Cards getDriversLicensesForDPS/modal";
import {CardGetVehiclesForDPS} from "./components/Functions/Cards getVehiclesForDPS/cards";
import {UseGetVehiclesForDPS} from "./components/Functions/Cards getVehiclesForDPS/modal";
import {CardGetVehiclesForDriver} from "./components/Functions/Cards getVehiclesForDriver/cards";
import {UseGetVehiclesForDriver} from "./components/Functions/Cards getVehiclesForDriver/modal";
import {CardGetInsuranceRequests} from "./components/Functions/Cards getInsuranceRequests/cards";
import {UseGetInsuranceRequests} from "./components/Functions/Cards getInsuranceRequests/modal";
import {CardGetDTPsForDriver} from "./components/Functions/Cards getDTPsForDriver/cards";
import {UseGetDTPsForDriver} from "./components/Functions/Cards getDTPsForDriver/modal";
import {CardGetFinesForDriver} from "./components/Functions/Cards getFinesForDriver/cards";
import {UseGetFinesForDriver} from "./components/Functions/Cards getFinesForDriver/modal";



const App = () => {
    const [account, setAccount] = useState();
    const [contract, setContract] = useState();

    const [dataGetDriverInfo, setDataGetDriverInfo] = useState();
    const [dataGetDriversForDPS, setDataGetDriversForDPS] = useState();
    const [dataGetGetDriversLicensesForDPS, setDataGetDriversLicensesForDPS] = useState();
    const [dataGetVehiclesForDPS, setDataGetVehiclesForDPS] = useState();
    const [dataGetVehiclesForDriver, setDataGetVehiclesForDriver] = useState();
    const [dataGetInsuranceRequests, setDataGetInsuranceRequests] = useState();
    const [dataGetDTPsForDriver, setDataGetDTPsForDriver] = useState();
    const [dataGetFinesForDriver, setDataGetFinesForDriver] = useState();


    const [openSingUp, setOpenSingUp] = useState(false);
    const [openCardRegDPSofficerProfile, setOpenCardRegDPSofficerProfile] = useState(false);
    const [openCardUseGetDriverInfo, setOpenCardUseGetDriverInfo] = useState(false);
    const [openCardRegDriversLicense, setOpenCardRegDriversLicense] = useState(false);
    const [openCardVerifyDriversLicense, setOpenCardVerifyDriversLicense] = useState(false);
    const [openCardDeactivateDriversLicense, setOpenCardDeactivateDriversLicense] = useState(false);
    const [openCardRegisterVehicle, setOpenCardRegisterVehicle] = useState(false);
    const [openCardVerifyVehicle, setOpenCardVerifyVehicle] = useState(false);
    const [openCardRequestInsurance, setOpenCardRequestInsurance] = useState(false);
    const [openCardVerifyInsuranceRequest, setOpenCardVerifyInsuranceRequest] = useState(false);
    const [openCardPayInsuranceFee, setOpenCardPayInsuranceFee] = useState(false);
    const [openCardRegisterDTP, setOpenCardRegisterDTP] = useState(false);
    const [openCardConfirmDTP, setOpenCardConfirmDTP] = useState(false);
    const [openCardInsuranceCasePayback, setOpenCardInsuranceCasePayback] = useState(false);
    const [openCardRegisterFine, setOpenCardRegisterFine] = useState(false);
    const [openCardPayFine, setOpenCardPayFine] = useState(false);
    const [openGetDriversForDPS, setOpenGetDriversForDPS] = useState(false);
    const [openGetGetDriversLicensesForDPS, setOpenGetDriversLicensesForDPS] = useState(false);
    const [openGetVehiclesForDPS, setOpenGetVehiclesForDPS] = useState(false);
    const [openGetVehiclesForDriver, setOpenGetVehiclesForDriver] = useState(false);
    const [openGetInsuranceRequests, setOpenGetInsuranceRequests] = useState(false);
    const [openGetDTPsForDriver, setOpenGetDTPsForDriver] = useState(false);
    const [openGetFinesForDriver, setOpenGetFinesForDriver] = useState(false);

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

    const toggleCardRegDriversLicense = () =>{
        setOpenCardRegDriversLicense(!openCardRegDriversLicense)
    }

    const toggleCardVerifyDriversLicense = () =>{
        setOpenCardVerifyDriversLicense(!openCardVerifyDriversLicense)
    }

    const toggleCardDeactivateDriversLicense = () =>{
        setOpenCardDeactivateDriversLicense(!openCardDeactivateDriversLicense)
    }
    const toggleCardRegisterVehicle = () =>{
        setOpenCardRegisterVehicle(!openCardRegisterVehicle)
    }

    const toggleCardVerifyVehicle = () =>{
        setOpenCardVerifyVehicle(!openCardVerifyVehicle)
    }
    const toggleCardRequestInsurance = () =>{
        setOpenCardRequestInsurance(!openCardRequestInsurance)
    }

    const toggleCardVerifyInsuranceRequest = () =>{
            setOpenCardVerifyInsuranceRequest(!openCardVerifyInsuranceRequest)
    }

    const toggleCardPayInsuranceFee = () =>{
        setOpenCardPayInsuranceFee(!openCardPayInsuranceFee)
    }

    const toggleCardRegisterDTP = () =>{
        setOpenCardRegisterDTP(!openCardRegisterDTP)
    }

    const toggleCardConfirmDTP = () =>{
        setOpenCardConfirmDTP(!openCardConfirmDTP)
    }

    const toggleCardInsuranceCasePayback = () =>{
        setOpenCardInsuranceCasePayback(!openCardInsuranceCasePayback)
    }

    const toggleCardRegisterFine = () =>{
        setOpenCardRegisterFine(!openCardRegisterFine)
    }

    const toggleCardPayFine = () =>{
        setOpenCardPayFine(!openCardPayFine)
    }

    const toggleGetDriverInfo = async () =>{
        const data = await contract.methods.getDriverInfo().call();
        console.log(data);
        await setDataGetDriverInfo(data);
        setOpenCardUseGetDriverInfo(!openCardUseGetDriverInfo)
    }

    const toggleGetDriversForDPS = async () =>{
        const data = await contract.methods.getDriversForDPS().call();
        await setDataGetDriversForDPS(data);
        setOpenGetDriversForDPS(!openGetDriversForDPS)
    }
    const toggleGetDriversLicensesForDPS = async () =>{
        const data = await contract.methods.getDriversLicensesForDPS().call();
        await setDataGetDriversLicensesForDPS(data);
        setOpenGetDriversLicensesForDPS(!openGetGetDriversLicensesForDPS)
    }
    const toggleGetVehiclesForDPS = async () =>{
        const data = await contract.methods.getVehiclesForDPS().call();
        await setDataGetVehiclesForDPS(data);
        setOpenGetVehiclesForDPS(!openGetVehiclesForDPS)
    }
    const toggleGetVehiclesForDriver = async () =>{
        const data = await contract.methods.getVehiclesForDriver().call();
        await setDataGetVehiclesForDriver(data);
        setOpenGetVehiclesForDriver(!openGetVehiclesForDriver)
    }
    const toggleGetInsuranceRequests = async () =>{
        const data = await contract.methods.getInsuranceRequests().call();
        await setDataGetInsuranceRequests(data);
        setOpenGetInsuranceRequests(!openGetInsuranceRequests)
    }
    const toggleGetDTPsForDriver = async () =>{
        const data = await contract.methods.getDTPsForDriver().call();
        await setDataGetDTPsForDriver(data);
        setOpenGetDTPsForDriver(!openGetDTPsForDriver)
    }
    const toggleGetFinesForDriver = async () =>{
        const data = await contract.methods.getFinesForDriver().call();
        await setDataGetFinesForDriver(data);
        setOpenGetFinesForDriver(!openGetFinesForDriver)
    }



    useEffect(() => {
        metaMask().then((r) => r);
        loadData().then((r) => r);
    }, [metaMask, loadData]);

                return (
            <DataContext.Provider value={{dataGetFinesForDriver, toggleGetFinesForDriver, dataGetDTPsForDriver, toggleGetDTPsForDriver, dataGetInsuranceRequests, toggleGetInsuranceRequests, dataGetVehiclesForDriver, toggleGetVehiclesForDriver, dataGetVehiclesForDPS, toggleGetVehiclesForDPS, dataGetGetDriversLicensesForDPS, toggleGetDriversLicensesForDPS, dataGetDriversForDPS, toggleGetDriversForDPS, dataGetDriverInfo, toggleCardPayFine, toggleCardRegisterFine, toggleCardInsuranceCasePayback, toggleCardConfirmDTP, toggleCardRegisterDTP, toggleCardPayInsuranceFee, toggleCardVerifyInsuranceRequest, toggleCardRequestInsurance, toggleCardRegisterVehicle, toggleCardVerifyVehicle, toggleCardDeactivateDriversLicense, toggleCardregDPSofficerProfile,toggleSingUp, contract, account, toggleGetDriverInfo, toggleCardRegDriversLicense, toggleCardVerifyDriversLicense}}>
                <GlobalStyle/>
                <Header/>
                {openSingUp && <UseSingUp/>}
                {openCardRegDPSofficerProfile && <UseRegDriverProfile/>}
                {openCardUseGetDriverInfo && <UseGetDriverInfo/>}
                {openCardRegDriversLicense && <UesCardRegDriversLicense/>}
                {openCardVerifyDriversLicense && <UseVerifyDriversLicense/>}
                {openCardDeactivateDriversLicense && <UseDeactivateDriversLicense/>}
                {openCardRegisterVehicle && <UseCardRegisterVehicle/>}
                {openCardVerifyVehicle && <UseCardVerifyVehicle/>}
                {openCardRequestInsurance && <UseRequestInsurance/>}
                {openCardVerifyInsuranceRequest && <UseVerifyInsuranceRequest/>}
                {openCardPayInsuranceFee && <UsePayInsuranceFee/>}
                {openCardRegisterDTP && <UseRegisterDTP/>}
                {openCardConfirmDTP && <UseConfirmDTP/>}
                {openCardInsuranceCasePayback && <UseInsuranceCasePayback/>}
                {openCardRegisterFine && <UseRegisterFine/>}
                {openCardPayFine && <UsePayFine/>}
                {openGetDriversForDPS && <UseGetDriversForDPS/>}
                {openGetGetDriversLicensesForDPS && <UseGetDriversLicensesForDPS/>}
                {openGetVehiclesForDPS && <UseGetVehiclesForDPS/>}
                {openGetVehiclesForDriver && <UseGetVehiclesForDriver/>}
                {openGetInsuranceRequests && <UseGetInsuranceRequests/>}
                {openGetDTPsForDriver && <UseGetDTPsForDriver/>}
                {openGetFinesForDriver && <UseGetFinesForDriver/>}
                <Main1>
                    <CardSingUp/>
                    <CardregDPSofficerProfile/>
                    <CardRegDriversLicense/>
                    <CardVerifyDriversLicense/>
                    <CardDriversLicenseExtend/>
                    <CardDeactivateDriversLicense/>
                    <CardRegisterVehicle/>
                </Main1>
                <Main2>
                    <CardVerifyVehicle/>
                    <CardRequestInsurance/>
                    <CardVerifyInsuranceRequest/>
                    <CardPayInsuranceFee/>
                    <CardRegisterDTP/>
                    <CardConfirmDTP/>
                    <CardInsuranceCasePayback/>
                </Main2>
                <Main3>
                    <CardRegisterFine/>
                    <CardPayFine/>
                </Main3>
                <Main4>
                    <CardGetDriversForDPS/>
                    <CardGetDriversLicensesForDPS/>
                    <CardGetVehiclesForDPS/>
                    <CardGetVehiclesForDriver/>
                    <CardGetInsuranceRequests/>
                    <CardGetDTPsForDriver/>
                    <CardGetFinesForDriver/>
                </Main4>
            </DataContext.Provider>

        );
}

export default App;