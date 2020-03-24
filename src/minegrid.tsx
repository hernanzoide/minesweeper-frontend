import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { GridList, GridListTile , ListSubheader } from '@material-ui/core/';
import { Cell } from './model/Cell';
import mine from './img/mine.png';
import flag from './img/flag.png';
import { maxHeaderSize } from 'http';

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
);

export default function MineGrid() {
  const classes = useStyles()

  const maxGridItems = 64

  function loadTileData(){
      let cells : Cell[] = []
      for (var i = 0; i < maxGridItems; i++) {
        let cell = new Cell(i,1)
        cells[i]= cell
      }
      return cells;
  }

  return (
    <GridList cellHeight={125} spacing={0} className={classes.gridList} cols={8}>
        {/* <GridListTile key="Subheader" cols={8} style={{ height: 30 }}>
          <ListSubheader component="div">Minesweeper</ListSubheader>
        </GridListTile> */}
        {loadTileData().map(cell => (
            <GridListTile key={cell.key} cols={cell.cols || 1}>
                <img src={cell.image} alt={'cell'+cell.key} onClick={handleClick} onContextMenu={handleClick} />
            </GridListTile>
        ))}
    </GridList>
  );

  function handleClick(event: React.MouseEvent<HTMLImageElement>) {
    event.preventDefault()
    //alert('kaboom noob! '+event.currentTarget.alt)
    //call API
    //redraw gridList
    if (event.nativeEvent.which === 1) {
        event.currentTarget.src = mine
        console.log('kaboom noob! '+event.currentTarget.alt)
    } else if (event.nativeEvent.which === 3) {
        event.currentTarget.src = flag
        console.log('safe '+event.currentTarget.alt)
    }
  }

}
