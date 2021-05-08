$(document).ready(function() {
		$('.review__carousel').slick({
				centerMode: true,
				centerPadding: '60px',
				slidesToShow: 3,
				prevArrow: '<button type="button" class="slick-prev"><img src=img/review_rectangle_left.png></button>',
				nextArrow: '<button type="button" class="slick-next"><img src=img/review_rectangle_right.png></button>',
				responsive: [
					{
						breakpoint: 768,
						settings: {
							arrows: false,
							centerMode: true,
							centerPadding: '40px',
							slidesToShow: 3
						}
					},
					{
						breakpoint: 480,
						settings: {
							arrows: false,
							dots: true,
							centerMode: true,
							centerPadding: '40px',
							slidesToShow: 1
						}
					}
				]
		});
  
		function toggleSlide(item) {
				$(item).each(function(i) {
						$(this).on('click', function(e) {
								e.preventDefault();
								$('.price__item').eq(i).toggleClass('price__item_active');
								$('.price__text').eq(i).toggleClass('price__text_active');
						});
				}); 
		}
			
		toggleSlide('.btn__price');
		toggleSlide('.price__text_back');
			
		// Validation
		function validateForms(form){
			$(form).validate({
					rules: {
							name: {
									required: true,
									minlength: 2
								},
							phone: "required",
							email: {
									required: true,
									email: true
							}
					},
					messages: {
									name: {
										required: "Пожалуйста, введите свое имя",
										minlength: jQuery.validator.format("Введите минимум {0} символа!")
							},
							phone: "Пожалуйста, введите свой номер телефона",
							email: {
								required: "Пожалуйста, введите свою почту",
								email: "Неправильно введен адрес почты"
							}
						}
			});
		}
			
		validateForms('#callback form');
		validateForms('#calculation form');
		validateForms('#consultation form');
		validateForms('#feedback form');
			
		$('input[name=phone]').mask("+38 (999) 999-99-99");
			
		//Modal
		$('[data-modal=callback]').on('click', function() {
			$('.overlay, #callback').fadeIn('slow');
		});

		$('[data-modal=calculation]').on('click', function() {
			$('.overlay, #calculation').fadeIn('slow');
		});

		// $('[data-modal=consultation]').on('click', function() {
		// 	$('.overlay, #thanks').fadeIn('slow');
		// });

		// $('[data-modal=feedback]').on('click', function() {
		// 	$('.overlay, #thanks').fadeIn('slow');
		// });

		$('.modal__close').on('click', function() {
			$('.overlay, #callback, #calculation, #thanks').fadeOut('fast');
		});


		// Отправка инфо из форм
		$('form').submit(function(e) {
		e.preventDefault(); /* отмена автоматической перезагрузки страницы по умолчанию */

		if (!$(this).valid()) { //добавила
            return;
        }

		$.ajax({ /* отправка данных на сервер */
				type: "POST", /* отправка, не получение */
				url: "mailer/smart.php", /* куда отправляем */
				data: $(this).serialize() /* данные для отправки в формате для сервера */
		}).done(function() { /* мы выполнили операцию и теперь : */
				$(this).find("input").val(""); /* после отправки формы - находим инпуты и их форма обнуляется */
				$('#callback, #calculation').fadeOut(); /* окошко для заполнения форм закрывается  #consultation, #feedback*/
				$('.overlay, #thanks').fadeIn('slow'); /* появляется окно благодарности */

				$('form').trigger('reset'); /* говорим, что все формы должны очиститься */
		});
		return false;
		});


		//гамбургер
		window.addEventListener('DOMContentLoaded', () => {
			const menu = document.querySelector('.header__menu'),
				  menuItem = document.querySelectorAll('.menu__item'),
				  hamburger = document.querySelector('.hamburger');
		
			hamburger.addEventListener('click', () => {
				hamburger.classList.toggle('hamburger_active');
				menu.classList.toggle('header__menu_active');
			});
		
			menuItem.forEach(item => {
				item.addEventListener('click', () => {
					hamburger.classList.toggle('hamburger_active');
					menu.classList.toggle('header__menu_active');
				});
			});
		});

});










