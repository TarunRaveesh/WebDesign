$(document).ready(function () {
    var totalImages = $('.img-fluid').length;
    var imagesPerDot = 4;
    var totalDots = Math.ceil(totalImages / imagesPerDot);
    var currentIndex = 0;
    var imageWidth = $('.img-fluid').outerWidth(true);
    var isAutoScrollEnabled = true; // Variable to track auto-scrolling state

    // Clone the images for continuous scrolling
    $('.images').append($('.images').children().clone());

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

    setInterval(autoScroll, 3000); // Change image every 3 seconds (3000ms)

    showImages(currentIndex);

    // Hover and click event handlers with smooth transitions
    $('.img-fluid').hover(function () {
        var $this = $(this);
        if (!$this.data('original-src')) {
            $this.data('original-src', $this.attr('src'));
        }
        $this.stop(true, true).fadeOut(100, function () {
            $this.attr('src', 'images/design.png').fadeIn(300);
        });
    }, function () {
        var $this = $(this);
        $this.stop(true, true).fadeOut(100, function () {
            $this.attr('src', $this.data('original-src')).fadeIn(300);
        });
    });

    $('.img-fluid').click(function () {
        if ($(this).attr('src') === 'images/design.png') {
            setTimeout(function () {
                window.open('https://fylehq.com', '_blank');
            }, 200); // Delay for smooth transition
        }
    });

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