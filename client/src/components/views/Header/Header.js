import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { Link as RouterLink }  from 'react-router-dom';
import { styleHeader } from '../../Style';


export default function Header(props) {
  const classes = styleHeader();
  const { sections, title } = props;

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Link component={RouterLink} to='/write' style={{ textDecoration: 'none' }}>
        <Button variant="outlined" size="small">Write (글쓰기)</Button>
        </Link>
          <Typography
            component="h2"
            variant="h5"
            color="primary"
            align="center"
            noWrap
            className={classes.toolbarTitle}
          >
        <Link component={RouterLink} to='/' style={{ textDecoration: 'none' }}>
          {title}
        </Link>
        </Typography>
        <IconButton>
          <SearchIcon />
        </IconButton>
        <Link component={RouterLink} to='/login' style={{ textDecoration: 'none' }}>
          <Button variant="outlined" size="small">
            Sign In
          </Button>
        </Link>
      </Toolbar>
      <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            to={"/category/"+section.url}
            component={RouterLink}
            className={classes.toolbarLink}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};
