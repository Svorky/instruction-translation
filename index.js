import express from "express";
import cors from "cors";
import cookieParser from'cookie-parser';
import { productRouter } from './routes/productRoute.js';
import bodyParser from 'body-parser';
import { languageRouter } from './routes/languageRouter.js';
import { translationRouter } from './routes/translationRouter.js';
import { searchRouter } from './routes/searchRoute.js';
import { pictureRouter } from './routes/pictureRouter.js';
import userRouter from './routes/userRouter.js';

const app = express();
app.use(cookieParser())
app.use(cors({
  credentials:true,
  origin: ['http://localhost:5173']
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit: '1mb'}));

app.listen(process.env.PORT || 5005, () => {
  console.log(`Server listening on ${process.env.PORT || 5005}`);
});

// app.get("/api/:name", (req, res) => {
//   res.json({ message: `Hello ${req.params.name}, from server!` });
// });

app.use('/api/products', productRouter)
app.use('/api/languages', languageRouter)
app.use('/api/translations', translationRouter)
app.use('/api/picture', pictureRouter)
app.use('/search', searchRouter)
app.use("/user", userRouter);

// Have Node serve the files for our built React app
// app.use(express.static(path.resolve(__dirname, "./client/build")));
// app.use(express.static(path.join(__dirname, "/client/build")));

// // All other GET requests not handled before will return our React app
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
// });




