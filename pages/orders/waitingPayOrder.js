import React from 'react';
import numeral from 'numeral';
import {format} from 'date-fns';
import OrderInvoicePdf from './../../components/invoice/orderInvoicePdf.js';
import Footer from './../../components/footer/footer.js';
import SearchModal from './../../components/modals/searchModal.js';
import FilterModal from './../../components/modals/filterModal.js';
import VerificationModal from './../../components/modals/verificationModal.js';
import FlashAlert from './../../components/cards/FlashAlertCard.js';
import Copy from './../../assets/images/icons/copy.svg';
import Checklist from './../../assets/images/icons/checklist2.svg';
import Sms from './../../assets/images/icons/sms.svg';
import {Router} from './../../routes.js';
import dynamic from 'next/dynamic';

export const Sidebar = dynamic(() => {
    return import('./../../components/sidebar/sidebar.js')
},{ ssr:false });

export const Header = dynamic(() => {
    return import('./../../components/header/header.js')
},{ ssr:false });


const dataOrder = [
    {
        orderID: 12343,
        status: 'batal',
        product: {
            name: 'VANS AUTHENTIC DG DRESS BLUE IVORY',
            size: 40,
            amount:2,
        },
        pay: 754000,
        date: new Date(),
    }
];


export default class WaitingPayOrder extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            openSearch : false,
            openFilter : false,
            openDownload : false,
            namePage : 'ATM',
            showSidebar : false,
            showCopyAlert : false,
            showVerification : false,
            dataOrder : 
                {
                    orderID: 12343,
                    status: 'batal',
                    product: {
                        name: 'VANS AUTHENTIC DG DRESS BLUE IVORY',
                        size: 40,
                        amount:2,
                    },
                    pay: 754000,
                    date: new Date(),
                }
        }
    }

    onOpenDownload = () => {
        this.setState({ openDownload : true });
    }

    onOpenSearch = () => {
        this.setState({ openSearch : true });
    }

    onOpenFilter = () => {
        this.setState({ openFilter : true });
    }

    onCloseSearch = () => {
        this.setState({ openSearch : false });
    }

    onCloseFilter = () => {
        this.setState({ openFilter : false });
    }

    copyElement = elementToCopy => {
        var TempText = document.createElement("input");
        TempText.value = elementToCopy;
        document.body.appendChild(TempText);
        TempText.select();
        
        document.execCommand("copy");
        document.body.removeChild(TempText);
        
        this.setState({ showCopyAlert:true });
        setTimeout(() => this.setState({ showCopyAlert:false }),1000)
    }

    pushProfileRoute = () => {
        Router.pushRoute('/orders');
    }

    pushMessageRoute = () => {
        Router.pushRoute('/messages');
    }

    rejectedOrder = () => {
        Router.pushRoute('/orders/1/rejected');
    }

    render(){
        return (
            <div className="bg-gray-lighter flex flex-col w-full min-h-screen mb-auto">
                <Header
                    clickMenu={() => this.pushProfileRoute()}
                    changeIcon={this.state.showSidebar}
                    searchOnClick={this.onOpenSearch} 
                    filterOnClick={this.onOpenFilter}
                    downloadOnClick={() => this.setState({ showVerification:true })}
                    displayDownload={true}
                    displayProfile={true}
                />
                {this.state.showCopyAlert ? (
                    <FlashAlert
                        message="Berhasil disalin"  
                    />
                ) : null}
                <SearchModal onOpenSearch={this.state.openSearch} onCloseSearch={this.onCloseSearch} />
                <FilterModal onOpenFilter={this.state.openFilter} onCloseFilter={this.onCloseFilter} />
                <VerificationModal 
                    download={() => {
                        this.setState({ showVerification:false })
                        OrderInvoicePdf()
                    }}
                    openVerificationModal={this.state.showVerification} 
                    onCloseVerificationModal={() => this.setState({ showVerification:false })}
                />
                <Sidebar
                    searchOnClick={this.onOpenSearch} 
                />
                <div className="bg-gray-lighter flex flex-auto relative min-h-screen lg:ml-auto xl:w-8/10 lg:w-3/4">
                    <div className="w-full px-2 hp-one:px-6 xl:px-0 xl:w-3/4 mx-auto pt-4 pb-16">
                        <div className="">
                            <p className="text-base hp-one:text-xl font-semibold text-black-darker leading-6 mb-2">Order Saya</p>
                            <p className="text-sm lg:text-base font-bold text-black-darker leading-5">No. Order: 013275</p>
                            <p className="text-sm text-gray-lighter-1 leading-4 mb-4">(Order Berhasil {format(new Date(),'MM/dd/yyyy')})</p>
                            <hr className="border-b-1 border-gray-300 my-2" />
                        </div>
                        <div className="w-full my-2 pt-6">
                            <div className="flex flex-nowrap flex-auto w-1/3 md:w-1/6 mb-4">
                                <div className="flex-shrink items-center">
                                    <div className="rounded-full w-6 h-6 hp-one:w-8 hp-one:h-8 flex items-center inline-flex justify-center bg-red-darker-1 align-middle">
                                        <Checklist className="w-4 h-4 hp-one:w-6 hp-one:h-6" />
                                    </div>
                                </div>
                                <div className="flex flex-nowrap flex-shrink items-center">
                                    <hr className="flex-1 max-w-6 w-6 block border-gray-lighter-4" />
                                    <div className="rounded-full w-6 h-6 hp-one:w-8 hp-one:h-8 flex items-center justify-center bg-white">
                                        <div className="rounded-full w-2 h-2 bg-gray-lighter-4"></div>
                                    </div>
                                </div>
                                <div className="flex flex-nowrap flex-shrink items-center">
                                    <hr className="flex-1 max-w-6 w-6 block border-gray-lighter-4" />
                                    <div className="rounded-full w-6 h-6 hp-one:w-8 hp-one:h-8 flex items-center justify-center bg-white">
                                        <div className="rounded-full w-2 h-2 bg-gray-lighter-4"></div>
                                    </div>
                                </div>
                                <div className="flex flex-nowrap flex-shrink items-center">
                                    <hr className="flex-1 max-w-6 w-6 block border-gray-lighter-4" />
                                    <div className="rounded-full w-6 h-6 hp-one:w-8 hp-one:h-8 flex items-center justify-center bg-white">
                                        <div className="rounded-full w-2 h-2 bg-gray-lighter-4"></div>
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm hp-one:text-lg font-bold text-red-darker-1">Status : Menunggu Pembayaran</p>
                            <div className="mt-2 mb-4">
                                <div className="flex flex-auto flex-nowrap">
                                    <span className="bg-gray-lighter focus:outline-none select-none font-semibold text-base lg:text-xl text-black-darker leading-6">Rp. {numeral(754000).format('0,0')}</span>
                                    <button onClick={() => this.copyElement(754000)} className="focus:outline-none transition duration-300 ease-in-out transform active:scale-90 hover:scale-110">
                                        <Copy className="inline-block stroke-current stroke-0 text-black cursor-pointer h-4 w-4 hp-one:h-6 hp-one:w-6" />
                                    </button>
                                </div>
                                <p className="text-xs font-semibold text-red-darker-1">Transfer sebelum <b>{format(new Date(), "dd/MM/yyyy hh.mm")}</b></p>
                            </div>
                        </div>
                        <div className="flex flex-nowrap flex-auto my-2 w-full">
                            <div className="flex-1 w-11/12">
                                <p className="text-sm hp-one:text-base flex flex-auto text-black-darker">Mandiri - Virtual Account</p>
                                <div className="flex flex-auto flex-nowrap">
                                    <span className="bg-gray-lighter focus:outline-none select-none font-semibold text-base lg:text-xl text-black-darker leading-6">7001400400292806</span>
                                    <button onClick={() => this.copyElement(7001400400292806)} className="focus:outline-none transition duration-300 ease-in-out transform active:scale-90 hover:scale-110">
                                        <Copy className="inline-block stroke-current stroke-0 text-black cursor-pointer h-4 w-4 hp-one:h-6 hp-one:w-6" />
                                    </button>
                                </div>
                                <p className="text-xs font-semibold text-red-darker-1">Ke: EPAY - OL Shoes fff</p>
                            </div>
                            <div className="flex flex-none">
                                <img 
                                    src="https://logos-download.com/wp-content/uploads/2016/06/Bank_Mandiri_logo_fon.png" 
                                    className="w-8 h-8 hp-one:w-12 hp-one:h-12 self-center"
                                />
                            </div>
                        </div>
                        <div className="bg-flat-orange mt-4">
                            <div className="flex flex-auto flex-nowrap w-full border-b-2 border-gray-200">
                                <button
                                    onClick={() => this.setState({ namePage: 'ATM' }) }
                                    className={"flex justify-center tracking-tighter w-1/3 py-2 text-gray-lighter-1 text-xs lg:text-base transition duration-300 ease-in-out hover:bg-red-100 focus:outline-none " + (this.state.namePage === "ATM" ? "border-b-2 border-orange-darker text-black-lighter-1 font-semibold" : "")}
                                >
                                    ATM
                                </button>
                                <button
                                    onClick={() => this.setState({ namePage: 'Mobile Banking' }) }
                                    className={"flex justify-center tracking-tighter w-1/3 py-2 text-gray-lighter-1 text-xs lg:text-base transition duration-300 ease-in-out hover:bg-red-100 focus:outline-none " + (this.state.namePage === "Mobile Banking" ? "border-b-2 border-orange-darker text-black-lighter-1 font-semibold" : "")}
                                >
                                    Mobile Banking
                                </button>
                                <button
                                    onClick={() => this.setState({ namePage: 'Internet Banking' }) }
                                    className={"flex justify-center tracking-tighter w-1/3 py-2 text-gray-lighter-1 text-xs lg:text-base transition duration-300 ease-in-out hover:bg-red-100 focus:outline-none " + (this.state.namePage === "Internet Banking" ? "border-b-2 border-orange-darker text-black-lighter-1 font-semibold" : "")}
                                >
                                    Internet Banking
                                </button>
                            </div>
                            <div className="w-full p-2 hp-one:p-4">
                                {this.state.namePage === 'ATM' ? (
                                    <div className="text-orange-lighter-1">
                                        <p className="text-base hp-one:text-lg font-semibold leading-6 mb-4">Bagaimana cara membayar:</p>
                                        <ol className="list-decimal list-inside text-xs hp-one:text-sm lg:text-base">
                                            <li className="mb-4">Masukkan kartu ATM dan Pin</li>
                                            <li className="mb-4">Pilih Menu Bayar/Beli.</li>
                                            <li className="mb-4">Pilih menu Lainnya, hingga menemukan menu Multipayment.</li>
                                            <li className="mb-4">Masukkan kode biller Tokopedia 88708, lalu pilih Benar.</li>
                                            <li className="mb-4">Masukkan Nomor Virtual Account Tokopedia, lalu pilih tombol Benar.</li>
                                            <li className="mb-4">Masukkan Angka 1 untuk memilih tagihan, lalu pilih tombol Ya.</li>
                                            <li className="mb-4">Akan muncul konfirmasi pembayaran, lalu pilih tombol Ya.</li>
                                            <li>Simpan struk sebagai bukti pembayaran Anda.</li>
                                        </ol>
                                    </div>
                                ) : null 
                                }
                                {this.state.namePage === 'Mobile Banking' ? (
                                    <div className="text-orange-lighter-1">
                                        <p className="text-base hp-one:text-lg font-semibold leading-6 mb-4">Bagaimana cara membayar:</p>
                                        <ol className="list-decimal list-inside text-xs hp-one:text-sm lg:text-base">
                                            <li className="mb-4">Masukkan kartu ATM dan Pin</li>
                                            <li className="mb-4">Pilih Menu Bayar/Beli.</li>
                                            <li className="mb-4">Pilih menu Lainnya, hingga menemukan menu Multipayment.</li>
                                            <li className="mb-4">Masukkan kode biller Tokopedia 88708, lalu pilih Benar.</li>
                                            <li className="mb-4">Masukkan Nomor Virtual Account Tokopedia, lalu pilih tombol Benar.</li>
                                            <li className="mb-4">Masukkan Angka 1 untuk memilih tagihan, lalu pilih tombol Ya.</li>
                                            <li className="mb-4">Akan muncul konfirmasi pembayaran, lalu pilih tombol Ya.</li>
                                            <li>Simpan struk sebagai bukti pembayaran Anda.</li>
                                        </ol>
                                    </div>
                                ) : null
                                }
                                {this.state.namePage === 'Internet Banking' ? (
                                    <div className="text-orange-lighter-1">
                                        <p className="text-base hp-one:text-lg font-semibold leading-6 mb-4">Bagaimana cara membayar:</p>
                                        <ol className="list-decimal list-inside text-xs hp-one:text-sm lg:text-base">
                                            <li className="mb-4">Login Mandiri Online dengan memasukkan username dan password.</li>
                                            <li className="mb-4">Pilih menu Pembayaran.</li>
                                            <li className="mb-4">Pilih menu Multipayment.</li>
                                            <li className="mb-4">Pilih penyedia jasa “Tokopedia.</li>
                                            <li className="mb-4">Masukkan Nomor Virtual Account dan Nominal yang akan dibabayarkan, lalu pilih Lanjut.</li>
                                            <li className="mb-4">Setelah muncul tagihan, pilih Konfirmasi.</li>
                                            <li className="mb-4">Masukkan PIN/ challange code token.</li>
                                            <li>Transaksi selesai, simpan bukti bayar kamu.</li>
                                        </ol>
                                    </div>
                                ) : null
                                }
                            </div>
                        </div>
                        <hr className="border-b-1 border-gray-300 my-6" />
                        <div className="flex flex-auto flex-nowrap w-full">
                            <div className="flex flex-none">
                                <img 
                                    src="/images/products/converse.jpg"
                                    className="self-center w-8 h-8 hp-one:w-12 hp-one:h-12"
                                />
                            </div>
                            <div className="flex-1 w-10/12 ml-2 whitespace-nowrap overflow-ellipsis overflow-hidden">
                                <p className="block uppercase text-sm lg:text-base text-gray-lighter-2 tracking-tighter font-bold whitespace-nowrap overflow-ellipsis overflow-hidden">VANS OLD SKOOL BLACK WHITE</p>
                                <p className="uppercase text-sm lg:text-base text-gray-lighter-1">SIZE 40</p>
                                <p className="text-xs lg:text-sm text-gray-lighter-1">Rp. {numeral(280000).format('0,0')}</p>
                            </div>
                            <div className="flex-shrink font-bold text-sm lg:text-base">
                                <span className="my-4 float-right text-gray-lighter-2">3</span>
                            </div>
                        </div>
                        <hr className="border-b-1 border-gray-300 my-2" />
                        <div className="py-2">
                            <div className="w-full py-2">
                                <span className="float-left text-xs lg:text-sm text-gray-lighter-1 font-medium">Harga Normal Produk</span>
                                <span className="float-right font-bold text-xs hp-one:text-sm lg:text-base text-black-darker">Rp. {numeral(840000).format('0,0')}</span>
                            </div>
                            <div className="w-full py-4">
                                <span className="float-left text-xs lg:text-sm text-gray-lighter-1 font-medium">Ongkos Kirim</span>
                                <span className="float-right font-bold text-xs hp-one:text-sm lg:text-base text-black-darker">(3.0 Kg) Rp. {numeral(24000).format('0,0')}</span>
                            </div>
                            <div className="w-full py-2">
                                <span className="float-left text-xs lg:text-sm text-gray-lighter-1 font-medium">Diskon Pengiriman</span>
                                <span className="float-right font-bold text-xs hp-one:text-sm lg:text-base text-black-darker"> -Rp. {numeral(20000).format('0,0')}</span>
                            </div>
                            <div className="w-full py-4">
                                <span className="float-left text-xs lg:text-sm text-gray-lighter-1 font-medium">Diskon</span>
                                <span className="float-right font-bold text-xs hp-one:text-sm lg:text-base text-black-darker"> -Rp. {numeral(90000).format('0,0')}</span>
                            </div>
                            <div className="w-full py-2">
                                <span className="float-left text-xs lg:text-sm text-gray-lighter-1 font-medium">Total Harga Order</span>
                                <span className="float-right font-bold text-xs hp-one:text-sm lg:text-base text-black-darker">Rp. {numeral(754000).format('0,0')}</span>
                            </div>
                        </div>
                        <div className="flex flex-auto flex-nowrap w-full mt-4">
                            <div className="flex flex-none">
                                <img 
                                    src="https://logos-download.com/wp-content/uploads/2016/06/Bank_Mandiri_logo_fon.png"
                                    className="self-center w-8 h-8 hp-one:w-12 hp-one:h-12"
                                />
                            </div>
                            <div className="flex-1 w-9/12 md:w-9/12 ml-1 md:ml-2">
                                <p className="font-bold text-xs hp-one:text-sm lg:text-base text-black-darker">Mandiri</p>
                                <p className="text-gray-lighter-1 text-tiny hp-one:text-xs lg:text-sm font-medium">7001400400400292806</p>
                                <p className="text-gray-lighter-1 text-tiny hp-one:text-xs lg:text-sm font-medium">Metode Pembayaran</p>
                            </div>
                            <p className="flex-shrink md:w-2/12 text-xs hp-one:text-sm lg:text-base self-center font-bold text-right text-black-darker break-words tracking-tighter">Belum Terbayar</p>
                        </div>
                        <button
                            className="w-full p-2 mt-4 h-8 hp-one:h-12 bg-white text-black-darker text-xs hp-one:text-sm shadow-md font-semibold text-center hover:bg-gray-lighter-5 active:bg-gray-lighter-3 transition duration-300 ease-in-out focus:outline-none rounded-md"
                        >
                            Ubah Metode Pembayaran
                        </button>
                        <hr className="border-b-1 border-gray-300 my-4" />
                        <div className="flex flex-auto flex-nowrap w-full">
                            <div className="flex flex-none">
                                <img 
                                    src="https://upload.wikimedia.org/wikipedia/commons/9/92/New_Logo_JNE.png"
                                    className="self-center w-8 h-8 hp-one:w-12 hp-one:h-12"
                                />
                            </div>
                            <div className="flex-1 w-9/12">
                                <p className="font-bold text-xs hp-one:text-sm lg:text-base text-black-darker">JNE OKE</p>
                                <p className="text-gray-lighter-1 text-tiny hp-one:text-xs lg:text-sm font-medium">Rp. {numeral(4000).format('0,0')}</p>
                                <p className="text-gray-lighter-1 text-tiny hp-one:text-xs lg:text-sm font-medium">Metode Pengiriman</p>
                            </div>
                            <p className="flex-shrink text-xs hp-one:text-sm lg:text-base self-center font-bold text-right text-black-darker tracking-tighter">Belum Terkirim</p>
                        </div>
                        <div className="py-2">
                            <p className="text-tiny hp-one:text-sm lg:text-base text-black-darker">Hubungi JNE untuk kendala terkait pengiriman</p>
                            <p className="text-tiny hp-one:text-sm lg:text-base text-red-darker-1">(Pusat Bantuan)</p>
                        </div>
                        <hr className="border-b-1 border-gray-300 my-2" />
                        <div className="py-2">
                            <p className="text-tiny hp-one:text-sm lg:text-base text-gray-lighter-3">Nama Penerima</p>
                            <p className="text-tiny hp-one:text-sm lg:text-base font-semibold text-black-darker">fff</p>
                        </div>
                        <div className="py-2">
                            <p className="text-tiny hp-one:text-sm lg:text-base text-gray-lighter-3">Nomor HP Penerima</p>
                            <p className="text-tiny hp-one:text-sm lg:text-base font-semibold text-black-darker">+6285315099969</p>
                        </div>
                        <div className="py-2">
                            <p className="text-tiny hp-one:text-sm lg:text-base text-gray-lighter-3">Alamat Penerima</p>
                            <p className="text-tiny hp-one:text-sm lg:text-base font-semibold text-black-darker">ddede</p>
                            <p className="text-tiny hp-one:text-sm lg:text-base font-semibold text-black-darker">Bekasi, Cikarang Barat</p>
                        </div>
                        <div className="py-2">
                            <p className="text-tiny hp-one:text-sm lg:text-base text-gray-lighter-3">Email</p>
                            <p className="text-tiny hp-one:text-sm lg:text-base font-semibold text-black-darker">nogir16111998@gmail.com</p>
                        </div>
                        <div className="py-2">
                            <p className="text-tiny hp-one:text-sm lg:text-base text-gray-lighter-3">Nama Pengirim</p>
                            <p className="text-tiny hp-one:text-sm lg:text-base font-semibold text-black-darker">OLSHOES</p>
                        </div>
                        <div className="py-2">
                            <p className="text-tiny hp-one:text-sm lg:text-base text-gray-lighter-3">Nomor HP Pengirim</p>
                            <p className="text-tiny hp-one:text-sm lg:text-base font-semibold text-black-darker">0813-2122-1212</p>
                        </div>
                        <button
                            className="w-full p-2 my-2 bg-white text-black-darker text-sm shadow-md font-semibold text-center hover:bg-gray-lighter-5 active:bg-gray-lighter-3 transition duration-300 ease-in-out focus:outline-none rounded-md"
                        >
                            Ubah Info 
                        </button>
                        <hr className="border-b-1 border-gray-300 my-2" />
                        <button
                            onClick={this.pushMessageRoute}
                            className="flex w-full p-2 my-2 bg-gray-lighter-4 h-8 hp-one:h-12 shadow-md font-semibold text-black-darker text-xs hp-one:text-sm text-center focus:outline-none hover:bg-gray-lighter-5 active:bg-gray-lighter-3 transition duration-300 ease-in-out rounded-md"
                        >
                            <Sms className="inline-block float-left stroke-current stroke-0 black self-center h-4 w-4 hp-one:h-6 hp-one:w-6" />
                            <span className="mx-auto self-center">Kirim Pesan ke OLSHOES?</span>
                        </button>
                        <button
                            onClick={() => this.rejectedOrder()}
                            className="w-full p-2 my-2 shadow-md font-semibold h-8 hp-one:h-12 text-center text-xs hp-one:text-sm bg-red-darker-1 hover:opacity-90 active:bg-opacity-50 active:bg-red-darker-1 focus:outline-none transition duration-300 linear text-white rounded-md"
                        >
                            Batalkan Pesanan
                        </button>
                        <p className="text-tiny hp-one:text-xs py-2 text-black-darker">Mohon hubungi NICEPAY terkait kendala pembayaran.</p>
                        <div className="w-full flex justify-end py-4">
                            <div className="py-2">
                                <a 
                                    className="block p-2 my-2 shadow-md font-semibold text-center bg-gray-lighter-4 hover:bg-gray-300 active:bg-gray-400 focus:outline-none transition duration-300 linear text-gray-700 rounded-md"
                                    href="https://www.tokoepay.com/faq"
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                >
                                    <span className="block no-underline text-black-darker text-right underline text-red-600 cursor-pointer text-xs hp-one:text-sm">Punya Pertanyaan?</span>
                                </a>
                                <a 
                                    target="_blank"  
                                    href='/terms-and-conditions'
                                    rel="noopener noreferrer"
                                >
                                    <span className="block text-right underline text-red-darker-1 text-tiny hp-one:text-xs lg:text-sm cursor-pointer">Syarat & Ketentuan</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}