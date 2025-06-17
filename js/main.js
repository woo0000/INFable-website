window.addEventListener("load", function(){

	const header = document.querySelector("header");

	header.addEventListener("mouseenter", function () {
		header.classList.add("fixed");
		header.classList.add("active");
	});

	header.addEventListener("mouseleave", function () {
		header.classList.remove("fixed");
		header.classList.remove("active");
	});

	let prev = document.querySelector(".main_slider .prev");
    let next = document.querySelector(".main_slider .next");

	const mainSwiper = new Swiper(".mainSwiper", {
		loop: true,
		autoplay: {
			delay: 5000
		},
		on: {
            init: function() {
                let menuList = document.querySelectorAll(".pagination ul li a");
                let current = this.realIndex;  // 현재 슬라이드 인덱스

                // 메뉴 항목 활성화
                menuList.forEach(function(item, index) {
                    item.classList.remove("on");
                    if (index === current) {
                        item.classList.add("on");
                    }
                });
            },
            slideChangeTransitionEnd: function() {
                let menuList = document.querySelectorAll(".pagination ul li a");
                let current = this.realIndex;  // 현재 슬라이드 인덱스

                // 메뉴 항목 활성화
                menuList.forEach(function(item, index) {
                    item.classList.remove("on");
                    if (index === current) {
                        item.classList.add("on");
                    }
                });
            }
		}
	});

	if (prev) {
		prev.addEventListener("click", function(e){
			e.preventDefault();
			mainSwiper.slidePrev();
		});
	}

	if (next) {
		next.addEventListener("click", function(e){
			e.preventDefault();
			mainSwiper.slideNext();
		});
	}

	//스크린
	let subList=document.querySelectorAll(".container .sub");
	let pageList=[];

	pageList[0]=document.querySelector(".main_area");

	subList.forEach(function(item){
		pageList.push(item);
	});

	let n=0;
	let targety=0;
	let moving=false;
	let winh;

	function moveCategory(){
		winh=window.innerHeight;

		let header = document.querySelector("header");
		if (n >= 1) {
			header.classList.add("fixed");
		} else {
			header.classList.remove("fixed");
		}

		if(n <= pageList.length-1){
			pageList.forEach(function(item1, i){

				if(i <= n){
					gsap.to(item1, { top: 0, duration: 0.5, onComplete: function(){
						if(i == n){
							moving=false;

							pageList.forEach(function(item2, j){
								if(j == n){
									pageList[j].classList.add("active");
								}
								else{
									pageList[j].classList.remove("active");
								}
							});
						}
					}});
				}
				else{
					gsap.to(item1, { top: winh, duration: 0.5 });
				}
			});
		}
		else{
			let lastPage=pageList[pageList.length-1];

			gsap.to(lastPage, { top: -350, duration: 0.5, onComplete: function(){
				moving=false;
			}});
		}
		
	}

	moveCategory();

	if(isMobile){
		let starty=0;

		document.addEventListener("touchstart", function(e){
			moving=false;
			starty=e.touches[0].clientY;
		});

		document.addEventListener("touchmove", function(e){
			if(moving == true) return;

			let deltay=e.touches[0].clientY-starty;

			if(Math.abs(deltay) > 100){
				if(deltay < 0){
					if (n < pageList.length){
						n+=1;
					}
					else{
						return;
					}
				}
				else{
					if(n > 0){
						n-=1;
					}
					else{
						return;
					}
				}

				moving=true;

				moveCategory();
			}
		});
	}
	else{
		document.addEventListener("mousewheel", function(e){
			if(moving == true) return;

			if(e.deltaY < 0){
				if(n > 0){
					n-=1;
				}
				else{
					return;
				}
			}
			else{
				if(n < pageList.length){
					n=n+1;
				}
				else{
					return;
				}
			}

			moving=true;

			moveCategory();
		});

		document.addEventListener("keydown", function(e){
			if(e.code == "ArrowUp"){
				if(n > 0){
					n-=1;
				}
				else{
					return;
				}
			}
			else if(e.code == "ArrowDown"){
				if(n < pageList.length){
					n=n+1;
				}
				else{
					return;
				}
			}

			moving=true;

			moveCategory();
		});
	}
});