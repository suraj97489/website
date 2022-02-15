import React from "react";
import Booking from "./booking/Booking";
// import Testimonials from "./Testimonials/Testimonials";
import Hero from "./Hero/Hero";

function HomePage() {
  return (
    <>
      <Helmet>
        <title>Salonkatta</title>
        <meta
          name="description"
          content="Salonkatta is a apointments booking platform where customers can book appointments for free and no registration fee is charged from salons."
        />
        <link rel="canonical" href="/" />
      </Helmet>
      <Hero />
      <Booking />
      {/* <Testimonials /> */}
    </>
  );
}

export default HomePage;
