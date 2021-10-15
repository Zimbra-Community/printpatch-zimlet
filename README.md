Print Patch 
==========

Patch for the built in Zimbra print feature, this reduces the number of pages to print by 50% (give or take) saving the environment. It does so, by not printing (broken) attachment thumbnails.

Bugs and feedback: https://github.com/Zimbra-Community/printpatch-zimlet/issues

========================================================================

### Installing

**The below is ONLY for 8.6 version** if you use a different Zimbra let me know, test before prod and all that, use for your own risk.

To install, first remove the patch zimlet (as root):

     rm -Rf /opt/zimbra/zimlets-deployed/_dev/tk_barrydegraaff_printpatch
     cp /opt/zimbra/jetty/webapps/zimbra/WEB-INF/tags/message/messagePrintView.tag /opt/zimbra/jetty/webapps/zimbra/WEB-INF/tags/message/messagePrintView.tag-orig
     wget https://raw.githubusercontent.com/Zimbra-Community/printpatch-zimlet/master/messagePrintView.tag -O /opt/zimbra/jetty/webapps/zimbra/WEB-INF/tags/message/messagePrintView.tag
     
     cp /opt/zimbra/jetty/webapps/zimbra/h/printmessage /opt/zimbra/jetty/webapps/zimbra/h/printmessage-orig
     wget https://raw.githubusercontent.com/Zimbra-Community/printpatch-zimlet/master/printmessage -O /opt/zimbra/jetty/webapps/zimbra/h/printmessage
     

Then as zimbra: zmmailboxdctl restart


### Illustration

![alt tag](https://raw.githubusercontent.com/Zimbra-Community/printpatch-zimlet/master/Zimbra%20Print%20Patch%20by%20Barry.png)

Related bug: https://bugzilla.zimbra.com/show_bug.cgi?id=95856

### Credits

Thanks to Grupo Hoteles Globales for funds contributed http://www.hotelesglobales.com/ 
