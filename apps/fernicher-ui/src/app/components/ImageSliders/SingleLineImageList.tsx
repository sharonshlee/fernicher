import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import './ImageSliders.scss';
import { chunk, map } from 'lodash';
import { ProductDialog } from '../products/ProductDialog';
import { stateContext } from '../../providers/StateProvider';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: '#DEE2E6',
  },
  imageList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    width: '100%',
    // height: '50vh',
    // backgroundColor: '#d3d3d3',
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
  const { setProducts } = useContext(stateContext);
  const classes = useStyles();
  const [detail, setDetail] = useState<any>({ expanded: false, product: null });
  const [commentExpanded, setCommentExpanded] = useState<any>({});
  return (
    <div className={classes.root}>
      <ImageList className={classes.imageList} cols={5} spacing={10}>
        {map(subUsersAndProducts, (usersAndProduct) => (
          <ImageListItem key={usersAndProduct.id}>
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
                <IconButton>
                  <FavoriteBorderIcon className={classes.title} />
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
          setProducts={setProducts}
          commentExpanded={commentExpanded}
          setCommentExpanded={setCommentExpanded}
        />
      )}
    </div>
  );
}
