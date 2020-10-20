pragma solidity 0.5.16;

contract safeTraffic {

    struct vehicle {            // Структура машины
        uint vehicleID;
        uint ownerID;
        string category;
        uint periodOfUse;
        uint marketValue;
        bool verified;
        bool insuranceStatus;
    }

    struct driversLicense {     // Структура водительского удостоверения
        uint ownerID;
        uint number;
        string validTime;
        string category;
        address ownerAddress;
        uint activeTo;
        bool verified;
        bool active;
    }

    struct user {               // Структура пользователя
        uint userID;
        string FIO;
        address payable userAddress;
        uint role;              // 0 - user, 1 - driver, 2 - DPS
    }

    struct driver {             // Структура водителя
        uint userID;
        string FIO;
        uint licenseNumber;
        uint expStartYear;
        uint DTPcount;
        uint unpayedFines;
        uint balance;
        address payable driverAddress;
        bool insuranceStatus;
    }

    struct DPSofficer {         // Структура сотрудника ДПС
        uint userID;
        string FIO;
        address officerAddress;
    }

    struct insuranceRequest {
        uint requestID;
        uint requesterID;
        string requesterFIO;
        uint vehicleID;
        uint insuranceFee;
        address requesterAddress;
        bool readyToPay;
        bool payStatus;
    }

    struct DTP {
        uint DTPid;
        uint victimID;
        uint victimLicenseNumber;
        string DTPdate;
        bool confirmed;
        bool insurancePayed;
    }

    struct fine {
        uint fineID;
        uint driverID;
        uint fineDateInSec;
        bool payStatus;
    }

    user[] users;                       // Массив пользователей
    driver[] drivers;                   // Массив водителей
    DPSofficer[] DPSofficers;           // Массив сотрудников ДПС
    driversLicense[] driversLicenses;   // Массив водительских удостоверений
    vehicle[] vehicles;                 // Массив транспортных средств
    insuranceRequest[] insuranceRequests;   // Массив запросов на оформление страховки
    DTP[] DTPs;                         // Массив ДТП
    fine[] fines;

    address admin = msg.sender;
    address payable ZAddress = 0x0000000000000000000000000000000000000000;
    address payable insurance = 0x583031D1113aD414F02576BD6afaBfb302140225;
    address payable bank = 0xdD870fA1b7C4700F2BD7f44238821C26f7392148;

    modifier IsAdmin {  // Модиaикатор "Является админом"
        require(msg.sender == admin, "You are not admin");
        _;
    }

    modifier InDriverMode { // Модификатор "В режиме водителя"
        require(usersMap[msg.sender].role == 1, "You are not in Driver mode");
        _;
    }

    modifier InDPSmode {    // Модификатор "В режиме сотрудника ДПС"
        require(usersMap[msg.sender].role == 2, "You are not a DPS officer");
        _;
    }

    mapping (uint => string) vehicleCategories;
    mapping (address => user) usersMap;
    mapping (string => uint) categoriesByName;

    constructor () public {
        vehicleCategories[1] = "A";
        vehicleCategories[2] = "B";
        vehicleCategories[3] = "C";

        categoriesByName["A"] = 1;
        categoriesByName["B"] = 2;
        categoriesByName["C"] = 3;
    }

    function regUser(string memory _FIO) public {   // Функция регистрации пользователя
        require(usersMap[msg.sender].userAddress == ZAddress, "You are already registered");    // Проверка: если человек, который вызвал функцию, уже зарегистрирован, то его регистрировать не нужно дальше функция выполняться не будет.
        users.push(user(users.length, _FIO, msg.sender, 0));    // Внесение данных в массив пользователей
        usersMap[msg.sender].userID = users.length - 1;         // Автоматическое внесение ID пользователя в маппинг пользователей
        usersMap[msg.sender].FIO = _FIO;                        // Автоматическое внесение ФИО в маппинг пользователей
        usersMap[msg.sender].userAddress = msg.sender;          // Автоматическое внесение адреса пользователя, который вызвал функцию в маппинг пользователей
        usersMap[msg.sender].role = 0;                          // Выдача роли пользователя в маппинге пользователей
        drivers.push(driver(usersMap[msg.sender].userID, "null", 0, 0, 0, 0, 0, ZAddress, false)); //создается пустая запись для данного пользователя в массиве водителей. Это необходимо для последующего создания профиля водителя.
        DPSofficers.push(DPSofficer(usersMap[msg.sender].userID, "null", ZAddress));    //создается пустая запись для данного пользователя в массиве сотрудников.
    }

    function getUserInfo() public view returns (uint, string memory, address, uint) {   // Функция для просмотра своих данных пользователя (в будущем может не понадобиться)
        require(usersMap[msg.sender].userAddress == msg.sender, "You are not registered");  // Проверка: вызывает ли функцию зарегистрированный пользователь
        return(usersMap[msg.sender].userID, usersMap[msg.sender].FIO, usersMap[msg.sender].userAddress, usersMap[msg.sender].role); // Возврат данных
    }

    function regDriverProfile(uint _expStartYear) public {  // Функция регистрации водительского профиля. Необходимо ввести год начала водительского стажа
        require(usersMap[msg.sender].role == 0, "You are not in User mode");    // Проверка: находится ли пользователь, вызывающий функцию, в режиме пользователя
        require(drivers[usersMap[msg.sender].userID].driverAddress != usersMap[msg.sender].userAddress, "You have already registered a driver profile");    // Проверка: зарегистрировал ли уже пользователь, вызывающий функцию, свой водительский профиль
        drivers[usersMap[msg.sender].userID].FIO = usersMap[msg.sender].FIO;    // Внесение ФИО в маппинг пользователей
        drivers[usersMap[msg.sender].userID].expStartYear = _expStartYear;      // Внесение года начала водительского стажа в маппинг пользователей
        drivers[usersMap[msg.sender].userID].driverAddress = usersMap[msg.sender].userAddress;  // Присваивание адреса пользователя адресу водителя (Адрес пользователя соответствует адресу водителя)
        driversLicenses.push(driversLicense(usersMap[msg.sender].userID, 0, "null", "null", ZAddress, 0, false, false));    // Создание пустой записи в массиве водительских удостоверений. Необходимо для последующих проверок при регистрации водительского удостоверения
    }

    function getDriverInfo() public view returns (uint, string memory, uint, uint, uint, uint, uint, address, bool) {   // Функиця просмотра данных своего водительского профиля (в будущем может не понадобиться)
        require(drivers[usersMap[msg.sender].userID].driverAddress == usersMap[msg.sender].userAddress, "You have not registered a driver profile");
        return (drivers[usersMap[msg.sender].userID].userID,
        drivers[usersMap[msg.sender].userID].FIO,
        drivers[usersMap[msg.sender].userID].licenseNumber,
        drivers[usersMap[msg.sender].userID].expStartYear,
        drivers[usersMap[msg.sender].userID].DTPcount,
        drivers[usersMap[msg.sender].userID].unpayedFines,
        drivers[usersMap[msg.sender].userID].balance,
        drivers[usersMap[msg.sender].userID].driverAddress,
        drivers[usersMap[msg.sender].userID].insuranceStatus);
    }

    function getDriversForDPS() public view InDPSmode returns (uint, string memory, uint, uint, uint, uint, uint, address, bool) {    // Функция просмотра водителей (можно вызвать только в режиме ДПС)
        for(uint i = 0; i <= drivers.length; i++) {
            return (drivers[i].userID, drivers[i].FIO, drivers[i].licenseNumber, drivers[i].expStartYear, drivers[i].DTPcount, drivers[i].unpayedFines, drivers[i].balance, drivers[i].driverAddress, drivers[i].insuranceStatus);
        }
    }

    function regDPSofficerProfile(uint _userID) public IsAdmin {    // Функция регистрации сотрудника ДПС (может вызвать только админ)
        require(DPSofficers[_userID].officerAddress == ZAddress, "DPS officer is already registered");  // Проверка: зарегистрирован ли уже сотрудник
        DPSofficers[_userID].FIO = users[_userID].FIO;  // Внесение ФИО в массив сотрудников ДПС
        DPSofficers[_userID].officerAddress = users[_userID].userAddress;   // Присваивание адреса пользователя адресу сотрудника (адрес пользователя соответствует адресу сотрудника)
    }

    function userMode() public {    // Функция активации режима пользователя
        require(usersMap[msg.sender].userAddress == msg.sender, "You have not registered");
        require(usersMap[msg.sender].role != 0, "You are already in User mode");
        users[usersMap[msg.sender].userID].role = 0;
        usersMap[msg.sender].role = 0;
    }

    function driverMode() public {  // Функция активации режима водителя
        require(drivers[usersMap[msg.sender].userID].driverAddress == usersMap[msg.sender].userAddress, "You have not registered a driver profile");
        require(usersMap[msg.sender].role != 1, "You are already in Driver mode");
        users[usersMap[msg.sender].userID].role = 1;
        usersMap[msg.sender].role = 1;
    }

    function DPSmode() public { // Функция активации режима сотрудника ДПС
        require(DPSofficers[usersMap[msg.sender].userID].officerAddress == usersMap[msg.sender].userAddress, "You are not DPS officer");
        require(usersMap[msg.sender].role != 2, "You are already in DPS mode");
        users[usersMap[msg.sender].userID].role = 2;
        usersMap[msg.sender].role = 2;
    }

    function regDriversLicense(uint _number, string memory _validTime, string memory _categoryLetter) public InDriverMode { // Функция регистрации водительского удостоверения (можно вызвать только в режиме водителя)
        require(_number != driversLicenses[usersMap[msg.sender].userID].number, "License with this number is already registered");
        //require(_categoryLetter == "A", "Category does not exist"); // Категория существует (Будет реализовано в интерфейсе)
        driversLicenses[usersMap[msg.sender].userID].number = _number;
        driversLicenses[usersMap[msg.sender].userID].validTime = _validTime;
        driversLicenses[usersMap[msg.sender].userID].category = _categoryLetter;
        driversLicenses[usersMap[msg.sender].userID].ownerAddress = msg.sender;
    }

    function getDriversLicenses() public view InDPSmode returns (uint, uint, string memory, string memory, address, bool, bool) {  // Функция просмотра всех зарегистрированных водительских удостоверений (можно вызвать только в режиме ДПС). Сотрудник ДПС смотрит все заявки на регистрацию и подтверждает удостоверения по ID.
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
        require(driversLicenses[usersMap[msg.sender].userID].ownerAddress == msg.sender, "You don't have a drivers license");
        require(driversLicenses[usersMap[msg.sender].userID].active == true, "License is not active");
        require(block.timestamp > driversLicenses[usersMap[msg.sender].userID].activeTo - 5*30, "Too early to expand");
        driversLicenses[usersMap[msg.sender].userID].activeTo = block.timestamp + 365*10*5;
    }

    function deactivateDriversLicense(uint _ownerID) public InDPSmode { // Функция деактивации водительского удостоверения (можно вызвать только в режиме ДПС)
        require(block.timestamp > driversLicenses[_ownerID].activeTo, "Too early to deactivate");
        driversLicenses[_ownerID].active = false;
    }

    function registerVehicle(string memory _categoryLetter, uint _periodOfUse, uint _marketValue) public InDriverMode { // Функция регистрации транспортного средства (можно вызвать только в режиме водителя)
        require(driversLicenses[usersMap[msg.sender].userID].verified == true, "License is not verified");
        vehicles.push(vehicle(vehicles.length, usersMap[msg.sender].userID, _categoryLetter, _periodOfUse, _marketValue, false, false));
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
        require(vehicles[usersMap[msg.sender].userID].ownerID == usersMap[msg.sender].userID);
        for(uint i = 0; i <= vehicles.length; i++) {
            return(vehicles[i].vehicleID, vehicles[i].ownerID, vehicles[i].category, vehicles[i].periodOfUse, vehicles[i].marketValue, vehicles[i].verified);
        }
    }

    function requestInsurance(string memory _FIO, uint _vehicleID) public InDriverMode {   // Функция на оформление запроса на страховку (можно вызвать только в режиме водителя)
        require(driversLicenses[usersMap[msg.sender].userID].active == true, "Drivers license is not active");
        require(drivers[usersMap[msg.sender].userID].insuranceStatus == false, "You have already payed an insurance fee");
        require(vehicles[_vehicleID].ownerID == usersMap[msg.sender].userID);
        require(vehicles[_vehicleID].verified == true);
        insuranceRequests.push(insuranceRequest(insuranceRequests.length, usersMap[msg.sender].userID, _FIO, _vehicleID, 0, usersMap[msg.sender].userAddress, false, false));
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
        drivers[usersMap[msg.sender].userID].balance = drivers[usersMap[msg.sender].userID].balance - insuranceRequests[_requestID].insuranceFee;
        insuranceRequests[_requestID].readyToPay = false;
        insuranceRequests[_requestID].payStatus = true;
        drivers[usersMap[msg.sender].userID].insuranceStatus = true;
    }

    function registerDTP(uint _victimID, string memory _DTPdate) public InDPSmode { // Функция регистрации ДТП (можно вызвать только в режиме ДПС)
        DTPs.push(DTP(DTPs.length, _victimID, drivers[_victimID].licenseNumber, _DTPdate, false, false));
    }


    function getDTPsForDriver() public view InDriverMode returns(uint, uint, uint, string memory, bool) {    // Функция просмотра ДТП для водителя, вызывающего функцию (можно вызвать только в режиме водителя)
        for(uint i = 0; i <= DTPs.length; i++) {
            require(DTPs[i].victimLicenseNumber == drivers[usersMap[msg.sender].userID].licenseNumber);
            return(DTPs[i].DTPid, DTPs[i].victimID, DTPs[i].victimLicenseNumber, DTPs[i].DTPdate, DTPs[i].confirmed);
        }
    }

    function confirmDTP(uint _DTPid) public InDriverMode {  // Функция подтверждения факта ДТП водителем (можно вызвать только в режиме водителя)
        require(DTPs[_DTPid].victimLicenseNumber == drivers[usersMap[msg.sender].userID].licenseNumber, "Drivers license check error");
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
            require(fines[i].driverID == usersMap[msg.sender].userID);
            return(fines[i].fineID, fines[i].driverID, fines[i].fineDateInSec, fines[i].payStatus);
        }
    }

    function payFine(uint _fineID) public InDriverMode {    // Функция оплаты штрафа (можно вызвать только в режиме водителя)
        require(fines[_fineID].driverID == usersMap[msg.sender].userID, "That's not your fine");
        if(block.timestamp > fines[_fineID].fineDateInSec + 5*5) {
            insurance.transfer(10);
        }
        else {
            insurance.transfer(5);
        }
    }

}