
function countDown(num){
    const myInterval = setInterval(function(){num = num - 1;
        
      if (num ===0){
        console.log("Done!");
        clearInterval(myInterval);
        }
      
      else {
        console.log(num);
       }
       }, 1000);
    
    }

    countDown(4)

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