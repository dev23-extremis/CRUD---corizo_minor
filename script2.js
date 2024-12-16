let products = [];
let currentProductId = null;

function renderProductList() {
    const productTable = document.getElementById('productTable');
    productTable.innerHTML = '';

    products.forEach((product, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${product._id || product.id}</td>
            <td>${product.name}</td>
            <td>${product.description}</td>
            <td><img src="${product.image}" alt="Product Image" width="50" height="50"></td>
            <td>₹ ${product.price}</td>
            <td>${product.status}</td>
            <td>
                <div class="icon-group">
                    <span class="icon edit-icon" data-index="${index}" title="Edit">✎</span>
                    <span class="icon view-icon" data-index="${index}" title="View">👁</span>
                    <span class="icon delete-icon" data-index="${index}" title="Delete">🗑</span>
                </div>
            </td>
        `;
        productTable.appendChild(row);
    });
}

document.addEventListener("click", (event) => {
    const index = event.target.getAttribute("data-index");

    if (event.target.classList.contains("edit-icon")) {
        editProduct(index);
    } else if (event.target.classList.contains("view-icon")) {
        viewProduct(index);
    } else if (event.target.classList.contains("delete-icon")) {
        deleteProduct(index);
    }
});

async function fetchProducts() {
    try {
        const response = await fetch('http://localhost:5000/products');
        products = await response.json();
        renderProductList();
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

document.getElementById('addProductForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const productName = document.getElementById('productName').value;
    const productDescription = document.getElementById('productDescription').value;
    const productPrice = document.getElementById('productPrice').value;
    const productImage = document.getElementById('productImage').files[0];

    if (!productImage) {
        alert("Please upload an image.");
        return;
    }

    const formData = new FormData();
    formData.append('name', productName);
    formData.append('description', productDescription);
    formData.append('price', productPrice);
    formData.append('image', productImage);
    formData.append('status', 'Available');

    try {
        const response = await fetch('http://localhost:5000/products', {
            method: 'POST',
            body: formData,
        });

        const savedProduct = await response.json();
        products.push(savedProduct);
        renderProductList();
        document.getElementById('addProductForm').reset();
        document.getElementById('submitButton').style.display = 'inline-block';
        document.getElementById('updateButton').style.display = 'none';
    } catch (error) {
        console.error("Error adding product:", error);
    }
});

function editProduct(index) {
    const product = products[index];
    currentProductId = product._id;

    document.getElementById('productName').value = product.name;
    document.getElementById('productDescription').value = product.description;
    document.getElementById('productPrice').value = product.price;

    document.getElementById('formTitle').textContent = 'Edit Product';
    document.getElementById('submitButton').style.display = 'none';
    document.getElementById('updateButton').style.display = 'inline-block';
}

async function updateProduct() {
    const productName = document.getElementById('productName').value;
    const productDescription = document.getElementById('productDescription').value;
    const productPrice = document.getElementById('productPrice').value;
    const productImage = document.getElementById('productImage').files[0];

    const formData = new FormData();
    formData.append('name', productName);
    formData.append('description', productDescription);
    formData.append('price', productPrice);

    if (productImage) {
        formData.append('image', productImage);
    }

    try {
        const response = await fetch(`http://localhost:5000/products/${currentProductId}`, {
            method: 'PUT',
            body: formData,
        });

        const updatedProduct = await response.json();
        if (response.ok) {
            const productIndex = products.findIndex(product => product._id === currentProductId);
            products[productIndex] = updatedProduct;
            renderProductList();
            document.getElementById('addProductForm').reset();
            document.getElementById('submitButton').style.display = 'inline-block';
            document.getElementById('updateButton').style.display = 'none';
            document.getElementById('formTitle').textContent = 'Add New Product';
            currentProductId = null;
        } else {
            alert("Error updating product.");
        }
    } catch (error) {
        console.error("Error updating product:", error);
    }
}

async function deleteProduct(index) {
    const productId = products[index]._id;

    if (confirm('Are you sure you want to delete this product?')) {
        try {
            await fetch(`http://localhost:5000/products/${productId}`, { method: 'DELETE' });
            products.splice(index, 1);
            renderProductList();
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    }
}

function viewProduct(index) {
    const product = products[index];

    document.getElementById('modalProductName').textContent = product.name;
    document.getElementById('modalProductImage').src = product.image;
    document.getElementById('modalProductImage').alt = product.name;
    document.getElementById('modalProductDescription').textContent = product.description;
    document.getElementById('modalProductPrice').textContent = product.price;
    document.getElementById('modalProductStatus').textContent = product.status;

    const modal = document.getElementById('viewProductModal');
    modal.style.display = 'block';

    document.getElementById('closeModal').onclick = () => {
        modal.style.display = 'none';
    };

    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
}

fetchProducts();
