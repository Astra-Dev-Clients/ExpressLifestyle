// Admin panel JavaScript
let token = localStorage.getItem('adminToken');

// Check if user is logged in
if (!token) {
    window.location.href = 'admin-login.html';
}

$(document).ready(function() {
    // Load products when page loads
    loadProducts();

    // Handle add product form submission
    $('#addProductForm').on('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('name', $('#productName').val());
        formData.append('category', $('#productCategory').val());
        formData.append('price', $('#productPrice').val());
        formData.append('description', $('#productDescription').val());
        formData.append('image', $('#productImage')[0].files[0]);

        // Make API call to add product
        fetch('http://localhost:3000/api/products', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            alert('Product added successfully!');
            this.reset();
            loadProducts();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error adding product');
        });
    });

    // Function to load products
    function loadProducts() {
        fetch('http://localhost:3000/api/products')
            .then(response => response.json())
            .then(products => displayProducts(products))
            .catch(error => {
                console.error('Error:', error);
                alert('Error loading products');
            });
    }

    // Function to display products
    function displayProducts(products) {
        const productsList = $('#productsList');
        productsList.empty();

        products.forEach(product => {
            const productCard = `
                <div class="product-card">
                    <div class="row">
                        <div class="col-md-3">
                            <img src="${product.image}" alt="${product.name}" class="product-image">
                        </div>
                        <div class="col-md-6">
                            <h5>${product.name}</h5>
                            <p><strong>Category:</strong> ${product.category}</p>
                            <p><strong>Price:</strong> $${product.price.toFixed(2)}</p>
                            <p><strong>Description:</strong> ${product.description}</p>
                        </div>
                        <div class="col-md-3">
                            <div class="action-buttons">
                                <button class="btn btn-warning btn-sm edit-product" data-id="${product._id}">
                                    <i class="fas fa-edit"></i> Edit
                                </button>
                                <button class="btn btn-danger btn-sm delete-product" data-id="${product._id}">
                                    <i class="fas fa-trash"></i> Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            productsList.append(productCard);
        });

        // Add delete product event handlers
        $('.delete-product').on('click', function() {
            const productId = $(this).data('id');
            
            if (confirm('Are you sure you want to delete this product?')) {
                fetch(`http://localhost:3000/api/products/${productId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then(response => response.json())
                .then(data => {
                    alert('Product deleted successfully!');
                    loadProducts();
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Error deleting product');
                });
            }
        });

        // Add edit product event handlers
        $('.edit-product').on('click', function() {
            const productId = $(this).data('id');
            
            // Load product details
            fetch(`http://localhost:3000/api/products/${productId}`)
                .then(response => response.json())
                .then(product => {
                    // Show edit form
                    const editModal = `
                        <div class="modal fade" id="editProductModal" tabindex="-1">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title">Edit Product</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                                    </div>
                                    <div class="modal-body">
                                        <form id="editProductForm">
                                            <div class="mb-3">
                                                <label class="form-label">Product Name</label>
                                                <input type="text" class="form-control" id="editProductName" value="${product.name}" required>
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label">Category</label>
                                                <select class="form-select" id="editProductCategory" required>
                                                    <option value="electronics" ${product.category === 'electronics' ? 'selected' : ''}>Electronics</option>
                                                    <option value="beauty" ${product.category === 'beauty' ? 'selected' : ''}>Beauty</option>
                                                    <option value="clothing" ${product.category === 'clothing' ? 'selected' : ''}>Clothing</option>
                                                    <option value="home" ${product.category === 'home' ? 'selected' : ''}>Home</option>
                                                </select>
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label">Price</label>
                                                <input type="number" class="form-control" id="editProductPrice" value="${product.price}" step="0.01" required>
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label">Description</label>
                                                <textarea class="form-control" id="editProductDescription" rows="3" required>${product.description}</textarea>
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label">Image</label>
                                                <input type="file" class="form-control" id="editProductImage" accept="image/*">
                                            </div>
                                            <button type="submit" class="btn btn-warning">Save Changes</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                    
                    $('body').append(editModal);
                    
                    // Handle form submission
                    $('#editProductForm').on('submit', function(e) {
                        e.preventDefault();
                        
                        const formData = new FormData();
                        formData.append('name', $('#editProductName').val());
                        formData.append('category', $('#editProductCategory').val());
                        formData.append('price', $('#editProductPrice').val());
                        formData.append('description', $('#editProductDescription').val());
                        
                        const newImage = $('#editProductImage')[0].files[0];
                        if (newImage) {
                            formData.append('image', newImage);
                        }

                        fetch(`http://localhost:3000/api/products/${productId}`, {
                            method: 'PUT',
                            headers: {
                                'Authorization': `Bearer ${token}`
                            },
                            body: formData
                        })
                        .then(response => response.json())
                        .then(data => {
                            $('#editProductModal').modal('hide');
                            alert('Product updated successfully!');
                            loadProducts();
                        })
                        .catch(error => {
                            console.error('Error:', error);
                            alert('Error updating product');
                        });
                    });
                    
                    $('#editProductModal').modal('show');
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Error loading product details');
                });
        });
    }
});
