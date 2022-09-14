import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
app.use(express.json())

const prisma = new PrismaClient({
  log:['query']
})

app.get('/games', async (req, res)=>   {
  const games = await prisma.game.findMany({
    include:{_count:{
      select:{
        ads:true
      }
    }}
  })
  return res.send(games)
})

app.post('/games/:id/ads', async (req, res)=> {
  const id = req.params.id;
  const body = req.body

  return res.json(body)
})

app.get("/games/:id/ads", async (request, response) => {
  const gameId = request.params.id

  const ads = await prisma.ad.findMany({
    select:{
      id:true,
      name:true,
      hourStart:true,
      hourEnd:true,
      weekDays:true,
      yearsPlaying:true,
    },
    where:{
      gameId
    },
    orderBy:{
      createdAt:'desc'
    }
  })
  return response.json(ads.map(ad => {   
      return{
        ...ad,
        weekDays: ad.weekDays.split(','),
      } 
    
  }));
});


app.get('/ads/:id/discord', async (request, response) => {
  const adId = request.params.id

  const ad = await prisma.ad.findUniqueOrThrow({
    select:{
      discord:true
    },
    where:{
      id: adId,
    }
  })

  return response.json({
    discord: ad.discord,
  })
})


app.listen(3333, () => {
  console.log("listening on port 3333");
});
