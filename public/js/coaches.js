const news = document.getElementById("news");
const playerElemeent = document.getElementById("player")

const newsData = [
      {
        "id": 1,
        "title":"test",
        "content": "There was a foo"
      },
      
      {
        "id": 2,
        "title":"test1",
        "content": "There was a foo"
      },
]


const players = [
  {
    "number": 1,
    "fName": "Mike",
    "lName": "M",
    "Position": "Right FB"
  },
  {
    "number": 2,
    "fName": "Mike",
    "lName": "M",
    "Position": "Left FB"
  },
  {
    "number": 3,
    "fName": "Mike",
    "lName": "M",
    "Position": "Goalie"
  },
]

const updateNews = (cb) =>{
  for(let item of newsData){
     news.insertAdjacentHTML('beforeend',`<div><span class="news-data">${item.title}</span></div>`)
  }
  cb()
}


const loadPlayers = () =>{
  for(let player of players){
    playerElemeent.insertAdjacentHTML('beforeend',`<div><span class="player-inf">${player.fName}</span></div>`)
  }

}
// Call this to load the current contents for each of the cards
// const doSomething = () => console.log('hi from coaches')
window.onload = updateNews(loadPlayers);
