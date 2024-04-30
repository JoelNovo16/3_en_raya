$(document).ready(function() {
    $("#empezar").click(function() {
        let player1 = $("#jugador1").val();
        let player2 = $("#jugador2").val();

        if (player1.trim() === "" || player2.trim() === "") {
            alert("Por favor ingresa los nombres de ambos jugadores.");
            return;
        }

        $("#nombresJugadores").hide();
        $(".cuadradado").show();
        $("#reset").show();

        let currentPlayer = "X";
        let moves = 0;
        let cells = $(".celda");
        let message = $("#mensage");

        cells.click(function() {
            if ($(this).text() === "" && !message.text()) {
                $(this).text(currentPlayer);
                moves++;

                if (checkWin(currentPlayer)) {
                    message.text("¡" + currentPlayer + " ha ganado!");
                    cells.off("click");
                } else if (moves === 9) {
                    message.text("¡Empate!");
                } else {
                    currentPlayer = currentPlayer === "X" ? "O" : "X";
                }
            }
        });

        $("#reset").click(function() {
            cells.text("");
            message.text("");
            currentPlayer = "X";
            moves = 0;
            cells.click(function() {
                if ($(this).text() === "" && !message.text()) {
                    $(this).text(currentPlayer);
                    moves++;

                    if (checkWin(currentPlayer)) {
                        message.text("¡" + currentPlayer + " ha ganado!");
                        cells.off("click");
                    } else if (moves === 9) {
                        message.text("¡Empate!");
                    } else {
                        currentPlayer = currentPlayer === "X" ? "O" : "X";
                    }
                }
            });
        });

        function checkWin(player) {
            let winCombos = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6]
            ];

            return winCombos.some(function(combo) {
                return combo.every(function(index) {
                    return cells.eq(index).text() === player;
                });
            });
        }
    });
});
