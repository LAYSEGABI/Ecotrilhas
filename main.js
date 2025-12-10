function abrirModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add("ativo");
    // Opcional: Travar o scroll do corpo da página
    document.body.style.overflow = "hidden";
  }
}

function fecharModal(event, modalId) {
  // Verifica se clicou no botão fechar, no overlay (fundo) ou é uma chamada direta
  if (
    event.target.id === modalId ||
    event.target.className === "fechar-btn" ||
    event.target.closest(".fechar-btn")
  ) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove("ativo");
      // Reativar scroll da página
      document.body.style.overflow = "auto";
    }
  }
}

// Fechar com a tecla ESC
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    const modaisAtivos = document.querySelectorAll(".modal-container.ativo");
    modaisAtivos.forEach((modal) => {
      modal.classList.remove("ativo");
      document.body.style.overflow = "auto";
    });
  }
});

// 1. Inicializa o mapa focado em Florianópolis
// Coordenadas do centro de Floripa e Zoom inicial (10 ou 11 fica bom para ver a ilha toda)
var map = L.map("mapa-ecotrilhas").setView([-27.5969, -48.5495], 10);

// 2. Adiciona a camada de visual ("tiles") do OpenStreetMap
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap",
}).addTo(map);

// 3. Define um ícone personalizado (opcional, mas fica mais bonito e parecido com o seu design verde)
// Se não quiser usar imagem personalizada, pode pular essa parte e tirar a opção "icon: greenIcon" abaixo.
var greenIcon = L.icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// 4. Lista dos Locais (Trilhas)
const locais = [
  {
    nome: "Revolução dos Baldinhos",
    coords: [-27.59045978930941, -48.60420115118856], // Monte Cristo
    desc: "Compostagem comunitária",
  },
  {
    nome: "Trilha do Moçambique",
    coords: [-27.491979023911316, -48.39470470822927], // Parque Rio Vermelho
    desc: "Parque Estadual do Rio Vermelho",
  },
  {
    nome: "Lagoa do Peri",
    coords: [-27.732916990977746, -48.5164633067727], // Sul da Ilha
    desc: "Reserva de água potável e Mata Atlântica",
  },
  {
    nome: "Trilha do Poção",
    coords: [-27.6053, -48.5085], // Córrego Grande
    desc: "Refúgio urbano na UFSC",
  },
  {
    nome: "Matadeiro e Armação",
    coords: [-27.7538, -48.5033], // Extremo Sul
    desc: "História e observação de baleias",
  },
];

// 5. Adiciona os pinos no mapa automaticamente
locais.forEach((local) => {
  L.marker(local.coords, { icon: greenIcon })
    .addTo(map)
    .bindPopup(`<b>${local.nome}</b><br>${local.desc}`);
});
