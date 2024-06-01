$(document).ready(function () {
    var totalImages = $('.img-fluid').length;
    console.log(totalImages);
    var currentIndex = 0;
    var width = $('.img-fluid').width();
    console.log(width);

    function showImage(index) {
        $('.images').each(function (i) {
            var newIndex = (i - index + totalImages) % totalImages;
            var position = (newIndex * -width) + 'px'; // Shift by one image width
            $(this).css('transform', 'translateX(' + position + ')');
        });
        $('.dot').removeClass('active');
        $('.dot').eq(index).addClass('active');
    }

    $('.dot').click(function () {
        var index = $(this).data('index');
        showImage(index);
    });

    setInterval(function () {
        currentIndex = (currentIndex + 1) % totalImages;
        showImage(currentIndex);
    }, 3000); // Change image every 3 seconds (3000ms)

    showImage(currentIndex); // Show initial image
});
