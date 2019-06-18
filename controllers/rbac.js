let rbacHandler = require('../core/rbac');
const { validationResult } = require('express-validator/check');

module.exports = {
    setRbacMapping : (req,res,next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array({ onlyFirstError: true }) });
        }
        rbacHandler.setRbacMapping({roleId : parseInt(req.params.id), permissionId : req.body.permissionId, resourceId : req.body.resourceId}).then((rbac)=>{
            return rbac.reload({include: [{all: true}]});
        }).then((syncedRbac)=>{
            res.status(201);
            res.json({message:'Rbac mapping created successfully',syncedRbac});
        }).catch((err)=>{
            res.status(500);
            res.json({message:'We are facing some issues at our end'}); 
        });
    },
    deleteRbacMapping : (req,res,next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array({ onlyFirstError: true }) });
        }
        console.log(req.params);
        rbacHandler.deleteRbacMapping({roleId : parseInt(req.params.roleId), permissionId : parseInt(req.params.permissionId), resourceId : parseInt(req.params.resourceId)}).then((rbac)=>{
            res.status(204);
            res.send();
        }).catch((err)=>{
            res.status(500);
            res.json({message:'We are facing some issues at our end'}); 
        });
    },
    getRbacMappingByRole : (req,res,next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array({ onlyFirstError: true }) });
        }

        rbacHandler.getRbacMappingsByRole({roleId : req.params.id}).then((rbac)=>{
            res.status(200);
            res.json({data:rbac});
        }).catch((err)=>{
            console.log(err.message);
            res.status(500);
            res.json({message:'We are facing some issues at our end'}); 
        });
    }
}