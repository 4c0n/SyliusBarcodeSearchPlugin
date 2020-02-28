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

        $('#nedac-sylius-barcode-plugin-scan-modal').modal('show');
        Quagga.start();
      }
    );
  }
}
