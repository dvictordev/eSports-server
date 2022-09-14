import express from "express";

const app = express();



app.get('/games', (req, res)=> {
  return res.json([])
})

app.post('/ads', (req, res)=> {
  return res.json([])
})

app.get("/games/:id/ads", (request, rsponse) => {
  return rsponse.json([]);
});


app.get('/ads/:id/discord', (request, response) => {
  return response.json()
})


app.listen(3333, () => {
  console.log("listening on port 3333");
});
