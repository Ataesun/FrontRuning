
const axios = require('axios').default;

const precise = async (token) => {
    let sig = await axios.get(`https://api.ethplorer.io/getTokenInfo/${token}?apiKey=${process.env.TOKENKEY}`);
    decimals = sig.data.decimals
    holdersCount = sig.data.holdersCount

    return {
        decimals,
        holdersCount
    };
}



const getGas = async () => {
    let compareGas = await axios.get(process.env.GASAPI)
    compareGas = compareGas.data
    compareGas = (parseInt(compareGas.fast) + parseInt(compareGas.fastest) + parseInt(compareGas.average)) / 30;

    return parseInt(compareGas)
}


const viableEvent = async (event) => {
    let compareGas = await getGas();
    if (
        event.status === 'pending' && event.contractCall.methodName === 'swapExactETHForTokens' ||
        event.status === 'pending' && event.contractCall.methodName === 'swapETHForExactTokens') {
        if (parseInt(event.gasPrice) > (compareGas - 30) * 1e9 || parseInt(event.gasPrice) < (compareGas + 10) * 1e9) {
            if (event.contractCall.params.path[1].toLowerCase() === '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'.toLocaleLowerCase() || // eth
                event.contractCall.params.path[1].toLowerCase() === '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'.toLocaleLowerCase() || // usdc
                event.contractCall.params.path[1].toLowerCase() === '0x6b175474e89094c44da98b954eedeac495271d0f'.toLocaleLowerCase() || // dai
                event.contractCall.params.path[1].toLowerCase() === '0xdac17f958d2ee523a2206206994597c13d831ec7'.toLocaleLowerCase() || // usdt
                event.contractCall.params.path[1].toLowerCase() === '0x6b175474e89094c44da98b954eedeac495271d0f'.toLocaleLowerCase() || // wise
                event.contractCall.params.path[1].toLowerCase() === '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599'.toLocaleLowerCase() || // w btc
                event.contractCall.params.path[1].toLowerCase() === '0x1453dbb8a29551ade11d89825ca812e05317eaeb'.toLocaleLowerCase() || // tendies
                event.contractCall.params.path[1].toLowerCase() === '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2'.toLocaleLowerCase() || // maker
                event.contractCall.params.path[1].toLowerCase() === '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984'.toLocaleLowerCase() || // uni
                event.contractCall.params.path[1].toLowerCase() === '0xbd2f0cd039e0bfcf88901c98c0bfac5ab27566e3'.toLocaleLowerCase() || // dsd
                event.contractCall.params.path[1].toLowerCase() === '0x514910771af9ca656af840dff83e8264ecf986ca'.toLocaleLowerCase() || // link
                event.contractCall.params.path[1].toLowerCase() === '0x853d955acef822db058eb8505911ed77f175b99e'.toLocaleLowerCase() || // frax
                event.contractCall.params.path[1].toLowerCase() === '0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e'.toLocaleLowerCase() || // yfi
                event.contractCall.params.path[1].toLowerCase() === '0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9'.toLocaleLowerCase() || // aave
                event.contractCall.params.path[1].toLowerCase() === '0xaaaebe6fe48e54f431b0c390cfaf0b017d09d42d'.toLocaleLowerCase() || // cel
                event.contractCall.params.path[1].toLowerCase() === '0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f'.toLocaleLowerCase() || // snx
                event.contractCall.params.path[1].toLowerCase() === '0xa7ed29b253d8b4e3109ce07c80fc570f81b63696'.toLocaleLowerCase() || // bas
                event.contractCall.params.path[1].toLowerCase() === '0x36f3fd68e7325a35eb768f1aedaae9ea0689d723'.toLocaleLowerCase() || // esd
                event.contractCall.params.path[1].toLowerCase() === '0x0b38210ea11411557c13457d4da7dc6ea731b88a'.toLocaleLowerCase() || // api3
                event.contractCall.params.path[1].toLowerCase() === '0xfa5047c9c78b8877af97bdcb85db743fd7313d4a'.toLocaleLowerCase() || // rook
                event.contractCall.params.path[1].toLowerCase() === '0x3449fc1cd036255ba1eb19d65ff4ba2b8903a69a'.toLocaleLowerCase() || // bac
                event.contractCall.params.path[1].toLowerCase() === '0x1494ca1f11d487c2bbe4543e90080aeba4ba3c2b'.toLocaleLowerCase() || // dpi
                event.contractCall.params.path[1].toLowerCase() === '0x2b591e99afe9f32eaa6214f7b7629768c40eeb39'.toLocaleLowerCase() || // hex
                event.contractCall.params.path[1].toLowerCase() === '0xbbbbca6a901c926f240b89eacb641d8aec7aeafd'.toLocaleLowerCase() || // lrc
                event.contractCall.params.path[1].toLowerCase() === '0x83e6f1e41cdd28eaceb20cb649155049fac3d5aa'.toLocaleLowerCase() || // pols
                event.contractCall.params.path[1].toLowerCase() === '0x00a8b738e453ffd858a7edf03bccfe20412f0eb0'.toLocaleLowerCase() || // albt
                event.contractCall.params.path[1].toLowerCase() === '0xeb4c2781e4eba804ce9a9803c67d0893436bb27d'.toLocaleLowerCase() || // renBTC
                event.contractCall.params.path[1].toLowerCase() === '0xd46ba6d942050d489dbd938a2c909a5d5039a161'.toLocaleLowerCase() || // ampl
                event.contractCall.params.path[1].toLowerCase() === '0x0ae055097c6d159879521c384f1d2123d1f195e6'.toLocaleLowerCase() || // stake
                event.contractCall.params.path[1].toLowerCase() === '0x8762db106b2c2a0bccb3a80d1ed41273552616e8'.toLocaleLowerCase() || // rsr
                event.contractCall.params.path[1].toLowerCase() === '0xc944e90c64b2c07662a292be6244bdf05cda44a7'.toLocaleLowerCase() || // grt
                event.contractCall.params.path[1].toLowerCase() === '0x1ceb5cb57c4d4e2b2433641b95dd330a33185a44'.toLocaleLowerCase() || // kp3r
                event.contractCall.params.path[1].toLowerCase() === '0x33d0568941c0c64ff7e0fb4fba0b11bd37deed9f'.toLocaleLowerCase() || // ramp
                event.contractCall.params.path[1].toLowerCase() === '0x3432b6a60d23ca0dfca7761b7ab56459d9c964d0'.toLocaleLowerCase() || // fxs
                event.contractCall.params.path[1].toLowerCase() === '0x9d1233cc46795e94029fda81aaadc1455d510f15'.toLocaleLowerCase() || // zai
                event.contractCall.params.path[1].toLowerCase() === '0xeef9f339514298c6a857efcfc1a762af84438dee'.toLocaleLowerCase() || // hez
                event.contractCall.params.path[1].toLowerCase() === '0x408e41876cccdc0f92210600ef50372656052a38'.toLocaleLowerCase() || // ren
                event.contractCall.params.path[1].toLowerCase() === '0x5f0e628b693018f639d10e4a4f59bd4d8b2b6b44'.toLocaleLowerCase() || // white
                event.contractCall.params.path[1].toLowerCase() === '0xc00e94cb662c3520282e6f5717214004a7f26888'.toLocaleLowerCase() || // comp
                event.contractCall.params.path[1].toLowerCase() === '0x57ab1ec28d129707052df4df418d58a2d46d5f51'.toLocaleLowerCase() || // susd
                event.contractCall.params.path[1].toLowerCase() === '0x28cb7e841ee97947a86b06fa4090c8451f64c0be'.toLocaleLowerCase() || // yfl
                event.contractCall.params.path[1].toLowerCase() === '0xa0246c9032bc3a600820415ae600c6388619a14d'.toLocaleLowerCase() || // farm
                event.contractCall.params.path[1].toLowerCase() === '0x0d438f3b5175bebc262bf23753c1e53d03432bde'.toLocaleLowerCase() || // wnxm
                event.contractCall.params.path[1].toLowerCase() === '0x6b3595068778dd592e39a122f4f5a5cf09c90fe2'.toLocaleLowerCase() || // sushi
                event.contractCall.params.path[1].toLowerCase() === '0x8400d94a5cb0fa0d041a3788e395285d61c9ee5e'.toLocaleLowerCase() || // ubt
                event.contractCall.params.path[1].toLowerCase() === '0x0391d2021f89dc339f60fff84546ea23e337750f'.toLocaleLowerCase() || // bond
                event.contractCall.params.path[1].toLowerCase() === '0x7240ac91f01233baaf8b064248e80feaa5912ba3'.toLocaleLowerCase() || // octo
                event.contractCall.params.path[1].toLowerCase() === '0x226f7b842e0f0120b7e194d05432b3fd14773a9d'.toLocaleLowerCase() || // unn
                event.contractCall.params.path[1].toLowerCase() === '0x4a220e6096b25eadb88358cb44068a3248254675'.toLocaleLowerCase() || // qnt
                event.contractCall.params.path[1].toLowerCase() === '0xd2dda223b2617cb616c1580db421e4cfae6a8a85'.toLocaleLowerCase() || // bondly
                event.contractCall.params.path[1].toLowerCase() === '0x8888801af4d980682e47f1a9036e589479e835c5'.toLocaleLowerCase() || // mph
                event.contractCall.params.path[1].toLowerCase() === '0xd533a949740bb3306d119cc777fa900ba034cd52'.toLocaleLowerCase() || // crv
                event.contractCall.params.path[1].toLowerCase() === '0xcc4304a31d09258b0029ea7fe63d032f52e44efe'.toLocaleLowerCase() || // swap
                event.contractCall.params.path[1].toLowerCase() === '0xb753428af26e81097e7fd17f40c88aaa3e04902c'.toLocaleLowerCase() || // sfi
                event.contractCall.params.path[1].toLowerCase() === '0xa47c8bf37f92abed4a126bda807a7b7498661acd'.toLocaleLowerCase() || // ust
                event.contractCall.params.path[1].toLowerCase() === '0xf4cd3d3fda8d7fd6c5a500203e38640a70bf9577'.toLocaleLowerCase() || // yf-dai
                event.contractCall.params.path[1].toLowerCase() === '0x967da4048cd07ab37855c090aaf366e4ce1b9f48'.toLocaleLowerCase() || // ocean
                event.contractCall.params.path[1].toLowerCase() === '0x362bc847a3a9637d3af6624eec853618a43ed7d2'.toLocaleLowerCase() || // prq
                event.contractCall.params.path[1].toLowerCase() === '0xd90e69f67203ebe02c917b5128629e77b4cd92dc'.toLocaleLowerCase() || // onc
                event.contractCall.params.path[1].toLowerCase() === '0x1f3f9d3068568f8040775be2e8c03c103c61f3af'.toLocaleLowerCase() || // arch
                event.contractCall.params.path[1].toLowerCase() === '0xa8c8cfb141a3bb59fea1e2ea6b79b5ecbcd7b6ca'.toLocaleLowerCase() || // noia
                event.contractCall.params.path[1].toLowerCase() === '0x0000000000085d4780b73119b644ae5ecd22b376'.toLocaleLowerCase() || // tusd
                event.contractCall.params.path[1].toLowerCase() === '0x40fd72257597aa14c7231a7b1aaa29fce868f677'.toLocaleLowerCase() || // xor
                event.contractCall.params.path[1].toLowerCase() === '0xb1dc9124c395c1e97773ab855d66e879f053a289'.toLocaleLowerCase() || // yax
                event.contractCall.params.path[1].toLowerCase() === '0xa3bed4e1c75d00fa6f4e5e6922db7261b5e9acd2'.toLocaleLowerCase() || // mta
                event.contractCall.params.path[1].toLowerCase() === '0x111111111117dc0aa78b770fa6a738034120c302'.toLocaleLowerCase() || // 1inch
                event.contractCall.params.path[1].toLowerCase() === '0xee573a945b01b788b9287ce062a0cfc15be9fd86'.toLocaleLowerCase() || // xed
                event.contractCall.params.path[1].toLowerCase() === '0xc0ba369c8db6eb3924965e5c4fd0b4c1b91e305f'.toLocaleLowerCase() || // duck
                event.contractCall.params.path[1].toLowerCase() === '0x25e1474170c4c0aa64fa98123bdc8db49d7802fa'.toLocaleLowerCase() || // bid
                event.contractCall.params.path[1].toLowerCase() === '0x5bb29c33c4a3c29f56f8aca40b4db91d8a5fe2c5'.toLocaleLowerCase() || // ons
                event.contractCall.params.path[1].toLowerCase() === '0x26ce25148832c04f3d7f26f32478a9fe55197166'.toLocaleLowerCase() || // dext
                event.contractCall.params.path[1].toLowerCase() === '0x85eee30c52b0b379b046fb0f85f4f3dc3009afec'.toLocaleLowerCase() || // keep
                event.contractCall.params.path[1].toLowerCase() === '0xb4d930279552397bba2ee473229f89ec245bc365'.toLocaleLowerCase() || // maha
                event.contractCall.params.path[1].toLowerCase() === '0x5a98fcbea516cf06857215779fd812ca3bef1b32'.toLocaleLowerCase() || // ldo
                event.contractCall.params.path[1].toLowerCase() === '0xb62132e35a6c13ee1ee0f84dc5d40bad8d815206'.toLocaleLowerCase() || // nexo
                event.contractCall.params.path[1].toLowerCase() === '0x584bc13c7d411c00c01a62e8019472de68768430'.toLocaleLowerCase() || // hegic
                event.contractCall.params.path[1].toLowerCase() === '0x2ba592f78db6436527729929aaf6c908497cb200'.toLocaleLowerCase() || // cream
                event.contractCall.params.path[1].toLowerCase() === '0x429881672b9ae42b8eba0e26cd9c73711b891ca5'.toLocaleLowerCase() || // pickle
                event.contractCall.params.path[1].toLowerCase() === '0x0258f474786ddfd37abce6df6bbb1dd5dfc4434a'.toLocaleLowerCase() || // orn
                event.contractCall.params.path[1].toLowerCase() === '0x62359ed7505efc61ff1d56fef82158ccaffa23d7'.toLocaleLowerCase() || // core
                event.contractCall.params.path[1].toLowerCase() === '0x38e4adb44ef08f22f5b5b76a8f0c2d0dcbe7dca1'.toLocaleLowerCase() || // cvp
                event.contractCall.params.path[1].toLowerCase() === '0x7de91b204c1c737bcee6f000aaa6569cf7061cb7'.toLocaleLowerCase() || // xrt
                event.contractCall.params.path[1].toLowerCase() === '0xa1afffe3f4d611d252010e3eaf6f4d77088b0cd7'.toLocaleLowerCase() || // rfi
                event.contractCall.params.path[1].toLowerCase() === '0x39795344cbcc76cc3fb94b9d1b15c23c2070c66d'.toLocaleLowerCase() || // share
                event.contractCall.params.path[1].toLowerCase() === '0x6468e79a80c0eab0f9a2b574c8d5bc374af59414'.toLocaleLowerCase() || // exrd
                event.contractCall.params.path[1].toLowerCase() === '0xfbeea1c75e4c4465cb2fccc9c6d6afe984558e20'.toLocaleLowerCase() || // ddim
                event.contractCall.params.path[1].toLowerCase() === '0x4c11249814f11b9346808179cf06e71ac328c1b5'.toLocaleLowerCase() || // orai
                event.contractCall.params.path[1].toLowerCase() === '0x3f382dbd960e3a9bbceae22651e88158d2791550'.toLocaleLowerCase() || // ghst
                event.contractCall.params.path[1].toLowerCase() === '0xdd974d5c2e2928dea5f71b9825b8b646686bd200'.toLocaleLowerCase() || // knc
                event.contractCall.params.path[1].toLowerCase() === '0x84ca8bc7997272c7cfb4d0cd3d55cd942b3c9419'.toLocaleLowerCase() || // dia
                event.contractCall.params.path[1].toLowerCase() === '0x57b946008913b82e4df85f501cbaed910e58d26c'.toLocaleLowerCase() || // pond
                event.contractCall.params.path[1].toLowerCase() === '0xba100000625a3754423978a60c9317c58a424e3d'.toLocaleLowerCase() || // bal
                event.contractCall.params.path[1].toLowerCase() === '0x0d8775f648430679a709e98d2b0cb6250d2887ef'.toLocaleLowerCase() || // bat
                event.contractCall.params.path[1].toLowerCase() === '0xaf9f549774ecedbd0966c52f250acc548d3f36e5'.toLocaleLowerCase() || // rfuel
                event.contractCall.params.path[1].toLowerCase() === '0xb4efd85c19999d84251304bda99e90b92300bd93'.toLocaleLowerCase() || // rpl
                event.contractCall.params.path[1].toLowerCase() === '0xe61fdaf474fac07063f2234fb9e60c1163cfa850'.toLocaleLowerCase() || // coin
                event.contractCall.params.path[1].toLowerCase() === '0x8ce9137d39326ad0cd6491fb5cc0cba0e089b6a9'.toLocaleLowerCase() || // sxp
                event.contractCall.params.path[1].toLowerCase() === '0xba11d00c5f74255f56a5e366f4f77f5a186d7f55'.toLocaleLowerCase() || // band
                event.contractCall.params.path[1].toLowerCase() === '0x0000000000095413afc295d19edeb1ad7b71c952'.toLocaleLowerCase() || // lon
                event.contractCall.params.path[1].toLowerCase() === '0xe95a203b1a91a908f9b9ce46459d101078c2c3cb'.toLocaleLowerCase() || // ankreth
                event.contractCall.params.path[1].toLowerCase() === '0x20c36f062a31865bed8a5b1e512d9a1a20aa333a'.toLocaleLowerCase() || // dfd
                event.contractCall.params.path[1].toLowerCase() === '0x18aaa7115705e8be94bffebde57af9bfc265b998'.toLocaleLowerCase() || // audio
                event.contractCall.params.path[1].toLowerCase() === '0xfffffffff15abf397da76f1dcc1a1604f45126db'.toLocaleLowerCase() || // fsw
                event.contractCall.params.path[1].toLowerCase() === '0x04fa0d235c4abf4bcf4787af4cf447de572ef828'.toLocaleLowerCase() || // uma
                event.contractCall.params.path[1].toLowerCase() === '0x4c19596f5aaff459fa38b0f7ed92f11ae6543784'.toLocaleLowerCase() || // tru
                event.contractCall.params.path[1].toLowerCase() === '0x9ceb84f92a0561fa3cc4132ab9c0b76a59787544'.toLocaleLowerCase() || // doki
                event.contractCall.params.path[1].toLowerCase() === '0x95a4492f028aa1fd432ea71146b433e7b4446611'.toLocaleLowerCase() || // apy
                event.contractCall.params.path[1].toLowerCase() === '0x0ba45a8b5d5575935b8158a88c631e9f9c95a2e5'.toLocaleLowerCase() || // trb
                event.contractCall.params.path[1].toLowerCase() === '0x07150e919b4de5fd6a63de1f9384828396f25fdc'.toLocaleLowerCase() || // base
                event.contractCall.params.path[1].toLowerCase() === '0xb5fe099475d3030dde498c3bb6f3854f762a48ad'.toLocaleLowerCase() || // fnk
                event.contractCall.params.path[1].toLowerCase() === '0xed91879919b71bb6905f23af0a68d231ecf87b14'.toLocaleLowerCase() || // dmg
                event.contractCall.params.path[1].toLowerCase() === '0x56d811088235f11c8920698a204a5010a788f4b3'.toLocaleLowerCase() || // bzrx
                event.contractCall.params.path[1].toLowerCase() === '0x0a913bead80f321e7ac35285ee10d9d922659cb7'.toLocaleLowerCase() || // dos
                event.contractCall.params.path[1].toLowerCase() === '0x0202be363b8a4820f3f4de7faf5224ff05943ab1'.toLocaleLowerCase() || // uft
                event.contractCall.params.path[1].toLowerCase() === '0xd5525d397898e5502075ea5e830d8914f6f0affe'.toLocaleLowerCase() || // meme
                event.contractCall.params.path[1].toLowerCase() === '0x8ab7404063ec4dbcfd4598215992dc3f8ec853d7'.toLocaleLowerCase() || // akro
                event.contractCall.params.path[1].toLowerCase() === '0x990f341946a3fdb507ae7e52d17851b87168017c'.toLocaleLowerCase() || // strong
                event.contractCall.params.path[1].toLowerCase() === '0x20945ca1df56d237fd40036d47e866c7dccd2114'.toLocaleLowerCase() || // nsure
                event.contractCall.params.path[1].toLowerCase() === '0x80fb784b7ed66730e8b1dbd9820afd29931aab03'.toLocaleLowerCase() || // lend
                event.contractCall.params.path[1].toLowerCase() === '0x9469d013805bffb7d3debe5e7839237e535ec483'.toLocaleLowerCase() || // ring
                event.contractCall.params.path[1].toLowerCase() === '0xca1207647ff814039530d7d35df0e1dd2e91fa84'.toLocaleLowerCase() || // dht
                event.contractCall.params.path[1].toLowerCase() === '0x795dbf627484f8248d3d6c09c309825c1563e873'.toLocaleLowerCase() || // snp
                event.contractCall.params.path[1].toLowerCase() === '0x2e2f3246b6c65ccc4239c9ee556ec143a7e5de2c'.toLocaleLowerCase() || // yfim
                event.contractCall.params.path[1].toLowerCase() === '0x51b4b27a7bd296fd34ca7c469f49d5bcd7fe5137'.toLocaleLowerCase() || // cibs
                event.contractCall.params.path[1].toLowerCase() === '0x1695936d6a953df699c38ca21c2140d497c08bd9'.toLocaleLowerCase() || // syn
                // event.contractCall.params.path[1].toLowerCase() === '0x5dbcf33d8c2e976c6b560249878e6f1491bca25c'.toLocaleLowerCase() || // yearn curve
                event.contractCall.params.path[1].toLowerCase() === '0xed0439eacf4c4965ae4613d77a5c2efe10e5f183'.toLocaleLowerCase() || // shroom
                // event.contractCall.params.path[1].toLowerCase() === '0x9248c485b0b80f76da451f167a8db30f33c70907'.toLocaleLowerCase() || // debase
                event.contractCall.params.path[1].toLowerCase() === '0x3383c5a8969dc413bfddc9656eb80a1408e4ba20'.toLocaleLowerCase() || // wanatha
                event.contractCall.params.path[1].toLowerCase() === '0x93ed3fbe21207ec2e8f2d3c3de6e058cb73bc04d'.toLocaleLowerCase() || // pnk
                event.contractCall.params.path[1].toLowerCase() === '0x63b4f3e3fa4e438698ce330e365e831f7ccd1ef4'.toLocaleLowerCase() || // cfi
                event.contractCall.params.path[1].toLowerCase() === '0xc4c2614e694cf534d407ee49f8e44d125e4681c4'.toLocaleLowerCase() || // chain
                event.contractCall.params.path[1].toLowerCase() === '0x0417912b3a7af768051765040a55bb0925d4ddcf'.toLocaleLowerCase() || // lid
                event.contractCall.params.path[1].toLowerCase() === '0x0f7f961648ae6db43c75663ac7e5414eb79b5704'.toLocaleLowerCase() || // xio
                event.contractCall.params.path[1].toLowerCase() === '0xc3eb2622190c57429aac3901808994443b64b466'.toLocaleLowerCase() || // oro
                event.contractCall.params.path[1].toLowerCase() === '0x431ad2ff6a9c365805ebad47ee021148d6f7dbe0'.toLocaleLowerCase() || // df
                event.contractCall.params.path[1].toLowerCase() === '0x0ff6ffcfda92c53f615a4a75d982f399c989366b'.toLocaleLowerCase() || // layer
                event.contractCall.params.path[1].toLowerCase() === '0x3e780920601d61cedb860fe9c4a90c9ea6a35e78'.toLocaleLowerCase() || // boost
                event.contractCall.params.path[1].toLowerCase() === '0x0e29e5abbb5fd88e28b2d355774e73bd47de3bcd'.toLocaleLowerCase() || // hakka
                event.contractCall.params.path[1].toLowerCase() === '0x54c9ea2e9c9e8ed865db4a4ce6711c2a0d5063ba'.toLocaleLowerCase() || // bart
                event.contractCall.params.path[1].toLowerCase() === '0x72e9d9038ce484ee986fea183f8d8df93f9ada13'.toLocaleLowerCase() || // smartcredit
                event.contractCall.params.path[1].toLowerCase() === '0x72630b1e3b42874bf335020ba0249e3e9e47bafc'.toLocaleLowerCase() || // epan
                event.contractCall.params.path[1].toLowerCase() === '0x30f271c9e86d2b7d00a6376cd96a1cfbd5f0b9b3'.toLocaleLowerCase() || // dec
                event.contractCall.params.path[1].toLowerCase() === '0x6f87d756daf0503d08eb8993686c7fc01dc44fb1'.toLocaleLowerCase() // trade
            ) {
                if (event.contractCall.params.amountOutMin !== undefined && event.value / 1e18 > 3) {
                    return true;
                }
            }
        }
    }
}


const createFilteredTransaction = async (event) => {

    let obj = {
        method: event.contractCall.methodName,
        txHash: event.hash,
        gas: parseInt(event.gas),
        gasPrice: parseInt(event.gasPrice),
        etherValue: parseInt(event.value) / 1e18,
        amountOutMin: event.contractCall.params.amountOutMin,
        tokenOut: event.contractCall.params.path[1],
        deadline: parseInt(event.contractCall.params.deadline)
    }

    let ret = await precise(obj.tokenOut, obj.amountOutMin)
    obj.decimals = ret.decimals;
    obj.holdersCount = ret.holdersCount;

    obj.amountOutMin = Number.parseFloat(obj.amountOutMin) / Math.pow(10, obj.decimals)
    if (holdersCount < 200) {
      return undefined
    }

    return obj;
}

module.exports = {
    viableEvent,
    createFilteredTransaction,
}