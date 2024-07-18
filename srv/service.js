const cds = require('@sap/cds');
module.exports = cds.service.impl(async function(){
    let{vobMain, YOY ,potentialSuplier} = this.entities;
    this.on('vendordetails',async (req) => {
        console.log("called");
        var reqdata = JSON.parse(req.data.status);
        var yoy_details = await SELECT.from(YOY).where({ vob_id: reqdata.id  });;
        let supplier = await SELECT.from(potentialSuplier).where({ id: reqdata.id });
        let details_final = JSON.stringify({ yoy_details,supplier});
        return details_final;
    });
})