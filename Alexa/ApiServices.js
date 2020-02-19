const Axios = require('axios');

const isNewUser =  async (id) => {
    return await Axios.get('http://35.233.100.128:8080/user?deviceId=' + id)
        .then(response => {
            return response.status !== 200;
        })
        .catch(error => {
            return true;
        })
};
const addNewUser =  async (id) => {
    return await Axios.post('http://35.233.100.128:8080/user/add?deviceId=' + id,{deviceId: id})
        .then(response => {
            return response.status === 200;
        })
        .catch(error => {
            return false;
        })
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

const isConfigEnded =  async (id) => {
    return await Axios.get('http://35.233.100.128:8080/user/config?deviceId=' + id)
        .then(response => {
            return response.status === 200;
        })
        .catch(error => {
            return false;
        })
};

//Helper Functions ============================================================================

function getSlotValues(filledSlots) {
    const slotValues = {};

    console.log(`The filled slots: ${JSON.stringify(filledSlots)}`);
    Object.keys(filledSlots).forEach((item) => {
        const name = filledSlots[item].name;

        if (filledSlots[item] &&
            filledSlots[item].resolutions &&
            filledSlots[item].resolutions.resolutionsPerAuthority[0] &&
            filledSlots[item].resolutions.resolutionsPerAuthority[0].status &&
            filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code) {
            switch (filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code) {
                case 'ER_SUCCESS_MATCH':
                    slotValues[name] = {
                        synonym: filledSlots[item].value,
                        resolved: filledSlots[item].resolutions.resolutionsPerAuthority[0].values[0].value.name,
                        isValidated: true,
                    };
                    break;
                case 'ER_SUCCESS_NO_MATCH':
                    slotValues[name] = {
                        synonym: filledSlots[item].value,
                        resolved: filledSlots[item].value,
                        isValidated: false,
                    };
                    break;
                default:
                    break;
            }
        } else {
            slotValues[name] = {
                synonym: filledSlots[item].value,
                resolved: filledSlots[item].value,
                isValidated: false,
            };
        }
    }, this);

    return slotValues;
}
module.exports = {
    addNewUser,
    checkAndAddNewUser,
    isNewUser,
    isConfigEnded,
    addUserOrCheckConfigEnded,
    getSlotValues
};