Ext.ns('MaPPE');
MaPPE.changePasswordDlg = Ext.extend(Ext.FormPanel, {

	// Translatable strings...
	title: 'Change Password',
	ok: 'Ok',
	cancel: 'Cancel',
	oldPassword: 'Enter old Password',
	confirmOldPassword: 'Confirm your old password',
	newPassword: 'Enter new password',
	cc: 'cc',
	subject: 'Subject',
	documents: 'Documents',
	keepCopy: 'Keep a Copy',
	send: 'Send',
	clear: 'Clear',

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

		// var pwd = new Ext.FormPanel({
		// labelWidth: 125,
		// frame: true,
		// title: 'Password Verification',
		// //bodyStyle:'padding:5px 5px 0',
		// width: 350,
		// defaults: {
		// width: 175,
		// inputType: 'password'
		// },
		// defaultType: 'textfield',
		// items: [{
		// fieldLabel: 'Password',
		// //name: 'pass'
		// //id: 'pass'
		// },{
		// fieldLabel: 'Confirm Password',
		// //name: 'pass-cfrm'
		// //vtype: 'password'
		// //initialPassField: 'pass' // id of the initial password field
		// }]
		// });

		// Prepare config
		var config = {
			title: this.title,
			cls: 'change-password-form',
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
					fieldLabel: this.oldPassword,
					xType: 'textfield',
					border : false,
					vtype : 'password',
					emptyText : 'Enter your old password',
					anchor : '100%',
					allowBlank : false
				},{
					fieldLabel: this.confirmOldPassword,
					xType: 'textfield',
					border : false,
					vtype : 'password',
					emptyText : 'Confirm your old password',
					anchor : '100%',
					allowBlank : false
				},{
					fieldLabel: this.newPassword,
					xType: 'textfield',
					border : false,
					vtype : 'password',
					emptyText : 'Enter new password',
					anchor : '100%',
					allowBlank : false
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