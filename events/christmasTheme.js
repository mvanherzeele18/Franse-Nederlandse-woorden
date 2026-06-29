import { isChristmas } from "https://mvanherzeele.github.io/Franse-Nederlandse-woorden/events/eventManager.js";

if (!isChristmas()) {
    // Geen kerst -> niets doen.
} else {

    // ----------------------------
    // CSS
    // ----------------------------

    const style = document.createElement("style");

    style.textContent = 

    body{

        position:relative;
        overflow-x:hidden;

    }

    body::before{

        content:"";
        position:fixed;
        inset:0;
        pointer-events:none;

        background:
        radial-gradient(circle at 20% 20%,rgba(255,255,255,.15),transparent 40%),
        radial-gradient(circle at 80% 30%,rgba(255,255,255,.10),transparent 35%),
        radial-gradient(circle at 50% 80%,rgba(255,255,255,.12),transparent 40%);

        z-index:0;

    }

    .snow{

        position:fixed;

        top:-30px;

        color:white;

        user-select:none;

        pointer-events:none;

        animation-name:snowFall;

        animation-timing-function:linear;

        animation-fill-mode:forwards;

        z-index:9999;

        text-shadow:
        0 0 5px white,
        0 0 10px white;

    }

    @keyframes snowFall{

        from{

            transform:translateY(-20px);

        }

        to{

            transform:translateY(110vh);

        }

    }

    .christmas-star{

        position:fixed;

        color:#FFD54F;

        pointer-events:none;

        animation:twinkle 2s infinite;

        z-index:9998;

    }

    @keyframes twinkle{

        0%{opacity:.2;transform:scale(.7);}
        50%{opacity:1;transform:scale(1.3);}
        100%{opacity:.2;transform:scale(.7);}

    }

    .floating-gift{

        position:fixed;

        font-size:28px;

        pointer-events:none;

        animation:giftFloat 12s linear forwards;

        z-index:9997;

    }

    @keyframes giftFloat{

        from{

            transform:
            translateX(-50px)
            translateY(80vh)
            rotate(0deg);

        }

        to{

            transform:
            translateX(110vw)
            translateY(10vh)
            rotate(360deg);

        }

    }

    .christmas-hat{

        position:absolute;

        transform:

        rotate(-25deg);

        font-size:32px;

        margin-left:-12px;

        margin-top:-15px;

    }

    ;

    document.head.appendChild(style);

    // ----------------------------
    // Kerstmuts op H1
    // ----------------------------

    const title = document.querySelector("h1");

    if(title){

        title.style.position="relative";

        const hat=document.createElement("span");

        hat.className="christmas-hat";

        hat.textContent="🎅";

        title.prepend(hat);

    }

    // ----------------------------
    // Sneeuw
    // ----------------------------

    function createSnow(){

        const snow=document.createElement("div");

        snow.className="snow";

        snow.textContent="❄";

        snow.style.left=Math.random()*100+"vw";

        snow.style.fontSize=(10+Math.random()*18)+"px";

        snow.style.animationDuration=
        (5+Math.random()*8)+"s";

        document.body.appendChild(snow);

        setTimeout(()=>{

            snow.remove();

        },14000);

    }

    setInterval(createSnow,180);

    // ----------------------------
    // Sterren
    // ----------------------------

    for(let i=0;i<25;i++){

        const star=document.createElement("div");

        star.className="christmas-star";

        star.textContent="✨";

        star.style.left=Math.random()*100+"vw";

        star.style.top=Math.random()*100+"vh";

        star.style.animationDelay=
        Math.random()*3+"s";

        document.body.appendChild(star);

    }

    // ----------------------------
    // Cadeautjes
    // ----------------------------

    function createGift(){

        const gift=document.createElement("div");

        gift.className="floating-gift";

        gift.textContent="🎁";

        gift.style.top=
        (40+Math.random()*40)+"vh";

        document.body.appendChild(gift);

        setTimeout(()=>{

            gift.remove();

        },12000);

    }

    setInterval(createGift,18000);

    console.log("🎄 Kerstthema geladen.");

}
