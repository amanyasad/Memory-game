document.querySelector('.control-button span').onclick = function () {
    
    'use strict';
    
    let YourName = prompt('What is your name?');
    
    if(YourName == null || YourName == ""){
       
       document.querySelector('.name span').innerHTML = 'Unknwon' ;
        
       }else{
           
       document.querySelector('.name span').innerHTML = YourName;
           
       }
    document.querySelector('.control-button').remove();
    
};

let duration = 1000;

let blockscontainer = document.querySelector('.memory-game-blocks');

let blocks = Array.from(blockscontainer.children);

let orderRange = [...Array(blocks.length).keys()];

shuffle(orderRange);

blocks.forEach((block, index)=>{
    
    block.style.order = orderRange[index];
    
    block.addEventListener('click' , function(){
        
        flipBlock(block);
        
    });
    
});
  
function flipBlock(selectedBlock){
    
 selectedBlock.classList.add('is-flipped'); 
    
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));
    
    if(allFlippedBlocks.length === 2){
       
        stopClicking();
        
        checkedMatchedBlocks(allFlippedBlocks[0],allFlippedBlocks[1]);
        
       }
    
}

function stopClicking(){
    
    blockscontainer.classList.add('no-clicing');
    
    setTimeout( () => {
        
      blockscontainer.classList.remove('no-clicing');
        
    }, duration);
}

function shuffle(array){
    
    let current = array.length,
        
        temp,
        
        random;
    
    while(current > 0){
        
       random = Math.floor(Math.random()*current);
         
        current--;
        
        temp = array[current];
        
        array[current] = array[random];
        
        array[random] = temp;
        
          
          }
    
    return array;
} 

function checkedMatchedBlocks(firstBlock , secondBlock){
    
    let triesElement = document.querySelector('.tries span');
    
    if(firstBlock.dataset.technology === secondBlock.dataset.technology ){
        
        firstBlock.classList.remove('is-flipped');
        
        secondBlock.classList.remove('is-flipped');
        
        firstBlock.classList.add('has-match');
        
        secondBlock.classList.add('has-match');
        
        document.getElementById('success').play();
       
       }else{
           
          triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
           
           setTimeout(() => {
               
            firstBlock.classList.remove('is-flipped');
        
            secondBlock.classList.remove('is-flipped');
               
           },duration);
           
             document.getElementById('fail').play();
       }
    
}