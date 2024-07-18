sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'vendoronboardsupplier/test/integration/FirstJourney',
		'vendoronboardsupplier/test/integration/pages/vobSupplierList',
		'vendoronboardsupplier/test/integration/pages/vobSupplierObjectPage',
		'vendoronboardsupplier/test/integration/pages/YOYObjectPage'
    ],
    function(JourneyRunner, opaJourney, vobSupplierList, vobSupplierObjectPage, YOYObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('vendoronboardsupplier') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onThevobSupplierList: vobSupplierList,
					onThevobSupplierObjectPage: vobSupplierObjectPage,
					onTheYOYObjectPage: YOYObjectPage
                }
            },
            opaJourney.run
        );
    }
);