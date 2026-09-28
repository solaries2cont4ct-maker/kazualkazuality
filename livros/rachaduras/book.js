const NUM_PAGES = 16;

const extensions = ["png", "jpg", "jpeg"];

let current = 1;
let busy = false;

const L = document.getElementById("left");
const R = document.getElementById("right");
const B = document.getElementById("book");
const C = document.getElementById("counter");
const P = document.getElementById("prev");
const N = document.getElementById("next");


/* =====================================================
   ENCONTRA AUTOMATICAMENTE PNG / JPG / JPEG
   ===================================================== */

function pageFile(n, callback){

  const number = String(n).padStart(2, "0");

  let i = 0;

  function tryNext(){

    if(i >= extensions.length){
      console.error("Página não encontrada:", n);
      callback("");
      return;
    }

    const file = `paginas/pagina-${number}.${extensions[i]}`;

    const img = new Image();

    img.onload = function(){
      callback(file);
    };

    img.onerror = function(){
      i++;
      tryNext();
    };

    img.src = file;
  }

  tryNext();
}


/* =====================================================
   ATUALIZA AS PÁGINAS
   ===================================================== */

function update(){

  const mob = innerWidth <= 700;

  if(mob){

    pageFile(current, function(file){

      R.src = file;
    });

    L.style.display = "none";

  }else{

    let l = current % 2 === 0 ? current : current - 1;
    let r = l + 1;

    L.style.display = "block";

    if(l >= 1){

      pageFile(l, function(file){
        L.src = file;
      });

    }else{

      L.src = "";
    }


    if(r <= NUM_PAGES){

      pageFile(r, function(file){
        R.src = file;
      });

    }else{

      R.src = "";
    }
  }


  C.textContent =
    `${Math.min(current + (mob ? 0 : 1), NUM_PAGES)} / ${NUM_PAGES}`;

  P.disabled = current <= 1;
  N.disabled = current >= NUM_PAGES;
}


/* =====================================================
   PRÓXIMA PÁGINA
   ===================================================== */

function next(){

  if(busy || current >= NUM_PAGES) return;

  busy = true;


  if(innerWidth > 700){

    const t = document.createElement("div");

    t.className = "turning next";


    pageFile(current + 1, function(file1){

      pageFile(
        Math.min(current + 2, NUM_PAGES),
        function(file2){

          t.innerHTML = `
            <div class="face">
              <img src="${file1}">
            </div>

            <div class="face back">
              <img src="${file2}">
            </div>
          `;

          B.append(t);

          requestAnimationFrame(() => {
            t.classList.add("flipped");
          });

        }
      );

    });


    setTimeout(() => {

      current = Math.min(current + 2, NUM_PAGES);

      const turning = document.querySelector(".turning.next");

      if(turning) turning.remove();

      update();

      busy = false;

    }, 820);

  }else{

    current++;

    update();

    setTimeout(() => {
      busy = false;
    }, 350);
  }
}


/* =====================================================
   PÁGINA ANTERIOR
   ===================================================== */

function prev(){

  if(busy || current <= 1) return;

  busy = true;


  if(innerWidth > 700){

    const t = document.createElement("div");

    t.className = "turning prev";

    const p = Math.max(current - 2, 1);


    pageFile(current, function(file1){

      pageFile(p, function(file2){

        t.innerHTML = `
          <div class="face">
            <img src="${file1}">
          </div>

          <div class="face back">
            <img src="${file2}">
          </div>
        `;

        B.append(t);

        requestAnimationFrame(() => {
          t.classList.add("flipped");
        });

      });

    });


    setTimeout(() => {

      current = p;

      const turning = document.querySelector(".turning.prev");

      if(turning) turning.remove();

      update();

      busy = false;

    }, 820);

  }else{

    current--;

    update();

    setTimeout(() => {
      busy = false;
    }, 350);
  }
}


/* =====================================================
   CONTROLES
   ===================================================== */

N.onclick = next;
P.onclick = prev;


B.onclick = function(e){

  if(
    e.clientX -
    B.getBoundingClientRect().left >
    B.offsetWidth / 2
  ){

    next();

  }else{

    prev();
  }
};


/* =====================================================
   TECLADO
   ===================================================== */

document.onkeydown = function(e){

  if(e.key === "ArrowRight" || e.key === " "){

    e.preventDefault();

    next();
  }


  if(e.key === "ArrowLeft"){

    prev();
  }
};


onresize = update;

update();
