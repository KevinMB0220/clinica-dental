import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const reviews = [
  {
    name: "Yuliana Esquivel",
    date: "Feb 2, 2021",
    text: "Excelente profesional y persona. Buscaba un lugar que me diera confianza y tranquilidad, lo encontré acá. 100% recomendadas.",
    rating: 5,
  },
  {
    name: "Brainer Guillen",
    date: "Jan 2, 2020",
    text: "Muy contento con el trato, 100 por ciento recomendado. 👍👌",
    rating: 5,
  },
  {
    name: "Sebastián Quiros",
    date: "Nov 30, 2019",
    text: "Excelente servicio y buena atención.",
    rating: 5,
  },
  {
    name: "Georgina Garcia",
    date: "Feb 6, 2018",
    text: "Excelente atención profesional y personal. Súper recomendada.",
    rating: 5,
  }
];

const FACEBOOK_ICON = (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="#1877F2">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

export default function Testimonials() {
  return (
    <section id="testimonios" style={{ padding: '6rem 0', background: 'var(--bg-page)', position: 'relative', overflow: 'hidden' }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-title" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 2.75rem)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.2 }}>
              Qué opinan <br />
              <span style={{ color: 'var(--primary)', fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 500 }}>nuestros pacientes.</span>
            </h2>
          </motion.div>
        </div>

        {/* Responsive Row: Flex wrap on desktop, Scrollable on mobile */}
        <div style={{ 
          display: 'flex', 
          gap: '1.25rem', 
          justifyContent: 'center',
          flexWrap: 'wrap',
          padding: '1rem 0'
        }}>
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              style={{ 
                width: '260px',
                height: '260px', /* Forced square/compact size */
                padding: '1.75rem', 
                background: 'rgba(255, 255, 255, 0.85)', 
                backdropFilter: 'blur(12px)', 
                border: '1px solid var(--border-light)',
                borderRadius: '24px',
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'center',
                boxShadow: 'var(--shadow-card)',
                position: 'relative'
              }}
            >
              {/* Facebook Icon at top right */}
              <div style={{ position: 'absolute', top: '1.25rem', right: '1.25rem' }}>
                {FACEBOOK_ICON}
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.15rem', marginBottom: '1.25rem' }}>
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={12} fill="var(--accent)" color="var(--accent)" />
                ))}
              </div>

              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p style={{ 
                  fontSize: '0.875rem', 
                  lineHeight: 1.5, 
                  color: 'var(--text-main)', 
                  fontWeight: 600,
                  display: '-webkit-box',
                  WebkitLineClamp: 5,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  "{review.text}"
                </p>
              </div>

              <div style={{ marginTop: '1.25rem' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 800, marginBottom: '0.1rem', color: 'var(--text-main)' }}>{review.name}</h4>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>{review.date}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
