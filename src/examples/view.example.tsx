import React, { ReactElement, useState } from 'react';

import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  IconButton,
  Typography,
} from '@material-ui/core';
import { ThumbDownAlt as DislikeIcon, ThumbUpAlt as FavoriteIcon } from '@material-ui/icons';

import { AppState } from './app.example';

type ViewExampleComponentProps = {
  state: AppState;
};

export const ViewExampleComponent = ({ state }: ViewExampleComponentProps): ReactElement => {
  const { firstName, lastName } = state;

  const [liked, setLiked] = useState(false);
  const [undecided, setUndecided] = useState(true);

  const handleLike = () => {
    setLiked(true);

    if (undecided) setUndecided(false);
  };

  const handleDislike = () => {
    setLiked(false);

    if (undecided) setUndecided(false);
  };

  const fullName = `${firstName} ${lastName}`;
  const likeIconColor = !undecided && liked ? 'primary' : 'default';
  const dislikeIconColor = !undecided && !liked ? 'primary' : 'default';
  const decisionImage = !undecided ? (
    <CardMedia
      height={window.screen.height * 0.6}
      component="img"
      image={liked ? '/like.gif' : '/dislike.gif'}
      title="reaction"
    />
  ) : null;

  return (
    <Card>
      <CardHeader title={<Typography variant="h2">Hey there, {fullName}!</Typography>} />
      <Collapse in={!undecided} unmountOnExit>
        {decisionImage}
      </Collapse>
      <CardContent>
        <Typography variant="body1">Are you liking what you see here?</Typography>
      </CardContent>
      <CardActions>
        <IconButton aria-label="like" color={likeIconColor} onClick={handleLike}>
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="dislike" color={dislikeIconColor} onClick={handleDislike}>
          <DislikeIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};
