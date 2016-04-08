/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./Menu','./MenuItem','./MenuItemBase','./library','sap/ui/core/Control'],function(q,M,a,b,l,C){"use strict";var c=C.extend("sap.ui.commons.MenuBar",{metadata:{library:"sap.ui.commons",properties:{enabled:{type:"boolean",group:"Behavior",defaultValue:true},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:'100%'},design:{type:"sap.ui.commons.MenuBarDesign",group:"Appearance",defaultValue:sap.ui.commons.MenuBarDesign.Standard}},defaultAggregation:"items",aggregations:{items:{type:"sap.ui.unified.MenuItem",multiple:true,singularName:"item"}}}});a.extend("sap.ui.commons._DelegatorMenuItem",{constructor:function(A){a.apply(this);this.oAlterEgoItm=A;this.bNoSubMenu=true;var s=this.oAlterEgoItm.getSubmenu();if(s){var t=this;s.getRootMenu=function(){return t.getParent();};this.bNoSubMenu=false;}},exit:function(){if(!this.bNoSubMenu){this.oAlterEgoItm.getSubmenu().getRootMenu=M.prototype.getRootMenu;}this.bNoSubMenu=true;this.oAlterEgoItm=null;},getText:function(){return this.oAlterEgoItm.getText();},getIcon:function(){return this.oAlterEgoItm.getIcon();},getEnabled:function(){return this.oAlterEgoItm.getEnabled();},getVisible:function(){return this.oAlterEgoItm.getVisible();},getSubmenu:function(){return this.oAlterEgoItm.getSubmenu();}});(function(){c.prototype.init=function(){this.oOvrFlwMnu=null;this.sCurrentFocusedItemRefId=null;this.data("sap-ui-fastnavgroup","true",true);};c.prototype.exit=function(){if(this.oOvrFlwMnu){this.oOvrFlwMnu.destroy();}this.oOvrFlwMnu=null;if(this.sResizeListenerId){sap.ui.core.ResizeHandler.deregister(this.sResizeListenerId);this.sResizeListenerId=null;}};c.prototype.doBeforeRendering=function(){var I=this.getItems();for(var i=0;i<I.length;i++){var m=I[i].getSubmenu();if(m){m.setRootMenuTopStyle(this.getDesign()==sap.ui.commons.MenuBarDesign.Header);}}if(this.oOvrFlwMnu){this.oOvrFlwMnu.setRootMenuTopStyle(this.getDesign()==sap.ui.commons.MenuBarDesign.Header);}if(this.sResizeListenerId){sap.ui.core.ResizeHandler.deregister(this.sResizeListenerId);this.sResizeListenerId=null;}};c.prototype.onAfterRendering=function(){this.sResizeListenerId=sap.ui.core.ResizeHandler.register(this.getDomRef(),q.proxy(this.onresize,this));this.onresize();};c.prototype.onresize=function(e){u(this);};c.prototype.onfocusin=function(e){var i=this.getId();var t=q(e.target);var T=t.attr("id");if(!T||T==i||T==i+"-area"){var I=this.$("area").children();this.sCurrentFocusedItemRefId=I.length==0?null:q(I.get(0)).attr("id");}else{this.sCurrentFocusedItemRefId=T;}var F=q.sap.byId(this.sCurrentFocusedItemRefId).get(0);if(F){F.focus();}this.$().attr("tabindex","-1");};c.prototype.onfocusout=function(e){this.$().attr("tabindex","0");};c.prototype.onmousedown=function(e){var m=_(this,e);if(m==="ovrflw"){this._bOvrFlwMnuSkipOpen=this.oOvrFlwMnu&&this.oOvrFlwMnu.bOpen;}else if(m){var h=m.getSubmenu();m._bSkipOpen=h&&h.bOpen;}};c.prototype.onmouseout=function(e){var m=_(this,e);if(m==="ovrflw"){var r=g(this,e);if(this._bOvrFlwMnuSkipOpen&&q.sap.checkMouseEnterOrLeave(e,r[0])){this._bOvrFlwMnuSkipOpen=false;}}else if(m){var r=g(this,e);if(m._bSkipOpen&&q.sap.checkMouseEnterOrLeave(e,r[0])){m._bSkipOpen=false;}}};c.prototype.onclick=function(e){o(this,e,false);};c.prototype.onsapselect=function(e){o(this,e,true);};c.prototype.onsapdown=function(e){o(this,e,true);};c.prototype.onsapdownmodifiers=function(e){if(e.altKey){o(this,e,true);}};c.prototype.onsapprevious=function(e){if(e.keyCode!=q.sap.KeyCodes.ARROW_UP){f(this,e,"prev");}};c.prototype.onsapnext=function(e){if(e.keyCode!=q.sap.KeyCodes.ARROW_DOWN){f(this,e,"next");}};c.prototype.onsaphome=function(e){f(this,e,"first");};c.prototype.onsapend=function(e){f(this,e,"last");};var o=function(t,e,w){e.preventDefault();e.stopPropagation();if(t.getEnabled()){var m=_(t,e);if(m==="ovrflw"){var r=g(t,e);if(t.oOvrFlwMnu&&!t._bOvrFlwMnuSkipOpen){var h=sap.ui.core.Popup.Dock;t.oOvrFlwMnu.open(w,r.get(0),h.EndTop,h.EndBottom,r.get(0));}}else if(m){if(m.getEnabled()){var r=g(t,e);var j=m.getSubmenu();if(j&&!m._bSkipOpen){var h=sap.ui.core.Popup.Dock;j.open(w,r.get(0),h.BeginTop,h.BeginBottom,r.get(0));}else if(!j){m.fireSelect({item:m});}}}}t._bOvrFlwMnuSkipOpen=false;var I=t.getItems();for(var i=0;i<I.length;i++){I[i]._bSkipOpen=false;}};var g=function(t,e){var r=q(e.target);if(!r.attr("itemidx")){r=r.parent();}return r.attr("itemidx")?r:null;};var _=function(t,e){var r=g(t,e);if(r){var i=r.attr("itemidx");if(i){if(i=="ovrflw"){return"ovrflw";}else{var I=parseInt(i,10);var m=t.getItems()[I];return m;}}}return null;};var d=function(t){var v=0;var A=t.$("area");var i=A.children();var r=sap.ui.getCore().getConfiguration().getRTL();var e=(r?100000:0);i.each(function(I){if(I==0){return true;}var h=this.offsetLeft;var L=(r?(h>=e):(h<=e));if(L){v=I;return false;}else if(q(this).attr("id")==t.getId()+"-ovrflw"){v=I;return false;}else{e=h;return true;}});return v;};var u=function(t){var v=d(t);var e=v;var A=t.$("area");var I=A.children();var O=t.$("ovrflw");var U=false;if(v<I.length-1){O.attr("style","display:block;");if(!t.oOvrFlwMnu){t.oOvrFlwMnu=new M(t.getId()+"-ovrflwmnu");t.oOvrFlwMnu.bUseTopStyle=t.getDesign()==sap.ui.commons.MenuBarDesign.Header;t.oOvrFlwMnu.attachItemSelect(function(E){var j=E.getParameter("item");if(!(j instanceof sap.ui.commons._DelegatorMenuItem)){var k=M.prototype.getRootMenu.apply(j.getParent());k.fireItemSelect({item:j});}else if(j.bNoSubMenu&&j instanceof sap.ui.commons._DelegatorMenuItem){j.oAlterEgoItm.fireSelect({item:j.oAlterEgoItm});}});}t.oOvrFlwMnu.destroyItems();var h=t.getItems();for(var i=0;i<h.length;i++){var j=h[i];if(v!=0){if(j.getVisible()){v--;}if(v==0){t.sLastVisibleItemId=j.getId();}}else{t.oOvrFlwMnu.addItem(new sap.ui.commons._DelegatorMenuItem(j));if(j.getId()==t.sCurrentFocusedItemRefId){U=true;}}}if(sap.ui.getCore().getConfiguration().getAccessibility()){I.attr("aria-setsize",e+1);O.attr("aria-posinset",e+1);}}else{O.attr("style","display:none;");if(t.oOvrFlwMnu){t.oOvrFlwMnu.destroyItems();}t.sLastVisibleItemId=null;if(sap.ui.getCore().getConfiguration().getAccessibility()){I.attr("aria-setsize",e);O.attr("aria-posinset",0);}}A.scrollTop(0);if(U){t.sCurrentFocusedItemRefId=t.sLastVisibleItemId;q.sap.byId(t.sLastVisibleItemId).get(0).focus();}};var f=function(t,e,D){e.stopPropagation();e.preventDefault();if(!t.sCurrentFocusedItemRefId){return;}var F=null;if(t.sLastVisibleItemId&&((t.sCurrentFocusedItemRefId==t.sLastVisibleItemId&&D=="next")||D=="last")){F=t.getId()+"-ovrflw";}else if(t.sLastVisibleItemId&&t.sCurrentFocusedItemRefId==t.getId()+"-ovrflw"&&D=="prev"){F=t.sLastVisibleItemId;}else{var s=D+"All";var i=false;if(D=="first"){s="prevAll";i=true;}else if(D=="last"){s="nextAll";i=true;}var j=q.sap.byId(t.sCurrentFocusedItemRefId);var h=j[s](":visible");F=q(h.get(i?h.length-1:0)).attr("id");}if(F){t.sCurrentFocusedItemRefId=F;q.sap.byId(F).get(0).focus();}};}());return c;},true);
