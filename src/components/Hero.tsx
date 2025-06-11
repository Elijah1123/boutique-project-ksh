
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Discover Your
                <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                  Perfect Style
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-md">
                Elevate your wardrobe with our curated collection of premium clothing. 
                Fashion that speaks your language.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                Shop Collection
              </Button>
              <Button variant="outline" size="lg">
                View Lookbook
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold">10K+</div>
                <div className="text-sm text-muted-foreground">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">500+</div>
                <div className="text-sm text-muted-foreground">Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">50+</div>
                <div className="text-sm text-muted-foreground">Brands</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-3xl transform rotate-6 opacity-20"></div>
            <div className="relative bg-white p-8 rounded-3xl shadow-2xl">
              <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white text-4xl font-bold">S</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-700">StyleHub Collection</p>
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
