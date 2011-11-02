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
		lname: "Lname1",
		bnumber : "0",
		anumber : "0",
		email : "abc1@xyz.com"
	},{
		fname : "Fname2",
		lname: "Lname2",
		bnumber: "1",
		anumber: "1",
		email : "abc2@xyz.com"
	},{
		fname : "Fname3",
		lname: "Lname3",
		bnumber : "2",
		anumber : "2",
		email : "abc3@xyz.com"
	},{
		fname : "Fname4",
		lname: "Lname4",
		bnumber : "3",
		anumber : "3",
		email : "abc4@xyz.com"
	},{
		fname : "Fname5",
		lname: "Lname5",
		bnumber : "4",
		anumber : "4",
		email : "abc5@xyz.com"
	},{
		fname : "Fname6",
		lname: "Lname6",
		bnumber : "5",
		anumber : "5",
		email : "abc6@xyz.com"
	},{
		fname : "Fname7",
		lname: "Lname7",
		bnumber : "6",
		anumber : "6",
		email : "abc7@xyz.com"
	},{
		fname : "Fname8",
		lname: "Lname8",
		bnumber : "7",
		anumber : "7",
		email : "abc8@xyz.com"
	},{
		fname : "Fname9",
		lname: "Lname9",
		bnumber : "8",
		anumber : "8",
		email : "abc9@xyz.com"
	},{
		fname : "Fname10",
		lname: "Lname10",
		bnumber : "9",
		anumber : "9",
		email : "abc10@xyz.com"
	}
	];
	var otherContacts = [{
		fname : "Fname11",
		lname: "Lname11",
		email : "abc@xyz11.com",
		type : "accountant"
	},{
		fname : "Fname12",
		lname: "Lname12",
		email : "abc@xyz12.com",
		type : "admin"
	},{
		fname : "Fname13",
		lname: "Lname13",
		email : "abc@xyz13.com",
		type : "admin"
	},{
		fname : "Fname14",
		lname: "Lname14",
		email : "abc@xyz14.com",
		type : "accountant"
	},
	];

	var emailPanel = new Ydee.SendEmailDlg({
		building : true,
		user : user,
		owners : owners,
		otherContacts:otherContacts,
		noDirectEntry:false
	});

	var changePasswordDlg = new MaPPE.changePasswordDlg();
	//var lostPasswordDlg = new MaPPE.lostPasswordDlg();
	//var langDlg = new MaPPE.langDlg();
	
	// var win = new Ext.Window({
			// title : 'Yadde',
			// width : 1300,
			// border : 'false',
			// height : 770,
			// id : 'win',
			// name : 'win',
			// //style				: 'margin:0 auto;margin-top:100;',
			// bodyStyle : 'background-color:#fff;padding: 10px',
			// autoScroll : true,
			// items : [ {
				// items : [changePasswordDlg]
			// }],
				// renderTo: Ext.getBody()		
	// });
	
	var contentPanel = {
		id: 'content-panel',
		region: 'center',
		layout: 'card',
		margins: '2 5 5 0',
		activeItem: 0,
		border: false,
		items: changePasswordDlg
	};

	var viewport = new Ext.Viewport({
		layout: 'border',
		title: 'Ext Layout Browser',
		items: [contentPanel],
		renderTo: Ext.getBody()
	});
	
	//win.show();
}); 