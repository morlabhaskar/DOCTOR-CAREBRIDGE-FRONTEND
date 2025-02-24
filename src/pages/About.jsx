import React from 'react'

const About = () => {
  return (
    <div class="max-w-6xl mx-auto p-6">
        <header class="text-center py-8">
            <h1 class="text-4xl font-bold text-primary">About Us</h1>
            <p class="text-gray-600 mt-2 dark:text-whi2">Your Trusted Online Prescripto Healthcare Partner</p>
        </header>
        
        <section class="bg-white shadow-lg rounded-lg p-6 md:p-10 dark:bg-dar dark:border">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4 dark:text-whi">Our Mission</h2>
            <p class="text-gray-600 leading-relaxed dark:text-whi2">
                At <span class="font-semibold text-primary">MediCare</span>, we strive to make healthcare accessible, efficient, and seamless. 
                Our platform connects patients with top medical professionals, allowing them to book appointments online with ease.
            </p>
        </section>
        
        <section class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 dark:bg-dar ">
            <div class="bg-white shadow-lg rounded-lg p-6 dark:bg-dar dark:border">
                <h3 class="text-xl font-semibold text-gray-800 mb-3 dark:text-whi">What We Offer</h3>
                <ul class="text-gray-600 space-y-2 dark:text-whi2">
                    <li>✓ Easy Online Appointment Booking</li>
                    <li>✓ Access to Certified Doctors</li>
                    <li>✓ Secure Medical Records</li>
                    <li>✓ Telemedicine Consultations</li>
                    <li>✓ 24/7 Customer Support</li>
                </ul>
            </div>
            <div class="bg-white shadow-lg rounded-lg p-6 dark:bg-dar dark:border">
                <h3 class="text-xl font-semibold text-gray-800 mb-3 dark:text-whi">Meet Our Experts</h3>
                <p class="text-gray-600 dark:text-whi2">Our team consists of experienced doctors and healthcare professionals dedicated to providing quality care. We ensure that you receive the best medical consultation from the comfort of your home.</p>
            </div>
        </section>
    </div>
  )
}

export default About