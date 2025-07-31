import { useState, Fragment } from "react";
import { Dialog, DialogPanel, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../../public/bitmize.png"
import { Link } from "@tanstack/react-router";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-white">
      <div className="relative">
        {/* Header */}
        <header className="absolute inset-x-0 top-0 z-50">
          <nav className="flex items-center justify-between p-4 lg:px-8">
            <div className="flex flex-1">
              <Link to="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Bitmize</span>
                {/* Bitmize Logo with subtle hover effect */}
                <img
                  alt="Bitmize logo"
                  src={logo}
                  className="h-32 w-auto transition-transform duration-300 hover:scale-105"
                />
              </Link>
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 hover:bg-gray-100/50 backdrop-blur-sm transition-all duration-300 hover:scale-110"
              >
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="size-6" />
              </button>
            </div>

            {/* Desktop Navigation with enhanced hover animations */}
            <div className="hidden lg:flex lg:gap-x-8 lg:items-center">
              <Link
                to="/"
                className="relative text-lg font-medium text-gray-900 hover:text-indigo-600 px-3 py-2 rounded-md transition-colors duration-300
                          after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-indigo-600 
                          after:transition-all after:duration-300 hover:after:w-full"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="relative text-lg font-medium text-gray-900 hover:text-indigo-600 px-3 py-2 rounded-md transition-colors duration-300
                          after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-indigo-600 
                          after:transition-all after:duration-300 hover:after:w-full"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="relative text-lg font-medium text-gray-900 hover:text-indigo-600 px-3 py-2 rounded-md transition-colors duration-300
                          after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-indigo-600 
                          after:transition-all after:duration-300 hover:after:w-full"
              >
                Contact Us
              </Link>
              <Link
                to="/login"
                className="relative text-lg font-medium text-gray-900 hover:text-indigo-600 px-3 py-2 rounded-md transition-colors duration-300
                          after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-indigo-600 
                          after:transition-all after:duration-300 hover:after:w-full"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md 
                          transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-indigo-300/50"
              >
                Register
              </Link>
            </div>
          </nav>
        </header>

        {/* Mobile menu with smooth transitions */}
        <Transition.Root show={mobileMenuOpen} as={Fragment}>
          <Dialog onClose={setMobileMenuOpen} className="lg:hidden">
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                <div className="flex items-center justify-between">
                  <Link
                    to="/"
                    className="-m-1.5 p-1.5"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="sr-only">Bitmize</span>
                    <img
                      alt="Bitmize logo"
                      src={logo}
                      className="h-32 w-auto transition-transform duration-300 hover:scale-105"
                    />
                  </Link>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="-m-2.5 rounded-md p-2.5 text-gray-700 hover:bg-gray-100 transition-all duration-300 hover:rotate-90"
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="size-6" />
                  </button>
                </div>
                <div className="mt-6 flow-root">
                  <div className="-my-6 divide-y divide-gray-500/10">
                    <div className="py-6 space-y-2">
                      <Link
                        to="/"
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 
                                  hover:bg-gray-50 transition-all duration-300 transform hover:translate-x-2"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Home
                      </Link>
                      <Link
                        to="/about"
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 
                                  hover:bg-gray-50 transition-all duration-300 transform hover:translate-x-2"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        About
                      </Link>
                      <Link
                        to="/contact"
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 
                                  hover:bg-gray-50 transition-all duration-300 transform hover:translate-x-2"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Contact Us
                      </Link>
                    </div>
                    <div className="py-6 space-y-2">
                      <Link
                        to="/login"
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 
                                  hover:bg-gray-50 transition-all duration-300 transform hover:translate-x-2"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Login
                      </Link>
                      <Link
                        to="/register"
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-white 
                                  bg-indigo-600 hover:bg-indigo-700 text-center transition-all duration-300 
                                  transform hover:scale-105 shadow-md hover:shadow-indigo-300/30"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Register
                      </Link>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </Transition.Child>
          </Dialog>
        </Transition.Root>
      </div>
    </div>
  );
};

export default Header;