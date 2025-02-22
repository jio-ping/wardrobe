"use client";
import Link from "next/link";
import { Svg } from "@/components/atoms";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { MobileHamburger, SearchModal } from "@/components/molecules";
import { signOut, useSession } from "next-auth/react";

export default function Header() {
  const pathname = usePathname();
  const [scroll, setScroll] = useState(0);

  //mobile burger
  const [activeBurger, setActiveBurger] = useState<boolean>(false);
  //search
  const [isSearchState, setIsSearchState] = useState<boolean>(false);
  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isLogin = false;

  const navItems = [
    { href: "/dressroom", text: "Dressroom" },
    { href: "/style", text: "Style" },
  ];

  return (
    <>
      {/* 모바일 헤더 */}
      <header
        className={`sticky top-0 z-10 hidden h-12 w-full bg-white px-2 mobile:flex mobile:items-center mobile:justify-between`}
      >
        <Link href="/">
          <Svg id="logo-mobile_Black" />
        </Link>
        <button onClick={() => setActiveBurger(true)}>
          <Svg id="burger" />
        </button>
      </header>{" "}
      {activeBurger ? (
        <MobileHamburger
          isSearchState={isSearchState}
          handleSearchState={setIsSearchState}
          closeFn={() => setActiveBurger(false)}
        />
      ) : (
        ""
      )}
      {/* 데스크톱 헤더 */}
      <header
        className={`sticky top-0 z-10 my-5 w-full bg-white font-sans text-gray-800 mobile:hidden ${scroll ? "h-28" : "h-36"}`}
      >
        <nav className="relative flex h-full w-screen items-center justify-between px-20 mobile:px-1">
          <ul className="flex justify-between gap-10 text-h-2-bold mobile:hidden">
            {navItems.map((item) => (
              <li
                className={`${pathname === `${item.href}` ? "decoration-7 underline underline-offset-8" : ""}`}
                key={item.text}
              >
                <Link href={item.href}>{item.text}</Link>
              </li>
            ))}
          </ul>
          <Link
            className="absolute left-[45%] max-w-full mobile:hidden"
            href="/"
          >
            <Svg id="logo-web_Black" />
          </Link>
          <div
            className={`flex mobile:hidden ${scroll ? "items-start gap-2" : "flex-col items-end"}`}
          >
            <ul
              className={`flex gap-3 text-b-0-regular ${scroll ? "justify-start gap-4 pr-12" : ""}`}
            >
              <li>
                <Link className="flex items-center gap-1" href="/profile">
                  <Svg id="person" size={scroll ? 28 : 18} />
                  <span className={`${scroll ? "sr-only" : ""}`}>Profile</span>
                </Link>
              </li>
              <li>
                <Link
                  className="flex items-center gap-1"
                  href="/profile/bookmark"
                >
                  <Svg id="bookmark_false" size={scroll ? 28 : 18} />
                  <span className={`${scroll ? "sr-only" : ""}`}>Bookmark</span>
                </Link>
              </li>
              {isLogin ? (
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      signOut();
                    }}
                    className="flex items-center gap-1"
                  >
                    <Svg id="log-out" size={scroll ? 28 : 18} />
                    <span className={`${scroll ? "sr-only" : ""}`}>Logout</span>
                  </button>
                </li>
              ) : (
                <li>
                  <Link className="flex items-center gap-1" href="/login">
                    <Svg id="log-in" size={scroll ? 28 : 18} />
                    <span className={`${scroll ? "sr-only" : ""}`}>Login</span>
                  </Link>
                </li>
              )}
            </ul>
            <button onClick={() => setIsSearchState(true)}>
              <Svg size={scroll ? 28 : 38} id="search" />
            </button>
          </div>
        </nav>
      </header>
      {isSearchState ? (
        <SearchModal
          closeFn={() => setIsSearchState(false)}
          open={isSearchState}
        />
      ) : (
        ""
      )}
    </>
  );
}
