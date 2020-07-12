var app = {
    widthMobile : 900,
    init : function(){
        this.resizeBackground();
        
    },
    message : function(t){
        var m = $(".message-information");
        m.html(t);
        m.addClass("is-active");
        setTimeout(function (){
            m.removeClass("is-active");
        }, 3000);
    },
    resizeBackground : function(){
        var bg = $(".section-h-100");

        var window_width = $(window).width();
        var window_height = $(window).height();

        if (window_width <= 1024) {
            if (window_width < window_height) {
                bg.css("height",$(window).height() );
            } else {
                bg.css("height",$(window).width() );
            }
        } 
    },
    inputEnter : function(){
        
    },
    click : function(e, f){
        
        (typeof e == "object") ? e.on("click", f) : $(document).on("click", e, f);
    },
    change : function(e, f){
        
        (typeof e == "object") ? e.on("change", f) : $(document).on("change", e, f);
    },
}
app.init();

var body = {
    scroll : function(e){
        $(window).scroll(e);
    },
    load : function(e){
        $(window).on("load",e);
    },
}


var modal = {
    init : function(){
        modal.closeClick();
        
    },
    show : function(e){
        $(e).addClass("is-active");
    },
    hide : function(e){
        $(e).removeClass("is-active");
    },
    closeClick : function(e){
        var self = this;
        app.click(".modal-background, .modal-close", function(){
            var s = $(this);
            self.hide(s.closest(".modal"));
        });
        
        
    },
}
modal.init();



var validation = {
    isEmail : function(v){
        var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        return pattern.test(v);
    },
    isNumeric : function(v){
        return !isNaN(parseFloat(v)) && isFinite(v);
    },
}


var scroll = {
    window : function(e){
        body.scroll(e);
    },
    value : function(e, o){
        return (e == undefined) ?  $(window).scrollTop() : ($(e).length == 0) ? false : parseFloat($(e).offset().top) + parseInt(o || 0) ;
    },
    to : function(e, o){
        $("html, body").animate({ scrollTop: this.value(e) + parseInt(o || 0) }, 800);
    },
    before : function(e) {
        return (scroll.value(e) === false) ? false : scroll.value() < scroll.value(e) ;
    },
    after : function(e) {
        return (scroll.value(e) === false) ? false : scroll.value() > scroll.value(e) ;
    },
    equal : function(e) {
        return (scroll.value(e) === false) ? false : scroll.value() == scroll.value(e) ;
    },
    between : function(e, o){
        return (scroll.value(e) === false) ? false : scroll.value() < parseInt(scroll.value(e, o)) && scroll.value() >= parseInt(scroll.value(e));
    }
}
var scrollMagic = {
    init : function(t){
        t = t || "onCenter";
        var controller = new ScrollMagic.Controller({
                            globalSceneOptions: {
                                triggerHook: t
                            }
                        });
    },
}
scrollMagic.init();




var utub = {
    init : function(){
        
        $.getScript( "https://cdn.jsdelivr.net/npm/jquery-tubeplayer-plugin@2.1.0/src/tubeplayer.js", function( data, textStatus, jqxhr ) {
            utub.loadVideo();    
        })
        
    },
    loadVideo : function(e){
        $(".utub").each(function(){
            var s = $(this);
            var videoId = s.attr("id");
            s.tubeplayer({
                initialVideo: videoId,
                controls: 0,    
                color: "white", 
                modestbranding: false,   
                annotations: false,
            });
        })
    },  
}
utub.init();



var select = {
    select2 : null,
    option : null,
    init : function(e, o){
        this.select2 = $(e);
        this.option = o || "";
        select.generate(".select2",{});
    },
    generate : function(e, o){
        this.select2 = $(e);
        this.option = o || {};
        this.option.width = "100%";
        this.select2.select2(this.option);
    },
    value : function(e){
        $("select[data-value]").each(function(){
            var self = $(this);
            
            self.val(self.data("value"));
            self.trigger("change");
        })
    },
}




var placeholder = {
    init : function(){
        
        $(document).on("focus", ".with-placeholder input, .with-placeholder textarea", function(){
            var self = $(this);
            var v = self.val();
            var w = self.closest(".with-placeholder").find(".placeholder");
            w.addClass("is-active");
        })
        $(document).on("focusout", ".with-placeholder input, .with-placeholder textarea", function(){
            var self = $(this);
            var v = self.val();
            var w = self.closest(".with-placeholder").find(".placeholder");
            (v == undefined || v == "") ? w.removeClass("is-active") : w.addClass("is-active");
        })
    },
}
placeholder.init();


function form(e){
    this.e = e;
    this.button = ".send-" + this.e.replace(".", "");
    this.el = $(e);
    this.o = {
                ignore: "",
                errorElement: "label",
                errorPlacement: function(error, element) {
                    element.parent().append(error);
                },
                highlight: function(element) {
                    $(element).parent().addClass("error");
                },
                unhighlight: function(element) {
                    $(element).parent().removeClass("error");
                },
            };
    this.init = function(o){
        (o == undefined) ? false : this.o.rules = o.rules ;
        (o == undefined) ? false : this.o.messages = o.messages ;
        
        this.validate();
        this.extend();
        
        return (this.el.length === 0) ? false : this;
    };
    this.extend = function(){
        jQuery.validator.addMethod("checkfirstat", function(value, element) {
            return (value != "") ? (value.substring(0, 1) == "@") : true ;
        }, "Awali dengan @ sebelum user ID");
        jQuery.validator.addMethod("phonenumber", function(value, element) {
            return (value != "") ? (value.substring(0, 1) != "0") && validation.isNumeric(value) : true ;
        }, "Pastikan no telp valid.");
        jQuery.validator.addMethod("lettersonly", function(value, element) {
            return (value != "") ? this.optional(element) || /^[a-z\s]+$/i.test(value) : true ;
        }, "Hanya boleh huruf a-z."); 

        jQuery.extend(jQuery.validator.messages, {
            required: "Kolom ini harus diisi.",
            email: "Pastikan email kamu valid.",
            url: "Masukan tautan yang valid. Contoh : http://example.com/node/1, https://example.com/",
            number: "Hanya boleh angka 0-9.",
            alphanumeric: "Hanya boleh berupa huruf, angka dan underscore.",
            lettersonly: "Hanya boleh huruf a-z.",
            accept: "Please enter a value with a valid extension.",
            maxlength: jQuery.validator.format("Kolom ini tidak boleh lebih dari {0} karakter."),
            minlength: jQuery.validator.format("Masukan minimal {0} karakter."),
        });
    }
    this.validate = function(){
        var self = this;
        this.el.validate(this.o);
    };
    this.submit = function(){
        console.log(this.valid());
        if (this.valid()){
            this.el.submit();
        }
    };
    this.valid = function(){
        return this.el.valid();
    };
    this.post = function(url, formData, callbackSuccess, callbackError){
        formData = formData || "";
        url = url || "";
        callbackSuccess = callbackSuccess || "";
        callbackError = callbackError || "";
        if ( formData != "" && url != "" ){
            $.ajax({
                url: url,
                type: "POST",
                data: formData,
                dataType: "json",
                contentType: false,
                processData: false,
                success: callbackSuccess,
                error: callbackError
            });
        }
    };
    
}

var ajaxForm = {
    init : function(){
        
    },
    post : function(url, formData, callbackSuccess, callbackError){
        formData = formData || "";
        url = url || "";
        callbackSuccess = callbackSuccess || "";
        callbackError = callbackError || "";
        if ( formData != "" && url != "" ){
            $.ajax({
                url: url,
                type: "POST",
                data: formData,
                dataType: "json",
                contentType: false,
                processData: false,
                success: callbackSuccess,
                error: callbackError
            });
        }
    },
}
ajaxForm.init();


    


var scrollMagic = {
    e : $("[scroll-magic]"),
    init : function(){
        scrollMagic.e.each(function(){
            var s = $(this);
            var t = s.attr("type-scroll-magic") || "";
            var n = s.attr("scroll-magic") +"-scroll-magic";
            var c = "scroll-magic";
            var r = s.attr("scroll-magic") +"-scroll-magic-parent";
            switch (t){
                case "wrap":
                    s.addClass(n);
                    s.addClass(c);
                    break;
                default:
                case "wrapInner":
                    s.wrapInner(function() {
                        return "<div class='"+ n +" "+ c +" '></div>";
                    }); 
                    s.addClass(r);
                    break;
            }
            
            
            

        })
    },
}
if ($(window).width() >= app.widthMobile){
    scrollMagic.init();
}


var slick = {
    e : null,
    opt : {
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            dots: false,
            autoplay: false,
            autoplaySpeed: 5000,
        
            responsive: [
            {
              breakpoint: 767,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,

              }
            }]
    },
    init : function(e, s, a, d){
        var self = this;
        this.e = e;
        
        
        
        $(e).each(function(){
            self.opt.slidesToShow = s || 1;
            self.opt.autoplay = a || false;
            self.opt.dots = d || false;
            self.opt["prevArrow"] = $(this).parent().find(self.e + '-left');
            self.opt["nextArrow"] = $(this).parent().find(self.e + '-right');
            self.opt.responsive[0].settings["prevArrow"] = $(this).parent().find(self.e + '-left');
            self.opt.responsive[0].settings["nextArrow"] = $(this).parent().find(self.e + '-right');
            

            $(this).slick(self.opt);        
            
            
        });

        
    },
    option : function(e){
        var self = this;
        $.each(e, function(k, v){
            
            self.opt[k] = v;
        });
        

        
        
    },
}


var textTransform = {
    init : function(){
        
    },
    ucfirst : function(e){
        return e.charAt(0).toUpperCase() + e.slice(1);  
    },
    ucwords : function(e){
        return (e + '')
            .replace(/^(.)|\s+(.)/g, function ($1) {
                return $1.toUpperCase()
            })
    },
}
textTransform.init();


var url = {
    init : function(){
        
    },
    change : function(e){
        history.pushState({}, '', e);
    },
}
url.init();





var script = {
    init : function(){
        script.setOmni();
        script.checkPage();
    },
    checkPage : function(e){
        var className = window.location.hash.substr(1) || "/home";
        if (className.slice(0,1) == "/"){
            className = className.substr(1);

            $(".menu-page").each(function(){
                var s = $(this);
                s.removeClass("is-active");
            })
            $(".page-" + className).addClass("is-active");
        }
        if (className != "tnc" && $(window).width() >= 1000){

        }
    },
    setOmni : function(){
        $("[omni]").each(function(){
            var o = $(this).attr("omni");
            
            $(this).attr("data-omni-type", "microsite");
            $(this).attr("data-omni", "id:star:" + o );
        })
        
    },
    
}
script.init();

var navigate = {
    init : function(){
        $('.navigation a').click(function(){
            var getVal = $(this).attr('goto');
            $('.navigation a').removeClass('is-active');
            $(this).addClass('is-active');
            
            scroll.to('section.' + getVal);

        });
    }
}
navigate.init();

var register = {
    init : function(){
        $('.btn .termsncond').click(function(){
            fbq('track', 'Register-GA9');
            twTag();
        })
    }
}
register.init();

$('.slider').slick({
    autoplay: false,
    nextArrow: "<div class='arrowGeneral arrowRight'><i class='ti-angle-right'></i></div>",
    prevArrow: "<div class='arrowGeneral arrowLeft'><i class='ti-angle-left'></i></div>",
    dots: true,
});

let video = {
    open : function (){
        $('.thumb-video').click(function() {
            $('.modal').toggle();
        });
    },
    closed : function (){
        $('.modal-close').click(function() {
            $('.modal').toggle();
        });
    }
}
video.open();
video.closed();

let scrolldown = {
    scroll : function() {
        $('.wrapper').click(function() {
            $('html, body').animate({
                scrollTop: $(".section2").offset().top
            }, 1500);
        });
    }
}
scrolldown.scroll();

var menu = {
    detect : function(){
        scroll.window(function(){
            
            if (scroll.value() < scroll.value("section.section1") + 100) {
                
                $(".navigation a").removeClass("is-active");
                $(".navigation a.nav1").addClass("is-active");
            }

            if (scroll.value() > scroll.value("section.section2") - 100) {
                
                $(".navigation a").removeClass("is-active");
                $(".navigation a.nav2").addClass("is-active");
            }

            if (scroll.value() > scroll.value("section.section3") - 100) {
                 

                $(".navigation a").removeClass("is-active");
                $(".navigation a.nav3").addClass("is-active");
            }
        });
    }
}

menu.detect();



var slider = {
    init : function(){
        $('.slide-wrapperr').slick({
            dots: true,
            centerMode: true,
            centerPadding: '10px',
            slidesToShow: 2,
            slidesToScroll: 1,
            autoplay: false,
            infinite: false,
            swipe: false,
            draggable: false,
            nextArrow: "<div class='arrowGeneral arrowRight'><i class='ti-arrow-right'></i></div>",
            prevArrow: "<div class='arrowGeneral arrowLeft'><i class='ti-arrow-left'></i></div>",
            responsive: [
                {
                breakpoint: 1024,
                settings: {
                    dots: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                    centerPadding: '10px',
                }
                }
            ]
        });
    },
    init2 : function(){
        $(".slick-dots button").click(function(){
            
            $("#boxnumchange").html($(this).html());
            let nilai = $(this).html();

            setTimeout(function(){
                dataNilai = $(".section3 .slide-wrapperr .slick-current").attr("data-slick-index");
                console.log(dataNilai);

            if( nilai == 1 || dataNilai == 0){
                $(".section3 .arrowGeneral.arrowLeft i").css({"display" : "none"});
                $(".section3 .arrowGeneral.arrowRight i").css({"display" : "block"});
                $('.slide1 .copy-wrapperr .text2').css({"display" : "none"});
                $('.slide1 .centerized.text2').css({"display" : "block"});
                $('.section3 .bg-wrapperr .first .desktop-banner').css({"display" : "block"});
                $('.section3 .bg-wrapperr .second').css({"display" : "none"});
            }
            else{
                $('.slide1 .copy-wrapperr .text2').css({"display" : "block"});
                $('.section3 .bg-wrapperr .second').css({"display" : "none"});
            }
            if( nilai == 2 || dataNilai == 1){
                $(".section3 .arrowGeneral.arrowLeft i").css({"display" : "block"});
                $(".section3 .arrowGeneral.arrowRight i").css({"display" : "block"});
                $('.slide1 .copy-wrapperr .text2').css({"display" : "block"});
                $('.slide1 .copy-wrapperr .text3').css({"display" : "none"});
                $('.slide1 .centerized.text2').css({"display" : "none"});
                $('.slide1 .centerized.text3').css({"display" : "block"});
                $('.section3 .bg-wrapperr .second').css({"display" : "block"});
                $('.section3 .bg-wrapperr .third').css({"display" : "none"});
            }
            else{
                $('.slide1 .copy-wrapperr .text3').css({"display" : "none"});
                $('.section3 .bg-wrapperr .third').css({"display" : "none"});
            }
            if( nilai == 3 || dataNilai == 2){
                $(".section3 .arrowGeneral.arrowLeft i").css({"display" : "block"});
                $(".section3 .arrowGeneral.arrowRight i").css({"display" : "block"});
                $('.slide1 .copy-wrapperr .text3').css({"display" : "block"});
                $('.slide1 .copy-wrapperr .text4').css({"display" : "none"});
                $('.slide1 .centerized.text3').css({"display" : "none"});
                $('.slide1 .centerized.text4').css({"display" : "block"});
                $('.section3 .bg-wrapperr .third').css({"display" : "block"});
                $('.section3 .bg-wrapperr .fourth').css({"display" : "none"});
            }
            else{
                $('.slide1 .copy-wrapperr .text4').css({"display" : "none"});
                $('.section3 .bg-wrapperr .fourth').css({"display" : "none"});
            }
            if( nilai == 4 || dataNilai == 3 ){
                $(".section3 .arrowGeneral.arrowLeft i").css({"display" : "block"});
                $(".section3 .arrowGeneral.arrowRight i").css({"display" : "block"});
                $('.slide1 .copy-wrapperr .text4').css({"display" : "block"});
                $('.slide1 .copy-wrapperr .text5').css({"display" : "none"});
                $('.slide1 .centerized.text4').css({"display" : "none"});
                $('.slide1 .centerized.text5').css({"display" : "block"});
                $('.section3 .bg-wrapperr .fourth').css({"display" : "block"});
                $('.section3 .bg-wrapperr .fifth').css({"display" : "none"});
            }
            else{
                $('.slide1 .copy-wrapperr .text5').css({"display" : "none"});
                $('.section3 .bg-wrapperr .fifth').css({"display" : "none"});
            }

            if( nilai == 5 || dataNilai == 4 ){
                $(".section3 .arrowGeneral.arrowRight i").css({"display" : "none"});
                $(".section3 .arrowGeneral.arrowLeft i").css({"display" : "block"});
                $('.slide1 .copy-wrapperr .text5').css({"display" : "block"});
                $('.slide1 .centerized.text4').css({"display" : "none"});
                $('.slide1 .centerized.text5').css({"display" : "none"});
                $('.section3 .bg-wrapperr .fifth').css({"display" : "block"});
            }
        },100);
            
        });
    },
    init3 : function(){
        $(".slide1").click(function(){
            if($(this).attr("index") == 1){
                $('.usp1').css({"display" : "block"});
                $('.closed').click(function(){
                    $('.usp1').css({"display" : "none"});
                })
            }
            if($(this).attr("index") == 2){
                $('.usp2').css({"display" : "block"});
                $('.closed').click(function(){
                    $('.usp2').css({"display" : "none"});
                })
            }
            if($(this).attr("index") == 3){
                $('.usp3').css({"display" : "block"});
                $('.closed').click(function(){
                    $('.usp3').css({"display" : "none"});
                })
            }
            if($(this).attr("index") == 4){
                $('.usp4').css({"display" : "block"});
                $('.closed').click(function(){
                    $('.usp4').css({"display" : "none"});
                })
            }
            if($(this).attr("index") == 5){
                $('.usp5').css({"display" : "block"});
                $('.closed').click(function(){
                    $('.usp5').css({"display" : "none"});
                })
            }
        });
    },
    init4 : function(){
        $(".slick-arrow").click(function(){
            $("#boxnumchange").html($(".section3 .slide-wrapperr .slick-current").attr("index"));
        });
    },
    init5 : function(){
        $(".slick-arrow").click(function(){
            let nilai = $(".section3 .slide-wrapperr .slick-current").attr("data-slick-index");
            if( nilai < 1){
                $('.slide1 .centerized.text2').css({"display" : "block"});
            }
            if( nilai == 1 ){
                $('.slide1 .copy-wrapperr .text2').css({"display" : "block"});
                $('.slide1 .centerized.text2').css({"display" : "none"});
                $('.slide1 .centerized.text3').css({"display" : "block"});
                $('.section3 .bg-wrapperr .second').css({"display" : "block"});
            }
            else{
                $('.slide1 .copy-wrapperr .text2').css({"display" : "none"});
                $('.section3 .bg-wrapperr .second').css({"display" : "none"});
            }
            if( nilai == 2 ){
                $('.slide1 .copy-wrapperr .text3').css({"display" : "block"});
                $('.slide1 .centerized.text3').css({"display" : "none"});
                $('.slide1 .centerized.text4').css({"display" : "block"});
                $('.section3 .bg-wrapperr .third').css({"display" : "block"});
            }
            else{
                $('.slide1 .copy-wrapperr .text3').css({"display" : "none"});
                $('.section3 .bg-wrapperr .third').css({"display" : "none"});
            }
            if( nilai == 3 ){
                $('.slide1 .copy-wrapperr .text4').css({"display" : "block"});
                $('.slide1 .centerized.text4').css({"display" : "none"});
                $('.slide1 .centerized.text5').css({"display" : "block"});
                $('.section3 .bg-wrapperr .fourth').css({"display" : "block"});
            }
            else{
                $('.slide1 .copy-wrapperr .text4').css({"display" : "none"});
                $('.section3 .bg-wrapperr .fourth').css({"display" : "none"});
            }
            if( nilai == 4 ){
                $('.slide1 .copy-wrapperr .text5').css({"display" : "block"});
                $('.slide1 .centerized.text5').css({"display" : "none"});
                $('.section3 .bg-wrapperr .fifth').css({"display" : "block"});
            }
            else{
                $('.slide1 .copy-wrapperr .text5').css({"display" : "none"});
                $('.section3 .bg-wrapperr .fifth').css({"display" : "none"});
            }
        });
    },
    init6 : function(){
        $(".section3 .arrowGeneral.arrowLeft").click(function(){
            let nilai = $(".section3 .slide-wrapperr .slick-current").attr("data-slick-index");
            minNilai = 1;
            maxNilai = 4;
            if( nilai < minNilai){
                $(".section3 .arrowGeneral.arrowLeft i").css({"display" : "none"})
            }
            if( nilai < maxNilai){
                $(".section3 .arrowGeneral.arrowRight i").css({"display" : "block"})
            }

        })
    },
    init7 : function(){
        $(".section3 .arrowGeneral.arrowRight").click(function(){
            let nilai = $(".section3 .slide-wrapperr .slick-current").attr("data-slick-index");
            
            maxNilai = 4;
            if( nilai == 1){
                $(".section3 .arrowGeneral.arrowLeft i").css({"display" : "block"})
            }
            if( nilai == maxNilai){
                $(".section3 .arrowGeneral.arrowRight i").css({"display" : "none"})
            }
            
        })
    }
}

slider.init();
slider.init2();
slider.init3();
slider.init4();
slider.init5();
slider.init6();
slider.init7();


var start = new Date("Jan 5, 2021 9:00:00").getHours();
var end = new Date("Jan 5, 2021 14:00:00").getHours();
var start2 = new Date("Jan 5, 2021 18:00:00").getHours();
var end2 = new Date("Jan 5, 2021 22:00:00").getHours();

console.log(start);
console.log(end);
console.log(start2);
console.log(end2);

var countDown = {
    init : function(){
        var x = setInterval(function() {

            var now = new Date().getHours();
            console.log(now); 

            if (now >= start && now < end || now >= start2 && now < end2) 
            {
              clearInterval(x);
              console.log("true");
            }
            else
            {
              console.log("false");
              $('.column .callFlood.lazada').attr("href","javascript:void(0);").html(`Stok Habis`);
              $('.column .callFlood.jdid').attr("href","javascript:void(0);").html(`Stok Habis`);
              $('.column .callFlood.blibli').attr("href","javascript:void(0);").html(`Stok Habis`);
            }
          }, 50);
    }
}
countDown.init();