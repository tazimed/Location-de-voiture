import { useState, useEffect } from "react";
import "aos/dist/aos.css";
import "./home.css";
import Aos from "aos";
import About from "./home/about";
import Header from "./home/header";
import ShowCars from "./showCars";
import Footer from "./home/footer";
import axios from "axios";

export default function Home() {
  const [searchInformation, setsearchInformation] = useState({
    datedebut: new Date().toISOString().split("T")[0],
    datefin: "",
  });

  // Handle search submission
  function chercher(event) {
    event.preventDefault();
    console.log(searchInformation);
    axios
      .post("http://localhost:4000/home", searchInformation)
      .then((Response) => {
        console.log("response :", Response);
      })
      .catch((error) => {
        console.error("error :", error);
      });
    window.location.reload();
  }

  useEffect(() => {
    Aos.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      {/* Header */}
      <div className="">
        <Header />
      </div>

      {/* Main Content */}
      <main className="flex-1 pt-20 ">
        <section className="container mx-auto flex flex-col lg:flex-row lg:items-center h-full">
          {/* Form Section */}
          <div className="w-full lg:w-1/2 p-4 flex justify-center">
            <form className="flex flex-col w-full max-w-sm" onSubmit={chercher}>
              <select className="w-full p-2 border rounded dark:bg-gray-900">
                <option>choisir la ville</option>
                <option>TAZA</option>
                <option>FES</option>
                <option>MEKNES</option>
              </select>
              <label className="block mt-4 text-center">Date de début</label>
              <input
                value={
                  searchInformation.datedebut ||
                  new Date().toISOString().split("T")[0]
                }
                onChange={(event) => {
                  setsearchInformation({
                    ...searchInformation,
                    datedebut: event.target.value,
                  });
                }}
                className="w-full p-2 border rounded dark:bg-gray-900"
                type="date"
              />
              <label className="block mt-4 text-center">Date de fin</label>
              <input
                onChange={(event) => {
                  setsearchInformation({
                    ...searchInformation,
                    datefin: event.target.value,
                  });
                }}
                className="w-full p-2 border rounded dark:bg-gray-900"
                type="date"
              />
              <input
                className="w-full p-2 border rounded mt-10 hover:shadow-lg hover:shadow-black transition-all dark:hover:shadow-slate-300 duration-300"
                value="chercher"
                type="submit"
              />
            </form>
          </div>

          {/* Image Section */}
          <div className="lg:w-2/3 p-4 flex justify-center overflow-hidden">
            <img
              className="max-w-full h-auto object-contain"
              src="/images/vertical2.png"
              alt="Car"
            />
          </div>
        </section>

        {/* Products Section */}
        <div id="productsSection" className="container mx-auto mt-10">
          <ShowCars searchInformation={searchInformation} />
        </div>
      </main>

      {/* About Section */}
      <About />

      {/* Footer */}
      <Footer />
    </div>
  );
}
