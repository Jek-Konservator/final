pragma solidity 0.5.16;

contract safeTraffic {

    struct vehicle {            // Структура машины
        uint vehicleID;         //id транспорта
        uint ownerID;           //id владельца
        string category;        //категория транспорта
        uint periodOfUse;       //Время использования в годах
        uint marketValue;       //Рыночная стоимость
        bool verified;          //Статус подтверждения
        bool insuranceStatus;   //Статус страховки
    }

    struct driversLicense {     // Структура водительского удостоверения
        uint ownerID;            //id владельца
        uint number;            //Номер удостоверения
        string validTime;       //Срок действия
        string category;        //Категория
        address ownerAddress;   //Адресс владельца
        uint activeTo;          //срок действия в секундах
        bool verified;         //статус подтверждения
        bool active;            //Активна ли
    }

    struct driver {               // Структура пользователя
        uint driverID;             //id водителя
        string FIO;
        address payable driverAddress;      //Адресс водителя
        uint role;              // 0 - driver, 1 - DPS
        uint licenseNumber;         //номер лицензии
        uint expStartYear;             //год начала водительского стажа
        uint DTPcount;                  //Колличество ДТП
        uint unpayedFines;              //Неоплаченные штрафы
        uint balance;
        bool insuranceStatus;           //статус строховки
    }

    struct DPSofficer {
        uint driverID;          //id водителя
        address driverAddress;  //адресс водителя
    }

    struct insuranceRequest {
        uint requestID;         //id запроса на страховку
        uint requesterID;       //id человека который запрашивает
        string requesterFIO;    //фамилия запрашивающего
        uint vehicleID;          //id мащины
        uint insuranceFee;       //страховой взнос
        address requesterAddress;  //адрес запрашивающего
        bool readyToPay;            //готовность а оплате
        bool payStatus;             //статус оплаты
    }

    struct DTP {
        uint DTPid;                 //id ДТП
        uint victimID;              //id пострадавшего
        uint victimLicenseNumber;  // номер лицензии пострадавшего     (вод.удс)
        string DTPdate;             //дата ДТП
        bool confirmed;             //статус подтверрждения
        bool insurancePayed;        //статус выплаты страховой
    }

    struct fine {
        uint fineID;            //id штрафа
        uint driverID;          //id водителя
        uint fineDateInSec;     //дата назначения штрафа в сек
        bool payStatus;         //статус оплаты
    }

    driver[] drivers;                       // Массив пользователей
    DPSofficer[] DPSofficers;               //Массив ДПС-ников
    driversLicense[] driversLicenses;   // Массив водительских удостоверений
    vehicle[] vehicles;                 // Массив транспортных средств
    insuranceRequest[] insuranceRequests;   // Массив запросов на оформление страховки
    DTP[] DTPs;                         // Массив ДТП
    fine[] fines;                       // Массив штрафов

    address admin = msg.sender;
    address payable ZAddress = 0x0000000000000000000000000000000000000000;
    address payable insurance = 0x80c4F1f4E464075F8aaDCfc6a0452f7ee918343C;
    address payable bank = 0x626913D49004E3E44bbA55c2586f1b5A82190a3D;

    modifier IsAdmin {  // Модификатор "Является админом"
        require(msg.sender == admin, "You are not admin");
        _;
    }

    modifier InDriverMode { // Модификатор "В режиме водителя"
        require(driversMap[msg.sender].role == 0, "You are not in Driver mode");
        _;
    }

    modifier InDPSmode {    // Модификатор "В режиме сотрудника ДПС"
        require(driversMap[msg.sender].role == 1, "You are not a DPS officer");
        _;
    }

    mapping (address => driver) driversMap;

    constructor () public {
        drivers.push(driver(0, "Иванов Иван Иванович", 0xBBFAE62Bae8c7aAF00597926a41E12107FEf3b35, 2, 0, 2018, 0, 0, 50, false));
        drivers.push(driver(1, "Семенов Семен Семенович", 0x37f4626F462311112b228e0363151A5Ca9B98ba9, 1, 0, 2015, 0, 0, 50, false));
        drivers.push(driver(2, "Петров Петр Петрович", 0x11eb5470250A679C1B7b892F86Ef6893CBA9b3fA, 1, 0, 2010, 3, 0, 50, false));
    }

    function regDriver(string memory _FIO) public {   // Функция регистрации пользователя
        require(driversMap[msg.sender].driverAddress == ZAddress, "You are already registered");    // Проверка: если человек, который вызвал функцию, уже зарегистрирован, то его регистрировать не нужно дальше функция выполняться не будет.
        drivers.push(driver(drivers.length, _FIO, msg.sender, 0, 0, 0, 0, 0, 0, false));    // Внесение данных в массив пользователей
        driversMap[msg.sender].driverID = drivers.length - 1;         // Автоматическое внесение ID пользователя в маппинг пользователей
        driversMap[msg.sender].FIO = _FIO;                          // Автоматическое внесение ФИО в маппинг пользователей
        driversMap[msg.sender].driverAddress = msg.sender;          // Автоматическое внесение адреса пользователя, который вызвал функцию в маппинг пользователей
        driversMap[msg.sender].role = 0;                            // Выдача роли пользователя в маппинге пользователей
        driversMap[msg.sender].licenseNumber = 0;
        driversMap[msg.sender].expStartYear = 0;
        driversMap[msg.sender].DTPcount = 0;
        driversMap[msg.sender].unpayedFines = 0;
        driversMap[msg.sender].balance = 0;
        driversMap[msg.sender].insuranceStatus = false;
        DPSofficers.push(DPSofficer(driversMap[msg.sender].driverID, ZAddress));
    }

    function getDriverInfo() public view returns (uint, string memory, address, uint/*, uint, uint, uint, uint, bool*/) {   // Функиця просмотра данных своего водительского профиля (в будущем может не понадобиться)
        require(driversMap[msg.sender].driverAddress == msg.sender, "You have not registered a driver profile");
        return (driversMap[msg.sender].driverID,
                driversMap[msg.sender].FIO,
                driversMap[msg.sender].driverAddress,
                driversMap[msg.sender].licenseNumber
                /*driversMap[msg.sender].expStartYear,
                driversMap[msg.sender].DTPcount,
                driversMap[msg.sender].unpayedFines,
                driversMap[msg.sender].balance,
                driversMap[msg.sender].insuranceStatus*/);
    }

    function getDriversForDPS() public view InDPSmode returns (uint, string memory, address, uint, uint, uint, uint, uint, bool) {    // Функция просмотра водителей (можно вызвать только в режиме ДПС)
        for(uint i = 0; i <= drivers.length; i++) {
            return (drivers[i].driverID, drivers[i].FIO, drivers[i].driverAddress, drivers[i].licenseNumber, drivers[i].expStartYear, drivers[i].DTPcount, drivers[i].unpayedFines, drivers[i].balance, drivers[i].insuranceStatus);
        }
    }

    function regDPSofficerProfile(uint _driverID) public IsAdmin {    // Функция регистрации сотрудника ДПС (может вызвать только админ)
        require(DPSofficers[_driverID].driverAddress == ZAddress, "DPS officer is already registered");  // Проверка: зарегистрирован ли уже сотрудник
        DPSofficers[_driverID].driverAddress == drivers[_driverID].driverAddress;
    }

    function return_admin() public view returns (address) {
        return(admin);
    }

    function driverMode() public {  // Функция активации режима водителя
        require(drivers[driversMap[msg.sender].driverID].driverAddress != ZAddress, "You have not registered a driver profile");
        require(driversMap[msg.sender].role != 0, "You are already in Driver mode");
        drivers[driversMap[msg.sender].driverID].role = 0;
        driversMap[msg.sender].role = 0;
    }

    function DPSmode() public { // Функция активации режима сотрудника ДПС
        require(DPSofficers[driversMap[msg.sender].driverID].driverAddress != ZAddress, "You are not DPS officer");
        require(driversMap[msg.sender].role != 1, "You are already in DPS mode");
        drivers[driversMap[msg.sender].driverID].role = 1;
        driversMap[msg.sender].role = 1;
    }

    function regDriversLicense(uint _number, string memory _validTime, string memory _categoryLetter) public InDriverMode { // Функция регистрации водительского удостоверения (можно вызвать только в режиме водителя)
        require(_number != driversLicenses[driversMap[msg.sender].driverID].number, "License with this number is already registered");
        //require(_categoryLetter == "A", "Category does not exist"); // Категория существует (Будет реализовано в интерфейсе)
        driversLicenses[driversMap[msg.sender].driverID].number = _number;
        driversLicenses[driversMap[msg.sender].driverID].validTime = _validTime;
        driversLicenses[driversMap[msg.sender].driverID].category = _categoryLetter;
        driversLicenses[driversMap[msg.sender].driverID].ownerAddress = msg.sender;
    }

    function getDriversLicensesForDPS() public view InDPSmode returns (uint, uint, string memory, string memory, address, bool, bool) {  // Функция просмотра всех зарегистрированных водительских удостоверений (можно вызвать только в режиме ДПС). Сотрудник ДПС смотрит все заявки на регистрацию и подтверждает удостоверения по ID.
        for(uint i = 0; i <= driversLicenses.length; i++) {
            require(driversLicenses[i].active == false);
            return(driversLicenses[i].ownerID, driversLicenses[i].number, driversLicenses[i].validTime, driversLicenses[i].category, driversLicenses[i].ownerAddress, driversLicenses[i].verified, driversLicenses[i].active);
        }
    }

    function verifyDriversLicense(uint _ownerID) public InDPSmode { // Функция подтверждения водительского удостоверения (можно вызвать только в режиме сотрудника)
        require(driversLicenses[_ownerID].verified == false, "License is already verified");
        driversLicenses[_ownerID].verified = true;
        driversLicenses[_ownerID].active = true;
        drivers[_ownerID].licenseNumber = driversLicenses[_ownerID].number;
        driversLicenses[_ownerID].activeTo = block.timestamp + 365*10*5;
    }


    function driversLicenseExtend() public InDriverMode {   // Функция продления срока действия водительского удостоверения (можно вызвать только в режиме водителя)
        require(driversLicenses[driversMap[msg.sender].driverID].ownerAddress == msg.sender, "You don't have a drivers license");
        require(driversLicenses[driversMap[msg.sender].driverID].active == true, "License is not active");
        require(block.timestamp > driversLicenses[driversMap[msg.sender].driverID].activeTo - 5*30, "Too early to expand");
        driversLicenses[driversMap[msg.sender].driverID].activeTo = block.timestamp + 365*10*5;
    }

    function deactivateDriversLicense(uint _ownerID) public InDPSmode { // Функция деактивации водительского удостоверения (можно вызвать только в режиме ДПС)
        require(block.timestamp > driversLicenses[_ownerID].activeTo, "Too early to deactivate");
        driversLicenses[_ownerID].active = false;
    }

    function registerVehicle(string memory _categoryLetter, uint _periodOfUse, uint _marketValue) public InDriverMode { // Функция регистрации транспортного средства (можно вызвать только в режиме водителя)
        require(driversLicenses[driversMap[msg.sender].driverID].verified == true, "License is not verified");
        vehicles.push(vehicle(vehicles.length, driversMap[msg.sender].driverID, _categoryLetter, _periodOfUse, _marketValue, false, false));
    }

    function getVehiclesForDPS() public view InDPSmode returns (uint, uint, string memory, uint, uint, bool) { // Функция просмотра зарегистрированных транспортных средств (может вызвать только в режиме ДПС)
        for(uint i = 0; i <= vehicles.length; i++) {
            return(vehicles[i].vehicleID, vehicles[i].ownerID, vehicles[i].category, vehicles[i].periodOfUse, vehicles[i].marketValue, vehicles[i].verified);
        }
    }

    function verifyVehicle(uint _vehicleID) public InDPSmode {  // Функция подтверждения регистрации транспортных средств (можно вызвать только в режиме ДПС)
        require(vehicles[_vehicleID].verified == false, "Vehicle is already verified");
        vehicles[_vehicleID].verified = true;
    }

    function getVehiclesForDriver() public view InDriverMode returns (uint, uint, string memory, uint, uint, bool) { // Функция просмотра транспортных средств пользователя (можно вызвать только в режиме водителя)
        require(vehicles[driversMap[msg.sender].driverID].ownerID == driversMap[msg.sender].driverID);
        for(uint i = 0; i <= vehicles.length; i++) {
            return(vehicles[i].vehicleID, vehicles[i].ownerID, vehicles[i].category, vehicles[i].periodOfUse, vehicles[i].marketValue, vehicles[i].verified);
        }
    }

    function requestInsurance(string memory _FIO, uint _vehicleID) public InDriverMode {   // Функция на оформление запроса на страховку (можно вызвать только в режиме водителя)
        require(driversLicenses[driversMap[msg.sender].driverID].active == true, "Drivers license is not active");
        require(drivers[driversMap[msg.sender].driverID].insuranceStatus == false, "You have already payed an insurance fee");
        require(vehicles[_vehicleID].ownerID == driversMap[msg.sender].driverID);
        require(vehicles[_vehicleID].verified == true);
        insuranceRequests.push(insuranceRequest(insuranceRequests.length, driversMap[msg.sender].driverID, _FIO, _vehicleID, 0, driversMap[msg.sender].driverAddress, false, false));
    }

    function getInsuranceRequests() public view returns(uint, uint, string memory, uint, address) { // Функция вывода всех запросов на страховку
        require(msg.sender == insurance, "You are not an insurance");   // Можно вызвать только с акканута страховой службы
        for(uint i = 0; i <= insuranceRequests.length; i++) {
            require(insuranceRequests[i].readyToPay == false);
            require(insuranceRequests[i].payStatus == false);
            return (insuranceRequests[i].requestID,
            insuranceRequests[i].requesterID,
            insuranceRequests[i].requesterFIO,
            insuranceRequests[i].vehicleID,
            insuranceRequests[i].requesterAddress);
        }
    }

    function verifyInsuranceRequest(uint _requestID) public {   // Функция подтверждения запроса на страховку
        require(msg.sender == insurance, "You are not an insurance");   // Можно вызвать только с аккаунта страховой службы
        require(insuranceRequests[_requestID].readyToPay == false);
        require(insuranceRequests[_requestID].payStatus == false);
        insuranceRequests[_requestID].readyToPay = true;
        insuranceRequests[_requestID].insuranceFee = vehicles[insuranceRequests[_requestID].vehicleID].marketValue * (1 - vehicles[insuranceRequests[_requestID].vehicleID].periodOfUse) + 2 * drivers[insuranceRequests[_requestID].requesterID].unpayedFines + drivers[insuranceRequests[_requestID].requesterID].DTPcount - 2*(block.timestamp/31536000 - drivers[insuranceRequests[_requestID].requesterID].expStartYear);
    }

    function getDriversInsuranceRequests() public view InDriverMode returns(uint, uint, string memory, uint, uint, address, bool, bool) {   // Функция вывода запросов на страховку для водителя, вызывающего функцию (может быть вызвана только в режиме водителя) Необходимя для просмотра ID запроса, который необходимо вписать в функцию оплаты страхового взноса
        for(uint i = 0; i <= insuranceRequests.length; i++) {
            require(insuranceRequests[i].requesterAddress == msg.sender);
            return (insuranceRequests[i].requestID,
            insuranceRequests[i].requesterID,
            insuranceRequests[i].requesterFIO,
            insuranceRequests[i].vehicleID,
            insuranceRequests[i].insuranceFee,
            insuranceRequests[i].requesterAddress,
            insuranceRequests[i].readyToPay,
            insuranceRequests[i].payStatus);
        }
    }

    function payInsuranceFee(uint _requestID) public InDriverMode { // Функция оплаты страхового взноса (можно вызвать только в режиме водителя)
        require(msg.sender == insuranceRequests[_requestID].requesterAddress, "You are not a requester of this request");
        require(insuranceRequests[_requestID].readyToPay == true, "Insurance request is not verified");
        require(insuranceRequests[_requestID].payStatus == false, "Insurance fee is already payed");
        insurance.transfer(insuranceRequests[_requestID].insuranceFee);
        drivers[driversMap[msg.sender].driverID].balance = drivers[driversMap[msg.sender].driverID].balance - insuranceRequests[_requestID].insuranceFee;
        insuranceRequests[_requestID].readyToPay = false;
        insuranceRequests[_requestID].payStatus = true;
        drivers[driversMap[msg.sender].driverID].insuranceStatus = true;
    }

    function registerDTP(uint _victimID, string memory _DTPdate) public InDPSmode { // Функция регистрации ДТП (можно вызвать только в режиме ДПС)
        DTPs.push(DTP(DTPs.length, _victimID, drivers[_victimID].licenseNumber, _DTPdate, false, false));
    }


    function getDTPsForDriver() public view InDriverMode returns(uint, uint, uint, string memory, bool) {    // Функция просмотра ДТП для водителя, вызывающего функцию (можно вызвать только в режиме водителя)
        for(uint i = 0; i <= DTPs.length; i++) {
            require(DTPs[i].victimLicenseNumber == drivers[driversMap[msg.sender].driverID].licenseNumber);
            return(DTPs[i].DTPid, DTPs[i].victimID, DTPs[i].victimLicenseNumber, DTPs[i].DTPdate, DTPs[i].confirmed);
        }
    }

    function confirmDTP(uint _DTPid) public InDriverMode {  // Функция подтверждения факта ДТП водителем (можно вызвать только в режиме водителя)
        require(DTPs[_DTPid].victimLicenseNumber == drivers[driversMap[msg.sender].driverID].licenseNumber, "Drivers license check error");
        require(DTPs[_DTPid].confirmed == false, "DTP case is already confirmed");
        DTPs[_DTPid].confirmed = true;
    }

    function insuranceCasePayback(uint _DTPid, uint _requestID) public { // Функция выплаты страхового случая
        require(msg.sender == insurance, "You are not an insurance");   // Можно вызвать только с аккаунта страховой службы
        require(DTPs[_DTPid].confirmed == true, "DTP case is not confirmed by driver");
        drivers[DTPs[_DTPid].victimID].driverAddress.transfer(insuranceRequests[_requestID].insuranceFee);
        drivers[DTPs[_DTPid].victimID].balance = drivers[DTPs[_DTPid].victimID].balance + insuranceRequests[_requestID].insuranceFee;
    }

    function registerFine(uint _driverID) public InDPSmode {  // Функция выписки штрафа (можно вызвать только в режиме ДПС)
        fines.push(fine(fines.length, _driverID, block.timestamp, false));
    }

    function getFinesForDriver() public view InDriverMode returns(uint, uint, uint, bool) { // Функция просмотра штрафов водителя (можно вызвать только в режиме водителя)
        for(uint i = 0; i <= DTPs.length; i++) {
            require(fines[i].driverID == driversMap[msg.sender].driverID);
            return(fines[i].fineID, fines[i].driverID, fines[i].fineDateInSec, fines[i].payStatus);
        }
    }

    function payFine(uint _fineID) public InDriverMode {    // Функция оплаты штрафа (можно вызвать только в режиме водителя)
        require(fines[_fineID].driverID == driversMap[msg.sender].driverID, "That's not your fine");
        if(block.timestamp > fines[_fineID].fineDateInSec + 5*5) {
            bank.transfer(10);
        }
        else {
            bank.transfer(5);
        }
    }

}