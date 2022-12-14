
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
