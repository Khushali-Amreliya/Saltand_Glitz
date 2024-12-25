import React, { useState } from 'react'
import { formatCurrency } from '../Utils/formateCurrency';

const Plan = () => {
    const [sliderValue, setSliderValue] = useState(5000);

    const instalment = sliderValue * 10
    return (
        <>
            <section className="bg_purchase"></section>
            <section className='container py-5'>
                <div className='row'>
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 align-items-center d-flex'>
                        <div>
                            <div className='purchase_calculate'>
                                <h3>Calculate your PoP!</h3>
                                <p>Enter the amount (Min ₹1,000) you’d like to keep aside with us for 9 months and see the benefit.</p>
                            </div>
                            <div className='purchase_container'>
                                <div className='purchase_instalment'>
                                    <p>Monthly Instalment</p>
                                    <p>Multiples of ₹1,000 only</p>
                                </div>
                                <div className='purchase_amount'>
                                    <p>Amount</p>
                                    <p>{sliderValue}</p>
                                </div>
                            </div>
                            <div className="minimal-range-slider">
                                <input
                                    type="range"
                                    min="1000"
                                    max="200000"
                                    step="1000"
                                    value={sliderValue}
                                    onChange={(e) => setSliderValue(e.target.value)}
                                />
                            </div>
                            <div className='purchase_final_instalment mt-4'>
                                <h6>Redemption value after 9 months :</h6>
                                <h5 className='my-0'>{formatCurrency(instalment)}</h5>
                                <p>(Your 10th instalment is free!)</p>
                                <button className='btn mx-auto d-block w-100'>ENROL NOW</button>
                            </div>
                        </div>
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12'>
                        <img alt='' src='https://assets.cltstatic.com/images/responsive/pop/pop-calculation-chart.png?v2.0' className='img-fluid mx-auto d-block'></img>
                        <div className="final_instalments">
                            <div className="instalment">
                                <div className="instalment_icon"></div>
                                <p>Your Instalments</p>
                            </div>
                            <div className="instalment">
                                <div className="benefit_icon"></div>
                                <p>CaratLane Benefit</p>
                            </div>
                        </div>

                        <div className='purchase_final_instalment2'>
                            <p className='m-0 p-0'>Your Instalments (9 Months)<span>₹9,000</span></p>
                            <p className='m-0 p-0'>Saltand Glitz Benefit (10th Instalment)<span>{formatCurrency(sliderValue)}</span></p>
                            <p className='m-0 p-0'>Total Redeemable Amount<span>{formatCurrency(instalment)}</span></p>
                        </div>
                    </div>
                </div>
            </section>
            <section className='container-fluid bg_works'>
                <h3 className='font_main text-center pb-3'>How it works?</h3>
                <div className='row'>
                    <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12'>
                        <div>
                            <div className='purchase_box'>
                                <p>Save a fixed monthly amount
                                with Saltand Glitz</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12'>
                        <div>
                            <div className='purchase_box'>
                                <p>As a Saltand Glitz Benefit, get the 10th instalment free!</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12'>
                        <div>
                            <div className='purchase_box'>
                                <p>After 10 months, shop your favourite design online or at the store!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Plan