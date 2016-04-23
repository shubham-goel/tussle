// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/level/level.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            set_locked_color("m1l1");
            set_locked_color("m2l1");
            set_locked_color("m2l2");
            set_locked_color("m2l3");
            set_locked_color("m3l1");

            document.querySelector("#m1l1").onclick = function (args) {
                if (check_lock("m1l1")) {
                    WinJS.Navigation.navigate("/pages/box2d/page.html");
                }
            };

            document.querySelector("#m2l1").onclick = function (args) {
                if (check_lock("m2l1")) {
                    var dat = localStorage.getItem("m2l1");
                    localStorage.setItem("m2temp", dat);
                    WinJS.Navigation.navigate("/pages/box2d/page2.html");
                }
            };
            document.querySelector("#m2l2").onclick = function (args) {
                if (check_lock("m2l2")) {
                    var dat = localStorage.getItem("m2l2");
                    localStorage.setItem("m2temp", dat);
                    WinJS.Navigation.navigate("/pages/box2d/page2.html");
                }
            };
            document.querySelector("#m2l3").onclick = function (args) {
                if (check_lock("m2l3")) {
                    var dat = localStorage.getItem("m2l3");
                    localStorage.setItem("m2temp", dat);
                    WinJS.Navigation.navigate("/pages/box2d/page2.html");
                }
            };
            document.querySelector("#m3l1").onclick = function (args) {
                if (check_lock("m3l1")) {
                    WinJS.Navigation.navigate("/pages/box2d/page3.html");
                }
            }

            function check_lock(name) {
                var vname = name + "_lock";
                var flag = JSON.parse(localStorage.getItem(vname));
                if (flag) {
                    alert("Locked", "You must complete previous levels first");
                    return false;
                }
                else {
                    return true;
                }
            }


            function set_locked_color(name) {
                var vname = name + "_lock";
                var flag = JSON.parse(localStorage.getItem(vname));
                if (flag) {
                    document.getElementById(name).style.color = "gray";
                }
                else {
                    document.getElementById(name).style.color = "yellow";
                }
            }
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

function alert(title, content) {
    var msg = new Windows.UI.Popups.MessageDialog(content, title); msg.showAsync();
}