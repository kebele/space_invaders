// thanks to Ania Kubow
// https://www.youtube.com/channel/UC5DNytAJ6_FISueUfzZCVsw


document.addEventListener('DOMContentLoaded', () => {

    const squares = document.querySelectorAll('.grid div')
    const resultDisplay = document.getElementById('result')
    let width = 15
    let currentShooterIndex = 202
    let currentInvaderIndex = 0
    let alienInvadersTakenDown = []
    let result = 0
    let direction = 1
    let invaderId 

    //define the alien invaders

    const alienInvaders = [
        0,1,2,3,4,5,6,7,8,9,
        15,16,17,18,19,20,21,22,23,24,
        30,31,32,33,34,35,36,37,38,39
    ]

    //bütün alien lara invader classı ekleyecek, yani ekrana koyacak
    alienInvaders.forEach(invader => squares[currentInvaderIndex + invader].classList.add('invader'))


    //draw the shooter 202. div e shooter class ı ekleyecek
    squares[currentShooterIndex].classList.add('shooter')

    //move the shooter, shooter ı sağa sola hereket ettirmek, sola bastıkça indeksini azaltacak sağa bastıkça arttıracak, buda class ekleme/çıkarma şeklinde hareket kazanmış gibi görünecek, bunuda tuşa bastıkça moveShooter hareket edecek
    function moveShooter(e){
        squares[currentShooterIndex].classList.remove('shooter')
        switch(e.keyCode){
            case 37:
                if(currentShooterIndex % width !== 0) currentShooterIndex -= 1
                break
            case 39:
                if(currentShooterIndex % width < width -1) currentShooterIndex += 1
                break  
        }
        squares[currentShooterIndex].classList.add('shooter')
    }
    document.addEventListener('keydown', moveShooter)

    //move the aliens
    //alien ler sola/sağa değdikçe yön değişecek
    function moveInvaders(){
        const leftEdge = alienInvaders[0] % width === 0
        const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1

        if((leftEdge && direction === -1) || (rightEdge && direction === 1)){
            direction = width
        } else if (direction === width){
            if(leftEdge) direction = 1
            else direction = -1
        }
//hareket kısmı
        for(let i = 0; i <= alienInvaders.length -1; i++){
            squares[alienInvaders[i]].classList.remove('invader')
        }
        for(let i=0; i <= alienInvaders.length -1; i++){
            alienInvaders[i] += direction
        }
        for(let i=0; i <=alienInvaders.length - 1; i++){
            if(!alienInvadersTakenDown.includes(i)){
                squares[alienInvaders[i]].classList.add('invader')
            }
        }
        //game over
        //invader shooter ile aynı old. yani hem shooter hemde invader class larına sahip old. oyunu kaybeder
        if(squares[currentShooterIndex].classList.contains('invader','shooter')){
            resultDisplay.textContent = 'game over'
            squares[currentShooterIndex].classList.add('boom')
            clearInterval(invaderId)
        }

        for(let i=0; i<=alienInvaders.length -1; i++){
            if(alienInvaders[i]>(squares.length - (width-1))){
                resultDisplay.textContent = 'game over'
                clearInterval(invaderId)
            }
        }
        //decide a win
        //bütün alien lar vurulduğunda yani invader sayısı ile vurulnaların dizisinin sayısı aynı old.kazanılır
        if(alienInvadersTakenDown.length === alienInvaders.length){
            resultDisplay.textContent = 'you win'
            clearInterval(invaderId)
        }
    }
    //alien ların hızı
    invaderId = setInterval(moveInvaders, 500)



    //shoot at aliens
    function shoot(e){
        let laserId
    let currentLaserIndex = currentShooterIndex
    //move the laser from the shooter to the alien invader
    function moveLaser() {
      squares[currentLaserIndex].classList.remove('laser')
      currentLaserIndex -= width
      squares[currentLaserIndex].classList.add('laser')
      if(squares[currentLaserIndex].classList.contains('invader')) {
        squares[currentLaserIndex].classList.remove('laser')
        squares[currentLaserIndex].classList.remove('invader')
        squares[currentLaserIndex].classList.add('boom')

                //boom un kaybolması
                setTimeout(() => {
                    squares[currentLaserIndex].classList.remove('boom')
                }, 250);
                clearInterval(laserId)
//puanlama
                const alienTakenDown = alienInvaders.indexOf(currentLaserIndex)
                alienInvadersTakenDown.push(alienTakenDown)
                result++
                resultDisplay.textContent = result
            }

            if(currentLaserIndex < width){
                clearInterval(laserId)
                setTimeout(() => {
                    squares[currentLaserIndex].classList.remove('laser')
                }, 100);
            }
        }

            // document.addEventListener('keyup', e => {
            //     if(e.keyCode === 32){
            //         laserId = setInterval(moveLaser, 100)
            //     }
            // })
            switch(e.keyCode) {
                case 32:
                  laserId = setInterval(moveLaser, 100)
                  break
        }
    }
        document.addEventListener('keyup', shoot)
    





})