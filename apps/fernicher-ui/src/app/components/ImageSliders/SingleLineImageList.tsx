import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import './ImageSliders.scss';
import { chunk, find, map, reduce } from 'lodash';
import { ProductDialog } from '../products/ProductDialog';
import { stateContext } from '../../providers/StateProvider';
import { Badge } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: '#DEE2E6',
    height: '50em',
  },
  imageList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    // backgroundColor: '#d3d3d3'
    padding: '1.5em 0.5em',
  },
  title: {
    color: 'white',
    display: 'flex',
    justifyContent: 'flex-start',
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));

export default function SingleLineImageList(props: {
  subUsersAndProducts: any;
}) {
  const { subUsersAndProducts } = props;
  const { setProducts, products } = useContext(stateContext);
  const classes = useStyles();
  const [detail, setDetail] = useState<any>({ expanded: false, product: null });
  useEffect(() => {
    setProducts(products);
    detail.product &&
      setDetail((prev: any) => {
        return {
          ...prev,
          product: find(products, (p) => p.id === prev.product.id),
        };
      });
  }, [products]);
  return (
    <div className={classes.root}>
      <ImageList className={classes.imageList} cols={5} spacing={10}>
        {map(subUsersAndProducts, (usersAndProduct) => (
          <ImageListItem key={usersAndProduct.id} style={{ height: '24%' }}>
            <img
              src={usersAndProduct.image}
              alt={usersAndProduct.name}
              onClick={() => {
                setDetail({ expanded: true, product: usersAndProduct });
              }}
            />
            <ImageListItemBar
              title={usersAndProduct.name}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
              actionIcon={
                <IconButton disabled>
                  <Badge
                    badgeContent={
                      usersAndProduct.favourites &&
                      usersAndProduct.favourites.length
                    }
                    color="error"
                  >
                    <FavoriteBorderIcon className={classes.title} />
                  </Badge>
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
      {detail.product && (
        <ProductDialog
          detail={detail}
          setDetail={setDetail}
          products={products}
          setProducts={setProducts}
        />
      )}
    </div>
  );
}
