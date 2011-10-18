Ext.ns('Ydee');
Ydee.SendEmailDlg = Ext.extend(Ext.FormPanel, {

	// Translatable strings...
	to: 'To',
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

		var emailDlg = this;

		// Set default values to optional parameters of the configuration
		Ext.applyIf(this.initialConfig, {
		});

		var getIds = function() {

		};
		function handleClick() {
			alert("sapan");
		}

		var fields = [{
			name: 'fname',
			mapping : 'fname'
		},{
			name: 'lname',
			mapping : 'lname'
		},{
			name: 'bnumber',
			mapping : 'bnumber'
		},{
			name: 'anumber',
			mapping : 'anumber'
		},{
			name : 'email',
			mapping: 'email'
		}];

		var emailRecords = new Array();

		if (this.owners != null) {
			for (var i = 0; i < this.owners.length; ++i) {
				emailRecords[i] = this.owners[i];
			}
		}

		if (this.otherContacts != null) {
			var l = emailRecords.length;
			for (var i = 0; i < this.otherContacts.length; ++i) {
				emailRecords[l+i] = this.otherContacts[i];
			}
		}

		var ownerData = {
			records: emailRecords
		};

		// create the data store
		var gridStore = new Ext.data.JsonStore({
			fields : fields,
			data   : ownerData,
			root   : 'records'
		});

		function isValidEmail(email) {
			var status = false;
			var emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
			if (email.search(emailRegEx) == -1) {
				return false;
				//alert("Please enter a valid email address.");
			}
			return true;
		}

		var toSuperBox = new Ext.ux.form.SuperBoxSelect({
			x: 70,
			y: 0,
			name: 'to',
			anchor:'100%',
			store: gridStore,
			displayField: 'email',
			mode:'local',
			triggerAction:'all',
			selectOnFocus:true,
			allowAddNewData: !this.noDirectEntry,
			preventDuplicates: false,
			valueField: 'email',
			listeners: {
				'newitem': function(superBoxSelect, newValue) {
					if (isValidEmail(newValue)) {
						superBoxSelect.addItem({
							email: newValue
						});
					}
				}
			}
		});

		var ccSuperBox = new Ext.ux.form.SuperBoxSelect({
			x: 70,
			y: 37,
			name: 'cc',
			anchor:'100%',
			store: gridStore,
			displayField: 'email',
			mode:'local',
			triggerAction:'all',
			selectOnFocus:true,
			allowAddNewData: !this.noDirectEntry,
			preventDuplicates: false,
			valueField: 'email',
			listeners: {
				'newitem': function(superBoxSelect, newValue) {
					if (isValidEmail(newValue)) {
						superBoxSelect.addItem({
							email: newValue
						});
					}
				}
			}
		});

		function setToIds() {
			var recipientSelDialog = new Ydee.RecipientSelDlg({
				owners: emailDlg.owners,
				user: emailDlg.user,
				building: emailDlg.building,
				otherContacts: emailDlg.otherContacts,
				idsHandler: function(records) {
					emailDlg.toRecords = records;
					var newToFieldValue = '';
					for (var i = 0; i < records.length; ++i) {
						newToFieldValue += records[i].data.email + ',';
					}
					toSuperBox.setValue(newToFieldValue);
				}
			});

			var recipientSelDialogWindow = new Ext.Window({
				width:recipientSelDialog.getGridWidth(),
				items: recipientSelDialog,
				resizable:false
			});
			recipientSelDialogWindow .show();
		};

		function setCCIds() {
			var recipientSelDialog = new Ydee.RecipientSelDlg({
				owners: emailDlg.owners,
				user: emailDlg.user,
				building: emailDlg.building,
				otherContacts: emailDlg.otherContacts,
				idsHandler: function(records) {
					emailDlg.ccRecords = records;
					var newCCFieldValue = '';
					for (var i = 0; i < records.length; ++i) {
						newCCFieldValue += records[i].data.email + ',';
					}
					ccSuperBox.setValue(newCCFieldValue);
				}
			});

			var recipientSelDialogWindow = new Ext.Window({
				width:recipientSelDialog.getGridWidth(),
				items: recipientSelDialog,
				resizable:false
			});
			recipientSelDialogWindow .show();
		};

		function sendMail() {
			var subject = Ext.getCmp('subjectTextField').getValue();
			var emailText = Ext.getCmp('emailText').getValue();
			var keepCopy = Ext.getCmp('keepCopyCheck').getValue();
			var senderEmail = emailDlg.user.email;

			var toValuesEx = toSuperBox.getValueEx();
			var ccValuesEx = ccSuperBox.getValueEx();

			var toRecipients = new Array();
			for (var i = 0; i < toValuesEx.length; ++i) {
				for (var j = 0; j < emailRecords.length; ++j) {
					if (emailRecords[j].email == toValuesEx[i].email) {
						toValuesEx[i].fname = emailRecords[j].fname;
						toValuesEx[i].lname = emailRecords[j].lname;
						break;
					}
				}
				toRecipients[i] = toValuesEx[i];
			}

			var ccRecipients = new Array();
			for (var i = 0; i < ccValuesEx.length; ++i) {
				for (var j = 0; j < emailRecords.length; ++j) {
					if (emailRecords[j].email == ccValuesEx[i].email) {
						ccValuesEx[i].fname = emailRecords[j].fname;
						ccValuesEx[i].lname = emailRecords[j].lname;
						break;
					}
				}
				ccRecipients[i] = ccValuesEx[i];
			}

			if (emailDlg.mailSender != null) {
				emaiDlg.mailSender({
					toRecipients: toRecipients,
					ccRecipients: ccRecipients,
					subject: subject,
					emailText: emailText,
					keepCopy: keepCopy,
					senderEmail: senderEmail
				});
			}
		}

		function clearForm() {
			toSuperBox.clearValue();
			ccSuperBox.clearValue();
			Ext.getCmp('ccTextField').setValue("");
			Ext.getCmp('subjectTextField').setValue("");
			Ext.getCmp('emailText').setValue("");
			Ext.getCmp('keepCopyCheck').setValue(false);
		};

		// Prepare config
		var config = {
			title: 'New Email',
			cls: 'email-form',
			layout: 'fit',
			frame: true,
			bodyStyle: 'padding:10px 5px 5px;',
			bbar: {
				items: [
				' ',{
					xtype: 'checkbox',
					name: 'copy',
					boxLabel: this.keepCopy,
					id: 'keepCopyCheck'
				},
				'->',{
					width: 65,
					xtype: 'button',
					text: this.send,
					handler: sendMail
				},
				' ',{
					width: 65,
					xtype: 'button',
					text: this.clear,
					handler: clearForm
				}]
			},
			items: {
				baseCls: 'x-plain',
				layout:'absolute',
				border: true,
				defaultType: 'textfield',

				items: [{
					x: 0,
					y: 5,
					width: 65,
					xtype: 'button',
					text: this.to,
					handler: setToIds,
					scope: this
				},
				toSuperBox,{
					x: 0,
					y: 42,
					width: 65,
					xtype: 'button',
					text: this.cc,
					handler: setCCIds
				}, ccSuperBox,{
					x: 10,
					y: 77,
					width: 65,
					xtype: 'label',
					text: this.subject
				},{
					x: 70,
					y: 74,
					id: 'subjectTextField',
					name: 'subject',
					anchor: '100%'
				},{
					x: 0,
					y: 105,
					width: 65,
					xtype: 'button',
					text: this.documents
				},{
					x:0,
					y: 130,
					id: 'emailText',
					xtype: 'htmleditor',
					name: 'msg',
					anchor: '100% 100%'
				}]
			}
		};

		// Apply config and call base class
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		Ydee.SendEmailDlg.superclass.initComponent.apply(this, arguments);
	},
});