(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner(0);

    // Initialize buttons
    $(document).ready(function() {
        // Search functionality
        $('.btn-search').click(function(e) {
            e.preventDefault();
            $('#searchModal').modal('show');
        });

        // Search form submission
        $('.modal-body input[type="search"]').on('keypress', function(e) {
            if (e.which === 13) { // Enter key pressed
                e.preventDefault();
                var searchTerm = $(this).val().trim();
                if (searchTerm) {
                    searchProducts(searchTerm);
                }
            }
        });

        // Search icon click
        $('#search-icon-1').click(function(e) {
            e.preventDefault();
            var searchTerm = $('.modal-body input[type="search"]').val().trim();
            if (searchTerm) {
                searchProducts(searchTerm);
            }
        });

        // Cart button
        $('.fa-shopping-cart').parent().click(function(e) {
            e.preventDefault();
            window.location.href = 'cart.html';
        });

        // User button
        $('.fa-user').parent().click(function(e) {
            e.preventDefault();
            window.location.href = 'login.html';
        });

        // Navigation links
        $('.nav-item a').click(function(e) {
            e.preventDefault();
            var href = $(this).attr('href');
            if (href) {
                window.location.href = href;
            }
        });

        // Product buttons
        $('.fruite-item').click(function() {
            var productId = $(this).data('product-id');
            if (productId) {
                window.location.href = 'shop-detail.html?id=' + productId;
            }
        });

        // Add to cart buttons
        $('.add-to-cart').click(function(e) {
            e.preventDefault();
            var productId = $(this).data('product-id');
            if (productId) {
                addToCart(productId);
                updateCartCount();
            }
        });

        // Quick view buttons
        $('.quick-view').click(function(e) {
            e.preventDefault();
            var productId = $(this).data('product-id');
            if (productId) {
                openQuickView(productId);
            }
        });
    });

    // Function to add product to cart
    function addToCart(productId) {
        // Here you would typically make an API call to add to cart
        console.log('Adding product ' + productId + ' to cart');
    }

    // Function to update cart count
    function updateCartCount() {
        var currentCount = parseInt($('.cart-count').text()) || 0;
        $('.cart-count').text(currentCount + 1);
    }

    // Function to open quick view
    function openQuickView(productId) {
        // Here you would typically load product details and show a modal
        console.log('Opening quick view for product ' + productId);
    }

    // Function to search products
    function searchProducts(term) {
        // Close the modal
        $('#searchModal').modal('hide');
        
        // Here you would typically make an API call to search products
        // For now, we'll just log the search term
        console.log('Searching for: ' + term);
        
        // You can implement the actual search functionality here
        // For example:
        // 1. Make an API call to your backend
        // 2. Update the product grid with search results
        // 3. Show a message if no results found
        
        // Example of how you might implement it:
        // $.ajax({
        //     url: '/api/search',
        //     method: 'GET',
        //     data: { term: term },
        //     success: function(results) {
        //         // Update the product grid with results
        //     }
        // });
    }

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner(0);


    // Fixed Navbar
    $(window).scroll(function () {
        if ($(window).width() < 992) {
            if ($(this).scrollTop() > 55) {
                $('.fixed-top').addClass('shadow');
            } else {
                $('.fixed-top').removeClass('shadow');
            }
        } else {
            if ($(this).scrollTop() > 55) {
                $('.fixed-top').addClass('shadow').css('top', -55);
            } else {
                $('.fixed-top').removeClass('shadow').css('top', 0);
            }
        } 
    });
    
    
   // Back to top button
   $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
        $('.back-to-top').fadeIn('slow');
    } else {
        $('.back-to-top').fadeOut('slow');
    }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Testimonial carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 2000,
        center: false,
        dots: true,
        loop: true,
        margin: 25,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:1
            },
            992:{
                items:2
            },
            1200:{
                items:2
            }
        }
    });


    // vegetable carousel
    $(".vegetable-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        center: false,
        dots: true,
        loop: true,
        margin: 25,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            },
            1200:{
                items:4
            }
        }
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });



    // Product Quantity
    $('.quantity button').on('click', function () {
        var button = $(this);
        var oldValue = button.parent().parent().find('input').val();
        if (button.hasClass('btn-plus')) {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 0;
            }
        }
        button.parent().parent().find('input').val(newVal);
    });

})(jQuery);

