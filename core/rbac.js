let role = require('./role');
let permission = require('./permission');
let resource = require('./resource');
let rbacObj = require('../database/models').Rbac;
let {Rbac} = require('../database/models');
let logger = require('../utilities/logger');

module.exports = {
    setRbacMapping : async (data) => {
        console.log(data);
        let roleObj = await role.getRoleById(data.roleId);
        let permissionObj = await permission.getPermissionById(data.permissionId);
        let resourceObj = await resource.getResourceById(data.resourceId);

        let rbacObj = Rbac.build({});
        rbacObj.setPermission(permissionObj, {save: false});
        rbacObj.setRole(roleObj, {save: false});
        rbacObj.setResource(resourceObj, {save: false});
        return rbacObj.save(); 
    },
    deleteRbacMapping : async (data) => {
        let roleObj = await role.getRoleById(data.roleId);
        let permissionObj = await permission.getPermissionById(data.permissionId);
        let resourceObj = await resource.getResourceById(data.resourceId);
        return rbacObj.findOne({where : {roleId : roleObj.get("id"),permissionId : permissionObj.get("id"),resourceId : resourceObj.get("id")}}).then((rback)=>{
            return rback.destroy();
        });
    },
    getRbacMappingsByRole : async (data) => {
        let roleObj = await role.getRoleById(data.roleId);
        return rbacObj.findAll({where : {roleId : roleObj.get("id")},include: [{all: true}]});
    }
};