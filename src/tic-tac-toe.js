class TicTacToe {
    winner = null;
    player = 'x';
    field = [[null, null, null],
             [null, null, null],
             [null, null, null]];
    noTurns = false;

    constructor() {

    }

    getCurrentPlayerSymbol() {
        return this.player;
    }

    isProb(el, mEl, prop) {
        if (el !== null && mEl[prop] === null)
            mEl[prop] = el;
        else
        if (el !== null && el !== mEl[prop])
            return false;
        return true;
    }

    drawCheck() {
        let mDiag = {diagA: null, diagB: null}, probDiagA = true, probDiagB = true;
        for (let i = 0; i < this.field.length; ++i) {
            let mEl = {row: null, col: null}, probRow = true, probCol =true;
            for (let j = 0; j < this.field.length; ++j) {
                probRow &= this.isProb(this.field[i][j], mEl, 'row');
                probCol &= this.isProb(this.field[j][i], mEl, 'col');
            }
            if (probRow || probCol) {
                return false;
            }
            probDiagA &= this.isProb(this.field[i][i], mDiag, 'diagA');
            probDiagB &= this.isProb(this.field[i][this.field.length - 1 - i], mDiag, 'diagB');
        }
        if (probDiagA || probDiagB)
            return false;
        return true;
    }

    nextTurn(rowIndex, colIndex) {
        let colWin = true, rowWin = true, diagAWin = true, diagBWin = true;
        if (this.field[rowIndex][colIndex] === null) {
            this.field[rowIndex][colIndex] = this.player;
            if (this.winner === null) {
                for (let i = 0; i < this.field.length; ++i) {
                    colWin &= (this.field[i][colIndex] === this.player);
                    rowWin &= (this.field[rowIndex][i] === this.player);
                    diagAWin &= (this.field[i][i] === this.player);
                    diagBWin &= (this.field[i][this.field.length - 1 - i] === this.player);
                }
                if (colWin || rowWin || diagAWin || diagBWin) {
                    this.winner = this.player;
                }
            }
            this.noTurns = this.field.reduce((a, e) => a && !e.includes(null), true);
            this.player = (this.player === 'x' ? 'o' : 'x');
        }
    }

    isFinished() {
        return (this.winner !== null) || this.isDraw();
    }

    getWinner() {
        return this.winner;
    }

    noMoreTurns() {
        return this.noTurns;
    }

    isDraw() {
        return this.noTurns && this.winner === null;
    }

    getFieldValue(rowIndex, colIndex) {
        return this.field[rowIndex][colIndex];
    }
}

module.exports = TicTacToe;
