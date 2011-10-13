Ext.ns('Ydee');
Ydee.RecipientSelDlg = Ext.extend(Ext.FormPanel, {

	// Translatable strings...
	title: 'Select Recipients',
	contacts: 'Contacts',
	admin: 'Administrator',
	accountant: 'Accountant',
	owners: 'Owners',
	allOwners: 'All owners',
	allOwnersBldg: 'All owners of building',
	ok: 'Ok',
	cancel: 'Cancel',

	initComponent: function() {

		// Set default values to optional parameters of the configuration
		Ext.applyIf(this.initialConfig, {

		});

		// Prepare config
		var config = {
			title: this.title,
			cls: 'recipient-dlg',
			layout: 'form',
			frame: true,
			bodyStyle: 'padding:10px 5px 5px;',
			bbar: {
				buttonAlign: 'center',
				items: [{
					width: 65,
					xtype: 'button',
					text: this.ok
				},
				' ',{
					width: 65,
					xtype: 'button',
					text: this.cancel,
				}]
			},
			items: [{
				xtype: 'checkboxgroup',
				fieldLabel: this.contacts,
				columns:2,
				items:[{
					boxLabel: this.admin,
					name:'admin'
				},{
					boxLabel: this.accountant,
					name:'accountant'
				}]
			},{
				xtype: 'checkboxgroup',
				fieldLabel: this.owners,
				columns:2,
				items:[{
					boxLabel: this.allOwners,
					name:'allOwners'
				},{
					boxLabel: this.allOwnersBldg,
					name:'allOwnersBld'
				}]
			}]
		};

		// Apply config and call base class
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		Ydee.SendEmailDlg.superclass.initComponent.apply(this, arguments);
	},
});