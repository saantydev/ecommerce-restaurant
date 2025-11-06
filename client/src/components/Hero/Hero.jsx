import React from 'react';
import { ArrowRight, Star, Truck, Shield, Heart } from 'lucide-react';
import OffersSlider from '../OffersSlider/OffersSlider';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary-50 to-secondary-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 text-6xl">🐕</div>
        <div className="absolute top-32 right-20 text-4xl">🐱</div>
        <div className="absolute bottom-20 left-20 text-5xl">🐾</div>
        <div className="absolute bottom-32 right-10 text-3xl">🦴</div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-sm font-medium">
                <Star className="w-4 h-4 mr-2 fill-current" />
                Productos Premium para Mascotas
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-secondary-800 leading-tight">
                Todo lo que tu
                <span className="text-primary-500 block">mascota necesita</span>
              </h1>
              
              <p className="text-lg text-secondary-600 leading-relaxed">
                Descubre nuestra colección de productos premium diseñados especialmente 
                para el bienestar y felicidad de tu compañero peludo.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn btn-primary group">
                Ver Productos
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="btn btn-outline">
                Comederos Wi-Fi
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Truck className="w-6 h-6 text-primary-500" />
                </div>
                <p className="text-sm font-medium text-secondary-700">Envío Gratis</p>
                <p className="text-xs text-secondary-500">Desde $120.000</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Shield className="w-6 h-6 text-primary-500" />
                </div>
                <p className="text-sm font-medium text-secondary-700">Garantía</p>
                <p className="text-xs text-secondary-500">100% Seguro</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Heart className="w-6 h-6 text-primary-500" />
                </div>
                <p className="text-sm font-medium text-secondary-700">Calidad</p>
                <p className="text-xs text-secondary-500">Premium</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-slide-up">
            <div className="relative">
              {/* Main Product Card */}
              <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="aspect-square bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl mb-6 flex items-center justify-center">
                  <div className="text-6xl">🍽️</div>
                </div>
                <h3 className="text-xl font-bold text-secondary-800 mb-2">Comedero Wi-Fi Premium</h3>
                <p className="text-secondary-600 mb-4">Control inteligente desde tu móvil</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary-500">$89.999</span>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium animate-bounce-soft">
                ¡Nuevo!
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-3 animate-fade-in" style={{animationDelay: '0.5s'}}>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-secondary-700">En Stock</p>
                    <p className="text-xs text-secondary-500">Envío inmediato</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;