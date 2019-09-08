function autoCarousel(){
    var itemWidth = $("#carouselUL li").outerWidth() + 10; 
    //console.log('itemWidth : ' + itemWidth);
    var moveFactor = parseInt($('#carouselUL').css('left')) - itemWidth;
    //console.log('moveFactor : ' + moveFactor);

    $('#carouselUL').animate(
        {'left' : moveFactor}, 'slow', 'linear',
        function(){
            //console.log('animating');
            $("#carouselUL li:last").after($("#carouselUL li:first"));
            $("#carouselUL").css({
                'left': '-340px'
            });
        }
    );
}

$(document).ready(function(){
    var moveCarousel = setInterval(autoCarousel, 2000);

    $(".carThumb, #scrollLeft, #scrollRight").css({
        opacity: 0.5
    });

    $(".carThumb, #scrollLeft, #scrollRight").hover(function(){
        $(this).stop().animate({
            opacity:1
        }, 75);
        clearInterval(moveCarousel);
    }, function(){
        $(this).stop().animate({
            opacity:0.5
        }, 250);
        moveCarousel = setInterval(autoCarousel, 2000);
    });

    $("#scrollRight").click(function(){
        var itemWidth = $("#carouselUL li").outerWidth() + 10; 
        var moveFactor = parseInt($('#carouselUL').css('left')) - itemWidth;
        
        $('#carouselUL').animate(
            {'left' : moveFactor}, 'slow', 'linear',
            function(){
                //console.log('animating');
                $("#carouselUL li:last").after($("#carouselUL li:first"));
                $("#carouselUL").css({
                    'left': '-340px'
                });
            }
        );
    });

    $("#scrollLeft").click(function(){
        var itemWidth = $("#carouselUL li").outerWidth() + 10; 
        var moveFactor = parseInt($('#carouselUL').css('left')) + itemWidth;
        
        $('#carouselUL').animate(
            {'left' : moveFactor}, 'slow', 'linear',
            function(){
                //console.log('animating');
                $("#carouselUL li:first").after($("#carouselUL li:last"));
                $("#carouselUL").css({
                    'left': '-340px'
                });
            }
        );
    });

    $(".carThumb").each(function(){
        var photoInfo = $(this).attr("src");
        console.log(photoInfo);
        var photoPathArr = photoInfo.split('/');
        //console.log(photoPathArr);
        var photoPath = photoPathArr[0] + '/';
        //console.log(photoPath);
        var photoInfoArr = photoInfo.split('_');
        //console.log(photoInfoArr);
        var photoSrc = photoPath + photoInfoArr[1];
        //console.log(photoSrc);
        //var photoSrc = photoInfo;
        
        $('<img/>').on('load', function(){
            //console.log('CHECK Image Load');
            //There is some serious problem with anchor closing tag
            $('body').append('<div class="photoHolder"><a href="' + photoSrc + '"></div>');
            $('.photoHolder').css('display', 'none');
        }).attr('src', photoSrc);
    });

    $('.carThumb').click(function(){
        var photoInfo = $(this).attr("src");
        var photoPathArr = photoInfo.split('/');
        var photoPath = photoPathArr[0] + '/';
        var photoInfoArr = photoInfo.split('_');

        var photoImgTag = '<img src="' + photoPath + photoInfoArr[1] + '" id="currentPhoto"/>';

        // var modalID = $(this).attr('rel');
        // console.log(this);

        $('#photoModal').html(photoImgTag);
        $('#photoModal').fadeIn('slow', 'swing').append('<div class="photoNote"><a href="#" class="closePhoto">CLOSE</a></div>');

        var bodyHeight = $('body').height();
        console.log($('body'));
        // $('#currentPhoto').css('height', (bodyHeight-200));

        // var modalMarginTop = ($('#photoModal').height() + 40)/2;
        // var modalMarginLeft = ($('#photoModal').width() + 40)/2;

        // $('#photoModal').css({
        //     'margin-top' : -modalMarginTop,
        //     'margin-left' : -modalMarginLeft
        // });

        // $('body').append('<div id="carouselShade"></div>');
        // $('#carouselShade').css('opacity', 0.7).fadeIn();
        // return false;
    });
});