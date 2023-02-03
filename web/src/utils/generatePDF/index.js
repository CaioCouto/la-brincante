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
        margin: [0.3, 3],
        filename: 'LaBrincante_Horário.pdf',
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'cm', format: 'letter', orientation: 'portrait' }
    };
    return html2pdf().set(opt).from(element).save();
}