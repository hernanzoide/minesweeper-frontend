import React, { useState , useEffect } from 'react';
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

  const [cells,setCells] = useState<Cell[]>([]);

  useEffect(() => {
    (async () => { 
      let response = await fetch(process.env.REACT_APP_BACKEND_URL+'initialize')
      let board = JSON.parse(await response.json())
      updateGrid(board)
    })()
  }, []);

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
    board.squares.forEach( (square) => {
      newCells.push(new Cell(square.id,square.image))
    })
    setCells(newCells);
  }

  async function processClick(mouseButton: number, id: string) {
    if (mouseButton === 1) {
        let board: Board = await open(id)
        updateGrid(board)
    } else if (mouseButton === 3) {
        let board: Board = await flag(id)
        updateGrid(board)
    }
  }

  function handleClick(event: React.MouseEvent<HTMLImageElement>) {
    event.preventDefault()
    let mouseButton = event.nativeEvent.which
    let id = event.currentTarget.alt 
    processClick(mouseButton,id)
  }

  async function open(id: string): Promise<Board>{
    let response = await fetch(process.env.REACT_APP_BACKEND_URL+id+'/open', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({a: 1, b: 'Textual content'})
    }); 
    return JSON.parse(await response.json())
  }

  async function flag(id :string): Promise<Board>{
    let response = await fetch(process.env.REACT_APP_BACKEND_URL+id+'/flag', {
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
