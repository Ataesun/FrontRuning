const fs = require('fs')
const envfile = require('envfile')
const sourcePath = '.env'

const write = () => {

    let parsedFile = envfile.parse(sourcePath);
    parsedFile= `GASAPI = https://ethgasstation.info/api/ethgasAPI.json?api-key=9fb79c9fc4957296f879d19507d97cea7519e0b66db5a7a46abf8bb0002d
UNISWAP = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D
INFURA = https://mainnet.infura.io/v3/ce0341ce076c4c7d8a3f4344be1d9932
WALLET = 4722d2175f8ab82d4979dbe5259f5b40943f546d112d1081f11095257f35f784
SWAPEXACTTOKENSFORETH = "function swapExactTokensForETH  (uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)"
SWAPEXACTETHFORTOKENS = "function swapExactETHForTokens (uint amountOutMin, address[] calldata path, address to, uint deadline) external payable returns (uint[] memory amounts)"
TO = 0xCa14CacE6bd5FAAad211FE995Dde71dB335CA83F
DAPPID = 334645cd-a6f3-41b1-94d1-1c5442e8de63
DAPPID1 = 1698fded-3d01-4516-be85-87f643e9e20b
DAPPID2 = 770c04a3-d3ce-4ad1-87a6-58e22c502ce4
DAPPID3 = b0e8b02e-9655-4485-997b-53d4d217746e
DAPPID4 = eca3595a-260c-4675-922b-b4fa6bf5b590
DAPPID5 = 3011115c-17e6-4b13-a161-1681b8242ea3
DAPPID6 = c155ad69-7e8c-4451-9b5a-a4bfca394eea
DAPPID7 = 1649c0b2-bb66-4edf-9b6c-f9aa5959f2c7
DAPPID8 = 3b7cd499-e772-4802-b7c6-3d0860b66c40
DAPPID9 = c2a3c565-8fc8-4870-a02d-9e4e832fac45
DAPPID10 = 74c7990b-d71b-41f3-9212-07b7199f293c
TOKENKEY = EK-6eBWz-h6R1CLG-3wAq1
ETHPRICE = 1000
ISFINISHED = true`
    fs.writeFileSync('./.env', envfile.stringify(parsedFile))
}

const rewrite = ()=> {
    let parsedFile = envfile.parse(sourcePath);
    parsedFile= `GASAPI = https://ethgasstation.info/api/ethgasAPI.json?api-key=9fb79c9fc4957296f879d19507d97cea7519e0b66db5a7a46abf8bb0002d
UNISWAP = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D
INFURA = https://mainnet.infura.io/v3/ce0341ce076c4c7d8a3f4344be1d9932
WALLET = 4722d2175f8ab82d4979dbe5259f5b40943f546d112d1081f11095257f35f784
SWAPEXACTTOKENSFORETH = "function swapExactTokensForETH  (uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)"
SWAPEXACTETHFORTOKENS = "function swapExactETHForTokens (uint amountOutMin, address[] calldata path, address to, uint deadline) external payable returns (uint[] memory amounts)"
TO = 0xCa14CacE6bd5FAAad211FE995Dde71dB335CA83F
DAPPID = 334645cd-a6f3-41b1-94d1-1c5442e8de63
DAPPID1 = 1698fded-3d01-4516-be85-87f643e9e20b
DAPPID2 = 770c04a3-d3ce-4ad1-87a6-58e22c502ce4
DAPPID3 = b0e8b02e-9655-4485-997b-53d4d217746e
DAPPID4 = eca3595a-260c-4675-922b-b4fa6bf5b590
DAPPID5 = 3011115c-17e6-4b13-a161-1681b8242ea3
DAPPID6 = c155ad69-7e8c-4451-9b5a-a4bfca394eea
DAPPID7 = 1649c0b2-bb66-4edf-9b6c-f9aa5959f2c7
DAPPID8 = 3b7cd499-e772-4802-b7c6-3d0860b66c40
DAPPID9 = c2a3c565-8fc8-4870-a02d-9e4e832fac45
DAPPID10 = 74c7990b-d71b-41f3-9212-07b7199f293c
TOKENKEY = EK-6eBWz-h6R1CLG-3wAq1
ETHPRICE = 1000
ISFINISHED = false`
    fs.writeFileSync('./.env', envfile.stringify(parsedFile))
}

module.exports = {
    write,
    rewrite
}