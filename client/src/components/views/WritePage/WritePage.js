import React, {useState} from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import Previewer from './Previewer';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';


import { useDispatch } from "react-redux";
import { createPost } from "../../../_actions/post_action";

function WritingPage(props) {

    const post = props.location.state||{
      title :'',
      description : '',
      tagList : []
    };
    const dispatch = useDispatch();

    const [Title, setTitle] = useState(post.title);
    const [Description, setDescription] = useState(post.description);
    const [Tag, setTag] = useState('');
    const TagList = post.tagList;
    const onTitleHandler =  function(event){
        setTitle(event.currentTarget.value);
      }
    const onDescriptionHandler = function(event){
        setDescription(event.currentTarget.value);
      }
      
    const onTagHandler =  function(event){
      setTag(event.currentTarget.value);
    }
    const onSubmitHandler = function(event){
      event.preventDefault();

      let body = {
        title : Title,
        description : Description,
        tagList : TagList,
        author : ""
      }

        dispatch(createPost(body))
        .then(response => {
          if (response.payload.createSuccess) {
            props.history.push('/')
        } else {
            alert('Error˝')
        }
        });
    }
    const onTagButtonHandler = function(event){
      TagList.push(Tag)
      console.log(TagList);
  }


    return (
      <Container  maxWidth="lg">
        <CssBaseline/>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
          <form   noValidate onSubmit={onSubmitHandler}>
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
          <Grid container spacing={1}>
            <Grid item xs={3}>
              <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      required
                      id="tags"
                      label="태그를 붙여주세요"
                      name="tag"
                      autoFocus
                      value={Tag}
                      onChange={onTagHandler}
                    />
              </Grid>
            <Grid item xs={3} md={3}>
              <Button  variant="outlined" onClick={onTagButtonHandler}>붙이기</Button>
            </Grid>
          </Grid>
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
                <Button variant="contained" color="primary" type='submit'>등록하기</Button>
          </form>
          </Grid>
                
          <Previewer title={Title} description={Description}/>
      </Grid>
    </Container>
    )
}

export default WritingPage
