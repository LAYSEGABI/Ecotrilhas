function abrirModal(modalId) {
    const modal = document.getElementById(modalId);
    if(modal) {
        modal.classList.add('ativo');
        // Opcional: Travar o scroll do corpo da página
        document.body.style.overflow = 'hidden'; 
    }
}

function fecharModal(event, modalId) {
    // Verifica se clicou no botão fechar, no overlay (fundo) ou é uma chamada direta
    if (event.target.id === modalId || event.target.className === 'fechar-btn' || event.target.closest('.fechar-btn')) {
        const modal = document.getElementById(modalId);
        if(modal) {
            modal.classList.remove('ativo');
            // Reativar scroll da página
            document.body.style.overflow = 'auto';
        }
    }
}

// Fechar com a tecla ESC
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        const modaisAtivos = document.querySelectorAll('.modal-container.ativo');
        modaisAtivos.forEach(modal => {
            modal.classList.remove('ativo');
            document.body.style.overflow = 'auto';
        });
    }
});