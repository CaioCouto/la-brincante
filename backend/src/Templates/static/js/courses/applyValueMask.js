export default function applyValueMask(value) {
    let amount = Number(value.replace(/\D/g, '')) ? Number(value.replace(/\D/g, '')) : 0;
    return (amount/100)
            .toFixed(2)
            .toLocaleString('pt-BR', { currency:'BRL', maximumFractionDigits: 2, useGrouping:true })
            .replace('.', ',');
}