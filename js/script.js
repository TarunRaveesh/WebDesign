$(document).ready(function () {
    var totalImages = $('.img-fluid').length;
    var imagesPerDot = 4;
    var totalDots = Math.ceil(totalImages / imagesPerDot);
    var currentIndex = 0;
    var imageWidth = $('.img-fluid').outerWidth(true);
    var totalWidth = imageWidth * totalImages;
    var isAutoScrollEnabled = true; // Variable to track auto-scrolling state

    // Clone the images for continuous scrolling
    $('.images').append($('.images').children().clone());
    var totalClonedImages = $('.img-fluid').length;

    function showImages(dotIndex) {
        var offset = dotIndex * imagesPerDot;
        var position = (offset * -imageWidth) + 'px';
        $('.images').css('transition', 'transform 1s ease-in-out');
        $('.images').css('transform', 'translateX(' + position + ')');

        // Dot management
        $('.dot').removeClass('active');
        $('.dot').eq(dotIndex % totalDots).addClass('active');
    }

    function resetPositionIfNeeded() {
        if (currentIndex >= totalDots) {
            currentIndex = 0;
            $('.images').css('transition', 'none');
            $('.images').css('transform', 'translateX(0px)');
        }
    }

    $('.dot').click(function () {
        isAutoScrollEnabled = false; // Disable auto-scrolling
        var index = $(this).data('index');
        currentIndex = index;
        showImages(index);
    });

    $('.image-slider').on('wheel', function (event) {
        if (event.originalEvent.deltaY > 0) {
            currentIndex = (currentIndex + 1) % totalDots;
        } else {
            currentIndex = (currentIndex - 1 + totalDots) % totalDots;
        }
        showImages(currentIndex);
        event.preventDefault();
    });

    function autoScroll() {
        if (isAutoScrollEnabled) { // Check if auto-scrolling is enabled
            currentIndex++;
            showImages(currentIndex);

            setTimeout(resetPositionIfNeeded, 1000); // Wait for transition to complete
        }
    }

    setInterval(autoScroll, 3000); // Change image every 4 seconds (4000ms)

    showImages(currentIndex);

    $('.project-details div').click(function () {
        $('.project-details div').removeClass('active');
        $(this).addClass('active');
        var imgSrc = $(this).data('img');
        $('#project-img').attr('src', imgSrc);
    });

    $("#openForm").click(function (event) {
        event.preventDefault();
        $("#popupForm").css("display", "flex");
        $("body").css("overflow", "hidden");
    });

    $("#popupForm").click(function (event) {
        if (event.target == this) {
            $(this).fadeOut();
            $("body").css("overflow", "auto");
        }
    });

});
