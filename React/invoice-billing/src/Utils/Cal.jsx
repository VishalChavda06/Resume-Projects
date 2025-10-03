export const calculateItemTotal = (qty , price ,discount)=>{
    const total = qty * price;
    const discountAmount = (total * discount) / 100;
    return total - discountAmount;
}

export const calculateSummary=(items)=>{
    let subtotal = 0;
    items.forEach((items)=>{
        subtotal += calculateItemTotal(items.qty, items.price, items.discount);
    })
    const tax = subtotal * 0.18; // 18% tax
    const total = subtotal + tax;
    return { subtotal, tax, total };
}
