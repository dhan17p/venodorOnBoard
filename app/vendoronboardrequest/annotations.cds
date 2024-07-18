using VOBService as service from '../../srv/service';
annotate service.vobRequest with @(
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
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'YOY Annual Projection',
            ID : 'YOYAnnualProjection',
            Target : 'vob_yoy/@UI.LineItem#YOYAnnualProjection',
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

annotate service.vobRequest with @(
    UI.HeaderInfo : {
        TypeName : '    ',
        TypeNamePlural : '',
    }
);
annotate service.YOY with @(
    UI.LineItem #YOYAnnualProjection : [
       {
            $Type : 'UI.DataField',
            Value : MGSP_Part_Nos,
            Label : 'MGSP Part Nos',
        },{
            $Type : 'UI.DataField',
            Value : proposed_vf_part_no,
            Label : 'Proposed VF Part No',
        },{
            $Type : 'UI.DataField',
            Value : application_model,
            Label : 'Application Model',
        },{
            $Type : 'UI.DataField',
            Value : f24,
            Label : 'F24',
        },{
            $Type : 'UI.DataField',
            Value : f25,
            Label : 'F25',
        },{
            $Type : 'UI.DataField',
            Value : f26,
            Label : 'F26',
        },]
);
