const ethers = require("ethers");

const provider = new ethers.providers.InfuraProvider(process.env.PROVIDER_NAME, process.env.PROVIDER_ID);
const etherscanProvider = new ethers.providers.EtherscanProvider("ropsten");

export default class EtherUtil {
    static accessWalletByMnemonic = async mnemonic => {
        mnemonic = mnemonic.trim();
        try {
            return await ethers.Wallet.fromMnemonic(mnemonic).connect(provider)
        } catch (err) {
            return false;
        }
    };

    static generateMnemonic = () => ethers.utils.HDNode.entropyToMnemonic(ethers.utils.randomBytes(16));

    static createKeystore = password => {
        const wallet = ethers.Wallet.createRandom().connect(provider);
        return wallet.encrypt(password);
    };

    static createFromMnemonic = mnemonic => ethers.Wallet.fromMnemonic(mnemonic).connect(provider);

    static getLastBlock = () => provider.getBlockNumber();

    static getAddressTransactions = async address => {
        const transactions = await etherscanProvider.getHistory(address);
        const res = [];
        for (let i = 0; i < transactions.length; i++) {
            const tx = transactions[i];
            tx.value = tx.value.toString() / Math.pow(10, 14);
            tx.value = tx.value / Math.pow(10, 4);
            res.push(tx);
        }

        return res;
    };

    static getBalance = wallet => wallet.getBalance();

    static getBlockTransactions = async blockNumber => {
        const block = await provider.getBlock(blockNumber);
        if (!block) return [];

        const transactions = [];
        for (let i = 0; (i < 10 && i < block.transactions.length); i++) {
            const tx = await provider.getTransaction(block.transactions[i]);
            tx.timestamp = block.timestamp;
            tx.value = tx.value.toString() / Math.pow(10, 14);
            transactions.push(tx);
        }

        return transactions;
    };

    static getFee = async gasLimit => {
        let price = await provider.getGasPrice();
        price = price.mul(gasLimit);
        price = price.toString() / Math.pow(10, 14);
        return price;
    };

    static isValidAddress = address => {
        try {
            ethers.utils.getAddress(address);
        } catch (err) {
            return false;
        }
        return true;
    }
}

