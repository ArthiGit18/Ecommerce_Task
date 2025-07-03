import './globals.css';
import Navbar from '../components/Navbar';
import { Suspense } from 'react';

export const metadata = {
  title: 'My Shop',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
