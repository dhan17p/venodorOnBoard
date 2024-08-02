sap.ui.define(['sap/ui/core/mvc/ControllerExtension',
	'sap/m/HBox',
	"sap/m/Table",
	"sap/m/Column",
	"sap/m/ColumnListItem",
	"sap/m/Text",
	"sap/m/Input",
	"sap/m/Button",
	"sap/m/Dialog",
	"sap/m/CheckBox",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel",
	"sap/m/library",
], function (ControllerExtension, HBox, Table, Column, ColumnListItem, Text, Input, Button, Dialog, CheckBox, MessageToast, JSONModel, mobileLibrary) {
	'use strict';

	return ControllerExtension.extend('vendoronboardapproval.ext.controller.Objectpage', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
			 * Called when a controller is instantiated and its View controls (if available) are already created.
			 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
			 * @memberOf vendoronboardapproval.ext.controller.Objectpage
			 */
			onInit: function () {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel();
			},
			routing: {
				onAfterBinding: async function () {
					debugger
					var fields = [
						"Total Landed Investment - Settled (Rs. lacs)",
						"Total Business value (Rs. Lac) 1st 12months",
						"Amount to be paid to M/s RKR (Lac) 1st 12 months",
						"Amount to be paid to M/s RKR (Lac) 2nd + 3rd Year",
						"YOY Reduction for 3 yrs (After SOP + 1 year)",
						"FX Base Rate",
						"Finished Weight of Part / System (kg)",
						"DTB Packaging Cost Rs",
						"Inco Terms",
						"Payment Terms",
						"Transport Cost"
					]
					var mainVbox = this.base.getView().getContent()[0].getSections()[1].getSubSections()[0].mAggregations._grid.mAggregations.content[0].getContent();
					mainVbox.getItems()[0].setWidth("40vw")

					debugger
					mainVbox.getItems()[0].getItems()[0].destroyColumns();
					mainVbox.getItems()[0].getItems()[0].destroyItems();
					mainVbox.getItems()[1].destroyItems();

					var oHboxDocument = mainVbox.getItems()[1];
					var otable = mainVbox.getItems()[0].getItems()[0];
					var id = '70ac0c95-4022-4da3-b6e6-4aea987d03f7'
					let oFunction1 = this.getView().getModel().bindContext("/documentscreenfunc(...)");
					var statusval1 = JSON.stringify({ id: id, status: "getvendordetails" })
					oFunction1.setParameter("status", statusval1)
					await oFunction1.execute()
					debugger
					var result1 = oFunction1.getBoundContext().getValue().value;
					var finalsupp = JSON.parse(result1);
					var firstColumn = new sap.m.Column({
						width: "500px",
						header: new HBox({
							items: [
								new Text({ text: "MGSP Part No", tooltip: "MGSP Part No" }),
								new Text({ text: "Existing MGSP PO Price", tooltip: "Existing MGSP PO Price" }).addStyleClass("paddingcolumns"),
								new Text({ text: "Target Price", tooltip: "Target Price" }).addStyleClass("paddingcolumns")
							],
							class: "coulmnwidth"
						}),
						// styleClass: "colunm1style"
					});
					otable.addColumn(firstColumn);
					for (let i = 0; i < finalsupp.yoy_details.length; i++) {
						let partdetails = finalsupp.yoy_details[i];
						var oColumnListItem = new ColumnListItem({
							cells: [
								new HBox({
									alignItems: "Center",
									items: [
										new Text({ text: partdetails.MGSP_Part_Nos, tooltip: partdetails.MGSP_Part_Nos }),
										new Text({ text: partdetails.Existing_MGSP_PO_Price }).addStyleClass("paddingItems"),
										new Text({ text: partdetails.target_price }).addStyleClass("paddingItems"),
									]
								}),
							]
						});

						// Set the model directly to the ColumnListItem
						var modelrow = new JSONModel({
							rowid: partdetails.id
						});
						oColumnListItem.setModel(modelrow, 'rowid');

						// Add the ColumnListItem to the table
						otable.addItem(oColumnListItem);
					}
					for (let field of fields) {
						var oColumnListItem1 = new ColumnListItem({
							cells: [
								new Text({ text: `${field}` }).addStyleClass("InputToTextClass"),
							]
						})
						var modelrow = new JSONModel({
							rowid: field
						});
						oColumnListItem1.setModel(modelrow, `rowid`);

						otable.addItem(oColumnListItem1);

					}
					function createColumnListItem(leftValue, rightValue) {
						var oColumnListItem = new ColumnListItem({
							cells: [
								new HBox({
									justifyContent: "SpaceBetween",
									items: [
										new Text({ text: leftValue }),
										new Text({ text: rightValue })
									]
								})
							]
						}).addStyleClass("capexUpperSectionClass");
						var modelrow = new JSONModel({
							rowid: rightValue
						});
						oColumnListItem.setModel(modelrow, `rowid`);
						return oColumnListItem;
					}

					const items = [
						["Capex", "Tooling / Dies / Moulds / Fixtures"],
						[" ", "Inspection Gauges"],
						["Revenue", "Testing / Validation"],
						[" ", "Engg Fees"],
						[" ", "Proto Tooling"],
						[" ", "Logistics Trollies"],
						[" ", "Total Landed Investment Settled"]
					];

					items.forEach(([left, right]) => {
						otable.addItem(createColumnListItem(left, right));
					});
					for (let supplier of finalsupp.suplier_detail_together) {
						console.log(supplier.supplier);
						var newSupplier = new Table({
							width: "20vw",
							columns: new Column({
								header: [
									new HBox({
										items: [
											new Text({ text: `${supplier.supplier}` })
										]
									})
								]
							})
						}).addStyleClass("tableClass");
						for (let i = 0; i < otable.getItems().length; i++) {
							let rowid = otable.getItems()[i].oModels.rowid.oData.rowid;
							// supplier.rel.forEach((relItem) => {
							// 	if (relItem.value_key === rowid) {
							// 		var oColumnListItem6 = new ColumnListItem({
							// 			cells: [
							// 				new Text({ text: `${relItem.value}` })
							// 			]
							// 		})
							// 		newSupplier.addItem(oColumnListItem6);
							// 	}
							// });

							let itemFound = supplier.rel.find(item => item.value_key == rowid);
							console.log(itemFound);
							if (itemFound) {
								var oColumnListItem6 = new ColumnListItem({
									cells: [
										new Text({ text: `${itemFound.value}` })
									]
								})
								newSupplier.addItem(oColumnListItem6);
							}
							else {
								var oColumnListItem6 = new ColumnListItem({
									cells: [
										new Text({ text: ` ` })
									]
								})
								newSupplier.addItem(oColumnListItem6);
							}

						}
						// for (const supplierdetail of supplier.rel) {

						// 	var oColumnListItem6 = new ColumnListItem({
						// 		cells: [
						// 			new Text({text:`${supplierdetail.value}`})
						// 		]
						// 	})
						// 	newSupplier.addItem(oColumnListItem6);
						// }


						// for (let i = 0; i < otable.getItems().length; i++) {
						// 	var oColumnListItem6 = new ColumnListItem({
						// 		cells: [
						// 			new Input()
						// 		]
						// 	})
						// 	newSupplier.addItem(oColumnListItem6);
						// }
						// Add the newly created column to the table
						oHboxDocument.addItem(newSupplier);
					}
				}
			}

		}
	});
});
