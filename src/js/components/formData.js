let newObj = { sellCount: 0 };

export function setFormObj(obj) {
    newObj = obj;
}

export function getFormObj() {
    return newObj;
}

export function resetFormObj() {
    newObj = { sellCount: 0 };
}

document.getValue = function getValue(e) {
    let { name, value, type } = e.target;

    if (type === "number") value = Number(value);
    if (name === "language") {
        value = value.trim() ? value.split(" ") : [];
    }

    newObj = { ...newObj, [name]: value };

    if (name === "price") {
        newObj.sale = value - value * 0.2;
    }
};