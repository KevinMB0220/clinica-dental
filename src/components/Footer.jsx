import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', backdropFilter: 'blur(10px)', color: 'white', padding: '4rem 0 2rem' }}>
      <div className="container">
        <div className="grid-3" style={{ marginBottom: '3rem' }}>
          <div>
            <h3 style={{ color: 'white', marginBottom: '1.5rem' }}>Turrialba Dental Care</h3>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '1.5rem' }}>
              Dra. Sharlene Torres Castillo - Dedicados a tu sonrisa con la mejor tecnología y cuidado profesional.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="#" style={{ color: 'white' }}><Facebook size={24} /></a>
              <a href="#" style={{ color: 'white' }}><Instagram size={24} /></a>
              <a href="#" style={{ color: 'white' }}><Twitter size={24} /></a>
            </div>
          </div>
          
          <div>
            <h3 style={{ color: 'white', marginBottom: '1.5rem' }}>Contacto</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', color: 'rgba(255,255,255,0.7)' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={18} /> 8928 1259 / 2556 2673
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={18} /> odontoshar22@hotmail.com
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={18} /> Turrialba Centro, frente a la clínica Arias&Soto
              </li>
            </ul>
          </div>
          
          <div>
            <h3 style={{ color: 'white', marginBottom: '1.5rem' }}>Horario</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', color: 'rgba(255,255,255,0.7)' }}>
              <li>Lunes - Viernes: 8:00 AM - 7:00 PM</li>
              <li>Sábados: 9:00 AM - 2:00 PM</li>
              <li>Domingos: Cerrado</li>
            </ul>
          </div>
        </div>
        
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', textAlign: 'center', color: 'rgba(255,255,255,0.5)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <p>&copy; {new Date().getFullYear()} Turrialba Dental Care. Todos los derechos reservados.</p>
          <a href="/login" style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.75rem', textDecoration: 'none' }}>Acceso Administrativo</a>
        </div>
      </div>
    </footer>
  );
}
