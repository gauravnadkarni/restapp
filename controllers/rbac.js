let rbacHandler = require('../core/rbac');
const { validationResult } = require('express-validator/check');

module.exports = {
    setRbacMapping : (req,res,next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.useFirstErrorOnly().array() });
        }
        rbacHandler.setRbacMapping({roleId : parseInt(req.params.id), permissionId : req.body.permissionId, resourceId : req.body.resourceId}).then((rbac)=>{
            return rbac.reload({include: [{all: true}]});
        }).then((syncedRbac)=>{
            res.status(201);
            res.json({message:'Rbac mapping created successfully',syncedRbac});
        }).catch((err)=>{
            console.log(err.message);
            res.status(500);
            res.json({message:'We are facing some issues at our end'}); 
        });
    },
    deleteRbacMapping : (req,res,next) => {
        rbacHandler.deleteRbacMapping({roleId : req.params.id, permissionId : req.body.permissionId, resourceId : req.body.resourceId}).then((rbac)=>{

        }).catch((err)=>{
            
        });
    },
    getRbacMappingByRole : (req,res,next) => {
        rbacHandler.getRbacMappingsByRole({roleId : req.params.id}).then((rbac)=>{
            
        }).catch((err)=>{
            
        });
    }
}