// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {

    WinJS.UI.Pages.define("/pages/box2d/page3.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            
            document.getElementById("btn1").addEventListener("click", function () {
                decrease();
            });
            document.getElementById("btn2").addEventListener("click", function () {
                increase();
            });
            document.getElementById("submit_btn").addEventListener("click", function () {
                trigger();
            });

            var global_game = null;
            var top_y = 50;
            var mid_y = top_y + 200;
            var bot_y = mid_y + 200;
            var img_wid = 60;
            var img_hei = 48;


            function init() {
                global_game = new game();
                global_game.reset();
            }

            function game() {
                this.canvas = document.getElementById('canvas_area');
                this.ctx = this.canvas.getContext('2d');
                this.tick = 50;
                this.gravity = 10;

                this.frame_width = 750;
                this.frame_height = 300;
                this.margin_x = (this.canvas.width - this.frame_width) / 2;
                this.margin_y = (this.canvas.height - this.frame_height) / 2;

                this.user_input = 40;
                this.theta = Math.PI / 180 * 40;

                this.game_data = {
                    kid_speed: 100,
                    correct_ans: 45
                };
                this.entities = [];
                this.entities.push(new entity("yoda.png", 250 - img_wid / 2, 340 - img_hei / 2, img_wid, img_hei));
                this.entities.push(new entity("lightsabre.png", 550 - img_wid / 2, top_y - img_hei / 2, img_wid, img_hei));
            }

            game.prototype.reset = function () {
                this.current_state = {
                    kid_x: 0,
                    kid_y: 0,
                    kid_speed_x: 0,
                    kid_speed_y: 0,
                    target_y: this.frame_height,
                    target_speed_y: 0
                };
                this.entities.forEach(function (i) {
                    i.reset();
                });
                this.display();
            };

            game.prototype.display = function () {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.ctx.strokeStyle = '#000000';
                //outer box
                // this.ctx.strokeRect(this.margin_x, this.margin_y, this.frame_width, this.frame_height);
                this.ctx.strokeStyle = '#000000';
                //yoda box
                // this.ctx.strokeRect(this.margin_x + 0.3*this.frame_width + this.current_state.kid_x, this.margin_y + this.frame_height - 20 - this.current_state.kid_y, 20, 20);
                this.ctx.strokeStyle = '#000000';
                //saber box
                // this.ctx.strokeRect(this.margin_x + 0.7*this.frame_width, this.margin_y + this.frame_height - this.current_state.target_y, 20, 20);

                var donedone = this.ctx;

                //donedone.globalAlpha = 0.5;
                //donedone.fillStyle = "red";
                //donedone.fillRect(this.margin_x, this.margin_y, this.frame_width, this.frame_height);
                //donedone.globalAlpha = 1.0;

                if (true) {
                    // show extra polations(line)
                    this.ctx.beginPath();
                    var length = this.frame_height * 0.4;
                    this.canvas_arrow(this.margin_x + this.frame_width * 0.3, this.margin_y + this.frame_height, this.margin_x + 0.3 * this.frame_width + length * Math.cos(this.theta), this.margin_y + this.frame_height - length * Math.sin(this.theta));
                    this.ctx.stroke();
                    this.ctx.closePath();
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = '#0000ff';
                    this.ctx.moveTo(this.margin_x + 0.3 * this.frame_width + length * Math.cos(this.theta), this.margin_y + this.frame_height - length * Math.sin(this.theta));
                    this.ctx.lineTo(this.margin_x + 0.3 * this.frame_width + this.frame_height * Math.cos(this.theta) / Math.sin(this.theta), this.margin_y);
                    this.ctx.stroke();
                    this.ctx.closePath();
                    // show extra poltaions (curve);
                    this.ctx.strokeStyle = '#00ff00';
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.margin_x + 0.3 * this.frame_width, this.margin_y + this.frame_height);
                    var range = this.game_data.kid_speed * this.game_data.kid_speed * Math.sin(this.theta * 2) / this.gravity;
                    this.ctx.quadraticCurveTo(this.margin_x + 0.3 * this.frame_width + range / 2, this.margin_y + this.frame_height - range / 2 * Math.sin(this.theta) / Math.cos(this.theta), this.margin_x + 0.3 * this.frame_width + range, this.margin_y + this.frame_height);
                    this.ctx.stroke();
                    this.ctx.closePath();
                    // clear oveshoots
                    this.ctx.clearRect(0, 0, this.canvas.width, this.margin_y); 
                    this.ctx.clearRect(this.margin_x + this.frame_width, 0, this.margin_x, this.canvas.height);
                }
                this.entities.forEach(function (i) {
                    i.display();
                });

                this.ctx.lineWidth = 2;

                this.ctx.fillStyle = "white";

                this.ctx.font = "20px Verdana";

                var sabrespeed = "Free fall of saber";
                this.ctx.fillText(sabrespeed, this.margin_x + 0.7 * this.frame_width, this.margin_y - 10);
                this.canvas_arrow(this.margin_x + 1.03 * this.frame_width, this.margin_y - 10, this.margin_x + 1.03 * this.frame_width, this.margin_y);

                
            };

            game.prototype.simulate = function () {
                this.current_state.kid_speed_y = this.game_data.kid_speed * Math.sin(this.theta);
                this.current_state.kid_speed_x = this.game_data.kid_speed * Math.cos(this.theta);
                timer = null;
                timer = setInterval(function () {
                    global_game.current_state.kid_x += global_game.current_state.kid_speed_x * global_game.tick / 1000;
                    global_game.entities[0].curr_x = global_game.margin_x + 0.3 * global_game.frame_width + global_game.current_state.kid_x
                    global_game.current_state.kid_y += global_game.current_state.kid_speed_y * global_game.tick / 1000;
                    global_game.entities[0].curr_y = global_game.margin_y + global_game.frame_height - 20 - global_game.current_state.kid_y;

                    global_game.current_state.target_y += global_game.current_state.target_speed_y * global_game.tick / 1000;
                    global_game.entities[1].curr_y = global_game.margin_y + global_game.frame_height - global_game.current_state.target_y;

                    global_game.current_state.kid_speed_y -= global_game.gravity * global_game.tick / 1000;
                    global_game.current_state.target_speed_y -= global_game.gravity * global_game.tick / 1000;

                    global_game.display();

                    if (global_game.current_state.kid_x > global_game.frame_width * 0.7 ||
                        global_game.current_state.kid_y > global_game.frame_height ||
                        global_game.current_state.kid_y < 0 ||
                        (global_game.user_input == global_game.game_data.correct_ans && Math.abs(global_game.current_state.kid_y - global_game.current_state.target_y) < 10 && Math.abs(global_game.current_state.kid_x - global_game.frame_width * 0.4) < 10)
                        ) {
                        clearInterval(timer);
                        global_game.simulation_ended();
                    }
                }, this.tick);
            };

            game.prototype.simulation_ended = function () {
                if (this.user_input == this.game_data.correct_ans) {
                    alert('Congratuation! Correct!', 'Yoda had been secretly training you as a Jedi! _/\\_');
                    alert('Explanation ... Though you dont need it anymore :D', 'Since Yoda and his lightsaber\'s relative acceleration is zero, Yoda catches his saber if his initial relative velocity points towards the saber');
                }
                else {
                    alert('Sorry, Incorrect!', 'Thanks to you, Yoda almost died a miserable death. :( \n Try thinking in terms of Yoda\'s and the lightsaber\'s relative acceleration next time!');
                    document.getElementById("btn1").disabled = false;
                    document.getElementById("btn2").disabled = false;
                    document.getElementById("submit_btn").disabled = false;
                    document.getElementById("inp").innerHTML = "40";
                    this.user_input = 40;
                    this.theta = 40 * Math.PI / 180;
                    this.reset();
                }
            };

            function trigger() {
                // TODO sanity check
                document.getElementById("btn1").disabled = true;
                document.getElementById("btn2").disabled = true;
                document.getElementById("submit_btn").disabled = true;
                global_game.simulate();
            }

            function increase() {
                if (global_game.user_input < 85) {
                    global_game.user_input += 5;
                    global_game.theta = global_game.user_input * Math.PI / 180;
                    document.getElementById("inp").innerHTML = global_game.user_input;
                    global_game.display();
                }
            }

            function decrease() {
                if (global_game.user_input > 5) {
                    global_game.user_input -= 5;
                    global_game.theta = global_game.user_input * Math.PI / 180;
                    document.getElementById("inp").innerHTML = global_game.user_input;
                    global_game.display();
                }
            }

            function entity(image_name, x, y, w, h) {
                this.img = new Image;
                this.img.src = image_name;
                this.width = w;
                this.height = h;
                this.start_x = x;
                this.start_y = y;
                this.curr_x = x;
                this.curr_y = y;
                this.img.onload = function () {
                    global_game.ctx.drawImage(this, x, y, w, h);
                }
            }

            entity.prototype.display = function () {
                global_game.ctx.drawImage(this.img, this.curr_x, this.curr_y, this.width, this.height);
            };

            entity.prototype.reset = function () {
                this.curr_x = this.start_x;
                this.curr_y = this.start_y;
            };

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