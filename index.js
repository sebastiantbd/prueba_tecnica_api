const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

//Peticion para llamar a la API encargada de la logica encargada de la solucion de la sopa de letras
app.post('/solve', (req, res) => {
    const { words, matrix } = req.body;

    const isWordPresent = (word, matrix) => {
    const rows = matrix.length;
    const cols = matrix[0].length;

    for (let row = 0; row < rows; row++) {
        const rowString = matrix[row].join('');
        if (rowString.includes(word)) {
        return true;
        }
    }

    for (let col = 0; col < cols; col++) {
        let colString = '';
        for (let row = 0; row < rows; row++) {
        colString += matrix[row][col];
        }
        if (colString.includes(word)) {
        return true;
        }
    }

    for (let startRow = 0; startRow < rows; startRow++) {
        let diagonalString = '';
        let row = startRow;
        let col = 0;
        while (row < rows && col < cols) {
        diagonalString += matrix[row][col];
        row++;
        col++;
        }
        if (diagonalString.includes(word)) {
        return true;
        }
    }

    for (let startRow = 0; startRow < rows; startRow++) {
        let diagonalString = '';
        let row = startRow;
        let col = cols - 1;
        while (row < rows && col >= 0) {
        diagonalString += matrix[row][col];
        row++;
        col--;
        }
        if (diagonalString.includes(word)) {
        return true;
        }
    }

    return false;
    };

    const foundWords = [];
    const notFoundWords = [];

words.forEach((word) => {
    if (isWordPresent(word, matrix)) {
        foundWords.push(word);
    } else {
        notFoundWords.push(word);
    }
});

const response = {
    foundWords: foundWords,
    notFoundWords: notFoundWords
    };

    res.json(response);
});

app.listen(port, () => {
    console.log(`Servidor Iniciado en el Puerto: ${port}`);
});