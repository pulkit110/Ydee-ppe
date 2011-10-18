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

	var user = {
		bnumber: "2",
		email: "xyz@abc.com"
	};

	var owners = [{
		fname : "Fname1",
		lname: "Goyal1",
		bnumber : "0",
		anumber : "0",
		email : "abc1@xyz.com"
	},{
		fname : "Fname1",
		lname: "Goyal2",
		bnumber: "1",
		anumber: "1",
		email : "abc2@xyz.com"
	},{
		fname : "Fname1",
		lname: "Goyal3",
		bnumber : "2",
		anumber : "2",
		email : "abc3@xyz.com"
	},{
		fname : "Fname1",
		lname: "Goyal4",
		bnumber : "3",
		anumber : "3",
		email : "abc4@xyz.com"
	},{
		fname : "Fname1",
		lname: "Goyal5",
		bnumber : "4",
		anumber : "4",
		email : "abc5@xyz.com"
	},{
		fname : "Fname1",
		lname: "Goyal6",
		bnumber : "5",
		anumber : "5",
		email : "abc6@xyz.com"
	},{
		fname : "Fname1",
		lname: "Goyal7",
		bnumber : "6",
		anumber : "6",
		email : "abc7@xyz.com"
	},{
		fname : "Fname1",
		lname: "Goyal8",
		bnumber : "7",
		anumber : "7",
		email : "abc8@xyz.com"
	},{
		fname : "Fname1",
		lname: "Goyal9",
		bnumber : "8",
		anumber : "8",
		email : "abc9@xyz.com"
	},{
		fname : "Fname1",
		lname: "Goyal0",
		bnumber : "9",
		anumber : "9",
		email : "abc10@xyz.com"
	}
	];
	var otherContacts = [{
		fname : "Fname1",
		lname: "Goyal11",
		email : "abc@xyz11.com",
		type : "admin"
	},{
		fname : "Fname1",
		lname: "Goyal12",
		email : "abc@xyz12.com",
		type : "admin"
	},{
		fname : "Fname1",
		lname: "Goyal13",
		email : "abc@xyz13.com",
		type : "admin"
	},{
		fname : "Fname1",
		lname: "Goyal14",
		email : "abc@xyz14.com",
		type : "accountant"
	},
	];

	var emailPanel = new Ydee.SendEmailDlg({
		building : false,
		user : user,
		owners : owners,
		otherContacts:otherContacts,
		noDirectEntry:false
	});
	// var recipientDlg = new Ydee.RecipientSelDlg();

	var contentPanel = {
		id: 'content-panel',
		region: 'center', // this is what makes this panel into a region within the containing layout
		layout: 'card',
		margins: '2 5 5 0',
		activeItem: 0,
		border: false,
		items: emailPanel//recipientDlg
	};

	var viewport = new Ext.Viewport({
		layout: 'border',
		title: 'Ext Layout Browser',
		items: [contentPanel],
		renderTo: Ext.getBody()
	});
}); // eo function onReady