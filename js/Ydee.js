/**
 *
 * @author    Pulkit Goyal
 *
 */

Ext.BLANK_IMAGE_URL = './ext/resources/images/default/s.gif';
Ext.ns('Ydee');

// application main entry point
Ext.onReady( function() {

	Ext.QuickTips.init();

	var owners = [{
		fname : "Record 0",
		lname: "Goyal",
		bnumber : "0",
		anumber : "0",
		email : "abc@xyz.com"
	},{
		fname : "Record 1",
		lname: "Goyal",
		bnumber: "1",
		anumber: "1",
		email : "abc@xyz.com"
	},{
		fname : "Record 2",
		lname: "Goyal",
		bnumber : "2",
		anumber : "2",
		email : "abc@xyz.com"
	},{
		fname : "Record 3",
		lname: "Goyal",
		bnumber : "3",
		anumber : "3",
		email : "abc@xyz.com"
	},{
		fname : "Record 4",
		lname: "Goyal",
		bnumber : "4",
		anumber : "4",
		email : "abc@xyz.com"
	},{
		fname : "Record 5",
		lname: "Goyal",
		bnumber : "5",
		anumber : "5",
		email : "abc@xyz.com"
	},{
		fname : "Record 6",
		lname: "Goyal",
		bnumber : "6",
		anumber : "6",
		email : "abc@xyz.com"
	},{
		fname : "Record 7",
		lname: "Goyal",
		bnumber : "7",
		anumber : "7",
		email : "abc@xyz.com"
	},{
		fname : "Record 8",
		lname: "Goyal",
		bnumber : "8",
		anumber : "8",
		email : "abc@xyz.com"
	},{
		fname : "Record 9",
		lname: "Goyal",
		bnumber : "9",
		anumber : "9",
		email : "abc@xyz.com"
	}
	];

	//var emailPanel = new Ydee.SendEmailDlg();
	var recipientDlg = new Ydee.RecipientSelDlg({
		building: true, 
		owners: owners
	});

	var contentPanel = {
		id: 'content-panel',
		region: 'center', // this is what makes this panel into a region within the containing layout
		layout: 'card',
		margins: '2 5 5 0',
		activeItem: 0,
		border: false,
		items: recipientDlg//emailPanel
	};

	var viewport = new Ext.Viewport({
		layout: 'border',
		title: 'Ext Layout Browser',
		items: [contentPanel],
		renderTo: Ext.getBody()
	});
}); // eo function onReady