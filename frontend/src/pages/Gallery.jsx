import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi'

import SmartImage from '../components/SmartImage'
import { GALLERY_IMAGES } from '../data/images'

const CATEGORIES = ['All', 'Weddings', 'Haldi-Mehendi', 'Sangeet', 'Corporate', 'Birthdays', 'Decor']

export default function Gallery() {
  const [active, setActive] = useState('All')
  const [index, setIndex] = useState(null)

  const images = useMemo(() => {
    if (active === 'All') return GALLERY_IMAGES
    return GALLERY_IMAGES.filter((img) => img.category === active)
  }, [active])

  const open = (i) => setIndex(i)
  const close = () => setIndex(null)
  const prev = () => setIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length))
  const next = () => setIndex((i) => (i === null ? null : (i + 1) % images.length))

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Gallery</p>
          <h1>Real Indian Events</h1>
          <p className="page-hero-lede">Explore our work across weddings, haldi-mehendi, sangeet, corporate, birthdays and decor.</p>
        </div>
      </section>

      <section className="section-sm">
        <div className="container">
          <div className="chips" role="group" aria-label="Filter gallery by category">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                className={`chip ${active === c ? 'chip-active' : ''}`}
                onClick={() => setActive(c)}
                aria-pressed={active === c}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="gallery-grid" style={{ marginTop: 'var(--sp-8)' }}>
            <AnimatePresence mode="popLayout">
              {images.map((img, i) => (
                <motion.button
                  key={img.src}
                  type="button"
                  className="gallery-thumb"
                  onClick={() => open(i)}
                  aria-label={`Open image: ${img.alt}`}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.25 }}
                  whileHover={{ y: -4 }}
                >
                  <SmartImage src={img.src} alt={img.alt} ratio="4 / 3" loading="lazy" />
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {index !== null && (
          <motion.div
            className="lightbox"
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            aria-modal="true"
            role="dialog"
          >
            <motion.div
              className="lightbox-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <button type="button" className="lightbox-close" onClick={close} aria-label="Close gallery">
              <FiX />
            </button>

            {images.length > 1 && (
              <>
                <button type="button" className="lightbox-nav lightbox-prev" onClick={(e) => { e.stopPropagation(); prev() }} aria-label="Previous image">
                  <FiChevronLeft />
                </button>
                <button type="button" className="lightbox-nav lightbox-next" onClick={(e) => { e.stopPropagation(); next() }} aria-label="Next image">
                  <FiChevronRight />
                </button>
              </>
            )}

            <motion.div
              className="lightbox-content"
              key={index}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.24 }}
              onClick={(e) => e.stopPropagation()}
            >
              <SmartImage src={images[index]?.src} alt={images[index]?.alt ?? ''} ratio="16 / 9" eager fit="contain" />
              {images[index]?.alt && <p className="lightbox-caption">{images[index].alt}</p>}
              {images.length > 1 && <p className="lightbox-counter">{index + 1} / {images.length}</p>}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
