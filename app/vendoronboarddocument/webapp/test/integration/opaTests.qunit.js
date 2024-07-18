sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'vendoronboarddocument/test/integration/FirstJourney',
		'vendoronboarddocument/test/integration/pages/vobDocumentList',
		'vendoronboarddocument/test/integration/pages/vobDocumentObjectPage',
		'vendoronboarddocument/test/integration/pages/YOYObjectPage'
    ],
    function(JourneyRunner, opaJourney, vobDocumentList, vobDocumentObjectPage, YOYObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('vendoronboarddocument') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onThevobDocumentList: vobDocumentList,
					onThevobDocumentObjectPage: vobDocumentObjectPage,
					onTheYOYObjectPage: YOYObjectPage
                }
            },
            opaJourney.run
        );
    }
);