import minimax from 'projects/tictactoe/minimax';

describe('(Minimax) AI', () => {
  const m = minimax;
  let best, board;

  it('Should return the best starting move if playing O', (done) => {
    board = ['X', 0, 0, 0, 0, 0, 0, 0, 0];
    const expected = ['X', 0, 0, 0, 'O', 0, 0, 0, 0];
    m.minimax(board, 0, 'O');
    best = m.choice;
    expect(expected).to.eql(best);
    done();
  });

  it('Should return the best starting move if playing X', (done) => {
    board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    const expected = ['X', 0, 0, 0, 0, 0, 0, 0, 0];
    m.minimax(board, 0, 'X');
    best = m.choice;
    expect(expected).to.eql(best);
    done();
  });
});
