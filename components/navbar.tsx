"use client";
import {
  Navbar as Nav,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { Logo } from "@/components/icons";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem('token') !== null) {
      setIsUser(true);
    }
  }, []);
  
  return (
    <Nav maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">PoliceSim</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          <Dropdown placement="bottom-start">
            <DropdownTrigger>
              <NextLink href="#">Тренировки</NextLink>
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              {
                siteConfig.trainingItems.map((item) => {
                  return (
                    <DropdownItem key={item.href} className="flex items-center gap-2">
                      <NextLink
                        className={clsx(
                          linkStyles({ color: "foreground" }),
                          "data-[active=true]:text-primary data-[active=true]:font-medium",
                        )}
                        color="foreground"
                        href={item.href}
                      >
                        {item.label}
                      </NextLink>
                    </DropdownItem>
                  )
                })
              }
            </DropdownMenu>
          </Dropdown>
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href} className="flex items-center">
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium",
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent className="basis-1 pl-4" justify="end">
        <NavbarItem>
          {
            isUser ? (
              <>
                <Button as={Link} color="primary" href="/profile" variant="bordered" className="mr-2">
                  Профиль
                </Button>
                <Button color="primary" variant="bordered" onPress={() => {
                  localStorage.removeItem('token');
                  setIsUser(false);
                  window.location.href = '/signin';
                }}>
                  Выйти
                </Button>
              </>
            ) : (
              <Button as={Link} color="primary" href="/signup" variant="bordered">
              Sign Up
              </Button>
            )
          }

        </NavbarItem>
        <ThemeSwitch />
        <div className="lg:hidden">
          <NavbarMenuToggle />
        </div>
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`} className="flex items-center">
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </Nav>
  );
};
