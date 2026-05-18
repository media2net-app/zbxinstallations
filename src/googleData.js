import photo01 from './assets/gallery/google/photo-01.jpg'
import photo02 from './assets/gallery/google/photo-02.jpg'
import photo03 from './assets/gallery/google/photo-03.jpg'
import photo04 from './assets/gallery/google/photo-04.jpg'
import photo05 from './assets/gallery/google/photo-05.jpg'
import photo06 from './assets/gallery/google/photo-06.jpg'

const mapsPhotos = [photo01, photo02, photo03, photo04, photo05, photo06]

export const googleBusiness = {
  name: 'ZBX INSTALLATIONS',
  category: 'Instalator / Loodgieter',
  mapsUrl:
    'https://www.google.com/maps/place/ZBX+INSTALLATIONS/@44.7218538,25.322368,17z/data=!3m1!4b1!4m6!3m5!1s0x40b289bd41fb2e1b:0x3353ceaa4f5994b7!8m2!3d44.7218538!4d25.322368!16s%2Fg%2F11z736whnp',
  rating: 5,
  reviewCount: 9,
  reviews: [],
}

export const siteImages = {
  hero: photo04,
  serviceCards: [photo01, photo02, photo03, photo05],
  trust: photo06,
  news: [photo02, photo03, photo04],
  gallery: mapsPhotos,
}
