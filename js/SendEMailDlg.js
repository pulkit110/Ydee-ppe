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

	initComponent: function() {

		var emailDlg = this;

		// Set default values to optional parameters of the configuration
		Ext.applyIf(this.initialConfig, {

		});

		var clearForm = function() {
			Ext.getCmp('toTextField').setValue("");
			Ext.getCmp('ccTextField').setValue("");
			Ext.getCmp('subjectTextField').setValue("");
			Ext.getCmp('emailText').setValue("");
			Ext.getCmp('keepCopyCheck').setValue(false);
		};
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
		}
		];

		var ownerRecords = new Array();

		for (var i = 0; i < this.owners.length; ++i) {
			ownerRecords[i] = this.owners[i];
		}

		var ownerData = {
			records: ownerRecords
		};

		// create the data store
		var gridStore = new Ext.data.JsonStore({
			fields : fields,
			data   : ownerData,
			root   : 'records'
		});

		var toSuperBox = new Ext.ux.form.SuperBoxSelect({
			x: 70,
			y: 0,
			name: 'to',
			anchor:'100%',
			store: gridStore,
			displayField: 'email',
			mode:'local',
			triggerAction:'all',
			// emptyText: 'Select an email',
			selectOnFocus:true,
			allowAddNewData: !this.noDirectEntry,
			preventDuplicates: false,
			valueField: 'email',
			listeners: {
				'newitem': function(superBoxSelect, newValue) {
					superBoxSelect.addItem({
						email: newValue
					});
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
			// emptyText: 'Select an email',
			selectOnFocus:true,
			allowAddNewData: !this.noDirectEntry,
			preventDuplicates: false,
			valueField: 'email'
		});

		var setToIds = function() {
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
				width:300,
				items: recipientSelDialog
			});
			recipientSelDialogWindow .show();
		};
		var setCCIds = function() {
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
				width:300,
				items: recipientSelDialog
			});
			recipientSelDialogWindow .show();
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
					text: this.send
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
				//url:'save-form.php',
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
				toSuperBox
				// {
				// xtype: 'panel',
				// x: 70,
				// y: 8,
				// id:'toFieldDiv',
				// anchor: '100%',
				// autoWidth: true
				// width: 300,
				// height: 5
				// }
				,{
					x: 70,
					y: 0,
					id: 'toTextField',
					name: 'to',
					anchor:'100%',
					disabled: this.noDirectEntry,
					hidden : this.noDirectEntry
				},{
					x: 0,
					y: 42,
					width: 65,
					xtype: 'button',
					text: this.cc,
					handler: setCCIds
				}, ccSuperBox
				// },{
					// x: 70,
					// y: 27,
					// id: 'ccTextField',
					// name: 'cc',
					// anchor: '100%',
					// disabled: this.noDirectEntry
				,{
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
					anchor: '100%'  // anchor width by %
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
					anchor: '100% 100%'  // anchor width and height
				}]
			}
		};

		// Apply config and call base class
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		Ydee.SendEmailDlg.superclass.initComponent.apply(this, arguments);
	},
});