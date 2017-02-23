$('#modern').bind('input', function() {
    $('[data-toggle="tooltip"]').tooltip();

}).focusin(function(){
    $('[data-toggle="tooltip"]').tooltip();

    $('.navbar').css('background-color','rgba(44, 48, 58, 0.9)');
    $('#modern').css('background-color','transparent');
    $('#ut').css('background-color','transparent');
    $("#filterBar").fadeTo(300,0.9);
    $("#filterBar").css("z-index",100);

    $("#main").fadeIn(100);

}).focusout(function(){
    //TODO: change this by adding a button for showing and hiding result
});

$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();

    $(window).on('load resize', function(){
        if ($(window).width()<=992){
            $('#main').css("top",$('#map-canvas').height());
        }else {
            if ($(window).width()>1200){$('#main').css("top","51px");}
            else {$('#main').css("top",$('#navigationBar').height());}
        }
        
        if ($(window).width()<=540){
            $("#logoImage").css('display','none');
            $('#searchBar').addClass('col-xs-12').removeClass('col-xs-8');
        }else {
            $('#searchBar').addClass('col-xs-8').removeClass('col-xs-12');
            if ($(window).width()<=1200){$("#logoImage").css('display','block');}
            else {$("#logoImage").css('display','none');}
        }
    });
    
    $('.logo').click(function () {
       $('#page').fadeIn(1000);
    });

    $('#access').click(function () {
        $('#page').fadeOut(1000);
    });

    $("#instButton").click(function(){
        if ($("#instFilter").css('display') === 'none'){
            $("#wilayaFilter").fadeOut(0);
            $("#instFilter").fadeIn(0);
        }
        else {
            $("#instFilter").fadeOut(0);
        }
    });

    $("#wilayaButton").click(function(){
        if ($("#wilayaFilter").css('display') === 'none'){
            $("#instFilter").fadeOut(0);
            $("#wilayaFilter").fadeIn(0);
        }
        else {
            $("#wilayaFilter").fadeOut(0);
        }
    });

    $(document).click(function(event) {
        var target = $(event.target);

        if(target.is(':visible') && !target.parents('#wilayaFilter').length && !target.parents('#instFilter').length && !target.is('#wilayaButton') && !target.is('#instButton')) {
            $("#instFilter").fadeOut(0);
            $("#wilayaFilter").fadeOut(0);
        }
    });

});



