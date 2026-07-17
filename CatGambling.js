
const gatos = [
    
    { nombre: "GYM Cat :D", img: "img/gato1.jpg" },
    { nombre: "Looking Cat", img: "img/gato2.jpg" },


    { nombre: "Beluga", img: "img/gato3.jpg" },
    { nombre: "He is looking you", img: "img/gato4.jpg" },
    { nombre: "Want to play?", img: "img/gato5.jpg" },
    { nombre: "My cat(Bimbo)😽", img: "img/Bimbo.jpg" },
    { nombre: "My cat(Molly)😽", img: "img/Molly.jpg" },
    { nombre: "Alien?", img: "img/alien.jpg" },

    { nombre: "Happy Cat", img: "img/happy.jpg" },
    { nombre: "Dumb Cat", img: "img/ccat.jpg" },
    { nombre: "Cat Attack", img: "img/Catk.jpg" },
   
];

const cornerLeft = document.getElementById("corner-left");


const cornerRight = document.getElementById("corner-right");





cornerLeft.innerHTML = `<img src="img/space.png">`;
cornerRight.innerHTML = `<img src="img/Miaus OJOS.png">`;

const slots = [
    document.getElementById("slot1"),
    document.getElementById("slot2"),
    document.getElementById("slot3")
];

const resultado = document.getElementById("resultado");
const spinBtn = document.getElementById("spin");


function girarSlot(slot) {
    return new Promise(resolve => {
        let tiempo = 0;

        const intervalo = setInterval(() => {
            const gato = gatos[Math.floor(Math.random() * gatos.length)];
            slot.innerHTML = `<img src="${gato.img}" alt="${gato.nombre}">`;
            tiempo += 100;
            if (tiempo >= 1200) {
                clearInterval(intervalo);
                resolve();

            }
        }, 100);
    });
}

async function activarSlot() {


    spinBtn.classList.add("hidden");
    resultado.innerHTML = "";

    const r = Math.random();

    let g1, g2, g3;
    let tipoResultado = "";


    if (r < 0.30) {
        const base = gatos[Math.floor(Math.random() * gatos.length)];
        const otro = gatos[Math.floor(Math.random() * gatos.length)];
        g1 = base;

        g2 = base;
        g3 = otro;
        tipoResultado = "Almost";
    } else if (r < 0.65) {
        const copia = [...gatos];
        g1 = copia.splice(Math.floor(Math.random() * copia.length), 1)[0];
        g2 = copia.splice(Math.floor(Math.random() * copia.length), 1)[0];
        g3 = copia.splice(Math.floor(Math.random() * copia.length), 1)[0];
        tipoResultado = "Try to get other Cats :3";


    } else {
        const base = gatos[Math.floor(Math.random() * gatos.length)];
        g1 = g2 = g3 = base;
        tipoResultado = "WINNNN";
    }

    await girarSlot(slots[0]);


    slots[0].innerHTML = `<img src="${g1.img}" alt="${g1.nombre}">`;

    await girarSlot(slots[1]);
    slots[1].innerHTML = `<img src="${g2.img}" alt="${g2.nombre}">`;

    await girarSlot(slots[2]);
    slots[2].innerHTML = `<img src="${g3.img}" alt="${g3.nombre}">`;

    const tipos = [g1, g2, g3];
    const nombresUnicos = [...new Set(tipos.map(g => g.nombre))];

    resultado.innerHTML = `
        <h2>${tipoResultado}</h2>
        <h3>You got:</h3>
        <div id="resultado-gatos"></div>
    `;

    const contenedor = document.getElementById("resultado-gatos");

    nombresUnicos.forEach((nombre, index) => {
        const gato = gatos.find(g => g.nombre === nombre);

        contenedor.innerHTML += `
            <div class="resultado-item">
                <img src="${gato.img}" alt="${gato.nombre}">
                <h3>${gato.nombre}</h3>
            </div>
        `;

        if (index < nombresUnicos.length - 1) {
            contenedor.innerHTML += `<div class="separator"></div>`;
        }
    });

    spinBtn.classList.remove("pressed");
    spinBtn.classList.remove("hidden");
}

spinBtn.onclick = () => activarSlot();

document.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
        e.preventDefault();
        spinBtn.classList.add("pressed");
        activarSlot();
    }
});

document.addEventListener("keyup", (e) => {
    if (e.code === "Space") {
        spinBtn.classList.remove("pressed");
    }
});
