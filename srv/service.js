const cds = require('@sap/cds');
// const { v4: uuidv4 } = require('uuid');
const { uuid } = cds.utils
module.exports = cds.service.impl(async function () {
    let { vobDocument, vobMain, YOY, potentialSuplier, comment, supplierdetails } = this.entities;
    this.on('vendordetails', async (req) => {
        console.log("called");
        var reqdata = JSON.parse(req.data.status);
        var yoy_details = await SELECT.from(YOY).where({ vob_id: reqdata.id });;
        let supplier = await SELECT.from(potentialSuplier).where({ id: reqdata.id });
        let details_final = JSON.stringify({ yoy_details, supplier });
        return details_final;
    });
    this.on('commentfunction', async (req) => {
        console.log("INside Comment Function")
        var reqdata = JSON.parse(req.data.status);
        let value = await SELECT.from(comment).where({ id: reqdata.id });
        value = JSON.stringify(value)
        return value;
    });
    this.on('onSubmitFunc', async (req) => {
        var reqdata = JSON.parse(req.data.status);
        if (reqdata.status == 'submitsecondscreen') {
            var partdetails = reqdata.partdetails || [];
            var supplier_details_new = reqdata.supplier_details_new || [];
            var supplier_details_old = reqdata.supplier_details_old || [];
            if (partdetails.length > 0) {
                for (const partdetail of partdetails) {
                    await UPDATE(YOY, partdetail.id).with({
                        Existing_MGSP_PO_Price: partdetail.Existing_MGSP_PO_Price,
                        target_price: partdetail.target_price
                    });
                }
            }
            if (supplier_details_new.length > 0) {
                console.log("inside new")
                console.log(supplier_details_new);
                for (let i = 0; i < supplier_details_new.length; i++) {
                    let id_main1 = uuid();
                    const supplier_detail = supplier_details_new[i];
                    // let supplier_new_id = supplier_detail[supplier_detail.length - 1].id;
                    let supplier_new_id = uuid();
                    if (i == 0) {
                        let supplier_new_name = supplier_detail[supplier_detail.length - 1].name;
                        await INSERT.into(potentialSuplier).entries({
                            "id_main": `${supplier_new_id}`,
                            "id": `${reqdata.id}`,
                            "suplier": `${supplier_new_name}`
                        });
                    }
                    for (j = 0; j < supplier_details_new[i].length; j++) {

                        if (j == supplier_details_new[i].length - 1) {
                            break;
                        }
                        if(supplier_details_new[i][j].value){
                        await INSERT.into(supplierdetails).entries(
                            { id_supplier: supplier_new_id, value_key: supplier_details_new[i][j].value_key, value: supplier_details_new[i][j].value })
                        }
                    }
                }
            }
            if (supplier_details_old.length > 0) {
                for (i = 0; i < supplier_details_old.length; i++) {
                    for (j = 0; j < supplier_details_old[i].length; j++) {
                        if(supplier_details_old[i][j].value){ 
                            console.log(supplier_details_old[i][j].value)
                        await INSERT.into(supplierdetails).entries(
                            { id_supplier: supplier_details_old[i][j].id_supplier, value_key: supplier_details_old[i][j].value_key, value: supplier_details_old[i][j].value })
                        }
                    }
                }
            }
        }
    })
    this.on('documentscreenfunc', async (req) => {
        var reqdata = JSON.parse(req.data.status);
        if (reqdata.status == 'getvendordetails') {
            let partdetails = await SELECT.from(YOY);
            let yoy_details = await SELECT.from(YOY).where({ vob_id: reqdata.id });
            let suppliers = await SELECT.from(potentialSuplier).where({ id: reqdata.id });
            let vob_details = await SELECT.from(vobDocument).where({ id: reqdata.id })
            var suplier_detail_together = []
            for (let supplier of suppliers) {
                // Fetch the supplier details for the current supplier
                let supplierDetails = await SELECT.from(supplierdetails).where({ id_supplier: supplier.id_main });

                // Create a new object for the current supplier
                let newObj = {
                    supplier: supplier.suplier, // Assuming suplier is the property containing the supplier name
                    rel: supplierDetails
                };

                // Push the new object into the array
                suplier_detail_together.push(newObj);
            }
            // let supplier_detais = await SELECT.from(supplierdetails).where({ vob_id: reqdata.id });
            let venordssString = JSON.stringify({ suppliers, yoy_details, suplier_detail_together, vob_details });
            return venordssString;

        }

    })

})