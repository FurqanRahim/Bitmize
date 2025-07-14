import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div className="bg-white">
      {/* Header merged with hero section */}
      <div className="relative">
        {/* Header */}
        <header className="absolute inset-x-0 top-0 z-50">
          <nav className="flex items-center justify-between p-4 lg:px-8">
            <div className="flex flex-1">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Bitmize</span>
                <img
                  alt="Company logo"
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                  className="h-8 w-auto"
                />
              </a>
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 hover:bg-gray-100/50 backdrop-blur-sm"
              >
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="size-6" />
              </button>
            </div>
            <div className="hidden lg:flex lg:gap-x-4 lg:flex-1 lg:justify-end">
              <a 
                href="#" 
                className="text-sm font-medium text-gray-900 hover:text-indigo-600 px-4 py-2 rounded-md hover:bg-gray-100/50 backdrop-blur-sm transition-all"
              >
                Login
              </a>
              <a
                href="#"
                className="text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md transition-colors"
              >
                Register
              </a>
            </div>
          </nav>
        </header>

        {/* Mobile menu */}
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Bitmize</span>
                <img
                  alt=""
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                  className="h-8 w-auto"
                />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700 hover:bg-gray-100"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="size-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="py-6 space-y-4">
                  <a
                    href="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </a>
                  <a
                    href="/register"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700 text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Register
                  </a>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
       
      </div>
    </div>
  );
};

export default Header;