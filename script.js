const searchInput = document.getElementById('searchInput')
const searchBtn = document.getElementById('search-btn')

const URL = 'https://api.lyrics.ovh'

const fetchLyrics = async (lyrics) => {
    const res = await fetch(`${URL}/suggest/${lyrics}`)
    let data = await res.json()
    //object can't be slice
    data = data.data.slice(0, 10)
    const display = document.getElementById('search-result')
    display.innerHTML = '';
    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        const title = item.title
        const artist = item.artist.name

        const element = `
        <div id="display" class="single-result row align-items-center my-3 p-3">
            <div class="col-md-9">
                <h3 class="lyrics-name" id="title">${title}</h3>
                <p class="author lead">Album by <span id="artist">${artist}</span></p>
                <audio controls>
                <source src="${item.preview}" type="audio/mpeg">
            </audio>
                </div>
            <div class="col-md-3 text-md-right text-center">
                <button class="btn btn-success" onclick="getLyric('${title}','${artist}')">Get Lyrics</button>
            </div>
        </div>
        `
       display.innerHTML += element

    }
}

const getLyric = async (title,artist) =>{
    const displayLyrics = document.getElementById('display-lyrics')
  
        const res = await fetch(`${URL}/v1/${artist}/${title}`)
        try {
            let data = await res.json()
            const lyrics = await data.lyrics
            if(lyrics){

                displayLyrics.innerHTML = lyrics
            }
            else{

                displayLyrics.innerHTML =` <h3>No Lyrics Found !</h3>`
            }
        } catch (error) {
            console.log(error)
        }
       
      
      

            
        
    
    
    
}

searchBtn.addEventListener('click', () => {
    const lyrics = searchInput.value
    fetchLyrics(lyrics)
})