import './App.css';
import AppRouter from './router/AppRouter';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

function App() {
  return (
    <WishlistProvider>
      <CartProvider>
        <AppRouter />
      </CartProvider>
    </WishlistProvider>
  );
}

export default App;