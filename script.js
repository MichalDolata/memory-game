/**
 * Created by preb on 18.05.16.
 */
(function() {
    function Cell(value, dom) {
        this.value = value;
        this.solved = false;
        this.DOM = dom;
    }

    var game = {
        cellsArray: [],
        active: [],
        points: 0,
        ready: false,
        pointsDOM: document.getElementById("game").getElementsByTagName("td")[0],
        tableDOM: document.getElementById("game").getElementsByClassName("cell")
    };

    game.init = function init() {
        var game = this;
        this.active = [];
        this.ready = false;
        this.points = 0;
        this.cellsArray = new Array(16);

        var cellsNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

        for (var i = 0; i < 8; i++) {
            var n = 0;
            do {
                var randomNumber = Math.floor(Math.random() * cellsNumbers.length);
                var cellNumber = cellsNumbers[randomNumber];
                cellsNumbers.splice(randomNumber, 1);
                this.cellsArray[cellNumber] = new Cell(i, game.tableDOM[cellNumber]);
                n++;
            } while (n < 2);
        }

        for (i = 0; i < this.cellsArray.length; i++) {
            this.cellsArray[i].DOM.innerHTML = this.cellsArray[i].value;
            this.cellsArray[i].DOM.className = "cell";
        }

        setTimeout(function () {
            for (i = 0; i < game.cellsArray.length; i++) {
                game.cellsArray[i].DOM.innerHTML = "";
                (function (cell) {
                    cell.DOM.onclick = function () {
                        game.onClick(cell);
                    };
                })(game.cellsArray[i]);
            }
            game.ready = true;
        }, 5000);
    };

    game.onClick = function onClick(cell) {
        if (this.ready) {
            if (cell.DOM.innerHTML === "" && this.active.length < 2) {
                cell.DOM.innerHTML = cell.value;
                this.active.push(cell);
                if (this.active.length === 2) {
                    if (this.active[0].value === this.active[1].value) {
                        this.active[0].DOM.classList.add("solved");
                        this.active[1].DOM.classList.add("solved");
                        this.active[0].solved = true;
                        this.active[1].solved = true;
                        this.active = [];
                        this.points++;
                        this.updatePoints();
                        if (this.points === 8) {
                            console.log("WIN");
                        }
                    } else {
                        this.active[0].DOM.classList.add("wrong");
                        this.active[1].DOM.classList.add("wrong");
                        var game = this;
                        this.points--;
                        this.updatePoints();
                        setTimeout(function () {
                            game.active[0].DOM.classList.remove("wrong");
                            game.active[1].DOM.classList.remove("wrong");
                            game.active[0].DOM.innerHTML = "";
                            game.active[1].DOM.innerHTML = "";
                            game.active = [];
                        }, 500);
                    }
                }
            } else if (cell.DOM.innerHTML !== "" && this.active.length < 2 && !cell.solved) {
                cell.DOM.innerHTML = "";
                this.active.pop();
            }
        }
    };

    game.updatePoints = function () {
        this.pointsDOM.innerHTML = "Points: " + this.points;
    };

    document.getElementsByTagName("button")[0].onclick = function () {
        game.init();
        this.innerHTML = "RESTART";
    };
})();