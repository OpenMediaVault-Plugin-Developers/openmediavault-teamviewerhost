/**
 * Copyright (C) 2017-2019 OpenMediaVault Plugin Developers
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

// require("js/omv/WorkspaceManager.js")
// require("js/omv/workspace/form/Panel.js")
// require("js/omv/window/MessageBox.js")
// require("js/omv/module/admin/service/teamviewerhost/Password.js")

Ext.define('OMV.module.admin.service.teamviewerhost.Settings', {
    extend: 'OMV.workspace.form.Panel',
    requires: [
        'OMV.module.admin.service.teamviewerhost.Password'
    ],

    rpcService: 'TeamviewerHost',
    rpcGetMethod: 'getSettings',
    rpcSetMethod: 'setSettings',

    getButtonItems: function() {
        var items = this.callParent(arguments);

        items.push({
            id: this.getId() + '-reset-password',
            xtype: 'button',
            text: _('Reset Password'),
            icon: 'images/wrench.png',
            iconCls: Ext.baseCSSPrefix + 'btn-icon-16x16',
            scope: this,
            handler: Ext.Function.bind(this.onResetPasswordButton, this)
        });

        return items;
    },

    getFormItems: function() {
        return [{
            xtype: 'fieldset',
            title: 'General settings',
            defaults: {
                labelSeparator: ''
            },
            items: [{
                xtype: 'checkbox',
                name: 'enable',
                fieldLabel: _('Enable'),
                checked: false
            },{
                xtype: 'textfield',
                name: 'id',
                fieldLabel: _('ID'),
                submitValue: false,
                readOnly: true
            }]
        }];
    },

    onResetPasswordButton: function() {
        Ext.create('OMV.module.admin.service.teamviewerhost.Password', {
            title: _('Reset password.'),
            mode: 'remote',
            rpcService: 'TeamviewerHost',
            rpcSetMethod: 'doResetPassword'
        }).show();
    }
});

OMV.WorkspaceManager.registerPanel({
    id: 'settings',
    path: '/service/teamviewerhost',
    text: _('Settings'),
    position: 10,
    className: 'OMV.module.admin.service.teamviewerhost.Settings'
});
