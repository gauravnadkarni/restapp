const express = require('express');
const router  = express.Router();
const auth = require('../controllers/auth');
const rbac = require('../controllers/rbac');
const resourceModel = require('../database/models').Resources;
const permissionModel = require('../database/models').Permissions;
const roleModel = require('../database/models').Roles;
const { check } = require('express-validator/check');


/* POST login. */
router.post('/login', [ check('email').isEmail().withMessage('Invalid email supplied'),
                        check('password').isLength({min:6,max:10}).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/, "i").withMessage('Invalid password supplied')
                    ],auth.login);
router.post('/token', [check('refreshToken').not().isEmpty().withMessage('Refresh token is not supplied')],auth.refreshToken);

router.get('/roles/:id([0-9]+)/acl', [],rbac.getRbacMappingByRole);
router.delete('/roles/:id([0-9]+)/acl', [],rbac.deleteRbacMapping);
router.post('/roles/:id([0-9]+)/acl', [
                                        check('roleId').not().isEmpty().withMessage('roleId is required').custom(value => {
                                            return roleModel.findOne({where:{roleId:value}}).then((record) => {
                                            if(!record) 
                                                return Promise.reject('Valid roleId is required');
                                            });
                                        }),
                                        check('permissionId').not().isEmpty().withMessage('permissionId is required').custom(value => {
                                            return permissionModel.findOne({where:{permissionId:value}}).then((record) => {
                                                if(!record) 
                                                    return Promise.reject('Valid permissionId is required');
                                            });
                                        }),
                                        check('resourceId').not().isEmpty().withMessage('resourceId is required').custom(value => {
                                            return resourceModel.findOne({where:{resourceId:value}}).then((record) => {
                                                if(!record) 
                                                    return Promise.reject('Valid resourceId is required');
                                            });
                                        })
],rbac.setRbacMapping);
module.exports = router;

