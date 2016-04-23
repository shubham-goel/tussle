// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/box2d/page.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            document.getElementById("btn1").addEventListener("click", function () {
                trigger(1);
            });
            document.getElementById("btn2").addEventListener("click", function () {
                trigger(2);
            });
            function alert(title, content) {
                var msg = new Windows.UI.Popups.MessageDialog(content, title); msg.showAsync();
            }

            var global_game = null;
            var top_y = 50;
            var mid_y = top_y + 300;
            var bot_y = mid_y + 300;
            var img_wid = 60;
            var img_hei = 48;
            function init() {
                global_game = new game();
                global_game.reset();
            }

            function game(options) {
                this.canvas = document.getElementById('canvas_area');
                this.ctx = this.canvas.getContext('2d');
                this.tick = 50;
                this.tick_counter = 0;
                this.user_response = null;
                this.correct_ans = 1;
                this.entities = [];
                this.entities.push(new entity("/jeep.png", 100 - img_wid / 2, mid_y - img_hei / 2, img_wid, img_hei));
                this.entities.push(new entity("/jeep.png", 500 - img_wid / 2, mid_y - img_hei / 2, img_wid, img_hei));
                this.entities.push(new entity("/yoda.png", 100 - img_wid / 2, bot_y - img_hei / 2, img_wid, img_hei));
                this.entities.push(new entity("/lightsabre.png", 500 - img_wid / 2, top_y - img_hei / 2, img_wid, img_hei));
            }


            game.prototype.display = function () {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

                this.ctx.lineWidth = 3;
                this.ctx.strokeStyle = '#f4a460';
                this.ctx.beginPath();
                this.ctx.moveTo(0, mid_y + 24);
                this.ctx.lineTo(600, mid_y + 24);
                this.ctx.stroke();
                this.ctx.closePath();

                this.entities.forEach(function (i) {
                    i.display();
                });

                document.getElementById("timer").innerHTML = (this.tick_counter * 50 / 1000).toFixed(2) + " secs";
            };

            game.prototype.reset = function () {
                this.user_response = null;
                this.tick_counter = 0;
                this.entities.forEach(function (i) {
                    i.reset();
                });
                this.display();
            }

            game.prototype.simulateL = function () {
                timer = setInterval(function () {
                    global_game.tick_counter++;
                    if (global_game.tick_counter < 60) {
                        global_game.entities[2].curr_y -= 5;
                        global_game.display();
                    }
                    else if (global_game.tick_counter < 110) {
                        global_game.entities[2].curr_y -= 6;
                        global_game.entities[0].curr_y -= 6;
                        global_game.entities[2].curr_x += 8;
                        global_game.entities[0].curr_x += 8;
                        global_game.display();
                    }
                    else {
                        clearInterval(timer);
                        global_game.simulation_ended();
                    }
                }, this.tick);
            }

            game.prototype.simulateR = function () {
                timer = setInterval(function () {
                    global_game.tick_counter++;
                    if (global_game.tick_counter < 100) {
                        global_game.entities[2].curr_y -= 3;
                        global_game.entities[2].curr_x += 4;
                        global_game.display();

                    }
                    else if (global_game.tick_counter < 130) {
                        global_game.entities[2].curr_y -= 10;
                        global_game.entities[1].curr_y -= 10;
                        global_game.display();

                    }
                    else {
                        clearInterval(timer);
                        global_game.simulation_ended();
                    }
                }, this.tick);
            }

            game.prototype.simulation_ended = function () {
                if (this.user_response == this.correct_ans) {
                    alert('Correct!', 'This was indeed the quickest way to reach the lightsaber.');
                    alert('Explanation', 'As the Jeep travels faster than Yoda (really??), Yoda reaches the lightsaber quickly if he coveres majority of the distance fast (in a Jeep).');
                }
                else {
                    alert('Sorry, Incorrect!', 'This was not the quickest way to reach the lightsaber. Darth Vader has Escaped');
                    document.getElementById("btn1").disabled = false;
                    document.getElementById("btn2").disabled = false;
                    this.reset();
                }
            }

            function trigger(response) {
                global_game.user_response = response;
                document.getElementById("btn1").disabled = true;
                document.getElementById("btn2").disabled = true;
                console.log(global_game.user_response);
                if (response == 1) {
                    global_game.simulateL();
                }
                else {
                    global_game.simulateR();
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