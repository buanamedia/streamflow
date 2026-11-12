document.addEventListener("DOMContentLoaded", function () {
    // ==========================================
    // KONFIGURASI (Sesuaikan data di bawah ini)
    // ==========================================
    const config = {
        nomorWA: "6281414159500", // Ganti dengan nomor WhatsApp Anda (format 62...)
        teksTombol: "Pendaftaran Akun",
        judulPopup: "Halo yang disana!",
        subjudulPopup: "Silahkan klik dibawah ini untuk pendaftaran akun Streamflow dan tersambung ke WhatsApp :)",
        labelAdmin: "CS ADMIN",
        namaAdmin: "Admin Streamflow",
        pesanOtomatis: "Halo Admin, saya ingin melakukan pendaftaran akun Streamflow."
    };

    // ==========================================
    // 1. INJECT CSS STYLING (Tema Streamflow Portal)
    // ==========================================
    const style = document.createElement("style");
    style.textContent = `
        #sf-wa-widget * {
            box-sizing: border-box;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }

        /* Tombol Floating Pill di Kiri Bawah */
        #sf-wa-btn {
            position: fixed;
            bottom: 24px;
            left: 24px;
            height: 52px;
            padding: 0 20px 0 8px;
            background: linear-gradient(135deg, #1d263b 0%, #131929 100%);
            border: 1px solid rgba(56, 152, 236, 0.45);
            border-radius: 50px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45), 0 0 15px rgba(40, 148, 244, 0.15);
            display: flex;
            align-items: center;
            gap: 11px;
            cursor: pointer;
            z-index: 99999;
            transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
            user-select: none;
        }

        #sf-wa-btn:hover {
            transform: translateY(-2px);
            border-color: #3898ec;
            box-shadow: 0 10px 28px rgba(0, 0, 0, 0.55), 0 0 20px rgba(40, 148, 244, 0.35);
        }

        .sf-wa-icon-circle {
            width: 38px;
            height: 38px;
            border-radius: 50%;
            background: linear-gradient(135deg, #38a1f3 0%, #1c75e8 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            box-shadow: 0 2px 8px rgba(28, 117, 232, 0.4);
        }

        .sf-wa-icon-circle svg {
            width: 21px;
            height: 21px;
            fill: #ffffff;
        }

        .sf-wa-btn-text {
            color: #f1f5f9;
            font-size: 14px;
            font-weight: 600;
            letter-spacing: 0.2px;
            white-space: nowrap;
        }

        /* Kotak Pop-up (Muncul di atas tombol kiri) */
        #sf-wa-popup {
            position: fixed;
            bottom: 90px;
            left: 24px;
            width: 340px;
            max-width: calc(100vw - 48px);
            background-color: #161d2f;
            border: 1px solid rgba(56, 152, 236, 0.25);
            border-radius: 14px;
            box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6);
            overflow: hidden;
            z-index: 99999;
            opacity: 0;
            visibility: hidden;
            transform: translateY(15px) scale(0.96);
            transform-origin: bottom left;
            transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        #sf-wa-popup.sf-show {
            opacity: 1;
            visibility: visible;
            transform: translateY(0) scale(1);
        }

        /* Bagian Header Biru Gradasi Streamflow */
        .sf-wa-header {
            background: linear-gradient(135deg, #2d9bf0 0%, #1967d2 100%);
            color: #ffffff;
            padding: 20px 22px;
            position: relative;
        }

        .sf-wa-header h4 {
            margin: 0 24px 6px 0;
            font-size: 18.5px;
            font-weight: 700;
            line-height: 1.25;
            color: #ffffff;
        }

        .sf-wa-header p {
            margin: 0;
            font-size: 13.5px;
            line-height: 1.45;
            color: rgba(255, 255, 255, 0.92);
        }

        .sf-wa-close {
            position: absolute;
            top: 15px;
            right: 15px;
            background: rgba(0, 0, 0, 0.15);
            border: none;
            border-radius: 50%;
            width: 28px;
            height: 28px;
            color: #ffffff;
            font-size: 18px;
            line-height: 1;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.2s;
        }

        .sf-wa-close:hover {
            background: rgba(0, 0, 0, 0.3);
        }

        /* Bagian Body Kartu CS Admin (Dark Card seperti Server Card) */
        .sf-wa-body {
            padding: 18px;
            background-color: #161d2f;
        }

        .sf-wa-card {
            display: flex;
            align-items: center;
            gap: 14px;
            padding: 14px 16px;
            background-color: #1e273d;
            border: 1px solid rgba(56, 152, 236, 0.25);
            border-radius: 10px;
            text-decoration: none;
            transition: all 0.2s ease;
        }

        .sf-wa-card:hover {
            background-color: #24304a;
            border-color: #3898ec;
            transform: translateY(-1px);
            box-shadow: 0 4px 15px rgba(40, 148, 244, 0.15);
        }

        .sf-wa-avatar {
            width: 46px;
            height: 46px;
            border-radius: 50%;
            background-color: rgba(45, 155, 240, 0.15);
            border: 1.5px solid rgba(56, 152, 236, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }

        .sf-wa-avatar svg {
            width: 23px;
            height: 23px;
            stroke: #38a1f3;
            fill: none;
            stroke-width: 2;
        }

        .sf-wa-info {
            display: flex;
            flex-direction: column;
        }

        .sf-wa-role {
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.6px;
            color: #60a5fa;
            text-transform: uppercase;
            margin-bottom: 3px;
        }

        .sf-wa-name {
            font-size: 15.5px;
            font-weight: 700;
            color: #f8fafc;
        }
    `;
    document.head.appendChild(style);

    // ==========================================
    // 2. BUAT STRUKTUR ELEMEN HTML
    // ==========================================
    const waLink = `https://api.whatsapp.com/send?phone=${config.nomorWA}&text=${encodeURIComponent(config.pesanOtomatis)}`;

    const widgetContainer = document.createElement("div");
    widgetContainer.id = "sf-wa-widget";
    widgetContainer.innerHTML = `
        <!-- Pop-up Box -->
        <div id="sf-wa-popup" role="dialog" aria-hidden="true">
            <div class="sf-wa-header">
                <button type="button" class="sf-wa-close" id="sf-wa-close-btn" aria-label="Tutup">×</button>
                <h4>${config.judulPopup}</h4>
                <p>${config.subjudulPopup}</p>
            </div>
            <div class="sf-wa-body">
                <a href="${waLink}" target="_blank" rel="noopener noreferrer" class="sf-wa-card">
                    <div class="sf-wa-avatar">
                        <!-- Ikon Headset CS -->
                        <svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
                            <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
                        </svg>
                    </div>
                    <div class="sf-wa-info">
                        <span class="sf-wa-role">${config.labelAdmin}</span>
                        <span class="sf-wa-name">${config.namaAdmin}</span>
                    </div>
                </a>
            </div>
        </div>

        <!-- Floating Button dengan Tulisan Pendaftaran Akun -->
        <div id="sf-wa-btn" role="button" tabindex="0" aria-label="Pendaftaran Akun via WhatsApp">
            <div class="sf-wa-icon-circle">
                <svg viewBox="0 0 448 512">
                    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                </svg>
            </div>
            <span class="sf-wa-btn-text">${config.teksTombol}</span>
        </div>
    `;
    document.body.appendChild(widgetContainer);

    // ==========================================
    // 3. EVENT HANDLER (Buka / Tutup Pop-up)
    // ==========================================
    const waBtn = document.getElementById("sf-wa-btn");
    const waPopup = document.getElementById("sf-wa-popup");
    const closeBtn = document.getElementById("sf-wa-close-btn");

    function togglePopup() {
        const isOpen = waPopup.classList.contains("sf-show");
        if (isOpen) {
            waPopup.classList.remove("sf-show");
            waPopup.setAttribute("aria-hidden", "true");
        } else {
            waPopup.classList.add("sf-show");
            waPopup.setAttribute("aria-hidden", "false");
        }
    }

    waBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        togglePopup();
    });

    closeBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        waPopup.classList.remove("sf-show");
        waPopup.setAttribute("aria-hidden", "true");
    });

    document.addEventListener("click", function (e) {
        if (!widgetContainer.contains(e.target)) {
            waPopup.classList.remove("sf-show");
            waPopup.setAttribute("aria-hidden", "true");
        }
    });
});
