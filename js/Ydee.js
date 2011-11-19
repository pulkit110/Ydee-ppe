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

	var userDlg = new MaPPE.userDlg();
		
	var contentPanel = {
		region: 'center',
		layout: 'card',
		margins: '2 5 5 0',
		activeItem: 0,
		border: false,
		items: [userDlg]
	};

	var viewport = new Ext.Viewport({
		layout: 'border',
		items: [contentPanel]
	});
	
	//win.show();
}); 