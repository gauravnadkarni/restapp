const express = require('express');
const router  = express.Router();
const auth = require('../controllers/auth');
const rbac = require('../controllers/rbac');
const resourceModel = require('../database/models').Resources;
const permissionModel = require('../database/models').Permissions;
const roleModel = require('../database/models').Roles;
const rbacModel = require('../database/models').Rbac;
const { check } = require('express-validator/check');


/* POST login. */
router.post('/login', [ check('email').isEmail().withMessage('Invalid email supplied'),
                        check('password').isLength({min:6,max:10}).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/, "i").withMessage('Invalid password supplied')
                    ],auth.login);
router.post('/token', [check('refreshToken').not().isEmpty().withMessage('Refresh token is not supplied')],auth.refreshToken);

router.get('/roles/:id([0-9]+)/acl', [check().custom((value, {req} )=> {
                                        if(!("id" in req.params) || req.params.id === "undefined")
                                            return Promise.reject('Invalid roleId supplied');
                                            
                                        return roleModel.findOne({where:{id:req.params.id}}).then((record) => {
                                        if(!record) 
                                            return Promise.reject('Valid roleId is required');
                                        });
                                    })
],rbac.getRbacMappingByRole);
router.delete('/roles/:roleId([0-9]+)/permissions/:permissionId([0-9]+)/resources/:resourceId([0-9]+)/acl', [ 
                        check().custom((value,{req} )=> {
                            if((!("roleId" in req.params) || req.params.roleId === "undefined") ||
                                (!("permissionId" in req.params) || req.params.permissionId === "undefined") ||
                                (!("resourceId" in req.params) || req.params.resourceId === "undefined")
                            ) {
                                return Promise.reject('Invalid acl mapping supplied');
                            }

                            return rbacModel.findOne({where:{roleId:req.params.roleId,permissionId:req.params.permissionId,resourceId:req.params.resourceId}}).then((record) => {
                                if(!record) 
                                    return Promise.reject('Acl mapping doesn\'t exists');
                            });
                        })
],rbac.deleteRbacMapping);
router.post('/roles/:id([0-9]+)/acl', [
                                        check('id').not().isEmpty().withMessage('roleId is required').custom(value => {
                                            return roleModel.findOne({where:{id:value}}).then((record) => {
                                            if(!record) 
                                                return Promise.reject('Valid roleId is required');
                                            });
                                        }),
                                        check('permissionId').not().isEmpty().withMessage('permissionId is required').custom(value => {
                                            return permissionModel.findOne({where:{id:value}}).then((record) => {
                                                if(!record) 
                                                    return Promise.reject('Valid permissionId is required');
                                            });
                                        }),
                                        check('resourceId').not().isEmpty().withMessage('resourceId is required').custom(value => {
                                            return resourceModel.findOne({where:{id:value}}).then((record) => {
                                                if(!record) 
                                                    return Promise.reject('Valid resourceId is required');
                                            });
                                        }),
                                        check().custom((value,{req} )=> {
                                            if((!("id" in req.params) || req.params.id === "undefined") ||
                                                (!("permissionId" in req.body) || req.body.permissionId === "undefined") ||
                                                (!("resourceId" in req.body) || req.body.resourceId === "undefined")
                                            ) {
                                                return Promise.reject('Invalid acl mapping supplied');
                                            }

                                            return rbacModel.findOne({where:{roleId:req.params.id,permissionId:req.body.permissionId,resourceId:req.body.resourceId}}).then((record) => {
                                                if(record) 
                                                    return Promise.reject('Acl mapping already exists');
                                            });
                                        })
],rbac.setRbacMapping);
module.exports = router;

