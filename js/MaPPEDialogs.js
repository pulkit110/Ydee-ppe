Ext.ns('MaPPE');

Ext.apply(Ext.form.VTypes, {
    password : function(val, field) {
        if (field.initialPassField) {
            var pwd = Ext.getCmp(field.initialPassField);
            return (val == pwd.getValue());
        }
        return true;
    },

    passwordText : 'Passwords do not match.'
});

MaPPE.changePasswordDlg = Ext.extend(Ext.FormPanel, {

	// Translatable strings...
	title: 'Change Password',
	ok: 'Ok',
	cancel: 'Cancel',
	currentPassword: 'Current password',
	newPassword: 'New password',
	confirmNewPassword: 'Confirm new password',
	
	//Options
	noDirectEntry : true,
	building: false,

	//config options
	owners:null,
	user:null,
	otherContacts:null,
	mailSender:null,

	initComponent: function() {

		// Set default values to optional parameters of the configuration
		Ext.applyIf(this.initialConfig, {
		});

		// Prepare config
		var config = {
			title: this.title,		
			layout: 'fit',
			frame: true,
			bodyStyle: 'padding:10px 5px 5px;',
			defailtType: 'textfield',
			bbar: {
				items: [
				'->',{
					width: 65,
					xtype: 'button',
					text: this.ok
					//handler: sendMail
				},
				' ',{
					width: 65,
					xtype: 'button',
					text: this.cancel
					//handler: clearForm
				}]
			},

			items: {
				baseCls: 'x-plain',
				layout:'form',
				border: true,
				defaultType: 'textfield',
				items: [{
					fieldLabel: this.currentPassword,
					xType: 'textfield',
					border : false,
					inputType: 'password',									
					anchor : '100%'
				},{
					fieldLabel: this.newPassword,
					id: 'passwd',
					xType: 'textfield',
					border : false,					
					inputType: 'password',					
					anchor : '100%'
				},{
					fieldLabel: this.confirmNewPassword,
					initialPassField: 'passwd',
					xType: 'textfield',
					border : false,
					inputType: 'password',
					vtype : 'password',
					anchor : '100%'
				}]
			}

		};

		// Apply config and call base class
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		MaPPE.changePasswordDlg.superclass.initComponent.apply(this, arguments);
	},
});

MaPPE.lostPasswordDlg = Ext.extend(Ext.FormPanel, {

	// Translatable strings...
	title: 'Lost Password',
	lostPasswd: 'Lost password',
	lostEmptyText: 'Email',
	ok: 'Ok',
	cancel: 'Cancel',
	email: 'Enter Email-id',

	//config options
	owners:null,
	user:null,
	otherContacts:null,
	mailSender:null,

	initComponent: function() {

		// Set default values to optional parameters of the configuration
		Ext.applyIf(this.initialConfig, {
		});

		// Prepare config
		var config = {
			title: this.title,
			cls: 'lost-password-form',
			layout: 'fit',
			frame: true,
			bodyStyle: 'padding:10px 5px 5px;',
			defailtType: 'textfield',
			bbar: {
				items: [
				'->',{
					width: 65,
					xtype: 'button',
					text: this.ok
					//handler: sendMail
				},
				' ',{
					width: 65,
					xtype: 'button',
					text: this.cancel
					//handler: clearForm
				}]
			},

			items: [{
				fieldLabel: this.oldPassword,
				xType: 'textfield',
				border : false,
				vtype : 'email',
				emptyText : this.lostEmtptyText,
				anchor : '100%',
				allowBlank : false
			}]
		};

		// Apply config and call base class
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		MaPPE.changePasswordDlg.superclass.initComponent.apply(this, arguments);
	},
});

MaPPE.selectLanguageDlg = Ext.extend(Ext.FormPanel, {

	// Translatable strings...
	title: 'Select Language',
	ok: 'Ok',
	cancel: 'Cancel',

	//config options
	owners:null,
	user:null,
	otherContacts:null,
	mailSender:null,

	initComponent: function() {

		// Set default values to optional parameters of the configuration
		Ext.applyIf(this.initialConfig, {
		});

		// Prepare config
		var config = {
			title: this.title,
			cls: 'lost-password-form',
			layout: 'fit',
			frame: true,
			bodyStyle: 'padding:10px 5px 5px;',
			defailtType: 'textfield',
			bbar: {
				items: [
				'->',{
					width: 65,
					xtype: 'button',
					text: this.ok
					//handler: sendMail
				},
				' ',{
					width: 65,
					xtype: 'button',
					text: this.cancel
					//handler: clearForm
				}]
			},

			items: [{
				xtype:"combo",
				store : langStore,
				mode : 'local',
				//forceSelection : true,
				//allowBlank : false,
				fieldLabel : 'Select a Language',
				//resizable : true,
				//name : 'sources',
				//anchor : '85%',
				displayField : 'sources',
				emptyText : 'Select a Source',
				//valueField : 'id',
				listeners : {
					select : function(f, record, index) {
						selectLanguagePage();
					}
				}
			}]
		};

		// Apply config and call base class
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		MaPPE.changePasswordDlg.superclass.initComponent.apply(this, arguments);
	},
});

MaPPE.changePersonalInfoDlg = Ext.extend(Ext.FormPanel, {

	// Translatable strings...
	title: 'Update Personal Information',
	ok: 'Ok',
	cancel: 'Cancel',

	//config options
	owners:null,
	user:null,
	otherContacts:null,
	mailSender:null,

	initComponent: function() {

		// Set default values to optional parameters of the configuration
		Ext.applyIf(this.initialConfig, {
		});

		// Prepare config
		var config = {
			title: this.title,
			cls: 'lost-password-form',
			layout: 'fit',
			frame: true,
			bodyStyle: 'padding:10px 5px 5px;',
			defailtType: 'textfield',
			bbar: {
				items: [
				'->',{
					width: 65,
					xtype: 'button',
					text: this.ok
					//handler: sendMail
				},
				' ',{
					width: 65,
					xtype: 'button',
					text: this.cancel
					//handler: clearForm
				}]
			},

			items: [{
				xtype:"combo",
				store : langStore,
				mode : 'local',
				//forceSelection : true,
				//allowBlank : false,
				fieldLabel : 'Select a Language',
				//resizable : true,
				//name : 'sources',
				//anchor : '85%',
				displayField : 'sources',
				emptyText : 'Select a Source',
				//valueField : 'id',
				listeners : {
					select : function(f, record, index) {
						selectLanguagePage();
					}
				}
			}]
		};

		// Apply config and call base class
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		MaPPE.changePasswordDlg.superclass.initComponent.apply(this, arguments);
	},
});