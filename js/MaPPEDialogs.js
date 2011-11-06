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
	ok: 'Ok',
	cancel: 'Cancel',
	emailId: 'E-mail Address',
	message: 'In order to receive a new password, please enter your email address below and press OK</br></br>',

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
					xtype: 'box',
					autoEl: {
						cn: this.message
					}
				},{
					fieldLabel: this.emailId,
					xType: 'textfield',
					border : false,
					vtype : 'email',
					anchor : '100%'
				}]
			}
		};

		// Apply config and call base class
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		MaPPE.changePasswordDlg.superclass.initComponent.apply(this, arguments);
	},
});

MaPPE.selectLangDlg = Ext.extend(Ext.FormPanel, {

	// Translatable strings...
	title: 'Select Language',
	ok: 'Ok',
	cancel: 'Cancel',
	lang:'Language',
	message: 'Select your Language</br></br>',
	fieldLabel:'Language',
	errorMessage:'An unexpected error occured! Please try again later!',

	initComponent: function() {

		// Set default values to optional parameters of the configuration
		Ext.applyIf(this.initialConfig, {
		});

		/*var languageDataStore = new Ext.data.Store({
		proxy: new Ext.data.ScriptTagProxy({
		url: 'http://pulkitgoyal.in/Language.php'
		}),
		reader: new Ext.data.JsonReader({
		root: "languages",
		fields: [{
		name: 'language',
		mapping: 'language',
		type: 'string'
		}]
		})
		});*/

		// create the data store
		var languageDataStore = new Ext.data.JsonStore({
			root: "languages",
			fields: [{
				name: 'language',
				mapping: 'language',
				type: 'string'
			}]
		});

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
				items: [
				// {
				// xtype: 'box',
				// autoEl: {
				// cn: this.message
				// }
				// },
				{
					xtype: 'combo',
					id: 'languageCombo',
					fieldLabel: this.fieldLabel,
					store: languageDataStore,
					displayField: 'language',
					selectOnFocus: true,
					mode: 'local',
					triggerAction: 'all',
					listeners: {
						select: {
							fn: function(combo, value) {
								//alert(value.json.language);
								Ext.Ajax.request({
									//url : 'http://demo.ma-ppe.ch/YAjax.Test-SetLanguage',
									url : 'server/test.php',
									method : 'GET',
									params : {
										language : value.json.language
									},
									scope : this,

									success : function(response) {
										if (response.responseText == "") {

										} else {
											alert(response.responseText);
										}
									},
									failure: function (response) {
										alert(this.errorMessage);
									}
								});
							}
						}
					}
				}]
			}
		};

		Ext.Ajax.request({
			//url : 'http://demo.ma-ppe.ch/YAjax.Test-GetLanguage'
			autoLoad: true,
			url : 'server/getLanguage.php',
			method : 'GET',

			scope : this,

			success : function(response) {
				languageDataStore.loadData(Ext.decode(response.responseText));
				Ext.getCmp('languageCombo').setValue(Ext.decode(response.responseText).current);
			},
			failure: function (response) {
				alert(this.errorMessage);
			}
		});

		// Apply config and call base class
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		MaPPE.changePasswordDlg.superclass.initComponent.apply(this, arguments);
	},
});

MaPPE.personalInfoDlg = Ext.extend(Ext.FormPanel, {

	// Translatable strings...
	title: 'Update personal information',
	ok: 'Ok',
	cancel: 'Cancel',
	message: 'Update your personal information</br></br>',
	errorMessage:'An unexpected error occured! Please try again later!',

	labelFirstName:'First Name',
	labelLastName:'Last Name',
	labelAddress:'Address',
	labelZip: 'Zip',
	labelCity:'City',
	labelPhonePrivate:'Private Phone#',
	labelPhoneProfessionals:'Professional Phone#',
	labelMobile:'Mobile#',
	labelFax:'Fax',
	labelEmailId:'Email Address',

	initComponent: function() {

		// Set default values to optional parameters of the configuration
		Ext.applyIf(this.initialConfig, {
		});

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
					text: this.ok,
					handler: updateInfo
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
					xtype: 'box',
					autoEl: {
						cn: this.message
					}
				},{
					id : 'firstname',
					fieldLabel: this.labelFirstName,
					xType: 'textfield',
					border : false,
					anchor : '100%'
				},{
					id : 'lastname',
					fieldLabel: this.labelLastName,
					xType: 'textfield',
					border : false,
					anchor : '100%'
				},{
					id : 'address',
					fieldLabel: this.labelAddress,
					xType: 'textfield',
					border : false,
					anchor : '100%'
				},{
					id : 'zip',
					fieldLabel: this.labelZip,
					xType: 'textfield',
					border : false,
					anchor : '100%'
				},{
					id : 'city',
					fieldLabel: this.labelCity,
					xType: 'textfield',
					border : false,
					anchor : '100%'
				},{
					id : 'private',
					fieldLabel: this.labelPhonePrivate,
					xType: 'textfield',
					border : false,
					anchor : '100%'
				},{
					id : 'professional',
					fieldLabel: this.labelPhoneProfessionals,
					xType: 'textfield',
					border : false,
					anchor : '100%'
				},{
					id : 'mobile',
					fieldLabel: this.labelMobile,
					xType: 'textfield',
					border : false,
					anchor : '100%'
				},{
					id : 'fax',
					fieldLabel: this.labelFax,
					xType: 'textfield',
					border : false,
					anchor : '100%'
				},{
					id : 'email',
					fieldLabel: this.labelEmailId,
					xType: 'textfield',
					border : false,
					vtype :'email',
					anchor : '100%'
				}]
			}
		};

		Ext.Ajax.request({
			//url : 'https://demo.ma-ppe.ch/YAjax.Test-GetPersonalData'
			autoLoad: true,
			url : 'server/personalInfo.php',
			method : 'GET',

			scope : this,

			success : function(response) {
				Ext.getCmp('address').setValue(Ext.decode(response.responseText).address);
				Ext.getCmp('city').setValue(Ext.decode(response.responseText).city);
				Ext.getCmp('email').setValue(Ext.decode(response.responseText).email);
				Ext.getCmp('fax').setValue(Ext.decode(response.responseText).fax);
				Ext.getCmp('firstname').setValue(Ext.decode(response.responseText).firstName);
				Ext.getCmp('lastname').setValue(Ext.decode(response.responseText).lastName);
				Ext.getCmp('mobile').setValue(Ext.decode(response.responseText).mobile);
				Ext.getCmp('private').setValue(Ext.decode(response.responseText).phonePrivate);
				Ext.getCmp('professional').setValue(Ext.decode(response.responseText).phoneProfessional);
				Ext.getCmp('zip').setValue(Ext.decode(response.responseText).zip);
			},
			failure: function (response) {
				alert(this.errorMessage);
			}
		});

		function updateInfo (btn) {
			Ext.Ajax.request({
				//url : 'http://demo.ma-ppe.ch/YAjax.Test-SetPersonalData'
				autoLoad: true,
				url : 'server/test.php',
				method : 'GET',
				params : {
					firstName 	: Ext.getCmp('firstname').getValue(),
					lastName 	: Ext.getCmp('lastname').getValue(),
					address 	: Ext.getCmp('address').getValue(),
					zip			: Ext.getCmp('zip').getValue(),
					city		: Ext.getCmp('city').getValue(),
					privatePhone: Ext.getCmp('private').getValue(),
					mobile		: Ext.getCmp('mobile').getValue(),
					fax			: Ext.getCmp('fax').getValue(),
					email		: Ext.getCmp('email').getValue(),
					professionalPhone	: Ext.getCmp('professional').getValue()
				},
				scope : this,

				success : function(response) {
					if (response.responseText == "") {

					} else {
						alert(response.responseText);
					}
				},
				failure: function (response) {
					alert(this.errorMessage);
				}
			});
		}

		// Apply config and call base class
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		MaPPE.changePasswordDlg.superclass.initComponent.apply(this, arguments);
	},
});