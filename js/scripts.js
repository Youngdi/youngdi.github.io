$(window).load(function () {
  // preloader
  $preloader = $('.preloader')

  $preloader.addClass('preloader--complete')

  window.setTimeout(function () {
    $preloader.fadeOut()
  }, 1000)
})

$(function () {
  FastClick.attach(document.body)

  function isMobile() {
    var userAgent = navigator.userAgent

    return (
      userAgent.match(/i(Phone|Pod|Pad)|Android/i) ||
      window.matchMedia('only screen and (max-width: 740px)').matches
    )
  }

  // helpers

  $('html').removeClass('no-js')

  if (isMobile()) {
    $('html')
      .removeClass('no-touch')
      .addClass('touch')
  }

  $('body').addClass(isMobile() ? 'screen--mobile' : 'screen--standard')
  $('.current-year').html(new Date().getFullYear())
  $('.start-year').html(new Date().getFullYear() - 2007)

  // menu
  $('.menu__icon').on('click', function () {
    $('.menu').toggleClass('menu--active')
  })

  // portfolio
  var $portfolioItems = $('#portfolio-items'),
    $portfolioModal = $('#portfolio-modal')

  // get portfolio data
  var portfolioData = window.innerWidth > 1200 ? PROTFOLIO : PROTFOLIO_MOBILE
  setTimeout(() => createPortfolio(), 0)

  var itemTemplate = $('#item-template').html(),
    modalTemplate = $('#modal-template').html()

  Mustache.parse(itemTemplate)
  Mustache.parse(modalTemplate)

  function createPortfolio() {
    for (var i = 0; i < portfolioData.length; i++) {
      portfolioData[i].id = i
      portfolioData[i].empty = portfolioData[i].title == '' ? true : false

      var output = Mustache.render(itemTemplate, portfolioData[i])

      $portfolioItems.append(output)
    }
  }

  $portfolioItems.on('click', '.show-modal', function (event) {
    if ($(this).data('empty')) return
    showModal($(this).data('id'))

    event.preventDefault()
  })

  $portfolioModal.on('click', closeModal)

  $portfolioModal.on('click', '.modal__close', closeModal)

  $portfolioModal.on('click', '.modal__content', function (event) {
    event.stopPropagation()
  })

  function showModal(id) {
    var output = Mustache.render(modalTemplate, portfolioData[id])

    $portfolioModal.html(output).addClass('modal--active')

    $portfolioModal.find('.modal__hero img').on('load', function () {
      $portfolioModal.addClass('modal--loaded')
    })
  }

  $portfolioModal.on('load', '.modal__hero img', function () {
    $portfolioModal.addClass('modal--loaded')
  })

  function closeModal() {
    $('.modal')
      .removeClass('modal--active')
      .removeClass('modal--loaded')
  }

  // canvas check
  function supports_canvas() {
    return !!document.createElement('canvas').getContext
  }

  // scroll path
  var preloadPosition

  if (supports_canvas() && !isMobile()) {
    $('body').addClass('scroll-view')

    // disable generic behaviour
    document.body.ontouchmove = disableoverflow
    $('.anchor').remove()

    // init scroll path
    initScrollpath($('#scroll-view'))

    // preloader
    var preloadPosition = $('.preloader-position').offset()
  } else {
    // internal links
    $('a.internal').on('click', scrollTo)
    $('a.internal').on('touchstart', scrollTo)

    function scrollTo(event) {
      var $link = $(this)

      $('.menu').removeClass('menu--active')

      $('body').animate(
        {
          scrollTop: $($link.attr('href')).offset().top
        },
        200
      )

      event.preventDefault()
    }

    // preloader
    var preloadPosition = $('.preloader-position').offset()
  }

  // position preload title
  $('.preloader__icon').css({
    top: preloadPosition.top,
    left: preloadPosition.left
  })

  window.setTimeout(function () {
    $('.preloader').addClass('preloader--start')
  }, 100)
})

function initScrollpath(element) {
  // draw path
  $.fn
    .scrollPath('getPath')
    // move to 'intro'
    .moveTo(400, 50, {
      name: 'intro'
    })

    // line to 'about'
    .lineTo(400, 800, {
      name: 'about'
    })

    // arc to 'skills'
    .arc(-90, 1150, 600, 1.8 * Math.PI, Math.PI, true, {
      name: 'skills',
      rotate: Math.PI / 2
    })

    // line to 'portfolio'
    .lineTo(700, 1600, {
      name: 'portfolio',
      rotate: 0
    })

    // arc to 'contact'
    .arc(700, 800, 800, Math.PI / 2, 0, true, {
      name: 'contact',
      rotate: Math.PI / 2
    })

    // continue line
    .lineTo(800, -350, {
      rotate: 0.25 * Math.PI
    })

    // arc to beginning
    .arc(800, 50, 400, 1.5 * Math.PI, Math.PI, true, {
      rotate: 0,
      name: 'end'
    })

  // initiate plugin on wrapper
  element.scrollPath({
    drawPath: true,
    wrapAround: true
  })

  // add scroll functionality to anchors
  $('a.internal').each(function () {
    var target = this.getAttribute('href').replace('#', '')

    $(this).click(function (e) {
      e.preventDefault()

      // scroll to location
      $.fn.scrollPath('scrollTo', target, 1300, 'easeInOutSine')
    })
  })
}

function disableoverflow() {
  var target = event.target

  var currentPosition = ''

  if (
    !$(event.target).is('.contentScroll *, .contentScroll') ||
    $('.contentScroll').scrollTop() == 0
  )
    event.preventDefault()
}

const PROTFOLIO = [
  {
    title: 'Notes Station 3',
    description:
      'Notes Station 3 combines the collaborative editing of Google Docs and the note-taking of Evernote into a single app hosted by private cloud on your QNAP NAS.',
    url: 'www.qnap.com/solution/notes-station3/en/',
    images: {
      thumb: 'thumb--ns3',
      full: 'ns3.jpg'
    },
    responsibilities: [
      {
        title: 'Website Application',
        points: [
          'Web design',
          'FrontEnd: React, Redux-saga',
          'BackEnd: Laravel',
          'Optimised animation and user interaction',
          'Editor Core function (ProseMirror)',
          'Dockerize'
        ]
      }
    ]
  },
  {
    title: '',
    description: '',
    url: '',
    images: {
      thumb: 'thumb--empty',
      full: 'empty.jpg'
    },
    responsibilities: [
      {
        title: '',
        points: []
      }
    ]
  },
  {
    title: 'UIUX Cafe',
    description: 'An official landing page for a design company',
    url: 'www.uiuxcafe.com',
    images: {
      thumb: 'thumb--uiuxcafe',
      full: 'uiuxcafe.jpg'
    },
    responsibilities: [
      {
        title: 'Website',
        points: [
          'Gatsby SSR and SEO',
          'React',
          'Optimised animation and user interaction',
          'Fully responsive design'
        ]
      }
    ]
  },
  {
    title: '',
    description: '',
    url: '',
    images: {
      thumb: 'thumb--empty',
      full: 'empty.jpg'
    },
    responsibilities: [
      {
        title: '',
        points: []
      }
    ]
  },
  {
    title: 'U-POWER',
    description:
      'U-POWER allows you to quickly find all of the charging stations tofor your electric car.',
    url: 'apps.apple.com/tw/app/u-power/id1612379206',
    images: {
      thumb: 'thumb--upower',
      full: 'upower.jpg'
    },
    responsibilities: [
      {
        title: 'Cross Platform APP (IoT)',
        points: [
          'Build with React-Native',
          'State management with mobx',
          'Animation with Lottie',
          'Fastlane, Firebase integration',
          'Optimised animation and user interaction'
        ]
      }
    ]
  },
  {
    title: '',
    description: '',
    url: '',
    images: {
      thumb: 'thumb--empty',
      full: 'empty.jpg'
    },
    responsibilities: [
      {
        title: '',
        points: []
      }
    ]
  },
  {
    title: 'iBobby (CHT)',
    description:
      "A cross-platform app for a smart speaker. It's like the Chinese version of Alexa",
    url: 'ibobby.ai.hinet.net',
    images: {
      thumb: 'thumb--ibobby',
      full: 'ibobby.jpg'
    },
    responsibilities: [
      {
        title: 'Cross Platform APP (IoT)',
        points: [
          'Build whole app by React Native',
          'Conntect with the smart speaker through UDP protocol',
          'Animation with Lottie',
          'State management with redux-saga',
          'Fastlane, Firebase integration',
          'Optimised animation and user interaction'
        ]
      }
    ]
  },
  {
    title: '',
    description: '',
    url: '',
    images: {
      thumb: 'thumb--empty',
      full: 'empty.jpg'
    },
    responsibilities: [
      {
        title: '',
        points: []
      }
    ]
  },
  {
    title: '',
    description: '',
    url: '',
    images: {
      thumb: 'thumb--empty',
      full: 'empty.jpg'
    },
    responsibilities: [
      {
        title: '',
        points: []
      }
    ]
  },
  {
    title: 'USPACE 停停圈',
    description:
      'A sharing platform for car parking space with a smart lock build by react-native',
    url: 'uspace.city',
    images: {
      thumb: 'thumb--uspace',
      full: 'uspace.jpg'
    },
    responsibilities: [
      {
        title: 'Cross Platform APP (IoT)',
        points: [
          'Build whole app by React Native',
          'State management with mobx',
          'Animation with Lottie',
          'Fastlane, Firebase integration',
          'Optimised animation and user interaction'
        ]
      }
    ]
  },
  {
    title: 'Dramates App',
    description: 'Watch movies & TV shows just like Netflix',
    url: 'mocha.dramates.com/drama',
    images: {
      thumb: 'thumb--drama',
      full: 'drama.jpg'
    },
    responsibilities: [
      {
        title: 'PWA App',
        points: [
          'Building infrastructure with Gatsby.js',
          'Integrating GraphQL',
          'Programmatically create pages',
          'Implementing UI and layout',
          'SEO'
        ]
      }
    ]
  },
  {
    title: '',
    description: '',
    url: '',
    images: {
      thumb: 'thumb--empty',
      full: 'empty.jpg'
    },
    responsibilities: [
      {
        title: '',
        points: []
      }
    ]
  },
  {
    title: 'BibleBYT',
    description: 'A bible study app for banner church',
    url: 'apps.apple.com/tw/app/%E9%9D%88%E4%BF%AE%E5%BF%83/id1376386601',
    images: {
      thumb: 'thumb--biblebyt',
      full: 'biblebyt.jpg'
    },
    responsibilities: [
      {
        title: 'Cross platform APP',
        points: [
          'Build with React-Native',
          'State management with mobx',
          'Animation with Lottie',
          'Realm DB',
          'Fastlane, Firebase integration',
          'Optimised animation and user interaction'
        ]
      }
    ]
  },
  {
    title: '',
    description: '',
    url: '',
    images: {
      thumb: 'thumb--empty',
      full: 'empty.jpg'
    },
    responsibilities: [
      {
        title: '',
        points: []
      }
    ]
  },
  {
    title: '十年',
    description:
      "「十年」 is an APP specially designed for Banner Church's 'BE STRONG' Camp happening this summer 2019. Use this App to help you have a great time during the “Be-Strong Camp”. 十年 also contains resources and clues to help you along the way.",
    url: 'apps.apple.com/tw/app/%E5%8D%81%E5%B9%B4/id1470231721',
    images: {
      thumb: 'thumb--tenyear',
      full: 'tenyear.jpg'
    },
    responsibilities: [
      {
        title: 'Cross platform APP',
        points: [
          'FrontEnd Build with React-Native',
          'Animation with Lottie',
          'BackEnd build with Strapi CMS and deploy on Heroku',
          'Fastlane, Firebase integration',
          'Optimised animation and user interaction'
        ]
      }
    ]
  },
  {
    title: '',
    description: '',
    url: '',
    images: {
      thumb: 'thumb--empty',
      full: 'empty.jpg'
    },
    responsibilities: [
      {
        title: '',
        points: []
      }
    ]
  },
  {
    title: 'TakeOver',
    description:
      'An Australian migration questions and answers website that required an online portal to communicate with customers in Australia and abroad.',
    url: 'apps.apple.com/tw/app/byt-level-up/id1252631432',
    images: {
      thumb: 'thumb--takeover',
      full: 'takeover.jpg'
    },
    responsibilities: [
      {
        title: 'Cross platform APP',
        points: [
          'FrontEnd Build with React-Native',
          'BackEnd build with Node.js server and deploy on AWS',
          'Fastlane, Firebase integration',
          'Optimised animation and user interaction'
        ]
      }
    ]
  },
  {
    title: '',
    description: '',
    url: '',
    images: {
      thumb: 'thumb--empty',
      full: 'empty.jpg'
    },
    responsibilities: [
      {
        title: '',
        points: []
      }
    ]
  }
]

const PROTFOLIO_MOBILE = [
  {
    title: 'Notes Station 3',
    description:
      'Notes Station 3 combines the collaborative editing of Google Docs and the note-taking of Evernote into a single app hosted by private cloud on your QNAP NAS.',
    url: 'www.qnap.com/solution/notes-station3/en/',
    images: {
      thumb: 'thumb--ns3',
      full: 'ns3.jpg'
    },
    responsibilities: [
      {
        title: 'Website Application',
        points: [
          'Web design',
          'FrontEnd: React, Redux-saga',
          'BackEnd: Laravel',
          'Optimised animation and user interaction',
          'Editor Core function (ProseMirror)',
          'Dockerize'
        ]
      }
    ]
  },
  {
    title: '',
    description: '',
    url: '',
    images: {
      thumb: 'thumb--empty',
      full: 'empty.jpg'
    },
    responsibilities: [
      {
        title: '',
        points: []
      }
    ]
  },
  {
    title: 'UIUX Cafe',
    description: 'An official landing page for a design company',
    url: 'www.uiuxcafe.com',
    images: {
      thumb: 'thumb--uiuxcafe',
      full: 'uiuxcafe.jpg'
    },
    responsibilities: [
      {
        title: 'Website',
        points: [
          'Gatsby SSR and SEO',
          'React',
          'Optimised animation and user interaction',
          'Fully responsive design'
        ]
      }
    ]
  },
  {
    title: '',
    description: '',
    url: '',
    images: {
      thumb: 'thumb--empty',
      full: 'empty.jpg'
    },
    responsibilities: [
      {
        title: '',
        points: []
      }
    ]
  },
  {
    title: 'U-POWER',
    description:
      'U-POWER allows you to quickly find all of the charging stations tofor your electric car.',
    url: 'apps.apple.com/tw/app/u-power/id1612379206',
    images: {
      thumb: 'thumb--upower',
      full: 'upower.jpg'
    },
    responsibilities: [
      {
        title: 'Cross Platform APP (IoT)',
        points: [
          'Build with React-Native',
          'State management with mobx',
          'Animation with Lottie',
          'Fastlane, Firebase integration',
          'Optimised animation and user interaction'
        ]
      }
    ]
  },
  {
    title: '',
    description: '',
    url: '',
    images: {
      thumb: 'thumb--empty',
      full: 'empty.jpg'
    },
    responsibilities: [
      {
        title: '',
        points: []
      }
    ]
  },
  {
    title: 'iBobby (CHT)',
    description:
      "A cross-platform app for a smart speaker. It's like the Chinese version of Alexa",
    url: 'ibobby.ai.hinet.net',
    images: {
      thumb: 'thumb--ibobby',
      full: 'ibobby.jpg'
    },
    responsibilities: [
      {
        title: 'Cross Platform APP (IoT)',
        points: [
          'Build whole app by React Native',
          'Conntect with the smart speaker through UDP protocol',
          'State management with redux-saga',
          'Fastlane, Firebase integration',
          'Optimised animation and user interaction'
        ]
      }
    ]
  },
  {
    title: '',
    description: '',
    url: '',
    images: {
      thumb: 'thumb--empty',
      full: 'empty.jpg'
    },
    responsibilities: [
      {
        title: '',
        points: []
      }
    ]
  },
  {
    title: 'USPACE 停停圈',
    description:
      'A sharing platform for car parking space with a smart lock build by react-native',
    url: 'uspace.city',
    images: {
      thumb: 'thumb--uspace',
      full: 'uspace.jpg'
    },
    responsibilities: [
      {
        title: 'Cross Platform APP (IoT)',
        points: [
          'Build whole app by React Native',
          'State management with mobx',
          'Fastlane, Firebase integration',
          'Optimised animation and user interaction'
        ]
      }
    ]
  },
  {
    title: '',
    description: '',
    url: '',
    images: {
      thumb: 'thumb--empty',
      full: 'empty.jpg'
    },
    responsibilities: [
      {
        title: '',
        points: []
      }
    ]
  },
  {
    title: 'Dramates App',
    description: 'Watch movies & TV shows just like Netflix',
    url: 'mocha.dramates.com/drama',
    images: {
      thumb: 'thumb--drama',
      full: 'drama.jpg'
    },
    responsibilities: [
      {
        title: 'PWA App',
        points: [
          'Building infrastructure with Gatsby.js',
          'Integrating GraphQL',
          'Programmatically create pages',
          'Implementing UI and layout',
          'SEO'
        ]
      }
    ]
  },
  {
    title: '',
    description: '',
    url: '',
    images: {
      thumb: 'thumb--empty',
      full: 'empty.jpg'
    },
    responsibilities: [
      {
        title: '',
        points: []
      }
    ]
  },
  {
    title: 'BibleBYT',
    description: 'A bible study app for banner church',
    url: 'apps.apple.com/tw/app/%E9%9D%88%E4%BF%AE%E5%BF%83/id1376386601',
    images: {
      thumb: 'thumb--biblebyt',
      full: 'biblebyt.jpg'
    },
    responsibilities: [
      {
        title: 'Cross platform APP',
        points: [
          'Build with React-Native',
          'State management with mobx',
          'Realm DB',
          'Fastlane, Firebase integration',
          'Optimised animation and user interaction'
        ]
      }
    ]
  },
  {
    title: '',
    description: '',
    url: '',
    images: {
      thumb: 'thumb--empty',
      full: 'empty.jpg'
    },
    responsibilities: [
      {
        title: '',
        points: []
      }
    ]
  },
  {
    title: '十年',
    description:
      "「十年」 is an APP specially designed for Banner Church's 'BE STRONG' Camp happening this summer 2019. Use this App to help you have a great time during the “Be-Strong Camp”. 十年 also contains resources and clues to help you along the way.",
    url: 'apps.apple.com/tw/app/%E5%8D%81%E5%B9%B4/id1470231721',
    images: {
      thumb: 'thumb--tenyear',
      full: 'tenyear.jpg'
    },
    responsibilities: [
      {
        title: 'Cross platform APP',
        points: [
          'FrontEnd Build with React-Native',
          'BackEnd build with Strapi CMS and deploy on Heroku',
          'Fastlane, Firebase integration',
          'Optimised animation and user interaction'
        ]
      }
    ]
  },
  {
    title: '',
    description: '',
    url: '',
    images: {
      thumb: 'thumb--empty',
      full: 'empty.jpg'
    },
    responsibilities: [
      {
        title: '',
        points: []
      }
    ]
  },
  {
    title: 'TakeOver',
    description:
      'An Australian migration questions and answers website that required an online portal to communicate with customers in Australia and abroad.',
    url: 'apps.apple.com/tw/app/byt-level-up/id1252631432',
    images: {
      thumb: 'thumb--takeover',
      full: 'takeover.jpg'
    },
    responsibilities: [
      {
        title: 'Cross platform APP',
        points: [
          'FrontEnd Build with React-Native',
          'BackEnd build with Node.js server and deploy on AWS',
          'Fastlane, Firebase integration',
          'Optimised animation and user interaction'
        ]
      }
    ]
  },
  {
    title: '',
    description: '',
    url: '',
    images: {
      thumb: 'thumb--empty',
      full: 'empty.jpg'
    },
    responsibilities: [
      {
        title: '',
        points: []
      }
    ]
  }
]
