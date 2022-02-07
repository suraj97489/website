import React from 'react'

function Testimonialsingle(props) {
    return (
        <>
         <div className="box">
                            <p>I am using SALONKATTA platform from last 2 months and I can assure that experience is very
                                joyful. This
                                platform is not only useful for customers but also for service providers/salon owners.
                                I can manage my sales report on daily ,weekly ,monthly ,yearly basis . As I am receiving less
                                calls I can
                                focus on work peacefully.</p>
                            <strong>{props.name}</strong>
                            <p>{props.salon}</p>
                        </div>
        </>
    )
}

export default Testimonialsingle
