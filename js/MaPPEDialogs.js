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
	id : 'id-changepasswd',
	title: 'Change Password',
	ok: 'Ok',
	cancel: 'Cancel',
	currentPassword: 'Current password',
	newPassword: 'New password',
	confirmNewPassword: 'Confirm new password',
	passwordError: 'Passwords do not match.',

	initComponent: function() {

		// Set default values to optional parameters of the configuration
		Ext.applyIf(this.initialConfig, {
		});

		changePasswordDlg = this;

		// Prepare config
		var config = {
			id : this.id,
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
					handler: updatePassword
				},
				' ',{
					width: 65,
					xtype: 'button',
					text: this.cancel,
					handler: cancel
				}]
			},

			items: {
				baseCls: 'x-plain',
				layout:'form',
				border: true,
				defaultType: 'textfield',
				items: [{
					fieldLabel: this.currentPassword,
					id : 'curpass',
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
					id : 'passwd1',
					initialPassField: 'passwd',
					xType: 'textfield',
					border : false,
					inputType: 'password',
					vtype : 'password',
					anchor : '100%'
				}]
			}

		};

		function updatePassword (btn) {
			if (Ext.getCmp('passwd').getValue() != Ext.getCmp('passwd1').getValue()) {
				alert(changePasswordDlg.passwordError);
				return;
			}
			Ext.Ajax.request({
				//url : 'http://demo.ma-ppe.ch/YAjax.Test-SetPassword?curpass=123&pass1=abcd&pass2=abcd'
				autoLoad: true,
				url : 'server/updatePassword.php',
				method : 'GET',
				scope : this,

				params : {
					curpass 	: Ext.getCmp('curpass').getValue(),
					pass1	 	: Ext.getCmp('passwd').getValue(),
					pass2 		: Ext.getCmp('passwd1').getValue()
				},

				success : function(response) {
					if (response.responseText == "") {
					}

				},
				failure: function (response) {
					alert(this.errorMessage);
				}
			});
		}

		function cancel (btn) {
			Ext.getCmp('curpass').reset();
			Ext.getCmp('passwd').reset();
			Ext.getCmp('passwd1').reset();
			btn.ownerCt.ownerCt.collapse();
		}

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
	message: '<font size=\'2\'><b>In order to receive a new password, please enter your email address below and press OK</b></br></br>',
	emailError: 'Email Address is not correct!',

	initComponent: function() {

		// Set default values to optional parameters of the configuration
		Ext.applyIf(this.initialConfig, {
		});

		lostPasswordDlg = this;

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
					text: this.ok,
					handler: resetPasssword
				},
				' ',{
					width: 65,
					xtype: 'button',
					text: this.cancel,
					handler: cancel
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
					id : 'id-email',
					xType: 'textfield',
					border : false,
					vtype : 'email',
					anchor : '100%'
				}]
			}
		};

		function resetPasssword (btn) {
			if (!Ext.getCmp('id-email').validate()) {
				alert(lostPasswordDlg.emailError);
				return;
			}

			Ext.Ajax.request({
				//url : 'http://demo.ma-ppe.ch/YAjax.Test-LostPassword?email=test@ma-ppe.ch'
				autoLoad: true,
				url : 'server/resetPassword.php',
				method : 'GET',
				scope : this,

				params : {
					email 	: Ext.getCmp('id-email').getValue()
				},

				success : function(response) {
					if (response.responseText == "") {
					}

				},
				failure: function (response) {
					alert(this.errorMessage);
				}
			});
		}

		function cancel (btn) {
			Ext.getCmp('id-email').reset();
			btn.ownerCt.ownerCt.collapse();
		}

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
	lang: 'Language',
	message: 'Select your Language</br></br>',
	fieldLabel: 'Language',
	errorMessage: 'An unexpected error occured! Please try again later!',

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

		var selectedLangauage;

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
					handler: confirmLanguage
				},
				' ',{
					width: 65,
					xtype: 'button',
					text: this.cancel,
					handler: clearForm
				}]
			},

			items: {
				baseCls: 'x-plain',
				layout:'form',
				border: true,
				items: [{
					xtype: 'combo',
					id: 'languageCombo',
					//maxWidth: '250px',
					anchor: '100%',
					fieldLabel: this.fieldLabel,
					store: languageDataStore,
					displayField: 'language',
					selectOnFocus: true,
					mode: 'local',
					triggerAction: 'all',
					listeners: {
						select: {
							fn: function(combo, value) {
								selectedLangauage = value.json.language;
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

		function confirmLanguage (btn) {
			Ext.Ajax.request({
				//url : 'http://demo.ma-ppe.ch/YAjax.Test-SetLanguage',
				url : 'server/test.php',
				method : 'GET',
				params : {
					language : selectedLanguage
				},
				scope : this,

				success : function(response) {
					if (response.responseText == "") {
					}
				},
				failure: function (response) {
					alert(this.errorMessage);
				}
			});
		}

		function clearForm (btn) {
			btn.ownerCt.ownerCt.collapse();
		}

		// Apply config and call base class
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		MaPPE.changePasswordDlg.superclass.initComponent.apply(this, arguments);
	},
});

MaPPE.personalInfoDlg = Ext.extend(Ext.FormPanel, {

	// Translatable strings...
	title: 'Update personal information',
	update: 'Update',
	cancel: 'Cancel',
	message: '<font size=\'2\'><b>Update your personal information</br></br></b></font>',
	errorMessage: 'An unexpected error occured! Please try again later!',

	labelFirstName: 'First Name',
	labelLastName: 'Last Name',
	labelAddress: 'Address',
	labelZip: 'Zip',
	labelCity: 'City',
	labelPhonePrivate: 'Private Phone#',
	labelPhoneProfessional: 'Professional Phone#',
	labelMobile: 'Mobile#',
	labelFax: 'Fax',
	labelEmailId: 'Email Address',

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
					text: this.update,
					handler: updateInfo
				},
				' ',{
					width: 65,
					xtype: 'button',
					text: this.cancel,
					handler: cancel
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
					fieldLabel: this.labelPhoneProfessional,
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

		loadDefaultValues();

		function loadDefaultValues() {
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

		}

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
					}
				},
				failure: function (response) {
					alert(this.errorMessage);
				}
			});
		}

		function cancel (btn) {
			loadDefaultValues();
			btn.ownerCt.ownerCt.collapse();
		}

		// Apply config and call base class
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		MaPPE.changePasswordDlg.superclass.initComponent.apply(this, arguments);
	},
});

MaPPE.visibilityDlg = Ext.extend(Ext.FormPanel, {

	// Translatable strings...
	title: 'Change visibility of personal information',
	ok: 'Ok',
	cancel: 'Cancel',
	message: '<font size=\'2\'><b>Select what personal information is visible by other users</br></br></b></font>',
	errorMessage:'An unexpected error occured! Please try again later!',

	labelAddress:'Address',
	labelPhonePrivate:'Private Phone number',
	labelPhoneProfessional:'Professional Phone number',
	labelMobile:'Mobile number',
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
					text: this.cancel,
					handler: cancel
				}]
			},

			items: {
				baseCls: 'x-plain',
				border: true,
				defaultType: 'textfield',
				items: [{
					xtype: 'box',
					autoEl: {
						cn: this.message
					}
				},{
					xtype : 'checkboxgroup',
					id : 'personalinfo',
					columns : 1,
					items : [{
						boxLabel : this.labelAddress,
						name : '1'
					},{
						boxLabel : this.labelEmailId,
						name : '2'
					},{
						boxLabel : this.labelFax,
						name : '3'
					},{
						boxLabel : this.labelMobile,
						name : '4'
					},{
						boxLabel : this.labelPhonePrivate,
						name : '5'
					},{
						boxLabel : this.labelPhoneProfessional,
						name : '6'
					}]
				}]
			}
		};

		loadDefaultValues();
		function loadDefaultValues() {
			Ext.Ajax.request({
				//url : 'https://demo.ma-ppe.ch/YAjax.Test-GetPersonalDataVisibility'
				autoLoad: true,
				url : 'server/visibilityInfo.php',
				method : 'GET',

				scope : this,

				success : function(response) {
					if (Ext.decode(response.responseText).address) {
						Ext.getCmp('personalinfo').setValue ({
							1 : true
						})
					} else {
						Ext.getCmp('personalinfo').setValue ({
							1 : false
						})
					}

					if (Ext.decode(response.responseText).email) {
						Ext.getCmp('personalinfo').setValue ({
							2 : true
						})
					} else {
						Ext.getCmp('personalinfo').setValue ({
							2 : false
						})
					}

					if (Ext.decode(response.responseText).fax) {
						Ext.getCmp('personalinfo').setValue ({
							3 : true
						})
					} else {
						Ext.getCmp('personalinfo').setValue ({
							3 : false
						})
					}

					if (Ext.decode(response.responseText).mobile) {
						Ext.getCmp('personalinfo').setValue ({
							4 : true
						})
					} else {
						Ext.getCmp('personalinfo').setValue ({
							4 : false
						})
					}

					if (Ext.decode(response.responseText).phonePrivate) {
						Ext.getCmp('personalinfo').setValue ({
							5 : true
						})
					} else {
						Ext.getCmp('personalinfo').setValue ({
							5 : false
						})
					}

					if (Ext.decode(response.responseText).phoneProfessional) {
						Ext.getCmp('personalinfo').setValue ({
							6 : true
						})
					} else {
						Ext.getCmp('personalinfo').setValue ({
							6 : false
						})
					}
				},
				failure: function (response) {
					alert(this.errorMessage);
				}
			});

		}

		function updateInfo (btn) {
			var temp = Ext.getCmp('personalinfo').items.items[0].checked;
			Ext.Ajax.request({
				//url : 'http://demo.ma-ppe.ch/YAjax.Test-SetPersonalDataVisibility'
				autoLoad: true,
				url : 'server/test.php',
				method : 'GET',
				params : {
					address 			: Ext.getCmp('personalinfo').items.items[0].checked,
					email 				: Ext.getCmp('personalinfo').items.items[1].checked,
					fax 				: Ext.getCmp('personalinfo').items.items[2].checked,
					mobile				: Ext.getCmp('personalinfo').items.items[3].checked,
					phonePrivate 		: Ext.getCmp('personalinfo').items.items[4].checked,
					professionalPhone	: Ext.getCmp('personalinfo').items.items[5].checked
				},
				scope : this,

				success : function(response) {
					if (response.responseText == "") {
					}
				},
				failure: function (response) {
					alert(this.errorMessage);
				}
			});
		}

		function cancel(btn) {
			loadDefaultValues();
			btn.ownerCt.ownerCt.collapse();
		}

		// Apply config and call base class
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		MaPPE.changePasswordDlg.superclass.initComponent.apply(this, arguments);
	},
});

MaPPE.userDlg = Ext.extend(Ext.FormPanel, {

	// Translatable strings...
	title: 'User Preferences',

	initComponent: function() {

		var changePasswordDlg = new MaPPE.changePasswordDlg();
		var lostPasswordDlg = new MaPPE.lostPasswordDlg();
		var personalInfoDlg = new MaPPE.personalInfoDlg();
		var selectLangDlg = new MaPPE.selectLangDlg();
		var visibilityDlg = new MaPPE.visibilityDlg();

		// Set default values to optional parameters of the configuration
		Ext.applyIf(this.initialConfig, {
		});

		var config = {
			layout: 'accordion',
			title: '',
			bodyStyle: 'background-color:#DFE8F6',

			items:[
			changePasswordDlg,
			lostPasswordDlg,
			personalInfoDlg,
			selectLangDlg,
			visibilityDlg
			]
		};

		// Apply config and call base class
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		MaPPE.changePasswordDlg.superclass.initComponent.apply(this, arguments);
	},
});