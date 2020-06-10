<%@ Page Language="C#" masterpagefile="~masterurl/default.master" title="Untitled 1" inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" meta:progid="SharePoint.WebPartPage.Document" %>
<%@ Register tagprefix="SharePoint" namespace="Microsoft.SharePoint.WebControls" assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<asp:Content id="Content1" runat="Server" contentplaceholderid="PlaceHolderMain">
	<div id="displayHere">&nbsp;</div>
</asp:Content>

<asp:Content id="Content2" runat="server" contentplaceholderid="PlaceHolderAdditionalPageHead">
	<script type="text/javascript" src="jquery.js"></script>
	<script type="text/javascript" src="default.js"></script>
</asp:Content>
