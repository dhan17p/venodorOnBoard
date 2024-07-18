using {db} from '../db/schema';

service VOBService {
    @cds.redirection.target
    //    @odata.draft.enabled
    entity vobMain as projection on db.VOB;
    entity YOY as projection on db.YOY;
    entity potentialSuplier as projection on db.potential_suplier;
    entity supplierdetails as projection on db.supplierdetails;
    entity comment as projection on db.comment;   

  @odata.draft.enabled
    entity vobRequest  as projection on db.VOB;
    
    entity vobSupplier as projection on db.VOB;
//   @odata.draft.enabled
    entity vobDocument as projection on db.VOB;

    entity vobApproval as projection on db.VOB;

    // entity vobSupplier as projection on db.VOB;



    //function call
     function vendordetails(status : String) returns String;
}