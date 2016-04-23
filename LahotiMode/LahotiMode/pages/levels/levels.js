// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/levels.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.

            //var next_page = document.getElementById("lvl1");
            //next_page.addEventListener("click", function (evt) {
            //    evt.preventDefault(); WinJS.Navigation.navigate("/pages/box2D/page.html")
            //})
            

            //next_page = document.getElementById("lvl2");
            //next_page.addEventListener("click", function (evt) {
            //    evt.preventDefault(); WinJS.Navigation.navigate("/pages/box2D/page2.html")
            //})

            //next_page = document.getElementById("lvl3");
            //next_page.addEventListener("click", function (evt) {
            //    evt.preventDefault(); WinJS.Navigation.navigate("/pages/box2D/page3.html")
            //})

            document.querySelector("#lvl1").onclick = function (args) {
                WinJS.Navigation.navigate("/pages/box2d/page.html");
            };
            document.querySelector("#lvl2").onclick = function (args) {
                WinJS.Navigation.navigate("/pages/box2d/page2.html");
            };
            document.querySelector("#lvl3").onclick = function (args) {
                WinJS.Navigation.navigate("/pages/box2d/page3.html");
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
