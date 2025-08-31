import React from "react";

function About() {
  return (
    <div className="flex justify-center items-center md:m-10 m-5">
<section className="w-full max-w-5xl mx-auto px-6 py-16 bg-white rounded-3xl p-5">
      <h1 className="text-4xl font-bold text-center mb-6">About Tama Clothing</h1>
      <p className="text-lg text-gray-700 text-center mb-12">
        Tama Clothing is a Tunisian fashion brand that celebrates tradition, modernity, 
        and authenticity. Our mission is to create high-quality clothing that reflects 
        the vibrant culture of Tunisia while embracing a contemporary lifestyle.
      </p>

      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="text-gray-600 leading-relaxed">
            Founded in Tunisia, Tama Clothing was born out of a passion for style 
            and heritage. We blend traditional Tunisian patterns and fabrics with 
            modern designs to create pieces that are both timeless and trendy. 
            Every collection reflects our dedication to craftsmanship and cultural pride.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            We aim to inspire confidence and individuality through fashion. 
            By combining sustainable practices and creative design, 
            Tama Clothing stands for more than style — it represents identity, 
            culture, and a commitment to the future.
          </p>
        </div>
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">Why Choose Tama?</h2>
        <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
          At Tama, we believe clothing is more than fabric — it’s a story. 
          From handpicked materials to carefully designed collections, 
          we ensure each piece represents the richness of Tunisian heritage 
          with a modern twist.
        </p>
      </div>
    </section>
    </div>
    
  );
}

export default About;