import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-display font-bold text-brick-400">
                RVA
              </span>
              <span className="text-2xl font-display font-light text-cream-100">
                Local
              </span>
            </Link>
            <p className="text-charcoal-300 text-sm max-w-md">
              Discover the best events, places, and community happenings in
              Richmond, VA. From art walks to local coffee shops, we&apos;re your
              guide to RVA.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-cream-100 mb-4">
              Explore
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/events"
                  className="text-charcoal-300 hover:text-cream-100 transition-colors"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="/places"
                  className="text-charcoal-300 hover:text-cream-100 transition-colors"
                >
                  Places
                </Link>
              </li>
              <li>
                <Link
                  href="/map"
                  className="text-charcoal-300 hover:text-cream-100 transition-colors"
                >
                  Map
                </Link>
              </li>
            </ul>
          </div>

          {/* Neighborhoods */}
          <div>
            <h3 className="font-display font-semibold text-cream-100 mb-4">
              Neighborhoods
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/places?neighborhood=the-fan"
                  className="text-charcoal-300 hover:text-cream-100 transition-colors"
                >
                  The Fan
                </Link>
              </li>
              <li>
                <Link
                  href="/places?neighborhood=carytown"
                  className="text-charcoal-300 hover:text-cream-100 transition-colors"
                >
                  Carytown
                </Link>
              </li>
              <li>
                <Link
                  href="/places?neighborhood=scotts-addition"
                  className="text-charcoal-300 hover:text-cream-100 transition-colors"
                >
                  Scott&apos;s Addition
                </Link>
              </li>
              <li>
                <Link
                  href="/places?neighborhood=church-hill"
                  className="text-charcoal-300 hover:text-cream-100 transition-colors"
                >
                  Church Hill
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-charcoal-600">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-charcoal-400 text-sm">
              Made with love in Richmond, VA
            </p>
            <p className="text-charcoal-400 text-sm">
              &copy; {new Date().getFullYear()} RVA Local. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
