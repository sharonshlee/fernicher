import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import './ImageSliders.scss';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  imageList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    width: '100%',
    height: '200px',
  },
  title: {
    color: 'white',
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));

// will change to axios db data
const itemData = [
  {
    img: '/assets/imgs/furniture1.jpg',
    title: 'Image',
    author: 'author',
  },
  {
    img: '/assets/imgs/furniture2.jpg',
    title: 'Image',
    author: 'author',
  },
  {
    img: '/assets/imgs/furniture3.jpg',
    title: 'Image',
    author: 'author',
  },
  {
    img: '/assets/imgs/furniture4.jpg',
    title: 'Image',
    author: 'author',
  },
  {
    img: '/assets/imgs/furniture5.jpg',
    title: 'Image',
    author: 'author',
  },
  {
    img: '/assets/imgs/furniture6.jpg',
    title: 'Image',
    author: 'author',
  },
  {
    img: '/assets/imgs/furniture7.jpg',
    title: 'Image',
    author: 'author',
  },
];
export default function SingleLineImageList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ImageList className={classes.imageList} cols={4}>
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img src={item.img} alt={item.title} />
            <ImageListItemBar
              // title={item.title}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
              actionIcon={
                <IconButton
                  aria-label={`star ${item.title}`}
                  onClick={() => {
                    console.log('Hello');
                  }}
                >
                  <FavoriteBorderIcon className={classes.title} />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}
