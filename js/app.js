// ===================================
// QR Code Scanner & Generator App
// ===================================

class QRApp {
    constructor() {
        this.qrCode = null;
        this.html5QrCode = null;
        this.isScanning = false;
        this.init();
    }

    init() {
        this.cacheDOM();
        this.bindEvents();
    }

    cacheDOM() {
        // Tab elements
        this.tabBtns = document.querySelectorAll('.tab-btn');
        this.tabContents = document.querySelectorAll('.tab-content');

        // Generator elements
        this.qrInput = document.getElementById('qr-input');
        this.qrColor = document.getElementById('qr-color');
        this.bgColor = document.getElementById('bg-color');
        this.generateBtn = document.getElementById('generate-btn');
        this.qrOutput = document.getElementById('qr-output');
        this.qrCodeDiv = document.getElementById('qr-code');
        this.downloadBtn = document.getElementById('download-btn');
        this.clearBtn = document.getElementById('clear-btn');

        // Scanner elements
        this.startCameraBtn = document.getElementById('start-camera-btn');
        this.stopCameraBtn = document.getElementById('stop-camera-btn');
        this.reader = document.getElementById('reader');
        this.fileUpload = document.getElementById('file-upload');
        this.scanResult = document.getElementById('scan-result');
        this.resultContent = document.getElementById('result-content');
        this.copyBtn = document.getElementById('copy-btn');
        this.clearScanBtn = document.getElementById('clear-scan-btn');

        // Toast
        this.toast = document.getElementById('toast');
    }

    bindEvents() {
        // Tab switching
        this.tabBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.switchTab(e));
        });

        // Generator
        this.generateBtn.addEventListener('click', () => this.generateQR());
        this.downloadBtn.addEventListener('click', () => this.downloadQR());
        this.clearBtn.addEventListener('click', () => this.clearGenerator());

        // Scanner
        this.startCameraBtn.addEventListener('click', () => this.startCamera());
        this.stopCameraBtn.addEventListener('click', () => this.stopCamera());
        this.fileUpload.addEventListener('change', (e) => this.handleFileUpload(e));
        this.copyBtn.addEventListener('click', () => this.copyToClipboard());
        this.clearScanBtn.addEventListener('click', () => this.clearScanner());

        // Enter key to generate
        this.qrInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
                this.generateQR();
            }
        });
    }

    // ===================================
    // Tab Switching
    // ===================================
    switchTab(e) {
        const tabName = e.currentTarget.dataset.tab;

        // Update buttons
        this.tabBtns.forEach(btn => btn.classList.remove('active'));
        e.currentTarget.classList.add('active');

        // Update content
        this.tabContents.forEach(content => content.classList.remove('active'));
        document.getElementById(tabName).classList.add('active');

        // Stop camera if switching away from scanner
        if (tabName !== 'scanner' && this.isScanning) {
            this.stopCamera();
        }
    }

    // ===================================
    // QR Code Generator
    // ===================================
    generateQR() {
        const text = this.qrInput.value.trim();

        if (!text) {
            this.showToast('Please enter some text or URL', 'error');
            this.qrInput.focus();
            return;
        }

        try {
            // Clear previous QR code
            this.qrCodeDiv.innerHTML = '';

            // Generate new QR code
            this.qrCode = new QRCode(this.qrCodeDiv, {
                text: text,
                width: 256,
                height: 256,
                colorDark: this.qrColor.value,
                colorLight: this.bgColor.value,
                correctLevel: QRCode.CorrectLevel.H
            });

            // Show output
            this.qrOutput.classList.remove('hidden');
            this.showToast('QR Code generated successfully!', 'success');

        } catch (error) {
            console.error('Error generating QR code:', error);
            this.showToast('Failed to generate QR code', 'error');
        }
    }

    downloadQR() {
        const qrImage = this.qrCodeDiv.querySelector('img');
        
        if (!qrImage) {
            this.showToast('No QR code to download', 'error');
            return;
        }

        try {
            // Create canvas from image
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const image = new Image();
            
            image.onload = () => {
                canvas.width = image.width;
                canvas.height = image.height;
                ctx.drawImage(image, 0, 0);

                // Download
                const link = document.createElement('a');
                link.download = `qrcode-${Date.now()}.png`;
                link.href = canvas.toDataURL('image/png');
                link.click();

                this.showToast('QR Code downloaded!', 'success');
            };

            image.src = qrImage.src;

        } catch (error) {
            console.error('Error downloading QR code:', error);
            this.showToast('Failed to download QR code', 'error');
        }
    }

    clearGenerator() {
        this.qrInput.value = '';
        this.qrCodeDiv.innerHTML = '';
        this.qrOutput.classList.add('hidden');
        this.qrCode = null;
        this.qrInput.focus();
        this.showToast('Cleared!', 'success');
    }

    // ===================================
    // QR Code Scanner
    // ===================================
    async startCamera() {
        try {
            this.reader.classList.remove('hidden');
            this.startCameraBtn.classList.add('hidden');
            this.stopCameraBtn.classList.remove('hidden');

            this.html5QrCode = new Html5Qrcode("reader");

            const config = {
                fps: 10,
                qrbox: { width: 250, height: 250 },
                aspectRatio: 1.0
            };

            await this.html5QrCode.start(
                { facingMode: "environment" },
                config,
                (decodedText) => this.onScanSuccess(decodedText),
                (errorMessage) => this.onScanFailure(errorMessage)
            );

            this.isScanning = true;
            this.showToast('Camera started! Point at a QR code', 'success');

        } catch (error) {
            console.error('Error starting camera:', error);
            this.showToast('Camera access denied or not available', 'error');
            this.reader.classList.add('hidden');
            this.startCameraBtn.classList.remove('hidden');
            this.stopCameraBtn.classList.add('hidden');
        }
    }

    async stopCamera() {
        if (this.html5QrCode && this.isScanning) {
            try {
                await this.html5QrCode.stop();
                this.html5QrCode.clear();
                this.isScanning = false;
                
                this.reader.classList.add('hidden');
                this.startCameraBtn.classList.remove('hidden');
                this.stopCameraBtn.classList.add('hidden');
                
                this.showToast('Camera stopped', 'success');
            } catch (error) {
                console.error('Error stopping camera:', error);
                this.showToast('Error stopping camera', 'error');
            }
        }
    }

    onScanSuccess(decodedText) {
        // Stop scanning after successful read
        if (this.isScanning) {
            this.stopCamera();
        }

        // Display result
        this.resultContent.textContent = decodedText;
        this.scanResult.classList.remove('hidden');
        
        this.showToast('QR Code scanned successfully!', 'success');

        // Auto-detect URL and make it clickable
        if (this.isValidURL(decodedText)) {
            this.resultContent.innerHTML = `
                <a href="${decodedText}" target="_blank" class="result-link">
                    <i class="fas fa-link"></i> ${decodedText}
                </a>
            `;
        }
    }

    onScanFailure(error) {
        // Silently handle scan failures (continuous scanning)
        // console.warn('Scan failed:', error);
    }

    handleFileUpload(e) {
        const file = e.target.files[0];
        
        if (!file) {
            return;
        }

        if (!file.type.startsWith('image/')) {
            this.showToast('Please upload an image file', 'error');
            return;
        }

        this.showToast('Scanning image...', 'success');

        // Use html5-qrcode to scan file
        const html5QrCode = new Html5Qrcode("reader");
        
        html5QrCode.scanFile(file, true)
            .then(decodedText => {
                this.resultContent.textContent = decodedText;
                this.scanResult.classList.remove('hidden');
                this.showToast('QR Code found in image!', 'success');

                // Auto-detect URL
                if (this.isValidURL(decodedText)) {
                    this.resultContent.innerHTML = `
                        <a href="${decodedText}" target="_blank" class="result-link">
                            <i class="fas fa-link"></i> ${decodedText}
                        </a>
                    `;
                }
            })
            .catch(err => {
                console.error('Error scanning file:', err);
                this.showToast('No QR code found in image', 'error');
            });

        // Reset file input
        this.fileUpload.value = '';
    }

    copyToClipboard() {
        const text = this.resultContent.textContent;
        
        if (!text) {
            this.showToast('Nothing to copy', 'error');
            return;
        }

        navigator.clipboard.writeText(text)
            .then(() => {
                this.showToast('Copied to clipboard!', 'success');
            })
            .catch(err => {
                console.error('Error copying to clipboard:', err);
                // Fallback for older browsers
                const textarea = document.createElement('textarea');
                textarea.value = text;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                this.showToast('Copied to clipboard!', 'success');
            });
    }

    clearScanner() {
        this.resultContent.textContent = '';
        this.scanResult.classList.add('hidden');
        this.showToast('Cleared!', 'success');
    }

    // ===================================
    // Utility Functions
    // ===================================
    isValidURL(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }

    showToast(message, type = 'success') {
        this.toast.textContent = message;
        this.toast.classList.remove('hidden');
        
        // Style based on type
        if (type === 'error') {
            this.toast.style.background = '#e53e3e';
        } else {
            this.toast.style.background = '#2d3748';
        }

        // Auto hide after 3 seconds
        setTimeout(() => {
            this.toast.classList.add('hidden');
        }, 3000);
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new QRApp();
});