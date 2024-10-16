import React from 'react'
import Uprofile from './Uprofile'
import Wishlist from '../Pages/Process/Wishlist'

const Uwishlist = () => {
  return (
    <div>
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-lg-2 col-md-2 m-0 p-0'>
                    <div>
                        <Uprofile />
                    </div>
                </div>
                <div className='col-lg-10 col-md-10'>
                    <div>
                        <Wishlist />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Uwishlist