sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'vendoronboardapproval',
            componentId: 'YOYObjectPage',
            contextPath: '/vobApproval/vob_yoy'
        },
        CustomPageDefinitions
    );
});