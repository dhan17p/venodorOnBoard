sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';

	return ControllerExtension.extend('vendoronboardrequest.ext.controller.Objectpage', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf vendoronboardrequest.ext.controller.Objectpage
             */
			onInit: function () {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel();
			},
			editFlow: {
				onAfterSave: function (mParameters) {
					//synchronous access to property value
				debugger
				// MessageToast.show("Custom handler invoked.");
				var dialogId = sap.ui.core.Fragment.createId("dialogid");
				var labelId = sap.ui.core.Fragment.createId("labelid");
				var label = new sap.m.Label(labelId, {
					text: "Are you sure you want to submit?",
				})
				label.addStyleClass("labeldialogsave")
				this.oDialog = new sap.m.Dialog(dialogId, {
					title: "Submit",
					content: [label],
					beginButton: new sap.m.Button({
						text: "OK",
						press: async function (oBindingContext, oEvent) {
							debugger
							var mainVbox = sap.ui.getCore().byId(jQuery("[id$='mainVboxComment']").attr("id"))
	
						}.bind(this)
					}),
					endButton: new sap.m.Button({
						text: "Close",
						press: function () {
							this.oDialog.close();
						}.bind(this)
					})
	
				});
				this.oDialog.open();
			}
		}
	}
	});
});
