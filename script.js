document.addEventListener('DOMContentLoaded', () => {
    const lines = document.querySelectorAll('.line');
    const backsound = document.getElementById('backsound');
    const playButton = document.getElementById('play');
    const pauseButton = document.getElementById('pause');
    const stopButton = document.getElementById('stop');
    let updateInterval;

    // Menampilkan lirik sesuai dengan waktu
    const showLyrics = () => {
        const currentTime = backsound.currentTime;

        // Menambahkan kelas .visible ke lirik yang sesuai
        lines.forEach((line) => {
            const time = parseFloat(line.getAttribute('data-time'));
            if (currentTime >= time && !line.classList.contains('visible')) {
                line.classList.add('visible');
            }
        });

        // Menghentikan pemutaran jika sudah selesai
        if (currentTime >= backsound.duration) {
            backsound.pause();
            backsound.currentTime = 0;
            clearInterval(updateInterval);
        }
    };

    const startUpdatingLyrics = () => {
        updateInterval = setInterval(showLyrics, 100); // Update setiap 100ms
    };

    const stopUpdatingLyrics = () => {
        clearInterval(updateInterval);
    };

    playButton.addEventListener('click', () => {
        backsound.play();
        startUpdatingLyrics();
    });

    pauseButton.addEventListener('click', () => {
        backsound.pause();
        stopUpdatingLyrics();
    });

    stopButton.addEventListener('click', () => {
        backsound.pause();
        backsound.currentTime = 0;
        stopUpdatingLyrics();
        lines.forEach(line => line.classList.remove('visible'));
    });
});
