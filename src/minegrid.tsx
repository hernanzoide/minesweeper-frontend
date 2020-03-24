import React, { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { GridList, GridListTile } from '@material-ui/core/';
import { Cell } from './model/Cell';
import { Board } from './model/BoardDTO';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 1000,
      height: 1000,
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
  }),
)

export default function MineGrid() {

  const classes = useStyles()

  const maxGridItems = 64

  const [cells,setCells] = useState<Cell[]>(initTileData());

  function initTileData(){
    let cells : Cell[] = []
    for (var i = 0; i < maxGridItems; i++) {
      let cell = new Cell(i,'square')
      cells[i]= cell
    }
    return cells;
  }

  return (
    <GridList cellHeight={125} spacing={0} className={classes.gridList} cols={8}>
        {cells.map(cell => (
            <GridListTile key={cell.key} cols={cell.cols || 1}>
                <img src={cell.image} alt={''+cell.key} onClick={handleClick} onContextMenu={handleClick} />
            </GridListTile>
        ))}
    </GridList>
  )

  async function updateGrid(board: Board){
    let newCells : Cell[] = []
    console.log(board)
    board.squares.forEach( (square) => {
      newCells.push(new Cell(square.id,square.image))
    })
    setCells(newCells);
  }

  async function handleClick(event: React.MouseEvent<HTMLImageElement>) {
    event.preventDefault()
    let id = event.currentTarget.alt;
    if (event.nativeEvent.which === 1) {
        let board: Board = await open(+id)
        console.log('open '+event.currentTarget.alt)
        updateGrid(board);
    } else if (event.nativeEvent.which === 3) {
        let board: Board = await flag(+id)
        console.log('flag '+event.currentTarget.alt)
        updateGrid(board);
    }
  }

  async function open(id: number): Promise<Board>{
    let response = await fetch('http://localhost:3020/minesweeper/'+id+'/open', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({a: 1, b: 'Textual content'})
    }); 
    return JSON.parse(await response.json())
  }

  async function flag(id :number): Promise<Board>{
    let response = await fetch('http://localhost:3020/minesweeper/'+id+'/flag', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({a: 1, b: 'Textual content'})
    });
    return JSON.parse(await response.json())
  }
}
