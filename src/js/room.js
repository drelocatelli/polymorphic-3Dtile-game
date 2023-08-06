var rowsAmount = $('.row').length;
$(document).ready(function () {
    zIndex = 0;

    $.each($('.row'), function (i) {
        $(this).css({
            'top': $(this).prev().css('top') === undefined ? 20 : parseInt($(this).prev().css('top')) + 20,
            'left': $(this).prev().css('left') === undefined ? -42 : parseInt($(this).prev().css('left')) - 42,
        });
        zIndex++;

        for (var n = 0; n < $(this).attr('data-amount'); n++) {
            newTile =
                '<div class="floor-tile"> \
                    <div class="tile"></div> \
                    <div class="border-left"></div> \
                    <div class="border-right"></div> \
                   </div>';
            $(this).html($(this).html() + newTile);
        }

        if ($(this).attr('data-door')) {
            $(this).find('.floor-tile:first-child').addClass('door');
            doorTile =
                '<div class="floor-tile" id="door-tile"> \
                    <div class="tile" id="door-sub-tile"></div> \
                    <div class="border-left"></div> \
                    <div class="border-right"></div> \
                   </div>';
            $(this).html($(this).html() + doorTile);
        }

        $(this).html($(this).html() + '<div class="room-border"></div>');

        if (i == 0) {
            $(this)
                .find('.floor-tile')
                .html($(this).find('.floor-tile').html() + '<div class="room-border-right"></div>');
            $(this)
                .find('.floor-tile')
                .last()
                .html($(this).find('.floor-tile').last().html() + '<div class="room-end-right"></div>');
        }

        if (i == rowsAmount - 1) {
            $(this).html($(this).html() + '<div class="room-end-left"></div>');
        }
    });

    $.each($('.floor-tile'), function (i) {
        $(this).css({
            'top': parseInt($(this).prev().css('top')) + 21,
            'left': parseInt($(this).prev().css('left')) + 41,
            'z-index': zIndex,
        });
        zIndex++;
    });

    $('#door-tile').css({
        'top': '-21px',
        'left': '-41px',
        'z-index': -1,
    });

    $('.row').each(function (index) {
        if ($(this).attr('data-door')) {
            originalZ = $($('.row')[index + 1])
                .find('.floor-tile')
                .first()
                .css('z-index');
            $($('.row')[index + 1])
                .find('.floor-tile')
                .first()
                .removeAttr('style');
            $($('.row')[index + 1])
                .find('.floor-tile')
                .first()
                .find('.tile')
                .css('z-index', originalZ);
            $($('.row')[index + 1])
                .find('.floor-tile')
                .first()
                .find('.border-right')
                .css('z-index', originalZ);
            $($('.row')[index + 1])
                .find('.floor-tile')
                .first()
                .find('.border-left')
                .css('z-index', originalZ);
            $($('.row')[index + 1])
                .find('.floor-tile')
                .first()
                .addClass('door-edit');
        }
    });
});
