$(function () {

	console.log('HELLO')

	let audioElement = document.createElement('audio');   

	audioElement.volume = 1; 

    audioElement.addEventListener('ended', function() {
        this.play();
    }, false);
 
    function handleCanPlay(){
    	audioElement.play();
	}

	audioElement.addEventListener('timeupdate', function() {
		var currentTime = audioElement.currentTime;
		var duration = audioElement.duration;
		$('.active .bar').css('width', currentTime/duration * 100 + '%');
	});

    $('.item').mousedown(function () {
		let { path } = $(this).data();
		$(this).addClass('active');
    	audioElement.setAttribute('src', path);
    	audioElement.addEventListener('canplay', handleCanPlay);
    }).mouseup(function () {
    	audioElement.pause();
    	audioElement.removeEventListener('canplay', handleCanPlay)
		audioElement.currentTime = 0;
		$(this).removeClass('active');
		$(this).find('.bar').css('width', 0);
    });
    
});