$(function () {

	console.log('HELLO')

	let audioElement = document.createElement('audio');   

	audioElement.volume = .1; 

    audioElement.addEventListener('ended', function() {
        this.play();
    }, false);
 
    function handleCanPlay(){
    	audioElement.play();
	}

    $('.item').mousedown(function () {
    	let { path } = $(this).data();
    	audioElement.setAttribute('src', path);
    	audioElement.addEventListener('canplay', handleCanPlay);
    }).mouseup(function () {
    	audioElement.pause();
    	audioElement.removeEventListener('canplay', handleCanPlay)
    	audioElement.currentTime = 0;
    });
    
});