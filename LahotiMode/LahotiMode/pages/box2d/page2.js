// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {

    WinJS.UI.Pages.define("/pages/box2d/page2.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            document.getElementById("submit_btn").addEventListener("click", function () {
                trigger();
            });


            var global_game = null;
            var level = null;
            var ico_size = 60;

            function init() {
                var game_data = JSON.parse(localStorage.getItem("m2temp"));
                //var game_data = {
                //    kid_x: 0, //to be obtained
                //    kid_speed_x: 0, //to be obtained
                //    target_x: 0, //to be obtained
                //    target_speed_x: 0, //to be obtained
                //    water_speed_x: 16, //to be obtained
                //    correct_ans: 15 //to be obtained
                //};

                if (game_data.kid_speed_x == 0) {
                    level = 1;
                }
                else if (game_data.kid_speed_x == 60) {
                    level = 2;
                }
                else if (game_data.kid_speed_x == 40) {
                    level = 3;
                }
                global_game = new game(game_data);
            }

            function game(options) {
                this.canvas = document.getElementById('canvas_area');
                this.ctx = this.canvas.getContext('2d');
                this.game_data = options;
                this.tick = 50;
                this.water_width = 800;
                this.water_height = 300;
                this.margin_x = (this.canvas.width - this.water_width) / 2;
                this.margin_y = (this.canvas.height - this.water_height) / 2;
                this.first_time = true;
                this.elements = [];
                this.reset();
            }

            game.prototype.reset = function () {
                this.current_state = {
                    kid_x: this.game_data.kid_x,
                    kid_y: 0,
                    kid_speed_x: 0,
                    kid_speed_y: 0,
                    target_x: this.game_data.target_x,
                    target_speed_x: 0
                };
                // console.log(this.current_state);
                this.display();
            }


            game.prototype.display = function () {

                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                // for(var elem in this.elements){
                // 	elem.display();
                // }

                // this.ctx.strokeStyle = '#000000';
                // console.log(this.canvas.width);
                // console.log(this.canvas.height);
                // console.log(this.margin_x);
                // console.log(this.margin_y);
                // console.log(this.current_state.kid_x);
                // console.log(this.margin_y + this.water_height - this.current_state.kid_y);
                // this.ctx.strokeRect(this.margin_x + this.water_width*0.3 + this.current_state.kid_x, this.margin_y + this.water_height - this.current_state.kid_y, 20, 20);
                // this.ctx.strokeStyle = '#000000';
                // console.log(this.margin_x + this.water_width*0.7 + this.current_state.target_x);
                // this.ctx.strokeRect(this.margin_x + this.water_width*0.7 + this.current_state.target_x, this.margin_y - 20, 20, 20);

                var donedone = this.ctx;
                // var sea_img = new Image;
                // sea_img.onload = function() {
                // 	donedone.drawImage(sea_img, global_game.margin_x, global_game.margin_y, global_game.water_width, global_game.water_height);
                //    // }
                //    // sea_img.src = "sea.jpg"
                var yoda_img = new Image;
                yoda_img.onload = function () {
                    donedone.drawImage(yoda_img, global_game.margin_x + global_game.water_width * 0.3 + global_game.current_state.kid_x, global_game.margin_y + global_game.water_height - global_game.current_state.kid_y, ico_size, ico_size);
                }
                yoda_img.src = "yoda.png"

                var lightsabre_img = new Image;
                lightsabre_img.onload = function () {
                    donedone.drawImage(lightsabre_img, global_game.margin_x + global_game.water_width * 0.7 + global_game.current_state.target_x, global_game.margin_y - ico_size, ico_size, ico_size);
                }
                lightsabre_img.src = "lightsabre.png"

                donedone.globalAlpha = 0.4;
                donedone.fillStyle = "cyan";
                donedone.fillRect(this.margin_x, this.margin_y, this.water_width, this.water_height);
                donedone.globalAlpha = 1.0;

                if (true) {
                    this.ctx.lineWidth = 2;

                    this.canvas_arrow(ico_size + this.margin_x + this.water_width * 0.3 + 0, ico_size / 2 + this.margin_y + this.water_height - 0,
                        ico_size + this.water_width * 0.76, ico_size / 2 + this.margin_y + this.water_height - 0);
                    this.canvas_arrow(ico_size + this.water_width * 0.76, ico_size / 2 + this.margin_y + this.water_height - 0,
                            ico_size + this.margin_x + this.water_width * 0.3 + 0, ico_size / 2 + this.margin_y + this.water_height - 0);

                    this.canvas_arrow(this.water_width + this.margin_x * 1.3, this.water_height + this.margin_y, this.water_width + this.margin_x * 1.3, this.margin_y);
                    this.canvas_arrow(this.water_width + this.margin_x * 1.3, this.margin_y, this.water_width + this.margin_x * 1.3, this.water_height + this.margin_y);

                    this.ctx.fillStyle = "white";

                    this.ctx.font = "14px Verdana";
                    this.ctx.fillText(this.water_height.toString(), this.water_width + this.margin_x * 1.45, this.water_height * 0.5 + this.margin_y);
                    this.ctx.fillText((this.water_width * 0.4).toString(),
                        this.margin_x + this.water_width * 0.55,
                        ico_size / 2 + this.margin_y * 1.2 + this.water_height);
                    var text = "The river force pushes Yoda with speed ";
                    text = text.concat(this.game_data.water_speed_x.toString(), " m/s");
                    this.ctx.fillText(text, this.margin_x * 1.3, this.margin_y * 1.8);

                    this.canvas_arrow(this.margin_x * 1.3, this.margin_y * 1.2, this.margin_x * 2.0 + this.water_width * 0.1, this.margin_y * 1.2);
                    this.canvas_arrow(this.margin_x * 1.3, this.margin_y * 1.4, this.margin_x * 2.0 + this.water_width * 0.1, this.margin_y * 1.4);

                    var yodaspeed = this.game_data.kid_speed_x.toString();
                    yodaspeed = yodaspeed.concat(" m/s");
                    this.ctx.fillText(yodaspeed, this.margin_x + this.water_width * 0.31, this.margin_y + this.water_height + 80);
                    this.canvas_arrow(this.margin_x + this.water_width * 0.29, this.margin_y + this.water_height + 65, this.margin_x + this.water_width * 0.39, this.margin_y + this.water_height + 65);

                    var sabrespeed = this.game_data.target_speed_x.toString();
                    sabrespeed = sabrespeed.concat(" m/s");
                    this.ctx.fillText(sabrespeed, this.margin_x + this.water_width * 0.8, this.margin_y - 10);
                    this.canvas_arrow(this.margin_x + this.water_width * 0.78, this.margin_y - 30, this.margin_x + this.water_width * 0.88, this.margin_y - 30);

                    this.first_time = false;
                }

            }


            game.prototype.canvas_arrow = function (fromx, fromy, tox, toy) {
                var headlen = Math.sqrt((fromx - tox) * (fromx - tox) + (fromy - toy) * (fromy - toy)) * 0.07;   // length of head in pixels
                var angle = -Math.atan2(toy - fromy, tox - fromx);
                this.ctx.strokeStyle = '#ff6';
                this.ctx.beginPath();
                this.ctx.moveTo(fromx, fromy);
                this.ctx.lineTo(tox, toy);
                this.ctx.moveTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy + headlen * Math.sin(angle - Math.PI / 6));
                this.ctx.lineTo(tox, toy);
                this.ctx.moveTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy + headlen * Math.sin(angle + Math.PI / 6));
                this.ctx.lineTo(tox, toy);
                this.ctx.stroke();
                this.ctx.closePath();
            }


            game.prototype.simulate = function () {
                this.current_state.kid_speed_y = document.getElementById("inp").value;
                this.current_state.target_speed_x = this.game_data.target_speed_x;
                this.current_state.kid_speed_x = this.game_data.kid_speed_x + this.game_data.water_speed_x;

                timer = setInterval(function () {
                    global_game.current_state.kid_x += global_game.current_state.kid_speed_x * global_game.tick / 1000;
                    global_game.current_state.kid_y += global_game.current_state.kid_speed_y * global_game.tick / 1000;
                    global_game.current_state.target_x += global_game.current_state.target_speed_x * global_game.tick / 1000;
                    global_game.display();
                    if (global_game.current_state.kid_x > global_game.water_width * 0.7 ||
                        global_game.current_state.kid_y > global_game.water_height) {
                        clearInterval(timer);
                        global_game.simulation_ended();
                    }
                }, this.tick);
            }

            game.prototype.simulation_ended = function () {
                console.log(document.getElementById("inp").value);
                console.log(this.game_data.correct_ans);
                if (document.getElementById("inp").value == this.game_data.correct_ans) {

                    alert('Correct!', 'You were able to grab the lightsaber');
                    alert('Explanation', 'This is a typical example of relative motion. The vertical velocity with which Yoda should swim in the river depends on Yoda\'s velocity relative to the lightsaber. If the relative velocity points towards the lightsaber, Yoda reaches it.');
                    switch (level) {
                        case 1: unlock_level("m2l2"); break;
                        case 2: unlock_level("m2l3"); break;
                        case 3: unlock_level("m3l1"); break;
                    }
                }
                else {
                    alert('Sorry, Incorrect!', 'Yoga lost his lightsaber because of you! Think in terms of relative velocity to get it right the next time.')
                    document.getElementById("inp").disabled = false;
                    document.getElementById("inp").value = "";
                    document.getElementById("submit_btn").disabled = false;
                    this.reset();
                }
            }

            function trigger() {
                //sanity check
                if (document.getElementById("inp").value == 0) {
                    alert('Enter a non zero value', '');
                    document.getElementById("inp").value = "";
                }
                document.getElementById("inp").disabled = true;
                document.getElementById("submit_btn").disabled = true;
                global_game.simulate();
            }

            function alert(title, content) {
                var msg = new Windows.UI.Popups.MessageDialog(content, title); msg.showAsync();
            }

            function unlock_level(name) {
                var vname = name + "_lock";
                localStorage.setItem(vname, JSON.stringify(false));
            }
            init();
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
            if (timer != null) {
                clearInterval(timer);
            }
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in layout.
        }
    });
})();

var timer = null;