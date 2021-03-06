import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red, green } from '@material-ui/core/colors';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import {
  Badge,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment,
  InputLabel,
  TextField,
  Tooltip,
} from '@mui/material';
import { Chat } from '@mui/icons-material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { Link, useParams } from 'react-router-dom';
import { filter, find, isEmpty, map, trim } from 'lodash';
import axios from 'axios';
import { stateContext } from '../../providers/StateProvider';
import { Data } from '@react-google-maps/api';
import { AccountCircle, Label } from '@material-ui/icons';
import { LoggedInContext } from '../../providers/LoggedInContext';

export default function ProductsSocialCard(props: {
  usersAndProduct: any;
  setUsersAndProduct: any;
  showProduct?: any;
  maxWidth?: any;
  minWidth?: any;
  setExpanded: any;
  expanded: any;
  commentExpanded: any;
  setCommentExpanded: any;
}) {
  const { userid } = useParams<{ userid: string }>();
  const { myProducts, setProducts, setMyProducts } = useContext(stateContext);
  const {
    usersAndProduct,
    setUsersAndProduct,
    showProduct,
    expanded,
    setExpanded,
    commentExpanded,
    setCommentExpanded,
    maxWidth = 345,
    minWidth,
  } = props;
  const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth,
      minWidth,
    },
    media: {
      paddingTop: '56.25%', // 16:9
      '&:hover': {
        cursor: 'pointer',
      },
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    chat: {
      display: 'flex',
      marginLeft: 'auto',
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      fontSize: 12,
      backgroundColor: red[500],
    },
    avatarComment: {
      fontSize: 10,
      width: '3em',
      height: '3em',
      margin: '0.5em',
      padding: 0,
      backgroundColor: '#087e8b',
    },
  }));
  const classes = useStyles();
  const [deleteMessage, setDeleteMessage] = useState('');
  const [showDelete, setShowDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [comment, setComment] = useState('');
  const { state: loggedInUser, setState: setLoggedInUser } =
    useContext(LoggedInContext);
  const [favouriteId, setFavouriteId] = useState('');

  useEffect(() => {
    if (loggedInUser) {
      const { favourites } = loggedInUser;
      const userFav = find(
        favourites,
        (fav) =>
          fav.productId === usersAndProduct.id && fav.userId === loggedInUser.id
      );

      setFavouriteId(userFav ? userFav.id : '');
    }
  }, [loggedInUser]);

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="firstName" className={classes.avatar}>
            {usersAndProduct.user.firstName}
          </Avatar>
        }
        action={
          <IconButton
            aria-label="settings"
            style={{
              visibility:
                isEmpty(userid) || usersAndProduct.userId !== loggedInUser.id
                  ? 'hidden'
                  : 'inherit',
            }}
            onClick={() => {
              setShowDelete(true);
              setDeleteMessage('Are you sure you want to delete this product?');
            }}
          >
            <DeleteIcon />
          </IconButton>
        }
        title={usersAndProduct.name}
        // need to convert geolocation to location
        subheader={usersAndProduct.location}
      />
      <Dialog
        open={showDelete}
        onClose={setShowDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Delete Confirmation'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {deleteMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {!deleting && (
            <>
              <Button
                onClick={() => {
                  if (!isEmpty(userid)) {
                    setDeleteMessage('Deleting...');
                    setDeleting(true);
                    setTimeout(() => {
                      axios
                        .delete(`/api/products/${usersAndProduct.id}`)
                        .then(() => {
                          setMyProducts(
                            filter(
                              myProducts,
                              (p) => p.id !== usersAndProduct.id
                            )
                          );
                          setLoggedInUser((prev: any) => ({
                            ...prev,
                            products: filter(
                              prev.products,
                              (product) => product.id !== usersAndProduct.id
                            ),
                          }));
                          setDeleted(true);
                          setDeleteMessage('Product deleted.');
                        });
                    }, 1000);
                  }
                }}
              >
                Yes
              </Button>
              <Button onClick={() => setShowDelete(false)} autoFocus>
                No
              </Button>
            </>
          )}
          {deleted && (
            <Button onClick={() => setShowDelete(false)} autoFocus>
              Ok
            </Button>
          )}
        </DialogActions>
      </Dialog>
      <CardMedia
        className={classes.media}
        image={usersAndProduct.image}
        title={usersAndProduct.name}
        onClick={() => showProduct && showProduct(usersAndProduct.id)}
      />
      <CardContent></CardContent>
      <CardActions disableSpacing>
        {!loggedInUser && (
          <IconButton disabled style={{ color: 'grey' }}>
            <Badge
              badgeContent={
                usersAndProduct.favourites && usersAndProduct.favourites.length
              }
              color="error"
            >
              <FavoriteBorderIcon />
            </Badge>
          </IconButton>
        )}
        {loggedInUser && (
          <>
            {!favouriteId && (
              <IconButton
                aria-label="add to favorites"
                onClick={() => {
                  axios
                    .post('/api/favourites/new', {
                      userId: loggedInUser.id,
                      productId: usersAndProduct.id,
                    })
                    .then((result: any) => {
                      setLoggedInUser((prev: any) => ({
                        ...prev,
                        favourites: [
                          ...(!isEmpty(prev.favourites) ? prev.favourites : []),
                          result.data,
                        ],
                      }));
                      setFavouriteId(result.data.id);
                      !userid &&
                        setProducts((prev: any[]) =>
                          map(prev, (product) => {
                            if (product.id === usersAndProduct.id) {
                              return {
                                ...product,
                                favourites: [
                                  ...(!isEmpty(product.favourites)
                                    ? product.favourites
                                    : []),
                                  result.data,
                                ],
                              };
                            }
                            return product;
                          })
                        );
                      userid &&
                        setMyProducts((prev: any[]) =>
                          map(prev, (product) => {
                            if (product.id === usersAndProduct.id) {
                              return {
                                ...product,
                                favourites: [
                                  ...(!isEmpty(product.favourites)
                                    ? product.favourites
                                    : []),
                                  result.data,
                                ],
                              };
                            }
                            return product;
                          })
                        );
                      setUsersAndProduct({
                        ...usersAndProduct,
                        favourites: [
                          result.data,
                          ...(!isEmpty(usersAndProduct.favourites)
                            ? usersAndProduct.favourites
                            : []),
                        ],
                      });
                    });
                }}
              >
                <Badge
                  badgeContent={
                    usersAndProduct.favourites &&
                    usersAndProduct.favourites.length
                  }
                  color="error"
                >
                  <FavoriteBorderIcon />
                </Badge>
              </IconButton>
            )}
            {favouriteId && (
              <IconButton
                aria-label="remove favorites"
                onClick={() => {
                  axios.delete(`/api/favourites/${favouriteId}`).then(() => {
                    setLoggedInUser((prev: any) => ({
                      ...prev,
                      favourites: filter(
                        prev.favourites,
                        (fav) => fav.id !== favouriteId
                      ),
                    }));
                    setFavouriteId('');
                    setProducts((prev: any[]) =>
                      map(prev, (product) => ({
                        ...product,
                        favourites: filter(
                          product.favourites,
                          (fav) => fav.id !== favouriteId
                        ),
                      }))
                    );
                    setUsersAndProduct({
                      ...usersAndProduct,
                      favourites: filter(
                        usersAndProduct.favourites,
                        (fav) => fav.id !== favouriteId
                      ),
                    });
                  });
                }}
              >
                <Badge
                  badgeContent={
                    usersAndProduct.favourites &&
                    usersAndProduct.favourites.length
                  }
                  color="error"
                >
                  <FavoriteIcon />
                </Badge>
              </IconButton>
            )}
          </>
        )}

        <Tooltip title="Comment">
          <IconButton
            onClick={() =>
              setCommentExpanded(usersAndProduct.id, !commentExpanded)
            }
            aria-expanded={commentExpanded}
            aria-label="comment"
          >
            <Badge
              badgeContent={
                usersAndProduct.comments && usersAndProduct.comments.length
              }
              color="error"
            >
              <ChatBubbleOutlineIcon />
            </Badge>
          </IconButton>
        </Tooltip>
        <div className={classes.chat}>
          {loggedInUser && (
            <Tooltip title="Chat">
              <IconButton component={Link} to={'/chats'}>
                <Chat />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title="Description">
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={() => setExpanded(usersAndProduct.id, !expanded)}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </Tooltip>
        </div>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {usersAndProduct.description}
          </Typography>
        </CardContent>
      </Collapse>
      <Collapse in={commentExpanded} timeout="auto" unmountOnExit>
        <CardContent>
          {loggedInUser && (
            <TextField
              id="name"
              type="text"
              label="write a comment..."
              margin="dense"
              fullWidth
              variant="standard"
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !isEmpty(trim(comment))) {
                  setComment('');
                  axios
                    .post('/api/comments/new', {
                      comment,
                      productId: usersAndProduct.id,
                      userId: loggedInUser.id,
                    })
                    .then((result) => {
                      setUsersAndProduct({
                        ...usersAndProduct,
                        comments: [result.data, ...usersAndProduct.comments],
                      });
                    });
                }
              }}
            />
          )}
          {map(usersAndProduct.comments, (com) => {
            return (
              <div key={com.id} style={{ display: 'flex', margin: '0.5em' }}>
                <InputLabel
                  style={{
                    border: '1px solid',
                    borderRadius: '2em',
                    width: '100%',
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      width: '100%',
                    }}
                  >
                    <Avatar
                      aria-label="firstName"
                      className={classes.avatarComment}
                    >
                      {com.user.firstName}
                    </Avatar>{' '}
                    {com.comment}
                  </div>
                </InputLabel>
              </div>
            );
          })}
        </CardContent>
      </Collapse>
    </Card>
  );
}
