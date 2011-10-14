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

		var myData = {
			records : [{
				fname : "Record 0",
				lname: "Goyal",
				bnumber : "0",
				anumber : "0"
			},{
				fname : "Record 1",
				lname: "Goyal",
				bnumber: "1",
				anumber: "1"
			},{
				fname : "Record 2",
				lname: "Goyal",
				bnumber : "2",
				anumber : "2"
			},{
				fname : "Record 3",
				lname: "Goyal",
				bnumber : "3",
				anumber : "3"
			},{
				fname : "Record 4",
				lname: "Goyal",
				bnumber : "4",
				anumber : "4"
			},{
				fname : "Record 5",
				lname: "Goyal",
				bnumber : "5",
				anumber : "5"
			},{
				fname : "Record 6",
				lname: "Goyal",
				bnumber : "6",
				anumber : "6"
			},{
				fname : "Record 7",
				lname: "Goyal",
				bnumber : "7",
				anumber : "7"
			},{
				fname : "Record 8",
				lname: "Goyal",
				bnumber : "8",
				anumber : "8"
			},{
				fname : "Record 9",
				lname: "Goyal",
				bnumber : "9",
				anumber : "9"
			}
			]
		};

		// Generic fields array to use in both store defs.
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
		}
		];

		// create the data store
		var gridStore = new Ext.data.JsonStore({
			fields : fields,
			data   : myData,
			root   : 'records'
		});

		// Column Model shortcut array
		var cols = [{
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
			dataIndex: 'bnumber'
		},{
			header: "anumber",
			width: 50,
			sortable: true,
			dataIndex: 'anumber'
		}
		];

		// declare the source Grid
		var grid = new Ext.grid.GridPanel({
			ddGroup          : 'gridDDGroup',
			store            : gridStore,
			columns          : cols,
			enableDragDrop   : true,
			stripeRows       : true,
			autoExpandColumn : 'fname',
			width            : 650,
			height           : 325,
			//region           : 'west',
			title            : 'Data Grid',
			selModel         : new Ext.grid.RowSelectionModel({
				singleSelect : true
			})
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
			},grid]
		};

		// Apply config and call base class
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		Ydee.SendEmailDlg.superclass.initComponent.apply(this, arguments);
	},
});