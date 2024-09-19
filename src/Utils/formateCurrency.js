// utils/formatCurrency.js
export const formatCurrency = (amount) => {
    if (isNaN(amount) || amount == null) {
        return '₹0';
    }

    let [integer, fraction] = amount.toString().split('.');
    
    // Indian numbering system formatting
    let lastThree = integer.slice(-3);
    let otherNumbers = integer.slice(0, -3);
    if (otherNumbers !== '') {
        lastThree = ',' + lastThree;
    }
    integer = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;

    return fraction ? `₹${integer}.${fraction}` : `₹${integer}`;
};
