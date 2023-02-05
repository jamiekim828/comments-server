import Express, { Request, Response } from 'express';
import { uuid } from 'uuidv4';

const app = Express();

app.use(Express.json());

// fake data
let comments = [
  {
    id: uuid(),
    username: 'Anne Frank',
    comment: 'a great writer!!',
  },

  {
    id: uuid(),
    username: 'Bill Gates',
    comment: 'omg i love this book',
  },

  {
    id: uuid(),
    username: 'Steve Jobs',
    comment: 'I am eating an apple',
  },

  {
    id: uuid(),
    username: 'Jack Daniels',
    comment: 'Can I get a coke?',
  },
];

// get method
app.get('/comments', (req: Request, res: Response) => {
  res.status(200).json(comments);
});

// post method
app.post('/comments/:id', (req: Request, res: Response) => {
  const newComment = req.body;
  comments.push(newComment);
  res.status(200).json(comments);
});

// put method
app.put('/comments/:id', (req: Request, res: Response) => {
  const editComment = req.body;
  const index = comments.findIndex((comment) => comment.id === editComment.id);
  console.log(index);
  if (index !== -1) {
    comments[index] = editComment;
    res.status(200).json(comments);
  } else {
    res.json('cant find the comment by this id');
  }
});

// delete method
app.delete('/comments/:id', (req: Request, res: Response) => {
  const id = req.params.id;

  const newCommentArray = comments.filter((comment) => comment.id !== id);
  res.status(200).json(newCommentArray);
});

// port adress
const port = 8000;
app.listen(port, () => {
  console.log('server is running');
});
