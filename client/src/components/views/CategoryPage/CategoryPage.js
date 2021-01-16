import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import Header from '../Header/Header';
import MainFeaturedPost from '../MainFeaturedPost/MainFeaturedPost';
import FeaturedPost from '../FeaturedPost/FeaturedPost';
import Main from '../Main/Main';
import Sidebar from '../Sidebar/Sidebar';
import Footer from '../Footer/Footer';
import { styleLandingPage } from '../../Style';
import {title, sections} from "../../Config";



function CategoryPage(props) {
    return (
        <Container>
            <CssBaseline/>
            <Header title={title} sections={sections} />
        </Container>
    )
}

export default CategoryPage
