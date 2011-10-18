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
	fnamestr: 'First Name',
	lnamestr: 'Last Name',
	bnumberstr: 'Building#',
	anumberstr: 'Apartment#',

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
		},{
			name : 'email',
			mapping: 'email'
		}
		];

		var ownerRecords = new Array();

		for (var i = 0; i < this.owners.length; ++i) {
			ownerRecords[i] = this.owners[i];
		}

		if (this.otherContacts != null) {
			var l = ownerRecords.length;
			for (var i = 0; i < this.otherContacts.length; ++i) {
				ownerRecords[l+i] = this.otherContacts[i];
			}
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
			header: this.fnamestr,
			autoWidth : true,
			sortable: true,
			dataIndex: 'fname'
		},{
			header: this.lnamestr,
			autoWidth : true,
			sortable: true,
			dataIndex: 'lname'
		},{
			header: this.bnumberstr,
			autoWidth : true,
			sortable: true,
			dataIndex: 'bnumber',
			hidden:this.building
		},{
			header: this.anumberstr,
			autoWidth : true,
			sortable: true,
			dataIndex: 'anumber'
		},{
			header: "email",
			autoWidth : true,
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
			autoWidth: true,
			height           : 325,
			enableColumnHide: false
		});

		this.getGridWidth = function() {
			return 450;
		};
		var sendIds = function() {
			var records = grid.getSelectionModel().getSelections();
			recipientSelDlg.idsHandler(records);
			recipientSelDlg.ownerCt.close();
		};
		function selectAdminListener() {
			var checked = this.getValue();
			for (var i = 0; i < grid.getStore().getTotalCount(); ++i) {
				var currRow = grid.getStore().getAt(i);
				if (currRow.json.type == 'admin') {
					if (checked)
						grid.getSelectionModel().selectRow(i, true);
					else
						grid.getSelectionModel().deselectRow(i);
				}
			}
		}

		function selectAccountantListener() {
			var checked = this.getValue();
			for (var i = 0; i < grid.getStore().getTotalCount(); ++i) {
				var currRow = grid.getStore().getAt(i);
				if (currRow.json.type == 'accountant') {
					if (checked)
						grid.getSelectionModel().selectRow(i, true);
					else
						grid.getSelectionModel().deselectRow(i);
				}
			}
		}

		function selectAllOwnersListener() {
			var checked = this.getValue();
			for (var i = 0; i < grid.getStore().getTotalCount(); ++i) {
				var currRow = grid.getStore().getAt(i);
				if (currRow.json.bnumber != null || currRow.json.anumber != null) {
					if (checked)
						grid.getSelectionModel().selectRow(i, true);
					else
						grid.getSelectionModel().deselectRow(i);
				}
			}
		}

		function selectAllOwnersBldgListener() {
			var checked = this.getValue();
			for (var i = 0; i < grid.getStore().getTotalCount(); ++i) {
				var currRow = grid.getStore().getAt(i);
				if (currRow.json.bnumber == recipientSelDlg.user.bnumber) {
					if (checked)
						grid.getSelectionModel().selectRow(i, true);
					else
						grid.getSelectionModel().deselectRow(i);
				}
			}
		}

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
						check: selectAdminListener
					}
				},{
					boxLabel: this.accountant,
					name:'accountant',
					listeners: {
						check: selectAccountantListener
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
						check: selectAllOwnersListener
					}
				},{
					hidden: this.building,
					boxLabel: this.allOwnersBldg,
					name:'allOwnersBld',
					listeners: {
						check: selectAllOwnersBldgListener
					}
				}]
			},grid]
		};

		// Apply config and call base class
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		Ydee.SendEmailDlg.superclass.initComponent.apply(this, arguments);
	},
});