using VOBService as service from '../../srv/service';
annotate service.vobDocument with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'part_system',
                Value : part_system,
            },
            {
                $Type : 'UI.DataField',
                Label : 'sop',
                Value : sop,
            },
            {
                $Type : 'UI.DataField',
                Label : 'sector',
                Value : sector,
            },
            {
                $Type : 'UI.DataField',
                Label : 'potential_suppliers',
                Value : potential_suppliers,
            },
            {
                $Type : 'UI.DataField',
                Label : 'supplier_assessment_score',
                Value : supplier_assessment_score,
            },
            {
                $Type : 'UI.DataField',
                Label : 'forum',
                Value : forum,
            },
            {
                $Type : 'UI.DataField',
                Label : 'presented_on_by',
                Value : presented_on_by,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Team_Recommendation_with_Rationale',
                Value : Team_Recommendation_with_Rationale,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Decision_MOM_of_Forum',
                Value : Decision_MOM_of_Forum,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Development_Supply_Agreement_Whether_Signed',
                Value : Development_Supply_Agreement_Whether_Signed,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Tooling_Agreement_signed',
                Value : Tooling_Agreement_signed,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Supplier_Code_of_Conduct',
                Value : Supplier_Code_of_Conduct,
            },
            {
                $Type : 'UI.DataField',
                Label : 'status',
                Value : status,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'General Information',
            ID : 'GeneralInformation',
            Target : '@UI.FieldGroup#GeneralInformation',
        },],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'part_system',
            Value : part_system,
        },
        {
            $Type : 'UI.DataField',
            Label : 'sop',
            Value : sop,
        },
        {
            $Type : 'UI.DataField',
            Label : 'sector',
            Value : sector,
        },
    ],
);

annotate service.vobDocument with @(
    UI.FieldGroup #GeneralInformation : {
        $Type : 'UI.FieldGroupType',
        Data : [
              {
                $Type : 'UI.DataField',
                Label : 'Part System',
                Value : part_system,
            },
            {
                $Type : 'UI.DataField',
                Value : project_code_description,
                Label : 'Project Code & Description',
            },
  {
                $Type : 'UI.DataField',
                Label : 'SOP',
                Value : sop,
            },
            {
                $Type : 'UI.DataField',
                Value : sector,
                Label : 'Sector',
            },
            {
                $Type : 'UI.DataField',
                Value : vob_suplier.suplier,
                Label : 'Potential Supplier',
            },
            {
                $Type : 'UI.DataField',
                Label : 'Supplier assessment score',
                Value : supplier_assessment_score,
            },
            {
                $Type : 'UI.DataField',
                Label : 'FORUM',
                Value : forum,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Presented On & By',
                Value : presented_on_by,
            },],
    }
);
