import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MdCatchingPokemon } from "react-icons/md";
import { TbUsers } from "react-icons/tb";

const PageTittles = {
  "/team-builder": "Build Your Team",
  "/battle": "Combat Arena",
}

const NavBar = () => {
  const currentPath = useLocation().pathname;
  const pageTitle = PageTittles[currentPath] || "";
  return (
    <nav className="bg-background/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex  h-16 space-x-8 justify-between items-center">
          <Link to="/" className="text-3xl px-1 leading-none font-bold">
            Poke<span className="text-primary">Arena</span>
          </Link>
          <h2 className="text-lg font-semibold text-muted-foreground">{pageTitle}</h2>
          <div className="flex gap-4">
            <Link
              to="/team-builder"
              className="inline-flex items-center px-2 py-1 bg-primary rounded-md text-background hover:bg-primary/90"
            >
              <TbUsers className="mr-1" size={16} />
              Team Builder
            </Link>
            <Link
              to="/battle"
              className="inline-flex items-center px-2 py-1 hover:text-gray-900"
            >
              <MdCatchingPokemon className="mr-1" size={20} />
              Battle
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
