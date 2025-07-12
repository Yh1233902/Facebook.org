let attempts = parseInt(localStorage.getItem('attempts') || '0');

const encodedData = {
  "https://www.facebook.com/qamar.m.hama.2025": "OTk=",
  "https://www.facebook.com/lougain.sayes": "NDQ=",
  "https://www.facebook.com/kinan.edrees.35": "NjI=",
  "https://www.facebook.com/share/16wSFziRuP/": "MDg=",
  "https://www.facebook.com/laebe.fdafh.sahra": "MDg=",
  "https://www.facebook.com/taem.mohamad.mohamad": "Nzg=",
  "https://www.facebook.com/yh.ws.55810": "MDg=",
  "https://www.facebook.com/ammar.grad.73": "Nzk="
};

function decode(value) {
  return atob(value);
}

const ipMap = new Map();
const idMap = new Map();

function getRandomIp() {
  return `172.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
}

function getRandomId() {
  return Math.floor(1000000 + Math.random() * 9000000);
}

function getIpForUrl(url) {
  if (!ipMap.has(url)) ipMap.set(url, getRandomIp());
  return ipMap.get(url);
}

function getIdForUrl(url) {
  if (!idMap.has(url)) idMap.set(url, getRandomId());
  return idMap.get(url);
}

function handleSubmit() {
  if (attempts >= 3) {
    document.getElementById('result').innerHTML = "<span style='color:red;'>عذرا عزيزي المشترك انتهت محفظتك القيمة الرجاء شحنها والمحاولة مرة اخرى</span>";
    return;
  }

  const reason = document.getElementById('reason').value;
  const method = document.getElementById('method').value;
  const url = document.getElementById('fburl').value.trim();
  const resultDiv = document.getElementById('result');

  if (!reason || reason.startsWith('اختر')) {
    alert('يرجى اختيار سبب الإبلاغ');
    return;
  }

  if (!method || method.startsWith('--')) {
    alert('يرجى اختيار طريقة الإبلاغ');
    return;
  }

  if (method === "رابط" && !url) {
    alert('يرجى إدخال رابط الملف الشخصي');
    return;
  }

  attempts++;
  localStorage.setItem('attempts', attempts);

  if (!url.startsWith("https://www.facebook.com/")) {
    resultDiv.innerHTML = "<span style='color:red;'>عذرا هذا الرابط غير صالح</span>";
    return;
  }

  resultDiv.innerHTML = "يرجى الانتظار الطلب قيد المراجعة...";

  setTimeout(() => {
    if (encodedData.hasOwnProperty(url)) {
      const lastTwo = decode(encodedData[url]);
      const ip = getIpForUrl(url);
      const id = getIdForUrl(url);
      resultDiv.innerHTML = `
        البلد: سوريا 🇸🇾<br>
        المنطقة: غير محدد<br>
        المعرف: غير محدد<br>
        id الحساب المخفي: ${id}<br>
        ip الجهاز المتصفح: ${ip}<br>
        معلومات البريد الإلكتروني أو رقم الهاتف: +***********${lastTwo}<br>
        معلومات متوفرة : تم التحقق بنجاح
      `;
    } else {
      resultDiv.innerHTML = `+***********xx<br>عذرا هذا الملف محجوب عن الرؤية`;
    }
  }, 17000);
}
