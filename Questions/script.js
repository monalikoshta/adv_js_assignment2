const fetch = require('node-fetch')

const ques1 = async () =>{
    const response = await fetch('https://raw.githubusercontent.com/prust/wikipedia-movie-data/master/movies.json')
    const data = await response.json()
    const result = { 'actors': [] ,'genres': [] }
    let uniqueActors = []
    data.forEach(element => {
        const cast = element.cast
        cast.forEach(item => {
            uniqueActors.push(item)
        })
    });
    uniqueActors = [... new Set(uniqueActors)]

    uniqueActors.forEach((actor) => {
        let temp = {}
        temp.name = actor
        temp.movies = []
        data.forEach((item) => {
            if(item.cast.find((cast) => cast == actor)){
                temp.movies.push(item.title)
            }
        })
        result.actors.push(temp)
    })

    let uniqueGenre = []
    data.forEach(element => {
        const genres = element.genres
        genres.forEach(item => {
            uniqueGenre.push(item)
        })
    });
    uniqueGenre = [... new Set(uniqueGenre)]
    
    uniqueGenre.forEach((gen) => {
        let temp = {}
        temp.type = gen
        temp.movies = []
        data.forEach((item) => {
            if(item.genres.find((genre) => genre == gen)){
                temp.movies.push(item.title)
            }
        })
        result.genres.push(temp)
    })

    return result
}

class QueenAttack{
    constructor(x1,y1,x2,y2){
        this.x1 = x1
        this.y1 = y1
        this.x2 = x2
        this.y2 = y2
    }

    checkCoord(k){
        if(k >= 0 && k < 8){
            return true
        }
    }

    canAttack(){
        if(this.checkCoord(this.x1) && this.checkCoord(this.y1) && this.checkCoord(this.x2) && this.checkCoord(this.y2)){
            if(this.x1 == this.x2 && this.y1 == this.y2)
                return false
            if(this.y1 == this.y2)
                return true
            if(this.x1 == this.x2)
                return true
            let slope = (this.y2 - this.y1)/(this.x2 - this.x1)
            if(slope == 1 || slope == -1)
                return true
            else
                return false
        }
    }
}

const ques2 = (x1,y1,x2,y2) => {
    queens = new QueenAttack(x1,y1,x2,y2)
    console.log(queens.x1,queens.y1,queens.x2,queens.y2)
    return {'ans': queens.canAttack() }
}

module.exports = {
    ques1,
    ques2
}