sap.ui.define([
    "sap/m/MessageToast"
], function (MessageToast) {
    'use strict';

    return {
        onPress: async function (oEvent) {
            debugger
            MessageToast.show("Custom handler invoked.");
            // var str = this.getBindingContext().sPath;
            // // Regular expression to match the UUID pattern within parentheses
            // var uuidRegex = /\(([^)]+)\)/;

            // // Extracting the UUID from the string using match function and regex
            // var match = str.match(uuidRegex);

            // // Check if match is found and extract the UUID
            // var extractedUuid = match ? match[1] : null;

            // var currentUrl = window.location.href;
            // var uuidRegex = /id=([0-9a-fA-F-]+),/;
            // var extractedUuid = currentUrl.match(uuidRegex)[1];
            var extractedUuid = "70ac0c95-4022-4da3-b6e6-4aea987d03f7";

            var cdialog = new sap.m.Dialog({
                title: "Comments",
                endButton: new sap.m.Button({
                    text: "Close",
                    press: async function () {
                        cdialog.close();
                    },
                    layoutData: new sap.m.FlexItemData({
                        // Add layoutData for flexible item behavior
                        growFactor: 5,
                        alignSelf: "End" // Align the button to the end (right)
                    })
                })
            });
            cdialog.addContent(new sap.m.VBox({
                width: "60vw"
            }));

            function generateUniqueId() {
                // Generate a random number
                var randomNumber = Math.floor(Math.random() * 1000000);

                // Get the current timestamp
                var timestamp = new Date().getTime();

                // Combine timestamp and random number to create a unique ID
                var uniqueId = timestamp + '-' + randomNumber;

                return uniqueId;
            }
            debugger
            // var comment_value = sap.ui.getCore().byId("vobmah::VOBObjectPage--fe::CustomSection::Comments-innerGrid").mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.items[0].mAggregations.items[0].mProperties.value
            let oFunction1 = this.getModel().bindContext("/commentfunction(...)");
            var statusval1 = JSON.stringify({ id: extractedUuid, status: "screen2commentview" })
            oFunction1.setParameter("status", statusval1)
            await oFunction1.execute()
            debugger
            var result1 = oFunction1.getBoundContext().getValue()?.value;
            var comments = JSON.parse(result1);
            comments.forEach(function (entry) {
                var oTimelineItem = new sap.suite.ui.commons.TimelineItem(("thisuniqid1" + generateUniqueId()), {
                    dateTime: entry.createdAt,
                    // title: "demo title1",
                    userNameClickable: false,
                    // userNameClicked: "onUserNameClick",
                    // select: "onPressItems",
                    // userPicture: "Photo",
                    text: entry.comment,
                    userName: entry.createdBy
                });
                cdialog.addContent(oTimelineItem);
                debugger

            });
            // var oTimelineItem1 = new sap.suite.ui.commons.TimelineItem(("thisuniqid2"+generateUniqueId()),{
            //     dateTime: "12/3/34",
            //     // title: "demo title1",
            //     userNameClickable: false,
            //     // userNameClicked: "onUserNameClick",
            //     // select: "onPressItems",
            //     // userPicture: "Photo",
            //     text: 'Demo Comment Decision & MOM of Forum',
            //     userName: "Decision & MOM of Forum"
            // });
            // var oTimelineItem2 = new sap.suite.ui.commons.TimelineItem(("thisuniqid2"+generateUniqueId()),{
            //     dateTime: "12/3/34",
            //     // title: "demo title1",
            //     userNameClickable: false,
            //     // userNameClicked: "onUserNameClick",
            //     // select: "onPressItems",
            //     // userPicture: "Photo",
            //     text: 'Demo Comment Tooling Agreement signed',
            //     userName: "Tooling Agreement signed"                
            // });

            // cdialog.addContent(oTimelineItem);
            // cdialog.addContent(oTimelineItem1);
            // cdialog.addContent(oTimelineItem2);

            cdialog.open(); // Open the dialog
            debugger

        }
    };
});
