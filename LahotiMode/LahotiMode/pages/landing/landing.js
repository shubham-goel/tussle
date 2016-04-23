// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/landing/landing.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.

            //var next_page = document.getElementById("lvl1");
            //next_page.addEventListener("click", function (evt) {
            //    evt.preventDefault(); WinJS.Navigation.navigate("/pages/home/home.html")
            //})
            document.querySelector("#lvls").onclick = function (args) {
                WinJS.Navigation.navigate("/pages/level/level.html");
            };

        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in layout.
        }
    });
})();
