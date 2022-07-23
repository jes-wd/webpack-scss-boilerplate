let $ = jQuery.noConflict()

$(document).ready(() => {
  moveResultCountAndOrderElementsToTop()
  limitSearchFilterTypes()
  addHasVideoClassToParagraphsInVideoTab()
  dropdownsForSearchAndFilterProductsForm()
})

const dropdownsForSearchAndFilterProductsForm = () => {
  if ($(window).width() < 1025) {
    const dropdownClasses =
      '.sf-field-taxonomy-product_types, .sf-field-taxonomy-product_brands, .sf-field-taxonomy-product_cat'

    $('<li id="pp-sf-filter-dropdown"><h4>Filters</h4></li>').insertAfter(
      '.sf-field-search'
    )

    $('#pp-sf-filter-dropdown').on('click', function () {
      $(dropdownClasses + ', .sf-field-reset').toggleClass('d-block')
    })

    $(dropdownClasses).on('click', (event) => {
      if (event.target.nodeName === 'H4') {
        $(`.${event.currentTarget.classList[0]}`).toggleClass(
          'pp-search-dropdown-open'
        )
      }
    })
  }
}

const removeHrefFromDropdownLinksOnMobileMenu = () => {
  if ($(window).width() < 1025) {
    $('.elementskit-megamenu-has a').each(function () {
      if ($(this).has('i').length) {
        $(this).attr('href', 'javascript:void(0)')
      }
    })
  }
}

removeHrefFromDropdownLinksOnMobileMenu()

const setMegaMenuCloseOnClick = () => {
  $('.pp-close-mega-menu-btn').on('click', function () {
    console.log('jsksj')
    $('.elementskit-megamenu-panel').removeClass('ekit-dropdown-open-onclick')
    $('.elementskit-dropdown').removeClass('ekit-dropdown-open-onclick')
  })
}

const limitSearchFilterTypes = () => {
  const typesElement = document.querySelector(
    '.sf-field-taxonomy-product_types'
  )

  if (typesElement) {
    new ResizeObserver(handleLimitSearchFilterTypes).observe(typesElement)
  }
}

const handleLimitSearchFilterTypes = () => {
  const typesLimit = 6
  const $types = $('.sf-field-taxonomy-product_types ul li')
  const $typesToHide = $types.slice(typesLimit)
  let $showMoreBtn = $('.sf-field-taxonomy-product_types .pp-show-more-btn')
  const shouldShowAllTypes = $('.sf-field-taxonomy-product_types').hasClass(
    'show-all-types'
  )

  $types.show()

  if ($typesToHide.length > 0 && !shouldShowAllTypes) {
    $typesToHide.hide()

    if ($showMoreBtn.length === 0) {
      $('.sf-field-taxonomy-product_types').append(
        '<span class="pp-show-more-btn pp-cursor-pointer pl-2">Show all</span>'
      )

      $showMoreBtn = $('.sf-field-taxonomy-product_types .pp-show-more-btn')

      $showMoreBtn.on('click', function () {
        $('.sf-field-taxonomy-product_types').addClass('show-all-types')
        const $types = $('.sf-field-taxonomy-product_types ul li')
        $types.show()
        $(this).hide()
      })
    }
  } else {
    $showMoreBtn.remove()
  }
}

// search and filter checkboxes - when selected, display the child categories
const displayChildCategoriesWhenSelected = () => {
  $('input.sf-input-checkbox:checked')
    .siblings('.children')
    .children('li[class^="sf-level-"]')
    .css('display', 'block')

  $('input.sf-input-checkbox').on('change', function () {
    if ($(this).prop('checked')) {
      $(this)
        .siblings('.children')
        .children('li[class^="sf-level-"]')
        .css('display', 'block')
    } else {
      $(this)
        .siblings('.children')
        .children('li[class^="sf-level-"]')
        .css('display', 'none')
    }
  })
}

const moveResultCountAndOrderElementsToTop = () => {
  const elementToMoveToSelector =
    '#pp-product-count-order-container .elementor-widget-wrap'
  const resultCountElement = $('.woocommerce-result-count')
  const orderElement = $('.woocommerce-ordering')

  resultCountElement.appendTo(elementToMoveToSelector)
  orderElement.appendTo(elementToMoveToSelector)
  orderElement.addClass('ml-auto')
}

const addHasVideoClassToParagraphsInVideoTab = () => {
  const videoTab = $("div[id^='tab-video']")
  const videoParagraphs = videoTab.find('p')

  videoParagraphs.each(function () {
    const paragraph = $(this)
    const hasVideo = paragraph.find('iframe').length > 0

    if (hasVideo) {
      paragraph.addClass('has-video')
    }
  })
}
