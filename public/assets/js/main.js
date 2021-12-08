/**
* Template Name: BizLand - v3.6.0
* Template URL: https://bootstrapmade.com/bizland-bootstrap-business-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/


(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 16
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Header fixed top on scroll
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    let headerOffset = selectHeader.offsetTop
    let nextElement = selectHeader.nextElementSibling
    const headerFixed = () => {
      if ((headerOffset - window.scrollY) <= 0) {
        selectHeader.classList.add('fixed-top')
        nextElement.classList.add('scrolled-offset')
      } else {
        selectHeader.classList.remove('fixed-top')
        nextElement.classList.remove('scrolled-offset')
      }
    }
    window.addEventListener('load', headerFixed)
    onscroll(document, headerFixed)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function (e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function (e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function (direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function (e) {
        e.preventDefault();
        portfolioFilters.forEach(function (el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function () {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

})()

jQuery(document).ready(function ($) {
  var timelines = $('.cd-horizontal-timeline'),
    eventsMinDistance = 60;

  (timelines.length > 0) && initTimeline(timelines);

  function initTimeline(timelines) {
    timelines.each(function () {
      var timeline = $(this),
        timelineComponents = {};
      //cache timeline components 
      timelineComponents['timelineWrapper'] = timeline.find('.events-wrapper');
      timelineComponents['eventsWrapper'] = timelineComponents['timelineWrapper'].children('.events');
      timelineComponents['fillingLine'] = timelineComponents['eventsWrapper'].children('.filling-line');
      timelineComponents['timelineEvents'] = timelineComponents['eventsWrapper'].find('a');
      timelineComponents['timelineDates'] = parseDate(timelineComponents['timelineEvents']);
      timelineComponents['eventsMinLapse'] = minLapse(timelineComponents['timelineDates']);
      timelineComponents['timelineNavigation'] = timeline.find('.cd-timeline-navigation');
      timelineComponents['eventsContent'] = timeline.children('.events-content');

      //assign a left postion to the single events along the timeline
      setDatePosition(timelineComponents, eventsMinDistance);
      //assign a width to the timeline
      var timelineTotWidth = setTimelineWidth(timelineComponents, eventsMinDistance);
      //the timeline has been initialize - show it
      timeline.addClass('loaded');

      //detect click on the next arrow
      timelineComponents['timelineNavigation'].on('click', '.next', function (event) {
        event.preventDefault();
        updateSlide(timelineComponents, timelineTotWidth, 'next');
      });
      //detect click on the prev arrow
      timelineComponents['timelineNavigation'].on('click', '.prev', function (event) {
        event.preventDefault();
        updateSlide(timelineComponents, timelineTotWidth, 'prev');
      });
      //detect click on the a single event - show new event content
      timelineComponents['eventsWrapper'].on('click', 'a', function (event) {
        event.preventDefault();
        timelineComponents['timelineEvents'].removeClass('selected');
        $(this).addClass('selected');
        updateOlderEvents($(this));
        updateFilling($(this), timelineComponents['fillingLine'], timelineTotWidth);
        updateVisibleContent($(this), timelineComponents['eventsContent']);
      });

      //on swipe, show next/prev event content
      timelineComponents['eventsContent'].on('swipeleft', function () {
        var mq = checkMQ();
        (mq == 'mobile') && showNewContent(timelineComponents, timelineTotWidth, 'next');
      });
      timelineComponents['eventsContent'].on('swiperight', function () {
        var mq = checkMQ();
        (mq == 'mobile') && showNewContent(timelineComponents, timelineTotWidth, 'prev');
      });

      //keyboard navigation
      $(document).keyup(function (event) {
        if (event.which == '37' && elementInViewport(timeline.get(0))) {
          showNewContent(timelineComponents, timelineTotWidth, 'prev');
        } else if (event.which == '39' && elementInViewport(timeline.get(0))) {
          showNewContent(timelineComponents, timelineTotWidth, 'next');
        }
      });
    });
  }

  function updateSlide(timelineComponents, timelineTotWidth, string) {
    //retrieve translateX value of timelineComponents['eventsWrapper']
    var translateValue = getTranslateValue(timelineComponents['eventsWrapper']),
      wrapperWidth = Number(timelineComponents['timelineWrapper'].css('width').replace('px', ''));
    //translate the timeline to the left('next')/right('prev') 
    (string == 'next')
      ? translateTimeline(timelineComponents, translateValue - wrapperWidth + eventsMinDistance, wrapperWidth - timelineTotWidth)
      : translateTimeline(timelineComponents, translateValue + wrapperWidth - eventsMinDistance);
  }

  function showNewContent(timelineComponents, timelineTotWidth, string) {
    //go from one event to the next/previous one
    var visibleContent = timelineComponents['eventsContent'].find('.selected'),
      newContent = (string == 'next') ? visibleContent.next() : visibleContent.prev();

    if (newContent.length > 0) { //if there's a next/prev event - show it
      var selectedDate = timelineComponents['eventsWrapper'].find('.selected'),
        newEvent = (string == 'next') ? selectedDate.parent('li').next('li').children('a') : selectedDate.parent('li').prev('li').children('a');

      updateFilling(newEvent, timelineComponents['fillingLine'], timelineTotWidth);
      updateVisibleContent(newEvent, timelineComponents['eventsContent']);
      newEvent.addClass('selected');
      selectedDate.removeClass('selected');
      updateOlderEvents(newEvent);
      updateTimelinePosition(string, newEvent, timelineComponents);
    }
  }

  function updateTimelinePosition(string, event, timelineComponents) {
    //translate timeline to the left/right according to the position of the selected event
    var eventStyle = window.getComputedStyle(event.get(0), null),
      eventLeft = Number(eventStyle.getPropertyValue("left").replace('px', '')),
      timelineWidth = Number(timelineComponents['timelineWrapper'].css('width').replace('px', '')),
      timelineTotWidth = Number(timelineComponents['eventsWrapper'].css('width').replace('px', ''));
    var timelineTranslate = getTranslateValue(timelineComponents['eventsWrapper']);

    if ((string == 'next' && eventLeft > timelineWidth - timelineTranslate) || (string == 'prev' && eventLeft < - timelineTranslate)) {
      translateTimeline(timelineComponents, - eventLeft + timelineWidth / 2, timelineWidth - timelineTotWidth);
    }
  }

  function translateTimeline(timelineComponents, value, totWidth) {
    var eventsWrapper = timelineComponents['eventsWrapper'].get(0);
    value = (value > 0) ? 0 : value; //only negative translate value
    value = (!(typeof totWidth === 'undefined') && value < totWidth) ? totWidth : value; //do not translate more than timeline width
    setTransformValue(eventsWrapper, 'translateX', value + 'px');
    //update navigation arrows visibility
    (value == 0) ? timelineComponents['timelineNavigation'].find('.prev').addClass('inactive') : timelineComponents['timelineNavigation'].find('.prev').removeClass('inactive');
    (value == totWidth) ? timelineComponents['timelineNavigation'].find('.next').addClass('inactive') : timelineComponents['timelineNavigation'].find('.next').removeClass('inactive');
  }

  function updateFilling(selectedEvent, filling, totWidth) {
    //change .filling-line length according to the selected event
    var eventStyle = window.getComputedStyle(selectedEvent.get(0), null),
      eventLeft = eventStyle.getPropertyValue("left"),
      eventWidth = eventStyle.getPropertyValue("width");
    eventLeft = Number(eventLeft.replace('px', '')) + Number(eventWidth.replace('px', '')) / 2;
    var scaleValue = eventLeft / totWidth;
    setTransformValue(filling.get(0), 'scaleX', scaleValue);
  }

  function setDatePosition(timelineComponents, min) {
    for (i = 0; i < timelineComponents['timelineDates'].length; i++) {
      var distance = daydiff(timelineComponents['timelineDates'][0], timelineComponents['timelineDates'][i]),
        distanceNorm = Math.round(distance / timelineComponents['eventsMinLapse']) + 2;
      timelineComponents['timelineEvents'].eq(i).css('left', distanceNorm * min + 'px');
    }
  }

  function setTimelineWidth(timelineComponents, width) {
    var timeSpan = daydiff(timelineComponents['timelineDates'][0], timelineComponents['timelineDates'][timelineComponents['timelineDates'].length - 1]),
      timeSpanNorm = timeSpan / timelineComponents['eventsMinLapse'],
      timeSpanNorm = Math.round(timeSpanNorm) + 4,
      totalWidth = timeSpanNorm * width;
    timelineComponents['eventsWrapper'].css('width', totalWidth + 'px');
    updateFilling(timelineComponents['eventsWrapper'].find('a.selected'), timelineComponents['fillingLine'], totalWidth);
    updateTimelinePosition('next', timelineComponents['eventsWrapper'].find('a.selected'), timelineComponents);

    return totalWidth;
  }

  function updateVisibleContent(event, eventsContent) {
    var eventDate = event.data('date'),
      visibleContent = eventsContent.find('.selected'),
      selectedContent = eventsContent.find('[data-date="' + eventDate + '"]'),
      selectedContentHeight = selectedContent.height();

    if (selectedContent.index() > visibleContent.index()) {
      var classEnetering = 'selected enter-right',
        classLeaving = 'leave-left';
    } else {
      var classEnetering = 'selected enter-left',
        classLeaving = 'leave-right';
    }

    selectedContent.attr('class', classEnetering);
    visibleContent.attr('class', classLeaving).one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function () {
      visibleContent.removeClass('leave-right leave-left');
      selectedContent.removeClass('enter-left enter-right');
    });
    eventsContent.css('height', selectedContentHeight + 'px');
  }

  function updateOlderEvents(event) {
    event.parent('li').prevAll('li').children('a').addClass('older-event').end().end().nextAll('li').children('a').removeClass('older-event');
  }

  function getTranslateValue(timeline) {
    var timelineStyle = window.getComputedStyle(timeline.get(0), null),
      timelineTranslate = timelineStyle.getPropertyValue("-webkit-transform") ||
        timelineStyle.getPropertyValue("-moz-transform") ||
        timelineStyle.getPropertyValue("-ms-transform") ||
        timelineStyle.getPropertyValue("-o-transform") ||
        timelineStyle.getPropertyValue("transform");

    if (timelineTranslate.indexOf('(') >= 0) {
      var timelineTranslate = timelineTranslate.split('(')[1];
      timelineTranslate = timelineTranslate.split(')')[0];
      timelineTranslate = timelineTranslate.split(',');
      var translateValue = timelineTranslate[4];
    } else {
      var translateValue = 0;
    }

    return Number(translateValue);
  }

  function setTransformValue(element, property, value) {
    element.style["-webkit-transform"] = property + "(" + value + ")";
    element.style["-moz-transform"] = property + "(" + value + ")";
    element.style["-ms-transform"] = property + "(" + value + ")";
    element.style["-o-transform"] = property + "(" + value + ")";
    element.style["transform"] = property + "(" + value + ")";
  }

  //based on http://stackoverflow.com/questions/542938/how-do-i-get-the-number-of-days-between-two-dates-in-javascript
  function parseDate(events) {
    var dateArrays = [];
    events.each(function () {
      var singleDate = $(this),
        dateComp = singleDate.data('date').split('T');
      if (dateComp.length > 1) { //both DD/MM/YEAR and time are provided
        var dayComp = dateComp[0].split('/'),
          timeComp = dateComp[1].split(':');
      } else if (dateComp[0].indexOf(':') >= 0) { //only time is provide
        var dayComp = ["2000", "0", "0"],
          timeComp = dateComp[0].split(':');
      } else { //only DD/MM/YEAR
        var dayComp = dateComp[0].split('/'),
          timeComp = ["0", "0"];
      }
      var newDate = new Date(dayComp[2], dayComp[1] - 1, dayComp[0], timeComp[0], timeComp[1]);
      dateArrays.push(newDate);
    });
    return dateArrays;
  }

  function daydiff(first, second) {
    return Math.round((second - first));
  }

  function minLapse(dates) {
    //determine the minimum distance among events
    var dateDistances = [];
    for (i = 1; i < dates.length; i++) {
      var distance = daydiff(dates[i - 1], dates[i]);
      dateDistances.push(distance);
    }
    return Math.min.apply(null, dateDistances);
  }

  /*
    How to tell if a DOM element is visible in the current viewport?
    http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
  */
  function elementInViewport(el) {
    var top = el.offsetTop;
    var left = el.offsetLeft;
    var width = el.offsetWidth;
    var height = el.offsetHeight;

    while (el.offsetParent) {
      el = el.offsetParent;
      top += el.offsetTop;
      left += el.offsetLeft;
    }

    return (
      top < (window.pageYOffset + window.innerHeight) &&
      left < (window.pageXOffset + window.innerWidth) &&
      (top + height) > window.pageYOffset &&
      (left + width) > window.pageXOffset
    );
  }

  function checkMQ() {
    //check if mobile or desktop device
    return window.getComputedStyle(document.querySelector('.cd-horizontal-timeline'), '::before').getPropertyValue('content').replace(/'/g, "").replace(/"/g, "");
  }
});


$(document).ready(function () {
  var owl = $('#perbincangandiv');
  var owl2 = $('#event');
  var owl3 = $('#anugerahdiv');

  owl.owlCarousel({
    lazyLoad: true,
    autoWidth: false,
    dots: false,
    loop: false,
    center: false,
    margin: 10,
    nav: true,
    navText: [
      '<i class="bi bi-arrow-left-circle-fill" aria-hidden="true"></i>',
      '<i class="bi bi-arrow-right-circle-fill" aria-hidden="true"></i>'
    ],
    navContainer: '.main-content .custom-nav',
    responsive: {
      0: {
        items: 1,

      },
      600: {
        items: 3,
      },
      1000: {
        items: 3,
      }
    }
  })

  owl2.owlCarousel({
    stagePadding: 0,
    lazyLoad: true,
    autoWidth: false,
    dots: true,
    loop: false,
    center: false,
    margin: 10,
    nav: true,
    navText: [
      '<i class="bi bi-arrow-left-circle-fill" aria-hidden="true"></i>',
      '<i class="bi bi-arrow-right-circle-fill" aria-hidden="true"></i>'
    ],
    navContainer: '.main-content2 .custom-nav',
    responsive: {
      0: {
        items: 1,

      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      }
    }
  })



  owl3.owlCarousel({
    stagePadding: 0,
    lazyLoad: true,
    autoWidth: false,
    dots: false,
    loop: false,
    center: false,
    margin: 10,
    nav: true,
    navText: [
      '<i class="bi bi-arrow-left-circle-fill" aria-hidden="true"></i>',
      '<i class="bi bi-arrow-right-circle-fill" aria-hidden="true"></i>'
    ],
    navContainer: '.main-content3 .custom-nav',
    responsive: {
      0: {
        items: 1,

      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      }
    }
  })



  $('.dropdown-menu').on('click', '.dropdown-item', function () {

    var $item = $(this);
    var filter = $item.data('owl-filter')

    owl3.owlcarousel2_filter(filter);

  })

})


var citem = document.getElementById("perbincangandiv");
for (var i = 36; i > 0; i--) {
  citem.innerHTML += '<div class="item"><img  loading=lazy data-src="assets/img/perbincangan/img-' + i + '.webp" class="d-block owl-lazy" alt="..."></div>';
};


var citem8 = document.getElementById("anugerahdiv");

for (var i = 3; i > 0; i--) {
  citem8.innerHTML += '<div class="item e"><img loading="lazy" src="assets/img/anugerah/EDP/img-' + i + '.webp" class="d-block" alt="..."></div>';
};


//executive grand pix challenge
for (var i = 5; i > 0; i--) {
  citem8.innerHTML += '<div class="item egpc"><img loading="lazy" src="assets/img/anugerah/EXECUTIVE_GRAND_PRIX_CHALLENGE/img-' + i + '.webp" class="d-block" alt="..."></div>';
};

//ifm
for (var i = 1; i > 0; i--) {
  citem8.innerHTML += '<div class="item ifm"><img loading="lazy" src="assets/img/anugerah/IDIRE_FOR_MORE/img-' + i + '.webp" class="d-block" alt="..."></div>';
};

//itw 
for (var i = 2; i > 0; i--) {
  citem8.innerHTML += '<div class="item itw"><img loading="lazy" src="assets/img/anugerah/IRACE_TO_WIN/img-' + i + '.webp" class="d-block" alt="..."></div>';
};

//jc
for (var i = 2; i > 0; i--) {
  citem8.innerHTML += '<div class="item jc"><img loading="lazy" src="assets/img/anugerah/JACKET_CHALLENGE/img-' + i + '.webp" class="d-block" alt="..."></div>';
};

//oc
for (var i = 15; i > 0; i--) {
  citem8.innerHTML += '<div class="item oc"><img loading="lazy" src="assets/img/anugerah/OTHER_CHALLENGE/img-' + i + '.webp" class="d-block" alt="..."></div>';
};

//pvm
for (var i = 1; i > 0; i--) {
  citem8.innerHTML += '<div class="item pvm"><img loading="lazy" src="assets/img/anugerah/PRU_VENTURE_MANAGER/img-' + i + '.webp" class="d-block" alt="..."></div>';
};

//pwp
for (var i = 4; i > 0; i--) {
  citem8.innerHTML += '<div class="item pwp"><img loading="lazy" src="assets/img/anugerah/PRUDENTIAL_WEALTH_PLANNER/img-' + i + '.webp" class="d-block" alt="..."></div>';
};
//pvma
for (var i = 3; i > 0; i--) {
  citem8.innerHTML += '<div class="item pvma"><img loading="lazy" src="assets/img/anugerah/PVM_ACHIEVERS/img-' + i + '.webp" class="d-block" alt="..."></div>';
};
//s
for (var i = 1; i > 0; i--) {
  citem8.innerHTML += '<div class="item s"><img loading="lazy" src="assets/img/anugerah/STARCLUB/img-' + i + '.webp" class="d-block" alt="..."></div>';
};

//ta
for (var i = 11; i > 0; i--) {
  citem8.innerHTML += '<div class="item ta"><img loading="lazy" src="assets/img/anugerah/TOP_AGENT/img-' + i + '.webp" class="d-block" alt="..."></div>';
};
//tr
for (var i = 3; i > 0; i--) {
  citem8.innerHTML += '<div class="item tr"><img loading="lazy" src="assets/img/anugerah/TOP_RECRUITER/img-' + i + '.webp" class="d-block" alt="..."></div>';
};
//ty1y2tn
for (var i = 3; i > 0; i--) {
  citem8.innerHTML += '<div class="item ty1y2tn"><img loading="lazy" src="assets/img/anugerah/TOP_Y1_Y2_TAG_NORTHERN/img-' + i + '.webp" class="d-block" alt="..."></div>';
};

//twp
for (var i = 4; i > 0; i--) {
  citem8.innerHTML += '<div class="item twp"><img loading="lazy" src="assets/img/anugerah/TOUCH_WITH_PRU/img-' + i + '.webp" class="d-block" alt="..."></div>';
};
