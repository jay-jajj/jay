import React, {useState} from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import { Link as RouterLink }  from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Previewer from './Previewer';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import {styleLoginPage} from '../../Style';

function WritingPage() {


    const [Title, setTitle] = useState('')
    const [Description, setDescription] = useState('')
    const onTitleHandler =  function(event){
        setTitle(event.currentTarget.value);
      }
    const onDescriptionHandler = function(event){
        setDescription(event.currentTarget.value);
      }
    const onPostingButtonHandler = function(event){
        console.log(event)
    }

    return (
      <Container  maxWidth="lg">
        <CssBaseline/>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
          <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="title"
                  label="제목을 적어주세요."
                  name="title"
                  autoFocus
                  value={Title}
                  onChange={onTitleHandler}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  multiline
                  rows={28}
                  id="description"
                  label="내용을 적어주세요."
                  name="description"
                  autoFocus
                  value={Description}
                  onChange={onDescriptionHandler}
                />
                <Button variant="outlined" onClick={onPostingButtonHandler}>등록하기</Button>
          </Grid>
                
          <Previewer title={Title} description={Description}/>
      </Grid>
    </Container>
    )
}

export default WritingPage
