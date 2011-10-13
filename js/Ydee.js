/**
*
* @author    Pulkit Goyal
*
*/
 
Ext.BLANK_IMAGE_URL = './ext/resources/images/default/s.gif';
Ext.ns('Ydee');
 
// application main entry point
Ext.onReady(function() {
 
    Ext.QuickTips.init();
    var emailPanel = new Ydee.SendEmailDlg();
    
    var contentPanel = {
         id: 'content-panel',
         region: 'center', // this is what makes this panel into a region within the containing layout
         layout: 'card',
         margins: '2 5 5 0',
         activeItem: 0,
         border: false,
         items: emailPanel
    };
    
    var viewport = new Ext.Viewport({
        layout: 'border',
        title: 'Ext Layout Browser',
        items: [contentPanel],
        renderTo: Ext.getBody()
    });
}); // eo function onReady
