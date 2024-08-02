sap.ui.define([
    "sap/m/MessageToast",
    "sap/m/library",
], function (MessageToast, mobileLibrary) {
    'use strict';

    var DialogType = mobileLibrary.DialogType;

    return {
        submit: function (oEvent) {
            MessageToast.show("Custom handler invoked.");
            var dialogId = sap.ui.core.Fragment.createId("dialogid");
            var labelId = sap.ui.core.Fragment.createId("labelid");
            var label = new sap.m.Label(labelId, {
                text: "Are you sure you want to submit?",
            })
            label.addStyleClass("labeldialogsave")
            this.oDialog = new sap.m.Dialog(dialogId, {
                title: "Submit",
                type: DialogType.Message,
                content: [label],
                beginButton: new sap.m.Button({
                    text: "OK",
                    press: async function (oBindingContext, oEvent) {
                        debugger

                        function generateUID() {
                            // Generate a random number and convert it to base 36
                            var randomPart = Math.random().toString(36).substr(2, 9);

                            // Get the current timestamp and convert it to base 36
                            var timestampPart = Date.now().toString(36);

                            // Concatenate the timestamp and random parts to form the UID
                            var uid = timestampPart + randomPart;

                            return uid;
                        }
                        this.oDialog.close();
                        var supplierHBox = sap.ui.getCore().byId(jQuery("[id$='HboxSupplier']").attr("id"))
                        var parttable = sap.ui.getCore().byId(jQuery("[id$='parentTable']").attr("id"))
                        var partdetails = [];
                        for (let i = 0; i < parttable.getItems().length; i++) {
                            var rowid = parttable.mAggregations.items[i].oModels.rowid ?? null;
                            if (rowid) {
                                var rowdetails = {
                                    "id": `${rowid.oData.rowid}`,
                                    "Existing_MGSP_PO_Price": `${parttable.mAggregations.items[i].mAggregations.cells[0].mAggregations.items[1].mProperties.value}`,
                                    "target_price": `${parttable.mAggregations.items[i].mAggregations.cells[0].mAggregations.items[2].mProperties.value}`
                                }
                                partdetails.push(rowdetails);
                            }
                            else {
                                debugger
                                break;

                            }
                        }
                        var supplier_details_new = [];
                        var supplier_details_old = [];
                        for (let supplier of supplierHBox.getItems()) {
                            debugger
                            var supplier_details = [];
                            for (let i = 0; i < partdetails.length; i++) {
                                var supplier_detail = {
                                    "id_supplier": `${supplier.oModels.supplier_id?.oData?.supplierid ?? null}`,
                                    "value_key": `${parttable.mAggregations.items[i].oModels.rowid.oData.rowid}`,
                                    "value": `${supplier.mAggregations.items[i].mAggregations.cells[0].mProperties?.value ?? ''}`
                                }
                                supplier_details.push(supplier_detail);
                            }
                            for (let i = partdetails.length; i < supplier.getItems().length; i++) {
                                debugger

                                if (parttable.getItems()[i].getCells()[0].mAggregations.items) {
                                    var supplier_detail = {
                                        "id_supplier": `${supplier.oModels.supplier_id?.oData?.supplierid ?? null}`,
                                        "value_key": `${parttable.mAggregations.items[i].mAggregations.cells[0].getItems()[1].getValue()}`,
                                        "value": `${supplier.mAggregations.items[i].mAggregations.cells[0].mProperties?.value ?? ''}`
                                    }
                                }
                                else {
                                    var supplier_detail = {
                                        "id_supplier": `${supplier.oModels.supplier_id?.oData?.supplierid ?? null}`,
                                        "value_key": `${parttable.mAggregations.items[i].mAggregations.cells[0].mProperties.value}`,
                                        "value": `${supplier.mAggregations.items[i].mAggregations.cells[0].mProperties?.value ?? ''}`
                                    }
                                }
                                supplier_details.push(supplier_detail);
                            }

                            if (supplier.oModels?.supplier_id?.oData?.supplierid ?? null) {
                                supplier_details_old.push(supplier_details);
                            }
                            else {
                                debugger
                                supplier_details.push({ "id": `${generateUID()}`, "name": `${supplier.getColumns()[0].getHeader().getItems()[1].getText()}` })
                                supplier_details_new.push(supplier_details);
                            }
                        }
                        var id = '70ac0c95-4022-4da3-b6e6-4aea987d03f7';
                        let oFunction1 = this.getModel().bindContext("/onSubmitFunc(...)");
                        var statusval1 = JSON.stringify({ id: id, status: "submitsecondscreen",partdetails:partdetails,supplier_details_new:supplier_details_new,supplier_details_old:supplier_details_old })
                        oFunction1.setParameter("status", statusval1)
                        await oFunction1.execute()


                        console.log(supplier_details_new)
                        console.log(supplier_details_old)
                        console.log(partdetails);

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
    };
});
