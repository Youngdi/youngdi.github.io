var $card = $('.card'),
    $modal = $('#modal');

$card.click(this, function () {
    var $this = $(this),
        $thisImage = $this.find('img'),
        $thisTitle = $this.data('title'),
        $thisBody = $this.data('body'),
        $thisDate = $this.data('date');

    $modal.find('.header h2').html($thisTitle);
    $modal.find('.meta').html($thisDate);
    $modal.find('.body').html($thisBody);
    $modal.find('.image').css('background-image', 'url(' + $thisImage[0].src + ')');

    $modal.modal();

    //alert( $this.data( 'date' ) );
})