import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  stages: [
    { duration: '30s', target: 5 },    // เริ่มที่ 5 คน
    { duration: '30s', target: 10 },   // เพิ่มเป็น 10 คน
    { duration: '30s', target: 20 },   // เพิ่มเป็น 20 คน
    { duration: '30s', target: 50 },   // เพิ่มเป็น 50 คน
    { duration: '30s', target: 100 },  // เพิ่มเป็น 100 คน
    { duration: '30s', target: 150 },  // เพิ่มเป็น 150 คน
    { duration: '30s', target: 200 },  // เพิ่มเป็น 200 คน
  ],
};

export default function () {
  http.get('https://your-website.com/'); // เปลี่ยน URL ตรงนี้เป็นเว็บของคุณ
  sleep(1);
}
