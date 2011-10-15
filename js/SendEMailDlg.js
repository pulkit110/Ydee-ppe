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
		
		var setToIds = function() {
			var recipientSelDialog = new Ydee.RecipientSelDlg({
				owners: emailDlg.owners,
				user: emailDlg.user,
				building: emailDlg.building,
				otherContacts: emailDlg.otherContacts,
				idsHandler: function(records) {
					emailDlg.toRecords = records;
					
					var toFieldListDiv = $('#toFieldDiv');//.appendChild(toFieldList);
					var toFieldList = toFieldListDiv.get(0);//document.createElement('ul');					
						
					for (var i = 0; i < records.length; ++i) {

						var emailSpan = document.createElement('span');
						emailSpan.className += ' ' + 'to-field-element';
						emailSpan.innerHTML = records[i].data.email;

						toFieldList.appendChild(emailSpan);
					}
					
					Ext.select('.to-field-element').on('click',function() {
						var temp = this;
						alert($(this).parent().children().index(this));
					});
					
					$('#toFieldDiv').click(handleClick);
					Ext.select('toFieldDiv').on('click',function() {
						alert("Pulkit");
					});
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
					var ccEmailList = "";
					for (var i = 0; i < records.length; ++i) {
						ccEmailList += records[i].data.email + ", ";
					}

					Ext.getCmp('ccTextField').setValue(ccEmailList);
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
				},{
					xtype: 'panel',
					x: 70,
					y: 8,
					id:'toFieldDiv',
					anchor: '100%'
					// width: 300,
					// height: 5
				},{
					x: 70,
					y: 0,
					id: 'toTextField',
					name: 'to',
					anchor:'100%',
					disabled: this.noDirectEntry,
					hidden : this.noDirectEntry
				},{
					x: 0,
					y: 32,
					width: 65,
					xtype: 'button',
					text: this.cc,
					handler: setCCIds
				},{
					x: 70,
					y: 27,
					id: 'ccTextField',
					name: 'cc',
					anchor: '100%',
					disabled: this.noDirectEntry
				},{
					x: 0,
					y: 59,
					width: 65,
					xtype: 'label',
					text: this.subject
				},{
					x: 70,
					y: 54,
					id: 'subjectTextField',
					name: 'subject',
					anchor: '100%'  // anchor width by %
				},{
					x: 0,
					y: 81,
					width: 65,
					xtype: 'button',
					text: this.documents
				},{
					x:0,
					y: 110,
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