const fs = require('fs');

class BankTransferConfig {
    constructor(configFile = 'bank_transfer_config.json') {
        this.configFile = configFile;
        this.config = this.loadConfig();
    }

    loadConfig() {
        if (fs.existsSync(this.configFile)) {
            const rawData = fs.readFileSync(this.configFile);
            return JSON.parse(rawData);
        } else {
            const defaultConfig = {
                lang: "en",
                transfer: {
                    threshold: 25000000,
                    low_fee: 6500,
                    high_fee: 15000
                },
                methods: ["RTO (real-time)", "SKN", "RTGS", "BI FAST"],
                confirmation: {
                    en: "yes",
                    id: "ya"
                }
            };
            this.saveConfig(defaultConfig);
            return defaultConfig;
        }
    }

    saveConfig(data) {
        fs.writeFileSync(this.configFile, JSON.stringify(data, null, 4));
    }
}

module.exports = BankTransferConfig;
