$(window).load(function () {

    // preloader
    $preloader = $('.preloader');

    $preloader.addClass('preloader--complete');

    window.setTimeout(function () {
        $preloader.fadeOut();
    }, 1000);

});

$(function () {

    FastClick.attach(document.body);


    function isMobile() {
        var userAgent = navigator.userAgent;

        return (userAgent.match(/i(Phone|Pod|Pad)|Android/i) || window.matchMedia("only screen and (max-width: 740px)").matches);
    }


    // helpers

    $('html').removeClass('no-js');

    if (isMobile()) {
        $('html').removeClass('no-touch').addClass('touch');
    }


    $('body').addClass(isMobile() ? 'screen--mobile' : 'screen--standard');
    $('.current-year').html(new Date().getFullYear());
    $('.start-year').html(new Date().getFullYear() - 2007);


    // menu
    $('.menu__icon').on('click', function () {
        $('.menu').toggleClass('menu--active');
    })


    // portfolio
    var $portfolioItems = $('#portfolio-items'),
        $portfolioModal = $('#portfolio-modal');

    // get portfolio data
    var portfolioData = PROTFOLIO;
    setTimeout(() => createPortfolio(), 0)

    var itemTemplate = $('#item-template').html(),
        modalTemplate = $('#modal-template').html();

    Mustache.parse(itemTemplate);
    Mustache.parse(modalTemplate);


    function createPortfolio() {
        for (var i = 0; i < portfolioData.length; i++) {
            portfolioData[i].id = i;

            var output = Mustache.render(itemTemplate, portfolioData[i]);

            $portfolioItems.append(output);
        }
    }

    $portfolioItems.on('click', '.show-modal', function (event) {
        showModal($(this).data('id'));

        event.preventDefault();
    })

    $portfolioModal.on('click', closeModal);

    $portfolioModal.on('click', '.modal__close', closeModal);

    $portfolioModal.on('click', '.modal__content', function (event) {
        event.stopPropagation();
    });

    function showModal(id) {
        var output = Mustache.render(modalTemplate, portfolioData[id]);

        $portfolioModal.html(output).addClass('modal--active');

        $portfolioModal.find('.modal__hero img').on('load', function () {
            $portfolioModal.addClass('modal--loaded');
        });
    }

    $portfolioModal.on('load', '.modal__hero img', function () {
        $portfolioModal.addClass('modal--loaded');
    });

    function closeModal() {
        $('.modal').removeClass('modal--active').removeClass('modal--loaded');
    }




    // canvas check
    function supports_canvas() {
        return !!document.createElement('canvas').getContext;
    }




    // scroll path
    var preloadPosition;

    if (supports_canvas() && !isMobile()) {
        $("body").addClass("scroll-view");

        // disable generic behaviour
        document.body.ontouchmove = disableoverflow;
        $(".anchor").remove();

        // init scroll path
        initScrollpath($("#scroll-view"));

        // preloader
        var preloadPosition = $('.preloader-position').offset();
    } else {
        // internal links
        $('a.internal').on('click', scrollTo);
        $('a.internal').on('touchstart', scrollTo);

        function scrollTo(event) {
            var $link = $(this);

            $('.menu').removeClass('menu--active');

            $('body').animate({
                scrollTop: $($link.attr('href')).offset().top
            }, 200);

            event.preventDefault();
        }

        // preloader
        var preloadPosition = $('.preloader-position').offset();
    }

    // position preload title
    $('.preloader__icon').css({
        top: preloadPosition.top,
        left: preloadPosition.left
    });

    window.setTimeout(function () {
        $('.preloader').addClass('preloader--start');
    }, 100);
});






function initScrollpath(element) {

    // draw path
    $.fn.scrollPath("getPath")
        // move to 'intro'
        .moveTo(400, 50, {
            name: "intro"
        })

        // line to 'about'
        .lineTo(400, 800, {
            name: "about"
        })

        // arc to 'skills'
        .arc(-90, 1150, 600, 1.8 * Math.PI, Math.PI, true, {
            name: "skills",
            rotate: Math.PI / 2
        })

        // line to 'portfolio'
        .lineTo(700, 1600, {
            name: "portfolio",
            rotate: 0
        })

        // arc to 'contact'
        .arc(700, 800, 800, Math.PI / 2, 0, true, {
            name: "contact",
            rotate: Math.PI / 2
        })

        // continue line
        .lineTo(800, -350, {
            rotate: (0.25 * Math.PI)
        })

        // arc to beginning
        .arc(800, 50, 400, 1.5 * Math.PI, Math.PI, true, {
            rotate: 0,
            name: "end"
        });

    // initiate plugin on wrapper
    element.scrollPath({
        drawPath: true,
        wrapAround: true
    });

    // add scroll functionality to anchors
    $("a.internal").each(function () {
        var target = this.getAttribute("href").replace("#", "");

        $(this).click(function (e) {
            e.preventDefault();

            // scroll to location
            $.fn.scrollPath("scrollTo", target, 1300, "easeInOutSine");
        });
    });
}

function disableoverflow() {
    var target = event.target;

    var currentPosition = '';

    if (!$(event.target).is('.contentScroll *, .contentScroll') || $('.contentScroll').scrollTop() == 0)
        event.preventDefault();
}






const PROTFOLIO = [
    {
        "title": "OhDeer Games",
        "description": "An experimental page created for a new gaming company. Received an awwwards.com honorable mention.",
        "url": "ohdeergames.com",
        "images": {
            "thumb": "thumb--ohdeer",
            "full": "ohdeergames.jpg"
        },
        "responsibilities": [
            {
                "title": "Website",
                "points": [
                    "Web design",
                    "Front end development",
                    "Custom JS components",
                    "Optimised animation",
                    "Fully responsive design"
                ]
            }
        ]
    },
    {
        "title": "hey messenger",
        "description": "An interactive one page site created for a new secure messaging app. The focus was to showcase information in an engaging, interactive way.",
        "url": "hey-messenger.com",
        "images": {
            "thumb": "thumb--hey",
            "full": "hey.jpg"
        },
        "responsibilities": [
            {
                "title": "Website",
                "points": [
                    "Website design",
                    "Front end development",
                    "Custom JS components",
                    "Optimised animation",
                    "Fully responsive design"
                ]
            }
        ]
    },
    {
        "title": "Digital Asset Group",
        "description": "An interactive one page site created for a technology company.",
        "url": "digitalassetgroup.com.au",
        "images": {
            "thumb": "thumb--dag",
            "full": "dag.jpg"
        },
        "responsibilities": [
            {
                "title": "Website",
                "points": [
                    "Brand identity",
                    "Website design",
                    "Front end development",
                    "Custom JS components",
                    "Optimised animation",
                    "Fully responsive design"
                ]
            }
        ]
    },
    {
        "title": "Wotif.com",
        "description": "Continuous delivery for a leading Australian online travel brand.",
        "url": "wotif.com",
        "images": {
            "thumb": "thumb--wotif",
            "full": "wotif.jpg"
        },
        "responsibilities": [
            {
                "title": "Website",
                "points": [
                    "Front end development for the new home page and accommodation booking flow",
                    "Front end development for the packages booking flow",
                    "Custom JS components",
                    "Optimised user interaction",
                    "Responsive design"
                ]
            }
        ]
    },
    {
        "title": "DRoP Challenge",
        "description": "A fun landing page for an upcoming iOS game that needed to provide some teaser entertainment.",
        "images": {
            "thumb": "thumb--drop",
            "full": "drop.jpg"
        },
        "responsibilities": [
            {
                "title": "Website",
                "points": [
                    "Front end development",
                    "Custom JS components",
                    "Optimised animation",
                    "Fully responsive design"
                ]
            }
        ]
    },
    {
        "title": "HiDow",
        "description": "A sports and remedial therapy product manufacturer and international supplier. HiDow required a complete brand overhaul for multiple international websites and products to refresh their corporate image.",
        "url": "www.hidow.com.au",
        "images": {
            "thumb": "thumb--hidow",
            "full": "hidow.jpg"
        },
        "responsibilities": [
            {
                "title": "Website",
                "points": [
                    "Complete redesign of online presence",
                    "Custom coded Magento e-commerce theme",
                    "Content rewriting"
                ]
            },
            {
                "title": "Product iPhone App",
                "points": [
                    "Complete user interface design"
                ]
            },
            {
                "title": "Print Media",
                "points": [
                    "Product photo retouching",
                    "General marketing material"
                ]
            }
        ]
    },
    {
        "title": "Hunt Education",
        "description": "An Australian migration firm that required a educational course enrollment platform.",
        "url": "www.hunteducation.com",
        "images": {
            "thumb": "thumb--hunteducation",
            "full": "hunteducation.jpg"
        },
        "responsibilities": [
            {
                "title": "Website",
                "points": [
                    "Custom coded Magento e-commerce theme",
                    "Front end development",
                    "Adaptive design",
                    "CMS"
                ]
            }
        ]
    },
    {
        "title": "Hunt Migration",
        "description": "An Australian migration firm that required a rebrand for their high traffic website.",
        "url": "www.huntmigration.com",
        "images": {
            "thumb": "thumb--hunt",
            "full": "hunt.jpg"
        },
        "responsibilities": [
            {
                "title": "Website",
                "points": [
                    "Custom coded Magento e-commerce theme",
                    "Front end development",
                    "Adaptive design",
                    "CMS",
                    "Custom jQuery interactive hero pieces",
                    "Social media feeds"
                ]
            }
        ]
    },
    {
        "title": "Just Digital People",
        "description": "An awesome new recruitment company that needed a website to match.",
        "images": {
            "thumb": "thumb--jdp",
            "full": "jdp.jpg"
        },
        "responsibilities": [
            {
                "title": "Website",
                "points": [
                    "Front end development",
                    "Adaptive design",
                    "CMS",
                    "Event listings",
                    "Profiles",
                    "Custom jQuery interactive hero piece",
                    "Social media feeds"
                ]
            }
        ]
    },
    {
        "title": "Toppik Australia",
        "description": "An Australian hair-loss solution company that required an e-commerce platform to sell their product to the general public.",
        "url": "www.toppik.com.au",
        "images": {
            "thumb": "thumb--toppik",
            "full": "toppik.jpg"
        },
        "responsibilities": [
            {
                "title": "Website",
                "points": [
                    "Front end development",
                    "Custom coded Magento e-commerce theme",
                    "Responsive design",
                    "E-commerce store",
                    "CMS",
                    "Custom jQuery interactive hero piece"
                ]
            }
        ]
    },
    {
        "title": "Time for Advice",
        "description": "An Australian migration questions and answers website that required an online portal to communicate with customers in Australia and abroad.",
        "images": {
            "thumb": "thumb--tfa",
            "full": "tfa.jpg"
        },
        "responsibilities": [
            {
                "title": "Website",
                "points": [
                    "Front end development",
                    "Adaptive design",
                    "CRM",
                    "CMS",
                    "Custom jQuery interactive hero piece"
                ]
            }
        ]
    },
    {
        "title": "Northern Inland Chiropractic",
        "description": "An Australian chiropractic practice that required a high end brochure site to provide information about the company and founder.",
        "images": {
            "thumb": "thumb--nichiro",
            "full": "nichiro.jpg"
        },
        "responsibilities": [
            {
                "title": "Website",
                "points": [
                    "Front end development",
                    "Adaptive design",
                    "Custom jQuery pieces implementing parallax design",
                    "AJAX contact forms"
                ]
            }
        ]
    },
    {
        "title": "After Market",
        "description": "An Australian company that provided after market services for the car industry. They required a cool brochure site to showcase their products.",
        "images": {
            "thumb": "thumb--aftermarket",
            "full": "aftermarket.jpg"
        },
        "responsibilities": [
            {
                "title": "Website",
                "points": [
                    "Front end development",
                    "Adaptive design",
                    "Custom jQuery pieces",
                    "AJAX contact forms"
                ]
            }
        ]
    },
    {
        "title": "Tevee",
        "description": "A company that wanted to launch a new concept for free TV, anywhere, any time.",
        "images": {
            "thumb": "thumb--tevee",
            "full": "tevee.jpg"
        },
        "responsibilities": [
            {
                "title": "Website",
                "points": [
                    "Front end development",
                    "Responsive design",
                    "Custom jQuery interactive pieces",
                    "Extensive wireframing",
                    "Multiple landing pages",
                    "AJAX contact forms"
                ]
            }
        ]
    },
    {
        "title": "Every Month",
        "description": "A unique e-commerce shopping model that required a funky web presence.",
        "images": {
            "thumb": "thumb--everymonth",
            "full": "everymonth.jpg"
        },
        "responsibilities": [
            {
                "title": "Website",
                "points": [
                    "Front end development",
                    "Adaptive design"
                ]
            }
        ]
    },
    {
        "title": "CHTrader",
        "description": "A software company in the financial industry that required the development of a complete brand image and customer support management website.",
        "url": "www.chtrader.net",
        "images": {
            "thumb": "thumb--cht",
            "full": "cht.jpg"
        },
        "responsibilities": [
            {
                "title": "Website",
                "points": [
                    "Complete design of online presence",
                    "Front end development",
                    "CRM",
                    "Online user guide",
                    "Ticketing system and knowledge base",
                    "Site news and email newsletter",
                    "Historical data cron tasks"
                ]
            },
            {
                "title": "Print Media",
                "points": [
                    "Logo and corporate stationery design",
                    "General marketing material",
                    "User guide design and content layout"
                ]
            }
        ]
    },
    {
        "title": "Build Your Trading",
        "description": "A software company in the financial industry that required the development of a complete brand image and customer support management website.",
        "url": "www.buildyourtrading.net",
        "images": {
            "thumb": "thumb--byt",
            "full": "byt.jpg"
        },
        "responsibilities": [
            {
                "title": "Website",
                "points": [
                    "Complete design of online presence",
                    "Front end development",
                    "Responsive design",
                    "CRM",
                    "Online user guide",
                    "Ticketing system and knowledge base",
                    "Site news and email newsletter",
                    "Historical data cron tasks"
                ]
            },
            {
                "title": "Print Media",
                "points": [
                    "Logo and corporate stationery design",
                    "General marketing material",
                    "User guide design and content layout"
                ]
            }
        ]
    },
    {
        "title": "Octave Corporate Rentals",
        "description": "A company that provides rental properties for energy related company employees in Queensland. They required a website that could display property listings and latest news, with a design that was in keeping with the corporate nature of their target market.",
        "url": "www.octavecorporaterentals.com.au",
        "images": {
            "thumb": "thumb--octave",
            "full": "octave.jpg"
        },
        "responsibilities": [
            {
                "title": "Website",
                "points": [
                    "Website design",
                    "Front end development",
                    "CMS",
                    "Property listings and search",
                    "Latest news feed"
                ]
            }
        ]
    }
];
