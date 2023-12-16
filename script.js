const addBtn = document.querySelector('#add');
const tableBody = document.querySelector('#car-table tbody');
const clearBtn = document.querySelector('#clear');
const findElement =  document.querySelector('#find');
const btype = document.querySelector('#btype');
const findDataList = document.querySelector(`#findDataList`);
const form = document.forms.creationForm;
const date = form.elements.date;
const brand = form.elements.brand;
const model = form.elements.model;
const color = form.elements.color;
const findTableList = [];

findElement.addEventListener("input", findUpadate);

class Car {
    static initial = 1;
    constructor(brand, model, color,date,bodyType) {
        this.brand = brand;
        this.model = model;
        this.color = color;
        this.date = new Date(date);
        this.bodyType = bodyType;
        this.id = Car.initial++;
    }

    getHtml()
    {
        return `<tr>
        <td>${this.id}</td>
        <td>${this.date.getFullYear()}</td>
        <td>${this.brand}</td>
        <td>${this.model}</td>
        <td>${this.color}</td>
        <td>${this.bodyType}</td>
    </tr>`;
    }
}

const cars = [new Car("Audi", "A8","Black","2008-12-1","Sedan"),
              new Car("Mercedes-Benz", "E-Class","Red", "2007-1-1","Hatchback"),
              new Car("Volkswagen", "Passat","Black","2016-3-4","Coupe"),
              new Car("BMW", "X5","Red","2023-5-5","Crossover")];

updateTable(cars);

function updateTable(array)
{
    tableBody.innerHTML = '';
    array.forEach(item=>{
        tableBody.innerHTML +=item.getHtml();
    })
}

function findUpadate() {
    if(cars.length === 0) return;
    if(!findElement.value)
    {
        updateTable(cars);
        findDataList.innerHTML = "";
        return;
    }

    findTableList.splice(0);
    cars.forEach(item => {
        if(item.model.toLowerCase()
                     .indexOf(findElement.value.toLowerCase()) !== -1)
            findTableList.push(item);
    });
   
    if(findTableList.length > 0)
    {
        findDataList.innerHTML = "";
        updateTable(findTableList);
        if(findElement.value.length >= 2)
        {
            findTableList.forEach(item=>{
                findDataList.innerHTML += `<option value="${item.model}"></option>` 
            });
        }
    }
    else tableBody.innerHTML = '';
}

addBtn.onclick = (event) => {
    
    event.preventDefault();
    if(!brand.value ||!model.value || !color.value || !date.value || date.value < 0)
    {
        alert("Fill in all fields");
        return;
    }
    const car = new Car(brand.value, model.value, color.value,date.value,btype.value);
    cars.push(car);
    tableBody.innerHTML += car.getHtml();
    brand.value = '';
    model.value = '';
    color.value = '';
    date.value = '';
}

clearBtn.onclick = () => {
    tableBody.innerHTML = '';
    findDataList.innerHTML = '';
    findElement.value = '';
    cars.splice(0);
    findTableList.splice(0);
}

