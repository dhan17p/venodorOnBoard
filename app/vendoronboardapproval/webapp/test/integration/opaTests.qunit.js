sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'vendoronboardapproval/test/integration/FirstJourney',
		'vendoronboardapproval/test/integration/pages/vobApprovalList',
		'vendoronboardapproval/test/integration/pages/vobApprovalObjectPage',
		'vendoronboardapproval/test/integration/pages/YOYObjectPage'
    ],
    function(JourneyRunner, opaJourney, vobApprovalList, vobApprovalObjectPage, YOYObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('vendoronboardapproval') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onThevobApprovalList: vobApprovalList,
					onThevobApprovalObjectPage: vobApprovalObjectPage,
					onTheYOYObjectPage: YOYObjectPage
                }
            },
            opaJourney.run
        );
    }
);