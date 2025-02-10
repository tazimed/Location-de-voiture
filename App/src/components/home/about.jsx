function About() {
  return (
    <section
      id="aboutSection"
      className="container w-full bg-white py-8 px-4 mt-8"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <img
          src="/images/driveNOW.png"
          alt="DriveNOW Logo"
          data-aos="fade-left"
          className="w-80 h-80 object-contain"
        />
        <p className="text-lg text-gray-700 max-w-xl" data-aos="fade-right">
          At DriveNOW, we make renting a car simple, affordable, and convenient.
          Whether you’re planning a weekend getaway, a business trip, or need a
          vehicle for daily commuting, we’ve got the perfect car for you.
        </p>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mt-0 pt-0">
        <div>
          <p className="text-lg text-gray-700 max-w-lg" data-aos="fade-right">
            DriveNOW offers exceptional customer service, competitive pricing,
            and a seamless rental experience. Whether you’re booking online or
            visiting us in person, we ensure your car rental journey is smooth
            from start to finish.
          </p>
        </div>

        <div className="w-1/2">
          <img
            className="w-auto h-auto object-contain"
            src="/images/car rental.png"
            alt="A rental car in pristine condition, ready for travel"
            data-aos="fade-left"
          />
        </div>
      </div>
    </section>
  );
}

export default About;
