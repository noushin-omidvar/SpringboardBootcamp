function randomGame(){
    let i = 0 ;
    const myInterval = setInterval(function(){
        let randNum = Math.random();
        if (randNum > 0.75){
            clearInterval(myInterval)
            console.log(i)
            }
        else {
          console.log(randNum);
        }
    i++}, 1000)
}
randomGame();