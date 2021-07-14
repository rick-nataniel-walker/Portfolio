
//mouse circle
const mouseCircle = document.querySelector('.mouse-circle');
const mouseDot = document.querySelector('.mouse-dot');
const closeBtn = document.querySelector('.project-hide-btn');

let isMouseCircled = true;

const mouseCircleFn = (x,y) => {
    isMouseCircled&&(mouseCircle.style.cssText = `top: ${y}px; left:${x}px; opacity:1;`);
    mouseDot.style.cssText = `top: ${y}px; left:${x}px; opacity:1;`;
};

//end mouse circle 

// Animated Circles
const circles = document.querySelectorAll('.circle');
const mainImg = document.querySelector('.main-circle img');
let mX=0;
let mY=0;

const animateCircles = (e,x,y) =>{
    let px = 50;
    if(x < mX){
        circles.forEach(circle=>{
            circle.style.left = `${px}px`;
        });
        mainImg.style.left = `${px}px`;
    } else{
        circles.forEach(circle=>{
            circle.style.left = `-${px}px`;
        });
        mainImg.style.left = `-${px}px`;
    }
    if(y < mY){
        circles.forEach(circle=>{
            circle.style.top = `${px}px`;
        });
        mainImg.style.top = `${px}px`;
    } else{
        circles.forEach(circle=>{
            circle.style.top = `-${px}px`;
        });
        mainImg.style.top = `-${px}px`;
    } 



    mX = e.clientX;
    mY = e.clientY;
};

// End of Animated Circles


const stickyElements = (x,y,hoveredEl)=>{
    if(hoveredEl.classList.contains('sticky')){
        if(hoveredElPosition.length<1){
            hoveredElPosition=[hoveredEl.offsetTop,hoveredEl.offsetLeft];
        }
        hoveredEl.style.cssText = `top:${y}px;left:${x}px`;

        if(hoveredEl.offsetTop < hoveredElPosition[0]-100 || hoveredEl.offsetTop > hoveredElPosition[0]+100 || hoveredEl.offsetLeft < hoveredElPosition[1]-100 || hoveredEl.offsetTop > hoveredElPosition[1]+100 ){
            hoveredEl.style.cssText = "";
            hoveredElPosition = [];
        }
        hoveredEl.onmouseleave= () =>{
            hoveredEl.style.cssText = "";
            hoveredElPosition = [];
        }
    }
};

// Nouse circle transform 
const mouseCircleTransform = (hoveredEl)=>{
    if(hoveredEl.classList.contains('pointer-enter')){
        isMouseCircled = false;
        hoveredEl.onmousemove = () =>{
            mouseCircle.style.cssText = `width: ${hoveredEl.getBoundingClientRect().width}px; 
            height: ${hoveredEl.getBoundingClientRect().height}px;
            top: ${hoveredEl.getBoundingClientRect().top}px;
            left: ${hoveredEl.getBoundingClientRect().left}px;
            opacity:1;
            transform:translate(0,0);
            animation: none;
            border-radius: ${getComputedStyle(hoveredEl).borderBottomLeftRadius};
            transition: width .5s, height .5s, top .5s, left .5s, transform .5s, border-radius .5s;`
            ;
        }
        hoveredEl.onmouseleave= () =>{isMouseCircled = true};

        document.onscroll = ()=>{
            if(!isMouseCircled){
                mouseCircle.style.top = `${hoveredEl.getBoundingClientRect().top}px`;
            }
        }
    }
}
// End of Nouse circle transform 

let  hoveredElPosition = []; 
// Main button (main-btn)
document.body.addEventListener('mousemove', e=>{
    let x= e.clientX;
    let y = e.clientY;
    mouseCircleFn(x, y);
    animateCircles(e,x,y);
    // Sticky Elemnts
    const hoveredEl = document.elementFromPoint(x,y);
    stickyElements(x, y, hoveredEl);
    mouseCircleTransform(hoveredEl);
    // End of `Sticky Elemnts
});

document.body.addEventListener('mouseleave',()=>{
    mouseCircle.style.opacity ='0';
    mouseDot.style.opacity ='0';
});

const mainBtns = document.querySelectorAll('.main-btn');

mainBtns.forEach(mainBtn => {
    
    let ripple;
    
    mainBtn.addEventListener("mouseenter",(e)=>{
        const left = e.clientX-e.target.getBoundingClientRect().left;
        const top = e.clientY-e.target.getBoundingClientRect().top;
    
        ripple=document.createElement('div');
        ripple.classList.add('ripple');
        
    
        ripple.style.left = `${left}px`;
        ripple.style.top = `${top}px`;
    
        mainBtn.prepend(ripple);
    });
    mainBtn.addEventListener("mouseleave",()=>{
        mainBtn.removeChild(ripple);
    });
});

// Navigation
const nav = document.querySelector('.navbar');
const menuIcon = document.querySelector('.menu-icon')

document.addEventListener("scroll",()=>{
    menuIcon.classList.add('show-menu-icon');
    nav.classList.add('hide-navbar'); 
    if(window.scrollY===0){
        menuIcon.classList.remove('show-menu-icon');
        nav.classList.remove('hide-navbar'); 
    }
    progressBarFn();
});

menuIcon.addEventListener('click',()=>{
    menuIcon.classList.remove('show-menu-icon');
    nav.classList.remove('hide-navbar'); 
});

// End of Navigation


// Progress Bar

const progressBar = document.querySelector('.progress-bar');
const sections = document.querySelectorAll("section")
const halfCircles = document.querySelectorAll('.half-circle');
const topCircle = document.querySelector('.half-circle-top');
const progressBarCircle = document.querySelector('.progress-bar-circle');

const progressBarFn = (bigImageWrapper=false)=>{
    let pageViewportHeight = window.innerHeight;
    let pageHeight = document.documentElement.scrollHeight;
    let scrolledPortion = window.pageYOffset;
    
    if(bigImageWrapper){
        pageHeight = bigImageWrapper.firstElementChild.scrollHeight;
        scrolledPortion = bigImageWrapper.scrollTop;
    }

    let scrolledPortionDegree = (scrolledPortion/(pageHeight-pageViewportHeight))*360;
    let isBottom = scrolledPortion + pageViewportHeight === pageHeight;

    halfCircles.forEach(el=>{
        el.style.transform = `rotate(${scrolledPortionDegree}deg)`;
        if(scrolledPortionDegree>=180){
            halfCircles[0].style.transform = `rotate(180deg)`;
            topCircle.style.opacity = "0";
        }

        if(scrolledPortionDegree<180){
            topCircle.style.opacity = "1";
        }
    });

    //Progress Bar Click
    progressBar.onclick= e=>{
        e.preventDefault();
        if(!bigImageWrapper){
            let sectionPositions = Array.from(sections).map(section => 
                scrolledPortion + section.getBoundingClientRect().top
            );
    
            let position = sectionPositions.find(sectionPosition =>sectionPosition>scrolledPortion);
            isBottom?window.scrollTo(0,0):window.scrollTo(0, position);
        }else {
            isBottom?bigImageWrapper.scrollTo(0,0):bigImageWrapper.scrollTo(0, bigImageWrapper.scrollHeight);
        }
    };
    //Progress Bar Click

    // Progress bar arrow
    isBottom?progressBarCircle.style.transform="rotate(180deg)":progressBarCircle.style.transform="rotate(0deg)";
    // End of Progress bar arrow
}

progressBarFn();
// End of Progress Bar


// About me text
const aboutMeText = document.querySelector('.about-me-text');
const aboutMeContent = "nteger lobortis lectus ac turpis facilisis condimentum. Aenean non mauris faucibus, bibendum purus eu, pharetra diam. In vitae diam quam. Aenean nulla nunc, gravida in sem et, sagittis ullamcorper tellus. Ut interdum facilisis sapien sit amet pharetra. Curabitur id elementum mauris. "

Array.from(aboutMeContent).forEach((ch)=>{
    let span = document.createElement('span');
    span.textContent=ch;
    aboutMeText.appendChild(span);
    span.addEventListener('mouseenter',e=>{
        e.target.style.animation ="aboutMeTextAnim 10s infinite";
    });
});

// End off About me text

// Projects

const container = document.querySelector('.container');
const projects = document.querySelectorAll(".project");

projects.forEach(project=>{
    let img = project.firstElementChild;
    project.addEventListener("mouseenter",()=>{
        img.style.top = `-${img.offsetHeight-project.offsetHeight+20}px`;
    });
});
// End of Projects

projects.forEach((project,i)=>{
    let img = project.firstElementChild;
    project.addEventListener("mouseleave",()=>{
        img.style.top = `${2}rem`;
    });
    // Big Images
    project.addEventListener("click",()=>{
        let bigImageWrapper = document.createElement('div');
        bigImageWrapper.className = 'big-image-wrapper';
        container.appendChild(bigImageWrapper);

        let bigImg = document.createElement("img");
        bigImg.className ="project-img";
        let bigImgPath = img.getAttribute("src").split('.')[0]+"-big.jpg";
        bigImg.setAttribute("src",bigImgPath);
        bigImageWrapper.appendChild(bigImg);
        document.body.style.overflowY = "hidden";

        progressBarFn(bigImageWrapper);
        bigImageWrapper.onscroll= ()=>{
            progressBarFn(bigImageWrapper);

        };

        mouseCircle.style.opacity = 0;

        closeBtn.classList.add('change');
        closeBtn.onclick = () =>{
            progressBarFn();
            closeBtn.classList.remove('change');
            bigImageWrapper.remove();
            
            document.body.style.overflowY = "scroll";
        }
    });
    i>=6 && (project.style.cssText = `display:none; opacity:0`);
    // End Big Images
});

// Projects Button
const section3 = document.querySelector('.section-3');
const projectBtn =  document.querySelector(".projects-btn");
const projectBtnText =  document.querySelector(".projects-btn span");
let showHideBool = true;

projectBtn.addEventListener('click',e=>{
    e.preventDefault();
    projectBtn.firstElementChild.nextElementSibling.classList.toggle("change");
    projects.forEach((project,i)=>{
        
        if(i>6){
            if(showHideBool){
                setTimeout(()=>{
                    project.style.display= "flex";
                    section3.scrollIntoView({block:"end"});
                },600);
                setTimeout(()=>{
                    project.style.opacity="1";
                },i*200);
                projectBtnText.innerText = "Show Less";
            }
            else {
                setTimeout(()=>{
                    project.style.display= "none";
                    section3.scrollIntoView({block:"end"});
                },1200);
                setTimeout(()=>{
                    project.style.opacity="0";
                },i*100);
                projectBtnText.innerText = "Show More";
            }
        }
    });
    showHideBool = !showHideBool;
});
// End of Projects Button
// End of Projects

// Section 4
const servicesBtns = document.querySelectorAll('.service-btn');
servicesBtns.forEach(serviceBtn=>{
    serviceBtn.addEventListener('click',(e)=>{
        e.preventDefault();
        const serviceText = serviceBtn.nextElementSibling;
        serviceText.classList.toggle('change');

        const span = serviceBtn.firstElementChild;
        const rightPosition = serviceText.classList.contains("change")?`calc(100% - ${getComputedStyle(span).width})`:0;
        span.style.right = rightPosition;

        serviceBtn.addEventListener('mouseleave',()=>{
            const rightPosition = serviceText.classList.contains("change")?`calc(100% - ${getComputedStyle(span).width})`:0;
            span.style.right = rightPosition;
        });
    });


});

// End of Section 4

// Section 5
// Form
const formHeading = document.querySelector('.form-heading');
const formInputs = document.querySelectorAll('.contact-form-input');
formInputs.forEach(input=>{
    input.addEventListener('focus',()=>{
        formHeading.style.opacity = '0';
        setTimeout(()=>{
                formHeading.textContent = `Your ${input.placeholder}`;
                formHeading.style.opacity = '1';
            },300
        );

    });
    input.addEventListener('blur',()=>{
        formHeading.style.opacity = '0';
        setTimeout(()=>{
                formHeading.textContent = `Lets Talk`;
                formHeading.style.opacity = '1';
            },300
        );

    });
});
// End of Form

// SlideShow
const slideShow = document.querySelector('.slideshow-wrapper');
setInterval(()=>{
    const firstChild = slideShow.firstElementChild;
    const thrirdChild = slideShow.children[3];

    thrirdChild.classList.add('light');
    thrirdChild.previousElementSibling.classList.remove('light');
    firstChild.classList.add("faded-out");

    setTimeout(()=>{
        slideShow.removeChild(firstChild);

        setTimeout(()=>{
            firstChild.classList.remove("faded-out");
        },100);
        slideShow.appendChild(firstChild);
    },500);
},3000);
// End SlideShow

// Form validation
const contactForm = document.querySelector('.contact-form');
const username = document.querySelector('#name');
const mail = document.querySelector('#mail');
const subject = document.querySelector('#subject');
const message = document.querySelector('#msg');
const messages = document.querySelectorAll('.message');

const errorMessage = (input, message)=>{
    input.nextElementSibling.classList.add('error');
    console.log(input.nextElementSibling);
    input.nextElementSibling.innerText = message;
}

const success=(input)=>{
    input.nextElementSibling.classList.remove('error');
}

const checkRequiredField = (inputFields)=>{
    inputFields.forEach(inputField=>{
        if(inputField.value.trim()===""){
            errorMessage(inputField,`${inputField.id} nao pode ser vazio`);
        }else{
            success(inputField);
        }
    });
};

contactForm.addEventListener('submit', e=>{
    e.preventDefault();
    checkRequiredField([username,mail,subject,message]);
})
// End of Form validation

// End off Section 5