export default function generatePDF(element) {
    /**
     * @param HTMLElement: element
     * @returns Promise.
     * 
     * Gera um arquivo PDF utilizando o 
     * parâmetro element como template.
     * Ao finalizado, automaticamete será
     * iniciado o download do arquivo.
     */
    var opt = {
        margin: [0, 15],
        filename: 'LaBrincante_Horário.pdf',
        html2canvas: { scale: 2, letterRendering: true },
        jsPDF: { unit: 'pt', format: 'letter', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };
    return html2pdf().set(opt).from(element).save();
}