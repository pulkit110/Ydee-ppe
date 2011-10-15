Ext.ns('Ydee');
Ydee.RecipientSelDlg = Ext.extend(Ext.FormPanel, {

	// Translatable strings...
	title: 'Select Recipients',
	contacts: 'Contacts',
	admin: 'Administrator',
	accountant: 'Accountant',
	ownersStr: 'Owners',
	allOwners: 'All owners',
	allOwnersBldg: 'All owners of building',
	ok: 'Ok',
	cancel: 'Cancel',

	//options
	building: false,

	initComponent: function() {

		var recipientSelDlg = this;
		
		// Set default values to optional parameters of the configuration
		Ext.applyIf(this.initialConfig, {

		});

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
		}, {
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

		var sm = new Ext.grid.CheckboxSelectionModel();

		// Column Model shortcut array
		var cols = [sm,{
			id : 'fname',
			header: "fname",
			width: 160,
			sortable: true,
			dataIndex: 'fname'
		},{
			header: "lname",
			width: 160,
			sortable: true,
			dataIndex: 'lname'
		},{
			header: "bnumber",
			width: 50,
			sortable: true,
			dataIndex: 'bnumber',
			hidden:this.building
		},{
			header: "anumber",
			width: 50,
			sortable: true,
			dataIndex: 'anumber'
		},{
			header: "email",
			width: 50,
			dataIndex: 'email',
			hidden:true
		}
		];

		// declare the source Grid
		var grid = new Ext.grid.GridPanel({
			ddGroup          : 'gridDDGroup',
			store            : gridStore,
			columns          : cols,
			sm: sm,
			stripeRows       : true,
			// autoExpandColumn : 'fname',
			width            : 650,
			height           : 325,
			enableColumnHide: false
		});
		
		var sendIds = function() {
			var records = grid.getSelectionModel().getSelections();
			recipientSelDlg.idsHandler(records);
			recipientSelDlg.ownerCt.close();
		};
		
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
					text: this.ok,
					handler: sendIds
				},
				' ',{
					width: 65,
					xtype: 'button',
					text: this.cancel,
					handler: function() {
						recipientSelDlg.ownerCt.close();
					}
				}]
			},
			items: [{
				xtype: 'checkboxgroup',
				fieldLabel: this.contacts,
				columns:2,
				items:[{
					boxLabel: this.admin,
					name:'admin',
					listeners: {
						check: function() {
							var checked = this.getValue();
							for (var i = 0; i < grid.getStore().getTotalCount(); ++i) {
							}
						}
					}
				},{
					boxLabel: this.accountant,
					name:'accountant',
					listeners: {
						check: function() {
							var checked = this.getValue();
							for (var i = 0; i < grid.getStore().getTotalCount(); ++i) {
							}
						}
					}
				}]
			},{
				xtype: 'checkboxgroup',
				fieldLabel: this.ownersStr,
				columns:2,
				items:[{
					boxLabel: this.allOwners,
					name:'allOwners',
					listeners: {
						check: function() {
							var checked = this.getValue();
							for (var i = 0; i < grid.getStore().getTotalCount(); ++i) {
							}
							if (checked) {
								grid.getSelectionModel().selectAll();
							} else {
								grid.getSelectionModel().clearSelections();
							}
						}
					}
				},{
					hidden: this.building,
					boxLabel: this.allOwnersBldg,
					name:'allOwnersBld',
					listeners: {
						check: function() {
							var checked = this.getValue();
							for (var i = 0; i < grid.getStore().getTotalCount(); ++i) {
								var temp = grid.getStore().getAt(i);
							}
						}
					}
				}]
			},grid]
		};

		// Apply config and call base class
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		Ydee.SendEmailDlg.superclass.initComponent.apply(this, arguments);
	},
});