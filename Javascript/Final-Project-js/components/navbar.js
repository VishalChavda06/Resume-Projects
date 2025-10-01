const navbar = () => {
    return `<header class="bg-light shadow-sm">
        <nav class="navbar navbar-expand-lg navbar-light container">
            <a class="navbar-brand fw-bold" href="./Index.html">Opulenza</a>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarContent">
                <!-- Left Nav -->
                <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-3 d-flex align-items-center justify-content-center">
                    <li class="nav-item">
                        <a class="nav-link active d-flex flex-column  align-items-center" href="./Index.html"><i class="bi bi-house-door"></i>Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active d-flex flex-column  align-items-center" href="./Pages/ProductsPage.html"><i class="bi bi-shop"></i> Shop</a>
                    </li>
                    <li class="nav-item ">
                        <a class="nav-link active d-flex flex-column  align-items-center" href="./Pages/ProductsPage.html"><i class="bi bi-bag"></i>Categories</a>
                    </li>
                </ul>

                <!-- Search Bar -->
                <form class="d-flex me-3" role="search">
                    <input class="form-control me-2" type="search" placeholder="Search products..." aria-label="Search">
                    <button class="btn btn-outline-primary" type="submit">Search</button>
                    
                </form>

                <!-- Icons -->
                <div class="d-flex">
                    <a href="./Pages/CartPage.html" class="text-dark me-3 position-relative">
                        <i class="bi bi-cart" style="font-size: 1.4rem;"></i>
                        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            3
                        </span>
                    </a>
                    <a href="./Pages/SignUp.html" class="text-dark">
                        <i class="bi bi-person" style="font-size: 1.4rem;"></i>
                    </a>
                </div>
            </div>
        </nav>
        
    </header>`
}

export default navbar;