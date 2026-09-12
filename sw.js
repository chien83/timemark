const CACHE_NAME = 'timemark-v2';

// Danh sách các file cần lưu offline (Đường dẫn tương đối)
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './qrious.min.js' // <--- HÃY THÊM DÒNG NÀY VÀO DANH SÁCH
];

// Sự kiện Install: Lưu trữ file vào bộ nhớ Cache của điện thoại
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Đã lưu cache thành công');
        return cache.addAll(urlsToCache);
      })
  );
});

// Sự kiện Fetch: Khi không có mạng, lấy file từ Cache ra để dùng
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Nếu tìm thấy trong cache thì trả về, nếu không thì tải từ mạng
        return response || fetch(event.request);
      })
  );
});