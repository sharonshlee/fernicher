import React from 'react';
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
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Badge } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

export default function ProductsSocialCard(props: {
  usersAndProduct: any;
  showProduct?: any;
  maxWidth?: any;
  minWidth?: any;
  setExpanded: any;
  expanded: any;
}) {
  const {
    usersAndProduct,
    showProduct,
    expanded,
    setExpanded,
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
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }));
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {usersAndProduct.user.firstName}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={usersAndProduct.name}
        // need to convert geolocation to location
        subheader={usersAndProduct.location}
      />
      <CardMedia
        className={classes.media}
        image={usersAndProduct.image}
        title={usersAndProduct.name}
        onClick={() => showProduct && showProduct(usersAndProduct.id)}
      />
      <CardContent></CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <Badge badgeContent={usersAndProduct.id} color="primary">
            <FavoriteIcon />
          </Badge>
        </IconButton>

        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ChatBubbleOutlineIcon />
        </IconButton>
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
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {usersAndProduct.description}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
