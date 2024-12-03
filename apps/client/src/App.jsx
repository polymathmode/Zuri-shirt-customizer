

import TshirtCustomizer from './components/TshirtCustomizer';
import { ThemeProvider } from './context/context';
import './styles/globals.css';

const App = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background font-sans antialiased">
        <header className="border-b">
          <div className="container mx-auto px-4 py-4">
            <h1 className="text-2xl font-bold text-foreground">T-Shirt Customizer</h1>
          </div>
        </header>
        
        <main className="container mx-auto px-4 py-8">
          <TshirtCustomizer />
        </main>

        <footer className="border-t mt-auto">
          <div className="container mx-auto px-4 py-4 text-center text-sm text-muted-foreground">
            © 2024 T-Shirt Customizer. All rights reserved.
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
};

export default App;