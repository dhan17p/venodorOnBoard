namespace db;
using {
    cuid,
    managed
} from '@sap/cds/common';

entity VOB {
    key id                                          : UUID;
        part_system                                 : String;
        project_code_description                    : String;
        // project_description                         : String;
        sop                                         : String;
        sector                                      : String;
        potential_suppliers                         : String;
        supplier_assessment_score                   : String;
        forum                                       : String;
        presented_on_by                             : String;
        Team_Recommendation_with_Rationale          : String;
        Decision_MOM_of_Forum                       : String;
        Development_Supply_Agreement_Whether_Signed : String;
        Tooling_Agreement_signed                    : String;
        Supplier_Code_of_Conduct                    : String;
           SequentialVobId           : String;
        status                                      : String default 'n';
        vob_yoy                                     : Composition of many YOY
                                                          on vob_yoy.vob_id = id;
        vob_suplier                                 : Composition of many potential_suplier
                                                          on vob_suplier.id = id;
        vob_comments              : Composition of many comment
                                        on vob_comments.id = id;
        vob_files                 : Association to many Files
                                        on vob_files.vob_id = id;
        vob_to_Workflow_History   : Association to many Workflow_History
                                        on vob_to_Workflow_History.vob_id = id;
}
entity YOY {
    key id                  : UUID;
        vob_id              : UUID;
        MGSP_Part_Nos       : String;
        proposed_vf_part_no : String;
        application_model   : String;
        f24                 : String;
        f25                 : String;
        f26                 : String;
        total               : String;
        yoy_vov             : Association to VOB;
}
entity potential_suplier{
    key id_main                                : UUID;
        id                                     : UUID;
        suplier                                : String;
        potentialsuplierscr_to_supplierdetails : Composition of many supplierdetails
                                                     on potentialsuplierscr_to_supplierdetails.id_supplier = id_main;

}
entity supplierdetails : managed {
    key supplierdetailsid                       : UUID;
        id_supplier                             : UUID;
        value_key                               : String;
        value                                   : String;
        supplierdetails_to_potentialsuplierscr1 : Association to many potential_suplier;
};
entity comment : managed {
    key id_com  : UUID;
        id      : UUID;
        comment : String;
}
entity Files : cuid, managed {
    // key id1 : String;
    vob_id           : UUID;

    @Core.MediaType  : mediaType
    content          : LargeBinary;

    @Core.IsMediaType: true
    mediaType        : String;
    fileName         : String;
    // size: Integer;
    Folder           : String;
    url              : String;
    // contentString    : LargeString;
    Files_to_screen4 : Association to one VOB;
}
entity Workflow_History {
    key vob_id          : UUID;
    key employee_id     : String;
    key level           : String;
        title           : String;
        status          : String;
        employee_Name   : String;
        begin_Date_Time : String;
        end_Date_Time   : String;
        days_Taken      : String;
        approved_By     : String;
}

entity Master_workflow {
    key employee_id : String;
        level       : String;

}
entity Folder {
    key id          : String;
        Folder_Name : String;
        P_TO_C      : Composition of many Data
                          on P_TO_C.id = Folder_Name;
}

entity Data {
    id     : String;
    Data   : String;
    C_TO_P : Association to one Folder
                 on C_TO_P.Folder_Name = id;
}