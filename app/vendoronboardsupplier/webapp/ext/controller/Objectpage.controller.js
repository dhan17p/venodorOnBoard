sap.ui.define(['sap/ui/core/mvc/ControllerExtension',
	'sap/m/HBox',
	"sap/m/Table",
	"sap/m/Column",
	"sap/m/ColumnListItem",
	"sap/m/Text",
	"sap/m/Input",
	"sap/m/Button",
	"sap/m/Dialog",
	"sap/m/CheckBox"
], function (ControllerExtension, HBox, Table, Column, ColumnListItem, Text, Input, Button, Dialog, CheckBox) {
	'use strict';

	return ControllerExtension.extend('vendoronboardsupplier.ext.controller.Objectpage', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
			 * Called when a controller is instantiated and its View controls (if available) are already created.
			 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
			 * @memberOf vendoronboardsupplier.ext.controller.Objectpage
			 */
			onInit: async function () {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				debugger

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
					//Header Actions
					var headerActions = this.base.getView().getContent()[0].getHeaderTitle();
					headerActions.destroyActions();
					//

					var mainVbox = this.base.getView().getContent()[0].getSections()[0].getSubSections()[0].mAggregations._grid.mAggregations.content[0].getContent();
					mainVbox.getItems()[0].setWidth("40vw")
					var oHboxSupplier = mainVbox.getItems()[1];
					var otable = mainVbox.getItems()[0].getItems()[0];
					var id = '70ac0c95-4022-4da3-b6e6-4aea987d03f7'
					let oFunction1 = this.getView().getModel().bindContext("/vendordetails(...)");
					var statusval1 = JSON.stringify({ id: id, status: "vobsupplier" })
					oFunction1.setParameter("status", statusval1)
					await oFunction1.execute()
					debugger
					var result1 = oFunction1.getBoundContext().getValue().value;
					var finalsupp = JSON.parse(result1);

					///////////////////////////////////

					//Add Vendor Button
					headerActions.addAction(new Button({
						text: `Add Vendor`,
						type: 'Accept',
						press: function (oEvent) {
							debugger
							if (!this.oDefaultDialog) {
								this.oDefaultDialog = new Dialog({
									title: "Add Vendor",
									content: new HBox({
										justifyContent: "SpaceBetween",
										items: [
											new Text({ text: "Vendor Name" }),
											new Input()
										]
									}),
									beginButton: new Button({
										type: "Emphasized",
										text: "OK",
										press: function (oEvent) {
											debugger

											var vendorName = oEvent.getSource().getParent().getContent()[0].getItems()[1].getValue();

											var newSupplier = new Table({
												width: "20vw",
												columns: new Column({
													header: [
														new HBox({

															items: [
																new sap.ui.core.Icon({
																	src: 'sap-icon://circle-task',
																	height: "10px",
																	press: function (oEvent) {
																		debugger
																		if (oEvent.getSource().getSrc() == "sap-icon://circle-task") {
																			oEvent.getSource().setSrc("sap-icon://bo-strategy-management")
																		}
																		else {
																			oEvent.getSource().setSrc("sap-icon://circle-task")
																		}
																	}
																}),
																new Text({ text: `${vendorName}` })
															]
														})
													]
												})
											});
											for (let i = 0; i < otable.getItems().length; i++) {
												var oColumnListItem6 = new ColumnListItem({
													cells: [
														new Input()
													]
												})
												newSupplier.addItem(oColumnListItem6);
											}
											// Add the newly created column to the table
											oHboxSupplier.addItem(newSupplier);

											this.oDefaultDialog.close();
										}.bind(this)
									}),
									endButton: new Button({
										text: "Close",
										press: function () {
											this.oDefaultDialog.close();
										}.bind(this)
									})
								})

								// to get access to the controller's model
								// this.getView().addDependent(this.oDefaultDialog);
							}

							this.oDefaultDialog.open();
							// var newSupplier = new Table({
							// 	width: "20vw",
							// 	columns: new Column({
							// 		header: new Text({ text: `${supplier.suplier}` })
							// 	}),
							// 	items: [
							// 		new ColumnListItem({
							// 			cells: [
							// 				new Input()
							// 			]
							// 		})
							// 	]
							// });
							// // Add the newly created column to the table
							// oHboxSupplier.addItem(newSupplier);
						}
					}))

					//Delete Button
					headerActions.addAction(new Button({
						text: `Delete`,
						type: 'Reject',
						press: function (oEvent) {
							debugger
							var oInnerHboxItem = mainVbox.getItems()[1].getItems();
							for (let i = 0; i < oInnerHboxItem.length; i++) {
								if (oInnerHboxItem[i].getColumns()[0].getHeader().getItems()[0].getSrc() == "sap-icon://bo-strategy-management") {
									oInnerHboxItem[i].destroy();
								}

							}
						}
					}))

					var firstColumn = new sap.m.Column({
						width: "500px",
						header: new HBox({
							items: [
								new Text({ text: "MGSP Part No" }),
								new Text({ text: "Existing MGSP PO Price", class: "paddingcolumns" }).addStyleClass("paddingcolumns"),
								new Text({ text: "Target Price", class: "paddingcolumns" }).addStyleClass("paddingcolumns")
							],
							class: "coulmnwidth"
						}),
						// styleClass: "colunm1style"
					});
					otable.addColumn(firstColumn);
					for (let partdetails of finalsupp.yoy_details) {
						var oColumnListItem = new ColumnListItem({
							cells: [
								new HBox({
									alignItems: "Center",
									items: [
										new Text({ text: partdetails.MGSP_Part_Nos }),
										new Input().addStyleClass("paddingItems"),
										new Input().addStyleClass("paddingItems"),
									]
								}),
							]
						})
						otable.addItem(oColumnListItem);
					}

					for (let field of fields) {
						var oColumnListItem1 = new ColumnListItem({
							cells: [
								new Input({ value: `${field}` }).addStyleClass("InputToTextClass"),
							]
						})
						otable.addItem(oColumnListItem1);

					}
					var oColumnListItem1 = new ColumnListItem({
						cells: [
							new HBox({
								justifyContent: "SpaceBetween",
								items: [
									new Input({ value: "Capex", editable: false }).addStyleClass("InputToTextClass"),
									new Input({ value: "Tooling / Dies / Moulds / Fixtures", editable: false }).addStyleClass("InputToTextClass")
								]
							})
						]
					}).addStyleClass("capexUpperSectionClass")
					otable.addItem(oColumnListItem1);
					var oColumnListItem2 = new ColumnListItem({
						cells: [
							new HBox({
								justifyContent: "SpaceBetween",
								items: [
									new Input({ value: " ", editable: false }).addStyleClass("InputToTextClass"),
									new Input({ value: "Inspection Gauges", editable: false }).addStyleClass("InputToTextClass")
								]
							})
						]
					})
					otable.addItem(oColumnListItem2);
					var oColumnListItem3 = new ColumnListItem({
						cells: [
							new HBox({
								justifyContent: "SpaceBetween",
								items: [
									new Input({ value: "Revenue", editable: false }).addStyleClass("InputToTextClass"),
									new Input({ value: "Testing / Validation", editable: false }).addStyleClass("InputToTextClass"),
								]
							})
						]
					})
					otable.addItem(oColumnListItem3);

					var oColumnListItem4 = new ColumnListItem({
						cells: [
							new HBox({
								justifyContent: "SpaceBetween",
								items: [
									new Input({ value: " ", editable: false }).addStyleClass("InputToTextClass"),
									new Input({ value: "Engg Fees", editable: false }).addStyleClass("InputToTextClass"),
								]
							})
						]
					})
					otable.addItem(oColumnListItem4);
					var oColumnListItem5 = new ColumnListItem({
						cells: [
							new HBox({
								justifyContent: "SpaceBetween",
								items: [
									new Input({ value: " ", editable: false }).addStyleClass("InputToTextClass"),
									new Input({ value: "Proto Tooling", editable: false }).addStyleClass("InputToTextClass")
								]
							})
						]
					})
					otable.addItem(oColumnListItem5);
					var oColumnListItem6 = new ColumnListItem({
						cells: [
							new HBox({
								justifyContent: "SpaceBetween",
								items: [
									new Input({ value: " ", editable: false }).addStyleClass("InputToTextClass"),
									new Input({ value: "Logistics Trollies", editable: false }).addStyleClass("InputToTextClass"),
								]
							})
						]
					})
					otable.addItem(oColumnListItem6);
					var oColumnListItem6 = new ColumnListItem({
						cells: [
							new HBox({
								justifyContent: "SpaceBetween",
								items: [
									new Input({ value: " ", editable: false }).addStyleClass("InputToTextClass"),
									new Input({ value: "Total Landed Investment Settled", editable: false }).addStyleClass("InputToTextClass"),
								]
							})
						]
					})
					otable.addItem(oColumnListItem6);




					for (let supplier of finalsupp.supplier) {
						var newSupplier = new Table({
							width: "20vw",
							columns: new Column({
								header: [
									new HBox({
										items: [
											new sap.ui.core.Icon({
												src: 'sap-icon://circle-task',
												height: "10px",
												press: function (oEvent) {
													debugger
													if (oEvent.getSource().getSrc() == "sap-icon://circle-task") {
														oEvent.getSource().setSrc("sap-icon://bo-strategy-management")
													}
													else {
														oEvent.getSource().setSrc("sap-icon://circle-task")
													}
												}
											}),
											new Text({ text: `${supplier.suplier}` })
										]
									})
								]
							})
						});
						for (let i = 0; i < otable.getItems().length; i++) {
							var oColumnListItem6 = new ColumnListItem({
								cells: [
									new Input()
								]
							})
							newSupplier.addItem(oColumnListItem6);
						}
						// Add the newly created column to the table
						oHboxSupplier.addItem(newSupplier);
					}



					// 	var oModel = this.base.getExtensionAPI().getModel();
					// 	// var table = this.getInterface().getView().mAggregations.content[0].mAggregations.sections[0].mAggregations._grid.mAggregations.content[0].mAggregations.blocks[0].mAggregations.content.mAggregations.items[0].mAggregations.content[0]
					// 	var table = sap.ui.getCore().byId("vendoronboardsupplier::vobSupplierObjectPage--fe::CustomSubSection::VendoronBoard--parentTable");
					// 	var firstColumn = new sap.m.Column({
					// 		width: "500px",
					// 		header: new HBox({
					// 			items: [
					// 				new Text({ text: "MGSP Part No", wrapping: false }),
					// 				new Text({ text: "Existing MGSP PO Price", wrapping: false, class: "paddingcolumns" }).addStyleClass("paddingcolumns"),
					// 				new Text({ text: "Target Price", wrapping: false, class: "paddingcolumns" }).addStyleClass("paddingcolumns")
					// 			],
					// 			class: "coulmnwidth"
					// 		}),
					// 		styleClass: "colunm1style"
					// 	});		
					// 	var secondColumn = new sap.m.Column({
					// 		width: "250px",
					// 		header: new sap.m.Text({ text: "supplier1" })
					// 	});
					// 	// firstColumn.mAggregations.header.mAggregations.items[1].addStyleClass("paddingcolumns")
					// 	// firstColumn.mAggregations.header.mAggregations.items[2].addStyleClass("paddingcolumns")
					// 	table.addColumn(firstColumn)
					// 	table.addColumn(secondColumn)
					// debugger
					// var id ='70ac0c95-4022-4da3-b6e6-4aea987d03f7'
					// 	let oFunction1 = this.getView().getModel().bindContext("/vendordetails(...)");
					// 	var statusval1 = JSON.stringify({ id: id, status: "vobsupplier" })
					// 	oFunction1.setParameter("status", statusval1)
					// 	await oFunction1.execute()
					// 	debugger
					// 	var result1 = oFunction1.getBoundContext().getValue().value;
					// 	var finalsupp = JSON.parse(result1);
					// 	debugger;
					// 	for(let supplier of finalsupp.supplier){
					// 		let newColumn = new sap.m.Column({
					// 			width: "250px",
					// 			header: new sap.m.Text({ text: supplier.supplier })
					// 		});
					// 		// Add the newly created column to the table
					// 		table.addColumn(newColumn);
					// 	}
					// 	for(let partdetails of finalsupp.yoy_details){
					// 		var oColumnListItem = new ColumnListItem({
					// 			cells:[
					// 				new HBox({
					// 					items: [
					// 						new Text({ text: partdetails.MGSP_Part_Nos, wrapping: false }),
					// 						new Input().addStyleClass("paddingItems"),
					// 						new Input().addStyleClass("paddingItems"),
					// 					]
					// 				}),
					// 				new sap.m.Input(),
					// 				new sap.m.Input(),
					// 				new sap.m.Input()
					// 			]
					// 		})
					// 		table.addItem(oColumnListItem);
					// 	}
					// 	// for(let partdetails of finalsupp.yoy_details){
					// 	// 	var hbox = new HBox();
					// 	// // 	let columnListItem = new sap.m.ColumnListItem();
					// 	// // }
					// 	// let columnListItem = new sap.m.ColumnListItem();
					// 	// let cells = new sap.m.Input();
					// 	// // cells.addItems(hbox);
					// 	// var content = new sap.m.Text({
					// 	// 	text: "dddd"
					// 	// });
					// 	// // hbox.addItems(content);
					// 	// columnListItem.addItems(content);
					// 	// table.addItems(columnListItem);
					// 	var oColumnListItem = new sap.m.ColumnListItem({
					// 		cells: [
					// 			new HBox({
					// 				items: [
					// 					new sap.m.Text({ text: "ddd", wrapping: false }),
					// 					new sap.m.Text({ text: "ddd", wrapping: false}).addStyleClass("paddingItems"),
					// 					new sap.m.Text({ text: "3rd", wrapping: false, class: "paddingItems" })
					// 				]
					// 			}),
					// 			new sap.m.Input(),
					// 			new sap.m.Input(),
					// 			new sap.m.Input()
					// 		]
					// 	});

					// Add the ColumnListItem to the table
					// table.addItem(oColumnListItem);	


				}
			}
		}
	});
});
