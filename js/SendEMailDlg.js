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

		// Set default values to optional parameters of the configuration
		Ext.applyIf(this.initialConfig, {

		});

		var clearForm = function() {
			temp = Ext.getCmp('toTextField').setValue("");
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
					text: this.to
				},{
					x: 70,
					y: 0,
					id: 'toTextField',
					name: 'to',
					anchor:'100%'  // anchor width by %
				},{
					x: 0,
					y: 32,
					width: 65,
					xtype: 'button',
					text: this.cc
				},{
					x: 70,
					y: 27,
					id: 'ccTextField',
					name: 'cc',
					anchor: '100%'  // anchor width by %
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