const Axios = require('axios');

const isNewUser =  async (id) => {
    return await Axios.get('http://35.233.100.128:8080/user?deviceId=' + id)
        .then(response => {
            return response.status !== 200;
        })
        .catch(error => {
            return true;
        });
};
const addNewUser =  async (id) => {
    return await Axios.post('http://35.233.100.128:8080/user/add?deviceId=' + id,{deviceId: id})
        .then(response => {
            return response.status === 200;
        })
        .catch(error => {
            return false;
        });
};
const checkAndAddNewUser = async (id) => {

    return await isNewUser(id).then(r => {
        if(r)
            return addNewUser(id)
                .then(re =>{
                    return re || false;
                }).catch(error => {return false});
        return false;
    }).catch(error => {return false});
};
const addUserOrCheckConfigEnded = async (id) =>{
    let checkAdd = await checkAndAddNewUser(id);
    let isConfigFin = false;
    if (!checkAdd)
        isConfigFin = await isConfigEnded(id);
    return  isConfigFin;
};
const saveNewHouseWithRooms = async (id,nbPieces,pieces) =>{
    return await Axios.post('http://35.233.100.128:8080/config/save?deviceId=' + id+'&nbPiece='+nbPieces,pieces)
        .then(res => {return res.status === 200}).catch(reason => {return false});
};
const saveNewHouseWithoutRooms = async (id, nbPiece) => {
    return await Axios.post('http://35.233.100.128:8080/config/house/save?deviceId=' + id+'&nbPiece='+nbPiece)
        .then(res => {return res.status === 200}).catch(reason => {return false});
};
const saveNewHouse = async (id, nbPiece) => {
    return await Axios.post('http://35.233.100.128:8080/config/house/save?deviceId=' + id+'&nbPiece='+nbPiece)
        .then(res => {return res.status === 200}).catch(reason => {return false});
};
const saveNewRooms= async (id, pieces) => {
    return await Axios.post('http://35.233.100.128:8080/config/rooms/save?deviceId=' + id,pieces)
        .then(res => {return res.status === 200}).catch(reason => {return false});
};
const isConfigEnded =  async (id) => {
    return await Axios.get('http://35.233.100.128:8080/user/config?deviceId=' + id)
        .then(response => {
            return response.status === 200;
        })
        .catch(error => {
            return false;
        });
};

//get resolved value
const getSlotResolved = (mySlot) =>{
    if (mySlot.resolutions !== undefined)
        return mySlot.resolutions.resolutionsPerAuthority[0].values[0].value.name;
    else
    return null;

};
module.exports = {
    addNewUser,
    checkAndAddNewUser,
    isNewUser,
    isConfigEnded,
    addUserOrCheckConfigEnded,
    saveNewHouse,
    saveNewRooms,
    saveNewHouseWithRooms,
    getSlotResolved,
    saveNewHouseWithoutRooms
};