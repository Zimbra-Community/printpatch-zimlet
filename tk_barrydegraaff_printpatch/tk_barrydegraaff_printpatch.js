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
   
   //Difference between shared mailbox id's and normal id's for some reason
   if(msg.id.indexOf('-') > -1)
   {
      var id = msg.cid;
   }
   else
   {
      var id = '-'+msg.id;
   }
   
   var xmlHttp = null;   
   xmlHttp = new XMLHttpRequest();
   xmlHttp.open( "GET", '/h/printmessage?id=C:'+id+"&tz="+AjxTimezone.getServerId(AjxTimezone.DEFAULT)+"&xim=1", true );
   xmlHttp.send( null );
   xmlHttp.onload = function(e) 
   {
      var newWin=window.open('','Print-Window','width=800,height=600');
      var content=window.frames[0].document.body.innerHTML;
      newWin.document.open();
      if(xmlHttp.response.indexOf('<a name="attachments"></a>') > 0)
      {
         newWin.document.write(xmlHttp.response.substr(0,xmlHttp.response.indexOf('<a name="attachments"></a>')));
         newWin.document.write("\r\n<script type=\"text/javascript\">\r\n");
         newWin.document.write("<!--\r\n");
         newWin.document.write("         setTimeout('window.print()', 1000);\r\n");
         newWin.document.write("//-->\r\n");
         newWin.document.write("</script>\r\n");
      }
      else
      {
         newWin.document.write(xmlHttp.response);
      }
      newWin.document.close();
      newWin.focus();
   }
                       

};


PrintpatchZimlet.prototype.initializeToolbar =
function(app, toolbar, controller, viewId) {
   try {
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
               enabled: false
            };
            var button = toolbar.createOp("PrintpatchZimletButton", buttonArgs);
            button.addSelectionListener(new AjxListener(this, this._handlePrintpatchZimletMenuClick, controller));
         }
      }      
   } catch (err) {}
}
