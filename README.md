# CRUD application
The Repository contains a CRUD application

📁 Folder Structure:

CRUD/   # CRUD is the main application folder

1. models/
		Product.js: Product model for the database.
		Database Used: MongoDB.

2. public/ (Frontend assets and resources):
		detail.html: Detailed page for an individual product.
	  index.html: Main HTML file (only accessible to admin with fixed credentials).
	  script.js: JavaScript file for index.html.
	  script2.js: Additional JavaScript for detail.html.
	  style.css: Stylesheet for index.html.
	  style1.css: Stylesheet for detail.html.

3. uploads/
  Folder where uploaded images are stored.

  Functionality:
    When the user clicks 'Add Product', the product details and image files are saved.
    Images are not stored directly in MongoDB; instead, only their URLs pointing to this folder are stored.
    package.json

4. Project metadata, dependencies, and npm scripts.
    package-lock.json

5. Lock file to ensure consistent package installation.
    server.js

6. Main backend server file that handles logic and routes.
    node_modules/

7. Folder containing all installed npm packages.
    Ignored in .gitignore.

🚀 Features:

1. CRUD Operations: Here, perform **C**reate, **R**ead, **U**pdate, and **D**elete actions on products detail.
2. File Upload Support: Images are uploaded and stored in the uploads/ directory.
3. Frontend: Interactive HTML, CSS, and JavaScript pages for managing product details.
4. Backend: server.js handle requests, perform database operations.
5. Modular Structure: Separation of concerns with models for database structure and public for static files. 

**Note**: The provided code can be used as a basic framework to create a E-commerce website.
