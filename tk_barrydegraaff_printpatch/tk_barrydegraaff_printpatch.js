/*
This file is part of the printpatch Zimlet.
Copyright (C) 2016  Barry de Graaff

Bugs and feedback: https://github.com/Zimbra-Community/printpatch-zimlet

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see http://www.gnu.org/licenses/.
*/
/**
 * This zimlet checks for List-Unsubscribe message header and displays unsubscribe button when found.
 */
function tk_barrydegraaff_printpatch_HandlerObject() {
}

tk_barrydegraaff_printpatch_HandlerObject.prototype = new ZmZimletBase();
tk_barrydegraaff_printpatch_HandlerObject.prototype.constructor = tk_barrydegraaff_printpatch_HandlerObject;

/**
 * Simplify handler object
 */
var PrintpatchZimlet = tk_barrydegraaff_printpatch_HandlerObject;

/**
 * Initializes the zimlet.
 */
PrintpatchZimlet.prototype.init =
function() {
   AjxPackage.require({name:"MailCore", callback:new AjxCallback(this, this._applyRequestHeaders)});
};

/**
 * Applies the request headers.
 * Request Zimbra to expose "List-Unsubscribe" header to the Zimlet framework
 */
PrintpatchZimlet.prototype._applyRequestHeaders =
function() {	
	ZmMailMsg.requestHeaders["List-Unsubscribe"] = "List-Unsubscribe";
};

PrintpatchZimlet.prototype._handlePrintpatchZimletMenuClick = function(controller) {
	//Get selected mail message
   var items = controller.getSelection();
	if(!items instanceof Array) {
		return;
	}
   
   var type = items[0].type;
	var msg;
	if (type == ZmId.ITEM_CONV) {
		msg = items[0].getFirstHotMsg();
	} else if(type == ZmId.ITEM_MSG) {
		msg = items[0];
	}

   var xmlHttp = null;   
   xmlHttp = new XMLHttpRequest();
   xmlHttp.open( "GET", '/h/printmessage?id=C:-'+msg.id+'&tz=Europe/Belgrade', true );
   xmlHttp.send( null );
   xmlHttp.onload = function(e) 
   {
      var newWin=window.open('','Print-Window','width=800,height=600');
      var content=window.frames[0].document.body.innerHTML;
      newWin.document.open();
      newWin.document.write(xmlHttp.response.substr(0,xmlHttp.response.indexOf('<a name="attachments"></a>')));
      newWin.document.write("\r\n<script type=\"text/javascript\">\r\n");
      newWin.document.write("<!--\r\n");
      newWin.document.write("         setTimeout('window.print()', 1000);\r\n");
      newWin.document.write("//-->\r\n");
      newWin.document.write("</script>\r\n");
      newWin.document.close();
      newWin.focus();
   }
                       

};

PrintpatchZimlet.prototype.onMsgView = function (msg, oldMsg, msgView) {  

   try {
      var app = appCtxt.getCurrentApp();
      var controller = app.getMailListController();
      var toolbar = controller.getCurrentToolbar();
      if (toolbar)
      {
         //When the user forwards emails as eml with attachments, there will be a toolbar, but that one
         //has no getButton method... resulting in a pop-up where the attachments cannot be clicked
         try {
            var getButton = toolbar.getButton('PrintpatchZimletButton')
         } catch (err) {}
         
         if ((getButton) && (!getButton.isDisposed() ))
         {
            //button already defined
         }
         else
         {
            //create app button
            var buttonArgs = {
               text    : 'Print',
               tooltip: 'Print email',
               index: 9, //position of the button
               image: "zimbraicon", //icon
               enabled: true //default if undefined is true, defining it for documentation purpose
            };
            var button = toolbar.createOp("PrintpatchZimletButton", buttonArgs);
            button.addSelectionListener(new AjxListener(this, this._handlePrintpatchZimletMenuClick, controller));
         }
      }      
   } catch (err) {}
}
