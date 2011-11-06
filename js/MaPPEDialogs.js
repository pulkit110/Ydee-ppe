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
			//type: 'json'
			//data   : ownerData,
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
				//defaultType: 'textfield',
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
					//value: 'GB',
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
			//url : 'http://demo.ma-ppe.ch/YAjax.Test-SetLanguage',
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