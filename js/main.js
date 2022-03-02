var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDesc = document.getElementById("productDesc");
var mainbtn = document.getElementById('add').innerHTML;
var gindex;
var errors = '';

if (localStorage.getItem("product") == null)
    var productContainer = [];
else {
    productContainer = JSON.parse(localStorage.getItem("product"));
    display();
}

function addProduct() {
    if (validate()) {
        document.getElementById('alert').style.display = "none";
        if (document.getElementById('add').innerHTML == "add Product") {
            var product = {
                name: productName.value,
                price: productPrice.value,
                category: productCategory.value,
                desc: productDesc.value
            }
            productContainer.push(product);
        } else {
            productContainer[gindex].name = productName.value;
            productContainer[gindex].price = productPrice.value;
            productContainer[gindex].category = productCategory.value;
            productContainer[gindex].desc = productDesc.value;
            document.getElementById('add').innerHTML = "add Product"
        }
        localStorage.setItem("product", JSON.stringify(productContainer));
        display();
        emptyFeilds();
    } else {
        document.getElementById('alert').style.display = "block";
        document.getElementById('alert').innerHTML = errors;
        errors = '';
    }
}

function display() {

    var cartoona = ``;
    for (var i = 0; i < productContainer.length; i++) {
        cartoona += `<tr>
        <td>${i+1}</td>
        <td>${productContainer[i].name}</td>
        <td>${productContainer[i].price}</td>
        <td>${productContainer[i].category}</td>
        <td>${productContainer[i].desc}</td>
        <td><button class="btn btn-outline-warning" onclick="updateData(${i});" >update</button></td>
        <td><button class="btn btn-outline-danger" onclick="deleteData(${i});" >delete</button></td>
        </tr>`;
    }
    document.getElementById("table").innerHTML = cartoona;
}

function updateData(index) {
    gindex = index;
    document.getElementById('add').innerHTML = "update";
    productName.value = productContainer[index].name;
    productPrice.value = productContainer[index].price;
    productCategory.value = productContainer[index].category;
    productDesc.value = productContainer[index].desc;
}

function search(searchTerm) {
    var cartoona = '';
    for (var i = 0; i < productContainer.length; i++) {
        if (productContainer[i].name.toLowerCase().includes(searchTerm.toLowerCase()) == true) {
            cartoona += `<tr>
            <td>${i+1}</td>
            <td>${productContainer[i].name}</td>
            <td>${productContainer[i].price}</td>
            <td>${productContainer[i].category}</td>
            <td>${productContainer[i].desc}</td>
            <td><button class="btn btn-outline-warning" onclick="updateData();" >update</button></td>
            <td><button class="btn btn-outline-danger" onclick="deleteData(${i});" >delete</button></td>
            </tr> `;
        }
        document.getElementById("table").innerHTML = cartoona;
    }
}

function deleteData(index) {
    productContainer.splice(index, 1);
    localStorage.setItem("product", JSON.stringify(productContainer));
    display();
}

function checkInputs(params) {
    if (productName.value != "" && productPrice.value != "" && productCategory.value != "" && productDesc.value != "")
        return true;
    else
        return false;
}

function emptyFeilds() {
    productName.value = "";
    productPrice.value = "";
    productCategory.value = "";
    productDesc.value = "";
}

function validate() {
    var regexName = /^[A-Z][a-z]{3,8}$/;
    var regexPrice = /[0-9]{1,5}/;
    var regexCat = /^[A-Z][a-z]{3,8}$/;
    var regexDesc = /^[ a-z]{10,300}$/;

    if (regexName.test(productName.value) && regexCat.test(productCategory.value) && regexPrice.test(productPrice.value) && regexDesc.test(productDesc.value)) {
        return true;
    }
    if (!regexName.test(productName.value)) {
        errors += "product name in-valid<br>";
    }
    if (!regexPrice.test(productPrice.value)) {
        errors += "product Price in-valid<br>";
    }
    if (!regexCat.test(productCategory.value)) {
        errors += "product Category in-valid<br>";
    }
    if (!regexDesc.test(productDesc.value)) {
        errors += "product Desc in-valid<br>";
    }
    return false;
}