sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'vendoronboardrequest/test/integration/FirstJourney',
		'vendoronboardrequest/test/integration/pages/vobRequestList',
		'vendoronboardrequest/test/integration/pages/vobRequestObjectPage'
    ],
    function(JourneyRunner, opaJourney, vobRequestList, vobRequestObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('vendoronboardrequest') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onThevobRequestList: vobRequestList,
					onThevobRequestObjectPage: vobRequestObjectPage
                }
            },
            opaJourney.run
        );
    }
);