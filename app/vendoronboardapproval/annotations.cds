using VOBService as service from '../../srv/service';
annotate service.vobApproval with @(
    UI.FieldGroup #GeneratedGroup : {
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
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
    ],
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

