(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/home/home.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.

            //var next_page = document.getElementById("lvl1");
            //next_page.addEventListener("click", function (evt) {
            //    evt.preventDefault(); WinJS.Navigation.navigate("/pages/landing/landing.html")
            //})
            document.querySelector("#land").onclick = function (args) {
                WinJS.Navigation.navigate("/pages/landing/landing.html");
            };


            //////////////// SET LOCAL STORAGE ///////////////
            localStorage.setItem('m1l1_lock', JSON.stringify(false));

            localStorage.setItem('m2l1_lock', JSON.stringify(false));
            localStorage.setItem('m2l2_lock', JSON.stringify(true));
            localStorage.setItem('m2l3_lock', JSON.stringify(true));

            localStorage.setItem('m3l1_lock', JSON.stringify(false));

            var data1 = new game_data(0, 0, 0, 0, 48, 45);
            var data2 = new game_data(0, 60, 0, 0, 20, 75);
            var data3 = new game_data(0, 40, 0, -20, 20, 75);
            localStorage.setItem('m2l1', JSON.stringify(data1));
            localStorage.setItem('m2l2', JSON.stringify(data2));
            localStorage.setItem('m2l3', JSON.stringify(data3));
            localStorage.setItem('m2temp', JSON.stringify(data1));
            
        }
    });

    
})();

function game_data(kid_x, kid_speed_x, target_x, target_speed_x, water_speed_x, correct_ans) {
    this.kid_x = kid_x, //to be obtained
    this.kid_speed_x = kid_speed_x, //to be obtained
    this.target_x = target_x, //to be obtained
    this.target_speed_x = target_speed_x, //to be obtained
    this.water_speed_x = water_speed_x, //to be obtained
    this.correct_ans = correct_ans //to be obtained
};