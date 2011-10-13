Ext.ns('Ydee');
Ydee.SendEmailDlg = Ext.extend(Ext.FormPanel, {

	// Translatable strings...
	msg1: 'msg1',
	msg2: 'msg2',

	initComponent: function() {

		// Set default values to optional parameters of the configuration
		Ext.applyIf(this.initialConfig, {

		});

		// Prepare config
		var config = {
			title: 'New Email',
			cls: 'email-form',
			layout: 'fit',
			frame: true,
			bodyStyle: 'padding:10px 5px 5px;',
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
					text: 'To'
				},{
					x: 70,
					y: 0,
					name: 'to',
					anchor:'100%'  // anchor width by %
				},{
					x: 0,
					y: 32,
					width: 65,
					xtype: 'button',
					text: 'CC'
				},{
					x: 70,
					y: 27,
					name: 'cc',
					anchor: '100%'  // anchor width by %
				},{
					x: 0,
					y: 59,
					width: 65,
					xtype: 'label',
					text: 'Subject:'
				},{
					x: 70,
					y: 54,
					name: 'subject',
					anchor: '100%'  // anchor width by %
				},{
					x: 0,
					y: 81,
					width: 65,
					xtype: 'button',
					text: 'Documents'
				},{
					x:0,
					y: 110,
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