class Player {
    constructor() {
        this.$container = $('<div class="player-container"></div>');
        this.$element = $('<div class="player"></div>');
        this.$container.append(this.$element);
        this.initialize();
    }

    initialize() {
        this.$element.css({
            top: parseInt($('.room div[data-door]').css('top')[0]) - 10,
            left: parseInt($('.room div[data-door]').css('left')) + 5,
            transform: `translate(96%, 473%)`,
        });
        $('.room').append(this.$container);
    }
}

$(document).ready(function () {
    const player = new Player();
    let currentAnimation = null;
    movementCount = 0;

    $('.tile').click(function (e) {
        if (currentAnimation) {
            currentAnimation.stop(); // Stop the current animation if it's running
        }

        const tileOffset = $(this).offset();
        const tileWidth = $(this).width();
        const tileHeight = $(this).height();
        const roomOffset = $('.room').offset();

        const currentPlayerTop = parseInt(player.$element.css('top'));
        const currentPlayerLeft = parseInt(player.$element.css('left'));

        const dx = tileOffset.left + tileWidth / 2 - 35 - roomOffset.left - currentPlayerLeft;
        const dy = tileOffset.top + tileHeight / 2 - 101 - roomOffset.top - currentPlayerTop;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const duration = 1500 + distance * 5;

        // Store the animation in the currentAnimation variable
        currentAnimation = player.$element.animate(
            {
                'top': tileOffset.top + tileHeight / 2 - 101 - roomOffset.top,
                'left': tileOffset.left + tileWidth / 2 - 35 - roomOffset.left,
            },
            {
                duration: duration,
                complete: function () {
                    currentAnimation = null; // Reset currentAnimation when animation completes
                },
                start: function () {
                    movementCount++;
                    if (movementCount == 1) {
                        player.$element.css('z-index', 1000003);
                    }
                    $('.row').each(function (index) {
                        if ($(this).attr('data-door')) {
                            $($('.row')[index + 1])
                                .find('.floor-tile')
                                .first()
                                .removeAttr('style');
                            $($('.row')[index + 1])
                                .find('.floor-tile')
                                .first()
                                .addClass('door-edit');
                        }
                    });
                    if (e.target.id == 'door-sub-tile') {
                        $('.row').each(function (index) {
                            if ($(this).attr('data-door')) {
                                originalZ =
                                    $($('.row')[index + 1])
                                        .find('.floor-tile')
                                        .eq(1)
                                        .css('z-index') - 1;
                                $($('.row')[index + 1])
                                    .find('.floor-tile')
                                    .first()
                                    .removeAttr('style');
                                $($('.row')[index + 1])
                                    .find('.floor-tile')
                                    .first()
                                    .addClass('door-leaving');
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
                            }
                        });
                    } else {
                    }
                },
            },
        );
    });
});
