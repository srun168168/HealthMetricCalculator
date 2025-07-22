import { Link } from "wouter";

export function Footer() {
  const footerSections = [
    {
      title: "Get to Know Us",
      links: [
        "Careers",
        "Blog",
        "About Amazon",
        "Investor Relations",
        "Amazon Devices",
        "Amazon Science"
      ]
    },
    {
      title: "Make Money with Us",
      links: [
        "Sell products on Amazon",
        "Sell on Amazon Business",
        "Sell apps on Amazon",
        "Become an Affiliate",
        "Advertise Your Products",
        "Self-Publish with Us"
      ]
    },
    {
      title: "Amazon Payment Products",
      links: [
        "Amazon Business Card",
        "Shop with Points",
        "Reload Your Balance",
        "Amazon Currency Converter"
      ]
    },
    {
      title: "Let Us Help You",
      links: [
        "Amazon and COVID-19",
        "Your Account",
        "Your Orders",
        "Shipping Rates & Policies",
        "Returns & Replacements",
        "Manage Your Content and Devices"
      ]
    }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Back to Top */}
      <div 
        className="bg-gray-700 py-4 text-center cursor-pointer hover:bg-gray-600 transition-colors"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <span className="text-sm">Back to top</span>
      </div>

      {/* Main Footer Content */}
      <div className="bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {footerSections.map((section, index) => (
              <div key={index}>
                <h3 className="font-semibold text-white mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link 
                        href="#" 
                        className="text-gray-300 hover:text-white text-sm transition-colors"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700"></div>

      {/* Logo and Language/Country */}
      <div className="bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
            {/* Logo */}
            <Link href="/">
              <div className="text-2xl font-bold">
                amazon
                <span className="text-orange-400">.com</span>
              </div>
            </Link>

            {/* Language and Country */}
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 border border-gray-600 px-3 py-1 rounded hover:bg-gray-800">
                <span className="text-sm">🌐 English</span>
              </button>
              <button className="flex items-center space-x-2 border border-gray-600 px-3 py-1 rounded hover:bg-gray-800">
                <img src="https://flagcdn.com/w20/us.png" alt="US" className="w-5 h-3" />
                <span className="text-sm">United States</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Links */}
      <div className="bg-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8">
            <div>
              <h4 className="font-semibold text-white mb-2">Amazon Music</h4>
              <p className="text-gray-400 text-xs">Stream millions of songs</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Amazon Advertising</h4>
              <p className="text-gray-400 text-xs">Find, attract, and engage customers</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">6pm</h4>
              <p className="text-gray-400 text-xs">Score deals on fashion brands</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">AbeBooks</h4>
              <p className="text-gray-400 text-xs">Books, art & collectibles</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Amazon Web Services</h4>
              <p className="text-gray-400 text-xs">Scalable Cloud Computing Services</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Audible</h4>
              <p className="text-gray-400 text-xs">Listen to Books & Original Audio Performances</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Book Depository</h4>
              <p className="text-gray-400 text-xs">Books With Free Delivery Worldwide</p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-gray-800 py-4 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-6 text-xs text-gray-400">
            <span>© 1996-2024, Amazon.com, Inc. or its affiliates</span>
            <div className="flex items-center space-x-4">
              <Link href="#" className="hover:text-white">Conditions of Use</Link>
              <Link href="#" className="hover:text-white">Privacy Notice</Link>
              <Link href="#" className="hover:text-white">Interest-Based Ads</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}