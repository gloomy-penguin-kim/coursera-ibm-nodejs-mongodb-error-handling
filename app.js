const express = require('express');

const app = express();
const port = 3000;



app.use((err, req, res, next) => {
  // Set default values for status code and status if not provided in the error object
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "Error";
 
  console.log(err.stack);
 
  res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
  });
});


// GET endpoint
app.get('/', async (req, res) => {
    res.send("This endpoint works.")
});

// // GET endpoint
// app.get('/squarenumber/:num', async (req, res) => {
//     let x = req.params.num;
//     res.json({"square":x*x});
// });

// // GET endpoint
// app.get('/squarenumber/:num', async (req, res) => {
//   let x = req.params.num;
//   if (isNaN(x)){
//       throw Error("Input not a number")
//   }

//   res.json({"square":x*x});
// });

// GET endpoint
app.get('/squarenumber/:num', async (req, res,next) => {
  let x = req.params.num;
  if (isNaN(x)){
      next(new Error("Input not a number")); // Pass the error to the next middleware
      return;
  }
  res.json({"square":x*x});
});

app.get('/getelementatindex/:strr/:index', async (req, res, next) => {
  let strr = req.params.strr
  let index = req.params.index
  
  if (strr.length <= index.length) {
      let charAtIndex = strr.indexOf(index-1)
      res.json({ "element at index": charAtIndex })
  }
  else next( new Error("Index greater than string length"))
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
