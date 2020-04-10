const nedacSyliusBarcodeSearchPluginStartButton = document.getElementById('nedac-sylius-barcode-search-plugin-start-button');
if (nedacSyliusBarcodeSearchPluginStartButton !== null) {
  nedacSyliusBarcodeSearchPluginStartButton.onclick = () => {
    Quagga.init({
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: document.querySelector('#nedac-sylius-barcode-plugin-interactive'),
          constraints: {
            width: 640,
            height: 480,
            facingMode: "environment"
          }
        },
        decoder: {
          readers: ['ean_reader']
        }
      }, (err) => {
        if (err) {
          console.log(err);
          return;
        }

        // Register button handlers
        const closeButton = document.getElementById('nedac-sylius-barcode-plugin-scan-modal-close-button');
        if (null !== closeButton) {
          closeButton.onclick = () => Quagga.stop();
        }

        const stopButton = document.getElementById('nedac-sylius-barcode-plugin-scan-modal-stop-button');
        if (null !== stopButton) {
          stopButton.onclick = () => Quagga.stop();
        }

        // Register detection handler
        Quagga.onDetected((result) => {
          Quagga.stop();

          const ean = result.codeResult.code;

          const searchTextField = document.getElementById('criteria_search_value');
          if (null !== searchTextField) {
            searchTextField.value = ean;
          }

          const searchForm = document.getElementById('nedac-sylius-barcode-search-plugin-search-form');
          if (null !== searchForm) {
            searchForm.submit();
          }
        });

        // Register processed handler
        Quagga.onProcessed(function(result) {
          const overlayContext = Quagga.canvas.ctx.overlay;
          const overlayCanvas = Quagga.canvas.dom.overlay;

          if (result) {
            if (result.boxes) {
              overlayContext.clearRect(0, 0, parseInt(overlayCanvas.getAttribute('width')), parseInt(overlayCanvas.getAttribute('height')));
              result.boxes.filter(function (box) {
                return box !== result.box;
              }).forEach(function (box) {
                Quagga.ImageDebug.drawPath(box, {x: 0, y: 1}, overlayContext, {color: 'green', lineWidth: 2});
              });
            }

            if (result.box) {
              Quagga.ImageDebug.drawPath(result.box, {x: 0, y: 1}, overlayContext, {color: 'blue', lineWidth: 2});
            }

            if (result.codeResult && result.codeResult.code) {
              Quagga.ImageDebug.drawPath(result.line, {x: 'x', y: 'y'}, overlayContext, {color: 'red', lineWidth: 3});
            }
          }
        });

        $('#nedac-sylius-barcode-plugin-scan-modal').modal('show');
        Quagga.start();
      }
    );
  }
}
