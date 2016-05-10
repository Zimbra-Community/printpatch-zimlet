Print Patch 
==========

Patches the built in Zimbra print feature, this Zimlet reduces the number of pages to print by 50% or so saving the environment. It does so, by not printing (broken) attachment thumbnails.

If you find Print Patch useful and want to support its continued development, you can make donations via:
- PayPal: info@barrydegraaff.tk
- Bank transfer: IBAN NL55ABNA0623226413 ; BIC ABNANL2A

Bugs and feedback: https://github.com/Zimbra-Community/printpatch-zimlet/issues

========================================================================

### Installing

**The below is ONLY for 8.6 version** if you use a different Zimbra let me know, test before prod and all that, use for your own risk.

To install, first remove the patch zimlet (as root):

     rm -Rf /opt/zimbra/zimlets-deployed/_dev/tk_barrydegraaff_printpatch
     cp /opt/zimbra/jetty/webapps/zimbra/WEB-INF/tags/message/messagePrintView.tag /opt/zimbra/jetty/webapps/zimbra/WEB-INF/tags/message/messagePrintView.tag-orig
     wget https://raw.githubusercontent.com/Zimbra-Community/printpatch-zimlet/master/messagePrintView.tag -O /opt/zimbra/jetty/webapps/zimbra/WEB-INF/tags/message/messagePrintView.tag

Then as zimbra: zmmailboxdctl restart


### Illustration

![alt tag](https://raw.githubusercontent.com/Zimbra-Community/printpatch-zimlet/master/Zimbra%20Print%20Patch%20by%20Barry.png)

Related bug: https://bugzilla.zimbra.com/show_bug.cgi?id=95856

### Credits

Thanks to Grupo Hoteles Globales for funds contributed http://www.hotelesglobales.com/ 
